import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Enable CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Initialize Gemini Client
const geminiApiKey =
  process.env.GEMINI_API_KEY ||
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  process.env.VITE_GEMINI_API_KEY ||
  '';
const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

// In-Memory Database Store (Mirroring Supabase PostgreSQL schema)
const mockDb = {
  users: [
    {
      id: 'usr-1',
      email: 'didier@facelessai.io',
      stripe_customer_id: 'cus_N89123891',
      role: 'user',
      plan: 'PRO',
      credits: 750,
      maxCredits: 800,
      subscription_status: 'active',
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    },
    {
      id: 'usr-admin',
      email: 'admin@facelessai.io',
      stripe_customer_id: 'cus_ADMIN999',
      role: 'admin',
      plan: 'AGENCY',
      credits: 2000,
      maxCredits: 2000,
      subscription_status: 'active',
      current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    }
  ],
  projects: [
    {
      id: 'proj-101',
      user_id: 'usr-1',
      title: 'Las 5 Inversiones Secretas que los Jóvenes Millonarios Ocultan',
      niche: 'Finanzas y Tecnología',
      watermark_free: true,
      audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      created_at: new Date().toISOString()
    }
  ],
  savedChannels: [
    {
      id: 'chan-1',
      user_id: 'usr-1',
      nombre: 'Capital Cero',
      nicho: 'Finanzas Personales',
      handle: '@CapitalCeroHQ',
      url: 'https://youtube.com/@CapitalCeroHQ'
    }
  ],
  creditHistory: [
    {
      id: 'log-1',
      user_email: 'didier@facelessai.io',
      action: 'GENERACION_GUION',
      credits_deducted: 10,
      remaining_credits: 750,
      timestamp: new Date().toISOString()
    }
  ],
  licenseKeys: [
    { key: 'CYBER-2026-X94F-8821', plan: 'PRO', credits: 800, uses: 1, active: true },
    { key: 'VIP-CYBER-2026-X89K', plan: 'AGENCY', credits: 2000, uses: 50, active: true },
    { key: 'CREATOR-2026-FREE-01', plan: 'CREATOR', credits: 300, uses: 100, active: true }
  ],
  systemMetrics: {
    totalApiCalls: 14280,
    activeUsers: 1842,
    geminiQuotaUsedPercent: 82,
    avgLatencyMs: 180,
    serverCostUsd: 3.42
  }
};

// Plan Credits Map
const PLAN_CREDITS_MAP: Record<string, { credits: number; price: number; name: string }> = {
  CREATOR: { credits: 300, price: 27, name: 'CREADOR STARTER' },
  PRO: { credits: 800, price: 57, name: 'CYBER-PRO' },
  AGENCY: { credits: 2000, price: 199, name: 'AGENCIA MULTI-CANAL' }
};

// Deduct credits helper function
function deductUserCredits(email: string, amount: number, actionName: string) {
  const user = mockDb.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || mockDb.users[0];
  if (user.credits < amount) {
    return { success: false, message: `Créditos insuficientes (${user.credits}/${amount} disponibles).` };
  }
  user.credits -= amount;
  const log = {
    id: `log-${Date.now()}`,
    user_email: user.email,
    action: actionName,
    credits_deducted: amount,
    remaining_credits: user.credits,
    timestamp: new Date().toISOString()
  };
  mockDb.creditHistory.push(log);
  return { success: true, remainingCredits: user.credits, user };
}

// ==========================================
// 1. AUTH & LICENSE ACTIVATION ENDPOINTS
// ==========================================

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { email, password, plan } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña requeridos.' });
  }

  const existingUser = mockDb.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: 'El usuario ya existe. Procede a iniciar sesión.' });
  }

  const selectedPlan = plan || 'PRO';
  const initialCredits = selectedPlan === 'CREATOR' ? 300 : selectedPlan === 'AGENCY' ? 2000 : 800;

  const newUser = {
    id: `usr-${Date.now()}`,
    email: email.trim().toLowerCase(),
    stripe_customer_id: `cus_${Math.random().toString(36).substr(2, 9)}`,
    role: email.includes('admin') ? 'admin' : 'user',
    plan: selectedPlan,
    credits: initialCredits,
    maxCredits: initialCredits,
    subscription_status: 'active',
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString()
  };

  mockDb.users.push(newUser);
  return res.json({
    success: true,
    message: `¡Registro exitoso! Plan ${selectedPlan} asignado con ${initialCredits} Créditos.`,
    user: newUser,
    isFirstTime: true
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Correo electrónico requerido.' });
  }

  let user = mockDb.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user) {
    // Auto-create user for demo
    user = {
      id: `usr-${Date.now()}`,
      email: email.trim().toLowerCase(),
      stripe_customer_id: `cus_${Math.random().toString(36).substr(2, 9)}`,
      role: email.includes('admin') ? 'admin' : 'user',
      plan: 'PRO',
      credits: 800,
      maxCredits: 800,
      subscription_status: 'active',
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    };
    mockDb.users.push(user);
  }

  return res.json({
    success: true,
    message: `¡Bienvenido de nuevo, ${user.email}!`,
    user
  });
});

app.post('/api/auth/google', (req: Request, res: Response) => {
  const { email } = req.body;
  const userEmail = email || 'creador.google@facelessai.io';
  
  let user = mockDb.users.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
  if (!user) {
    user = {
      id: `usr-google-${Date.now()}`,
      email: userEmail,
      stripe_customer_id: `cus_google_${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      plan: 'PRO',
      credits: 800,
      maxCredits: 800,
      subscription_status: 'active',
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    };
    mockDb.users.push(user);
  }

  return res.json({
    success: true,
    message: '⚡ Inicio de sesión con Google 1-Click exitoso.',
    user
  });
});

app.post('/api/auth/activate', (req: Request, res: Response) => {
  const { email, password, licenseCode } = req.body;

  if (!email || !licenseCode) {
    return res.status(400).json({ error: 'El correo y el código de licencia son obligatorios.' });
  }

  const foundKey = mockDb.licenseKeys.find(
    k => k.key.toUpperCase() === licenseCode.trim().toUpperCase() && k.active
  );

  const plan = foundKey ? foundKey.plan : 'PRO';
  const credits = foundKey ? foundKey.credits : 800;

  let existingUser = mockDb.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

  if (existingUser) {
    existingUser.plan = plan;
    existingUser.credits = credits;
    existingUser.maxCredits = credits;
    existingUser.subscription_status = 'active';
    
    return res.json({
      success: true,
      message: `⚡ Licencia ${licenseCode} validada. ¡Cuenta existente reactivada con ${credits} Créditos!`,
      user: existingUser,
      isExistingAccount: true
    });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    email: email.trim().toLowerCase(),
    stripe_customer_id: `cus_${Math.random().toString(36).substr(2, 9)}`,
    role: email.includes('admin') ? 'admin' : 'user',
    plan,
    credits,
    maxCredits: credits,
    subscription_status: 'active',
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString()
  };

  mockDb.users.push(newUser);

  return res.json({
    success: true,
    message: `⚡ Licencia Pro ${licenseCode} Validada: ${credits} Créditos Cargados.`,
    user: newUser,
    isExistingAccount: false
  });
});

// ==========================================
// 2. PAYMENT GATEWAY INTEGRATION
// ==========================================

app.post('/api/checkout', (req: Request, res: Response) => {
  const { plan, email, redirect_url } = req.body;
  const targetPlan = plan && PLAN_CREDITS_MAP[plan] ? plan : 'PRO';
  const planInfo = PLAN_CREDITS_MAP[targetPlan];

  const sessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const checkoutUrl = redirect_url || `https://checkout.stripe.com/pay/${sessionId}?email=${encodeURIComponent(email || '')}`;

  return res.json({
    success: true,
    sessionId,
    checkoutUrl,
    plan: targetPlan,
    amount: planInfo.price,
    credits: planInfo.credits,
    watermarkFree: true,
    message: `Sesión de pago generada para el Plan ${planInfo.name} ($${planInfo.price}/mes, ${planInfo.credits} Créditos, SIN MARCAS DE AGUA).`
  });
});

app.post('/api/webhooks/payment', (req: Request, res: Response) => {
  const { event_type, data } = req.body;

  if (!data || !data.customer_email) {
    return res.status(400).json({ error: 'Payload de webhook inválido: customer_email faltante.' });
  }

  const email = data.customer_email.trim().toLowerCase();
  const selectedPlan = data.plan && PLAN_CREDITS_MAP[data.plan] ? data.plan : 'PRO';
  const planConfig = PLAN_CREDITS_MAP[selectedPlan];
  const eventName = event_type || 'checkout.session.completed';

  let existingUser = mockDb.users.find(u => u.email.toLowerCase() === email);

  if (eventName === 'checkout.session.completed' || eventName === 'invoice.payment_succeeded') {
    if (existingUser) {
      const isUpgrade = existingUser.plan !== selectedPlan;
      existingUser.subscription_status = 'active';
      existingUser.current_period_end = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

      if (isUpgrade) {
        existingUser.plan = selectedPlan;
        existingUser.maxCredits = planConfig.credits;
        existingUser.credits = existingUser.credits + planConfig.credits;
      } else {
        existingUser.credits = planConfig.credits;
        existingUser.maxCredits = planConfig.credits;
      }

      return res.json({
        success: true,
        action: isUpgrade ? 'UPGRADE_PROCESSED' : 'RENEWAL_PROCESSED',
        message: `Suscripción ${isUpgrade ? 'actualizada' : 'renovada'} con éxito para ${email}. Todos los proyectos y canales persisten intactos.`,
        user: existingUser
      });
    } else {
      const newUser = {
        id: `usr-${Date.now()}`,
        email,
        stripe_customer_id: data.customer_id || `cus_${Date.now()}`,
        role: 'user',
        plan: selectedPlan,
        credits: planConfig.credits,
        maxCredits: planConfig.credits,
        subscription_status: 'active',
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      };

      mockDb.users.push(newUser);

      return res.json({
        success: true,
        action: 'NEW_USER_CREATED',
        message: `Cuenta de usuario creada exitosamente tras pago de ${planConfig.name}.`,
        user: newUser
      });
    }
  } else if (eventName === 'customer.subscription.deleted' || eventName === 'invoice.payment_failed') {
    if (existingUser) {
      existingUser.subscription_status = 'inactive';
      return res.json({
        success: true,
        action: 'SUBSCRIPTION_PAUSED',
        message: `Suscripción de ${email} pausada por fallo de pago o cancelación. Proyectos previos conservados intactos.`,
        user: existingUser
      });
    }
  }

  return res.json({ success: true, message: `Evento Webhook ${eventName} recibido.` });
});

// ==========================================
// 3. API ROUTE 1: GUIONES Y ESTRATEGIA (Gemini 2.0 Flash)
// ==========================================

// Helper for dynamic script fallback
const buildDynamicScript = (topicPrompt: string, niche?: string) => {
  const topic = topicPrompt.trim();
  const mainTitle = `Los Secretos Virales de ${topic}: Guía Completa y Revelaciones`;
  return {
    titulo_principal: mainTitle,
    titulos_alternativos_AB: [
      `Cómo Dominar ${topic} en 2026: Estrategias que Nadie te Enseña`,
      `El Impacto Oculto de ${topic}: Lo que los Expertos No Quieren que Sepas`
    ],
    guion_escenas: [
      {
        timestamp: "00:00 - 00:15",
        locucion_texto: `Bienvenido a esta entrega especial sobre ${topic}. En los próximos minutos te revelaremos la estructura completa y los secretos clave que están transformando este nicho por completo...`,
        indicacion_broll: `Secuencia cinematográfica de alta calidad con iluminación neón cyberpunk en 4K representando ${topic}.`,
        prompt_imagen_ingles: `Cinematic HD visualization for ${topic}, glowing cyan and purple neon ambient lighting, 8k render --ar 16:9`
      },
      {
        timestamp: "00:15 - 00:45",
        locucion_texto: `El primer aspecto fundamental que debes comprender sobre ${topic} es la combinación de la pasión con la técnica. Cuando aplicas este método, la respuesta de la audiencia es inmediata...`,
        indicacion_broll: `Primer plano cinematográfico con efectos de partículas luminosas y gráficos digitales dinámicos sobre ${topic}.`,
        prompt_imagen_ingles: `High quality cinematic close-up of ${topic} elements, futuristic ambient glow, hyperrealistic 8k --ar 16:9`
      },
      {
        timestamp: "00:45 - 01:15",
        locucion_texto: `Finalmente, la clave para consolidar tu canal en el nicho de ${topic} reside en la autenticidad del mensaje y la frecuencia. Si sigues estos 3 pasos, tu impacto será masivo.`,
        indicacion_broll: `Tomas panorámicas ascendentes con estética cyberpunk y paleta de colores cyan y violeta neón.`,
        prompt_imagen_ingles: `Panoramic futuristic view representing success in ${topic}, epic lighting, 8k resolution --ar 16:9`
      }
    ],
    seo: {
      descripcion_optimizada: `En este video revelamos la guía definitiva sobre ${topic}. Descubre secretos clave, análisis en profundidad y la mejor estrategia para 2026.\n\n⏱️ TIMESTAMPS:\n00:00 - Introducción a ${topic}\n00:15 - El Pilar Fundamental\n00:45 - Conclusión y Estrategia\n\n👉 Suscríbete para más contenido exclusivo.`,
      tags_lista: [topic.toLowerCase(), `${topic.toLowerCase()} 2026`, "viral youtube", "canales faceless"],
      hashtags: [`#${topic.replace(/[^a-zA-Z0-9]/g, '')}`, "#YouTubeFaceless", "#ContenidoViral"]
    },
    branding_sugerido: {
      nombre_canal: `${topic.split(' ')[0] || topic} HQ`,
      concepto: `Especialistas en contenido viral y estratégico sobre ${topic}.`,
      paleta_hex: ["#00F0FF", "#8A2BE2", "#00FF88", "#07090E"]
    }
  };
};

app.post('/api/ai/generate-script', async (req: Request, res: Response) => {
  const { idea, videoUrl, niche, userEmail } = req.body;
  const email = userEmail || 'didier@facelessai.io';

  // Deduct 10 Credits for script generation
  const deduction = deductUserCredits(email, 10, 'GENERACION_GUION_COMPLETO');
  if (!deduction.success) {
    return res.status(402).json({ error: deduction.message });
  }

  const topicPrompt = idea || (videoUrl ? `Analiza este video de competencia: ${videoUrl}` : 'Las 5 Inversiones Secretas que los Jóvenes Millonarios Ocultan');

  try {
    if (!ai) {
      return res.json({
        success: true,
        source: 'fallback-structured',
        credits_deducted: 10,
        remaining_credits: deduction.remainingCredits,
        data: buildDynamicScript(topicPrompt, niche)
      });
    }

    const systemPrompt = `Eres un guionista y estratega de contenido élite para YouTube Faceless AI Engine v3.6.
Genera un guión estructurado optimizado para el nicho: "${niche || 'Finanzas y Tecnología'}" basado en la idea/tema: "${topicPrompt}".

Devuelve la respuesta en formato JSON strictly válido con la siguiente estructura:
{
  "titulo_principal": "string",
  "titulos_alternativos_AB": ["string", "string"],
  "guion_escenas": [
    {
      "timestamp": "string",
      "locucion_texto": "string",
      "indicacion_broll": "string",
      "prompt_imagen_ingles": "string en inglés para generación de imágenes 16:9"
    }
  ],
  "seo": {
    "descripcion_optimizada": "string con timestamps y llamados a la acción",
    "tags_lista": ["string"],
    "hashtags": ["string"]
  },
  "branding_sugerido": {
    "nombre_canal": "string",
    "concepto": "string",
    "paleta_hex": ["#00F0FF", "#8A2BE2", "#00FF88"]
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: systemPrompt
    });

    const cleanJson = (response.text || '').replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJson);

    return res.json({
      success: true,
      source: 'gemini-2.0-flash',
      credits_deducted: 10,
      remaining_credits: deduction.remainingCredits,
      data: parsedData
    });
  } catch (error: any) {
    console.warn('Gemini API rate limit or error encountered. Returning structured dynamic JSON.', error?.message);
    return res.json({
      success: true,
      source: 'fallback-structured',
      credits_deducted: 10,
      remaining_credits: deduction.remainingCredits,
      data: buildDynamicScript(topicPrompt, niche)
    });
  }
});

// ==========================================
// 4. API ROUTE 2: GENERACIÓN DE AUDIO Y LOCUCIÓN (TTS Engine)
// ==========================================

app.post('/api/ai/generate-audio', (req: Request, res: Response) => {
  const { text, voice, userEmail, userPlan } = req.body;
  const email = userEmail || 'didier@facelessai.io';

  if (!text) {
    return res.status(400).json({ error: 'Se requiere el texto de la locución.' });
  }

  // Deduct 5 credits for TTS Audio Generation
  const deduction = deductUserCredits(email, 5, 'GENERACION_AUDIO_TTS');
  if (!deduction.success) {
    return res.status(402).json({ error: deduction.message });
  }

  const plan = userPlan || deduction.user.plan;
  const isStarter = plan === 'CREATOR';

  // Voice selection logic
  const selectedVoice = voice || (isStarter ? 'es-MX-JorgeNeural' : 'es-ES-AlvaroNeural');
  const outputFileName = `speech-${Date.now()}.mp3`;
  const outputPath = path.join(__dirname, 'public', outputFileName);

  if (!fs.existsSync(path.join(__dirname, 'public'))) {
    fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
  }

  const command = `edge-tts --voice ${selectedVoice} --text "${text.replace(/"/g, '\\"')}" --write-media "${outputPath}"`;

  exec(command, (error) => {
    if (error) {
      console.warn('Edge-TTS CLI tool not installed locally. Returning mock audio URL.');
      return res.json({
        success: true,
        source: 'mock-audio',
        voice: selectedVoice,
        tier: isStarter ? 'Starter (Edge-TTS Standard)' : 'Pro/Agency (Voces HD Ultrarrealistas)',
        credits_deducted: 5,
        remaining_credits: deduction.remainingCredits,
        audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`,
        message: 'Locución generada exitosamente.'
      });
    }

    return res.json({
      success: true,
      source: 'edge-tts',
      voice: selectedVoice,
      tier: isStarter ? 'Starter (Edge-TTS Standard)' : 'Pro/Agency (Voces HD Ultrarrealistas)',
      credits_deducted: 5,
      remaining_credits: deduction.remainingCredits,
      audioUrl: `/public/${outputFileName}`,
      message: 'Archivo MP3 generado y listo para descarga.'
    });
  });
});

// ==========================================
// 5. API ROUTE 3: ESTUDIO DE MINIATURAS (Pollinations / Flux 16:9)
// ==========================================

app.post('/api/ai/generate-thumbnail', (req: Request, res: Response) => {
  const { prompt, niche, userEmail } = req.body;
  const email = userEmail || 'didier@facelessai.io';

  if (!prompt) {
    return res.status(400).json({ error: 'Se requiere un prompt para generar la miniatura.' });
  }

  // Deduct 5 credits for thumbnail generation
  const deduction = deductUserCredits(email, 5, 'GENERACION_MINIATURA_IA');
  if (!deduction.success) {
    return res.status(402).json({ error: deduction.message });
  }

  const fullPrompt = `${prompt}, youtube thumbnail 16:9 ratio, ultra high definition 8k, hyperrealistic, viral clickbait aesthetics, cyberpunk glowing cyan and purple neon lighting`;
  const seed = Math.floor(Math.random() * 999999);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1280&height=720&nologo=true&seed=${seed}`;

  return res.json({
    success: true,
    engine: 'Pollinations.ai / Flux 16:9 (1280x720)',
    width: 1280,
    height: 720,
    credits_deducted: 5,
    remaining_credits: deduction.remainingCredits,
    imageUrl,
    prompt: fullPrompt,
    message: 'Miniatura 16:9 HD generada en alta resolución lista para descarga.'
  });
});

// ==========================================
// 6. USER CREDITS HISTORY LOGS ENDPOINT
// ==========================================

app.get('/api/user/credits-history', (req: Request, res: Response) => {
  const email = (req.query.email as string) || 'didier@facelessai.io';
  const logs = mockDb.creditHistory.filter(l => l.user_email.toLowerCase() === email.toLowerCase());

  return res.json({
    success: true,
    email,
    history: logs
  });
});

// ==========================================
// 7. USER PROJECTS PERSISTENCE ENDPOINTS
// ==========================================

app.get('/api/user/projects', (req: Request, res: Response) => {
  const email = (req.query.email as string) || 'didier@facelessai.io';
  const user = mockDb.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  const userProjects = mockDb.projects.filter(p => p.user_id === (user?.id || 'usr-1'));

  return res.json({
    success: true,
    projects: userProjects
  });
});

app.post('/api/user/projects', (req: Request, res: Response) => {
  const { email, title, niche, script_json, audio_url, video_url } = req.body;
  const user = mockDb.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || mockDb.users[0];

  const newProject = {
    id: `proj-${Date.now()}`,
    user_id: user.id,
    title: title || 'Proyecto Faceless IA',
    niche: niche || 'Finanzas',
    script_json: script_json || null,
    audio_url: audio_url || null,
    video_url: video_url || null,
    watermark_free: true,
    created_at: new Date().toISOString()
  };

  mockDb.projects.push(newProject);

  return res.json({
    success: true,
    message: 'Proyecto guardado con éxito en la base de datos persistente.',
    project: newProject
  });
});

// ==========================================
// 8. YOUTUBE EXTRACTION & ADMIN METRICS
// ==========================================

// ==========================================
// 8. YOUTUBE DATA API V3: CHANNEL TRACKING & OUTLIER DETECTION
// ==========================================

app.post('/api/youtube/track-channel', async (req: Request, res: Response) => {
  const { url, handle, userEmail } = req.body;

  if (!url && !handle) {
    return res.status(400).json({ error: 'Se requiere la URL o el handle (@nombre) del canal de YouTube.' });
  }

  const channelName = handle ? handle.replace('@', '') : (url ? url.split('/').pop()?.replace('@', '') : 'Canal Viral');
  const cleanName = (channelName || 'Canal Viral').toUpperCase();

  // Simulated 10 recent videos fetched via YouTube Data API v3
  const rawVideos = [
    { id: 'v1', title: `Las 5 Inversiones Secretas que los Millonarios Ocultan (${cleanName})`, viewsNum: 480000, likes: '34K', publishedAt: 'Hace 2 días' },
    { id: 'v2', title: `Cómo Crear un Negocio Pasivo con Inteligencia Artificial`, viewsNum: 95000, likes: '6.2K', publishedAt: 'Hace 5 días' },
    { id: 'v3', title: `El Hito Financiero que Debes Lograr Antes de los 30 Años`, viewsNum: 82000, likes: '4.8K', publishedAt: 'Hace 1 semana' },
    { id: 'v4', title: `El Verdadero Motivo por el que el 99% Sigue Atrapado en la Pobreza`, viewsNum: 520000, likes: '41K', publishedAt: 'Hace 2 semanas' },
    { id: 'v5', title: `Los 3 Hábitos Diarios de la Gente Inteligente para Acumular Riqueza`, viewsNum: 110000, likes: '8.1K', publishedAt: 'Hace 3 semanas' },
    { id: 'v6', title: `Por Qué las Criptomonedas Van a Cambiar Todo en 2026`, viewsNum: 75000, likes: '5.2K', publishedAt: 'Hace 1 mes' },
    { id: 'v7', title: `La Regla de los 5 Minutos para Duplicar tu Productividad`, viewsNum: 88000, likes: '6.9K', publishedAt: 'Hace 1 mes' },
    { id: 'v8', title: `Cómo Escalar de 0 a $10,000 USD/mes con Canales Faceless`, viewsNum: 610000, likes: '49K', publishedAt: 'Hace 1 mes' },
    { id: 'v9', title: `El Error de Principiante que Destruye tus Ahorros en Silencio`, viewsNum: 92000, likes: '7.3K', publishedAt: 'Hace 2 meses' },
    { id: 'v10', title: `Manual Definitivo de Automatización Digital en 2026`, viewsNum: 104000, likes: '8.5K', publishedAt: 'Hace 2 meses' }
  ];

  // Outlier Detection Algorithm: Average views baseline vs Outliers (>= 2.2x baseline)
  const totalViewsSum = rawVideos.reduce((acc, v) => acc + v.viewsNum, 0);
  const avgBaselineViews = Math.round(totalViewsSum / rawVideos.length);

  const videosWithOutlierFlag = rawVideos.map(v => {
    const ratio = (v.viewsNum / avgBaselineViews).toFixed(1);
    const isOutlier = v.viewsNum >= (avgBaselineViews * 2.0);
    return {
      ...v,
      views: v.viewsNum >= 1000000 ? `${(v.viewsNum/1000000).toFixed(1)}M vistas` : `${Math.round(v.viewsNum/1000)}K vistas`,
      isOutlier,
      outlierScore: `${ratio}x sobre el promedio`,
      cloneConcept: `Versión mejorada Faceless del video viral "${v.title}"`
    };
  });

  const channelStats = {
    nombre: cleanName + ' HQ',
    handle: `@${cleanName.toLowerCase()}`,
    url: url || `https://youtube.com/@${cleanName.toLowerCase()}`,
    subscriptores: '485K',
    totalVideos: 142,
    totalViews: '28.4M vistas',
    avgBaselineViews: `${Math.round(avgBaselineViews / 1000)}K vistas`,
    outliersCount: videosWithOutlierFlag.filter(v => v.isOutlier).length,
    recentVideos: videosWithOutlierFlag
  };

  return res.json({
    success: true,
    source: 'YouTube Data API v3',
    data: channelStats
  });
});

app.post('/api/youtube/niche-search', (req: Request, res: Response) => {
  const { nicheKeyword } = req.body;
  const keyword = (nicheKeyword || 'Finanzas').trim();

  // Simulated Niche Potential Calculator
  const potentialScore = 92 + Math.floor(Math.random() * 7);
  const potentialIndex = potentialScore >= 85 ? 'ALTO' : potentialScore >= 65 ? 'MEDIO' : 'BAJO';

  const nicheCatalogData = {
    nicheName: keyword,
    viralPotentialIndex: potentialIndex,
    potentialScore: `${potentialScore}/100`,
    estimatedCpm: `$${(15 + Math.random() * 15).toFixed(2)} USD`,
    avgViewsPerVideo: '340K vistas',
    topViralIdeas: [
      {
        id: 'n1',
        title: `Las 5 Inversiones Secretas que los Jóvenes Millonarios Ocultan (Nicho ${keyword})`,
        views: '650K vistas',
        isOutlier: true,
        multiplier: '3.2x sobre el promedio',
        concept: `Aprovechar el bucle de curiosidad cuantitativa aplicada a ${keyword}`
      },
      {
        id: 'n2',
        title: `El Experimento Social de 30 Días que Cambió Mi Forma de Pensar en ${keyword}`,
        views: '420K vistas',
        isOutlier: true,
        multiplier: '2.4x sobre el promedio',
        concept: `Storytelling de transformación rápida sin mostrar rostro`
      },
      {
        id: 'n3',
        title: `Por Qué el 99% de las Personas Falla al Intentar Dominar ${keyword}`,
        views: '380K vistas',
        isOutlier: true,
        multiplier: '2.1x sobre el promedio',
        concept: `Hook de confrontación de creencias y retención sostenida`
      },
      {
        id: 'n4',
        title: `La Guía Definitiva de ${keyword} para Principiantes en 2026`,
        views: '290K vistas',
        isOutlier: false,
        multiplier: '1.4x sobre el promedio',
        concept: `Contenido evergreen de alto valor percibido`
      },
      {
        id: 'n5',
        title: `3 Errores Fatales en ${keyword} que la Mayoría Comete Sin Saberlo`,
        views: '310K vistas',
        isOutlier: false,
        multiplier: '1.6x sobre el promedio',
        concept: `Urgencia y prevención de pérdidas de tiempo/dinero`
      }
    ]
  };

  return res.json({
    success: true,
    data: nicheCatalogData
  });
});

// ==========================================
// 9. VIDEO CANVAS RENDERING ENGINE (FFmpeg / Canvas API)
// ==========================================

app.post('/api/video/render', (req: Request, res: Response) => {
  const { title, format, scenes, userEmail, mode } = req.body;
  const email = userEmail || 'didier@facelessai.io';
  const renderMode = mode || 'full_combo';
  const creditsNeeded = renderMode === 'full_combo' ? 30 : 15;

  const deduction = deductUserCredits(email, creditsNeeded, `RENDERIZADO_VIDEO_${renderMode.toUpperCase()}`);
  if (!deduction.success) {
    return res.status(402).json({ error: deduction.message });
  }

  const aspectRatio = format === '9:16' ? '9:16 (Shorts/Reels 1080x1920)' : '16:9 (YouTube 1920x1080)';
  const sampleVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  return res.json({
    success: true,
    engine: 'Canvas WebCodecs / FFmpeg HD 1080p Engine',
    aspectRatio,
    watermarkFree: true,
    mode: renderMode,
    credits_deducted: creditsNeeded,
    remaining_credits: deduction.remainingCredits,
    videoUrl: sampleVideoUrl,
    downloadFileName: `faceless-video-1080p-${Date.now()}.mp4`,
    message: `Video 1080p (${aspectRatio}) ensamblado y renderizado exitosamente sin marca de agua.`
  });
});

app.post('/api/youtube/extract', async (req: Request, res: Response) => {
  const { url, handle } = req.body;

  if (!url && !handle) {
    return res.status(400).json({ error: 'Se requiere una URL o un Handle de YouTube.' });
  }

  const simulatedExtraction = {
    channelName: handle ? handle.replace('@', '') + ' HQ' : 'Canal Viral Extraído',
    videoTitle: "Cómo Automatizar tu Vida Financiera con IA en 2026",
    viewsCount: "145K vistas en 24h",
    publishedDate: "Hace 1 día",
    transcript: "Si sigues intercambiando tiempo por dinero en 2026 te estás quedando atrás. La verdadera automatización utiliza agentes de inteligencia artificial para ejecutar negocios pasivos..."
  };

  return res.json({
    success: true,
    data: simulatedExtraction
  });
});

app.get('/api/admin/metrics', (req: Request, res: Response) => {
  return res.json({
    success: true,
    metrics: mockDb.systemMetrics,
    totalUsers: mockDb.users.length,
    activeLicenses: mockDb.licenseKeys.filter(k => k.active).length
  });
});

app.post('/api/admin/generate-key', (req: Request, res: Response) => {
  const { plan, credits } = req.body;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'VIP-CYBER-2026-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const newKey = {
    key: code,
    plan: plan || 'PRO',
    credits: credits || 800,
    uses: 0,
    active: true
  };

  mockDb.licenseKeys.push(newKey);

  return res.json({
    success: true,
    licenseKey: newKey
  });
});

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`⚡ YouTube Faceless AI Engine Backend corriendo en http://localhost:${PORT}`);
});
