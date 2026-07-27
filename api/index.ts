import express, { Request, Response } from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini Client
const geminiApiKey =
  process.env.GEMINI_API_KEY ||
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  process.env.VITE_GEMINI_API_KEY ||
  '';
const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

// In-Memory Database Store
const mockDb = {
  users: [
    {
      id: 'usr-1',
      email: 'didier@facelessai.io',
      name: 'Didier Cárdenas',
      plan: 'PRO',
      credits: 800,
      role: 'ADMIN',
      created_at: new Date().toISOString()
    }
  ],
  licenseKeys: [
    { key: 'VIP-CYBER-2026-X89', plan: 'PRO', credits: 800, uses: 0, active: true },
    { key: 'AGENCY-PRO-999', plan: 'AGENCY', credits: 2000, uses: 0, active: true },
    { key: 'CREATOR-START-100', plan: 'CREATOR', credits: 300, uses: 0, active: true }
  ],
  creditHistory: [
    {
      id: 'log-1',
      user_email: 'didier@facelessai.io',
      amount: -10,
      description: 'GENERACION_GUION_COMPLETO',
      created_at: new Date().toISOString()
    }
  ],
  projects: [] as any[]
};

// Deduct User Credits Helper
function deductUserCredits(email: string, amount: number, description: string) {
  let user = mockDb.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = {
      id: `usr-${Date.now()}`,
      email,
      name: email.split('@')[0],
      plan: 'PRO',
      credits: 800,
      role: 'USER',
      created_at: new Date().toISOString()
    };
    mockDb.users.push(user);
  }

  if (user.credits < amount) {
    return { success: false, message: `Créditos insuficientes (${user.credits}/${amount}). Actualiza tu plan.`, remainingCredits: user.credits };
  }

  user.credits -= amount;
  mockDb.creditHistory.unshift({
    id: `log-${Date.now()}`,
    user_email: email,
    amount: -amount,
    description,
    created_at: new Date().toISOString()
  });

  return { success: true, remainingCredits: user.credits };
}

// Fallback Structured Script Engine
function buildDynamicScript(promptText: string, nicheText?: string) {
  const topic = promptText || 'Estrategias Virales 2026';
  const targetNiche = nicheText || 'Finanzas & Tecnología';

  return {
    tituloSEO: `Los Secretos Virales de ${topic}: Guía Definitiva y Estrategia 2026`,
    descripcionSEO: `En este video revelamos la guía definitiva sobre ${topic} en el nicho de ${targetNiche}. Descubre secretos clave, análisis en profundidad y la mejor estrategia para 2026.\n\n⏱️ MARCAS DE TIEMPO:\n00:00 - Hook / Revelación Inmediata\n00:15 - Introducción al Misterio\n00:45 - Desarrollo y Puntos Clave\n02:15 - Conclusión y Llamado a la Acción\n\n👉 Suscríbete para más contenido exclusivo sobre ${targetNiche}.\n\n#${topic.replace(/\s+/g, '')} #${targetNiche.replace(/\s+/g, '')} #YouTubeFaceless #Viral`,
    etiquetas: [topic, `${topic} 2026`, targetNiche, "viral youtube", "canales faceless", "automatizacion ia"],
    guion: {
      hook: `El 99% de las personas comete un error fatal cuando intenta entender ${topic}. Pero si prestas atención a los próximos 60 segundos, descubrirás la verdad oculta que transforma este nicho por completo.`,
      introduccion: `Bienvenido a esta entrega especial sobre ${topic} adaptada al nicho de ${targetNiche}. Durante años los principales canales han mantenido en reserva esta estrategia, pero hoy desglosaremos paso a paso el método exacto.`,
      cuerpo: `Punto 1: Dominio del bucle de retención inicial apelando a curiosidad cuantitativa.\nPunto 2: Aplicación de recursos visuales B-roll en alta definición sin mostrar rostro.\nPunto 3: Automatización de la producción usando herramientas de IA de última generación.`,
      llamadoALaAccion: `Si te ha servido este análisis sobre ${topic}, dale me gusta, activa la campanita de notificaciones y suscríbete ahora mismo a nuestro canal para no perderte el próximo documental exclusivo.`
    },
    promptsVisuales: [
      `Cinematic HD 16:9 visualization for ${topic}, glowing cyan and purple neon ambient lighting, 8k render, octane render`,
      `High quality cinematic close-up of ${topic} elements, futuristic ambient glow, hyperrealistic 8k --ar 16:9`,
      `Panoramic futuristic view representing success in ${topic}, epic dramatic lighting, 8k resolution`
    ],
    configVoz: {
      tono: "Dramático / Misterioso / Educativo",
      velocidad: "1.0x"
    },
    titulo_principal: `Los Secretos Virales de ${topic}: Guía Definitiva y Estrategia 2026`,
    titulos_alternativos_AB: [
      `Cómo Dominar ${topic} en 2026: Estrategias que Nadie te Enseña`,
      `El Impacto Oculto de ${topic}: Lo que los Expertos No Quieren que Sepas`
    ],
    guion_escenas: [
      {
        timestamp: "00:00 - 00:15",
        locucion_texto: `El 99% de las personas comete un error fatal cuando intenta entender ${topic}. Pero si prestas atención a los próximos 60 segundos, descubrirás la verdad oculta que transforma este nicho por completo.`,
        indicacion_broll: `Secuencia cinematográfica de alta calidad con iluminación neón cyberpunk en 4K representando ${topic}.`,
        prompt_imagen_ingles: `Cinematic HD visualization for ${topic}, glowing cyan and purple neon ambient lighting, 8k render --ar 16:9`
      },
      {
        timestamp: "00:15 - 00:45",
        locucion_texto: `Bienvenido a esta entrega especial sobre ${topic} para el nicho de ${targetNiche}. Durante años los principales canales han mantenido en reserva esta estrategia, pero hoy desglosaremos paso a paso el método exacto.`,
        indicacion_broll: `Primer plano cinematográfico con efectos de partículas luminosas y gráficos digitales dinámicos sobre ${topic}.`,
        prompt_imagen_ingles: `High quality cinematic close-up of ${topic} elements, futuristic ambient glow, hyperrealistic 8k --ar 16:9`
      },
      {
        timestamp: "00:45 - 01:15",
        locucion_texto: `Punto 1: Dominio del bucle de retención inicial... Si sigues estos 3 pasos, tu impacto será masivo.`,
        indicacion_broll: `Tomas panorámicas ascendentes con estética cyberpunk y paleta de colores cyan y violeta neón.`,
        prompt_imagen_ingles: `Panoramic futuristic view representing success in ${topic}, epic lighting, 8k resolution --ar 16:9`
      }
    ],
    seo: {
      descripcion_optimizada: `En este video revelamos la guía definitiva sobre ${topic} en el nicho de ${targetNiche}. Descubre secretos clave, análisis en profundidad y la mejor estrategia para 2026.\n\n⏱️ TIMESTAMPS:\n00:00 - Introducción a ${topic}\n00:15 - El Pilar Fundamental\n00:45 - Conclusión y Estrategia\n\n👉 Suscríbete para más contenido exclusivo.`,
      tags_lista: [topic, `${topic} 2026`, targetNiche, "viral youtube", "canales faceless"],
      hashtags: [`#${topic.replace(/\s+/g, '')}`, `#${targetNiche.replace(/\s+/g, '')}`, "#YouTubeFaceless", "#ContenidoViral"]
    },
    branding_sugerido: {
      nombre_canal: `${topic.split(' ')[0]} HQ`,
      concepto: `Especialistas en contenido viral y estratégico sobre ${topic} en el nicho ${targetNiche}.`,
      paleta_hex: ["#00F0FF", "#8A2BE2", "#00FF88", "#07090E"]
    }
  };
}

// 1. HEALTH CHECK ENDPOINT
app.get('/api/health', (req: Request, res: Response) => {
  return res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'production',
    service: 'YouTube Faceless AI Engine API (Vercel Serverless)',
    hasGeminiKey: Boolean(geminiApiKey),
    hasYoutubeKey: Boolean(process.env.YOUTUBE_DATA_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY)
  });
});

// 2. AUTH & ACTIVATION ENDPOINTS
app.post('/api/auth/verify-key', (req: Request, res: Response) => {
  const { key, email } = req.body;
  if (!key) {
    return res.status(400).json({ error: 'La clave de licencia es requerida.' });
  }

  const foundKey = mockDb.licenseKeys.find(k => k.key.trim() === key.trim() && k.active);
  if (!foundKey) {
    return res.status(401).json({ error: 'Clave de licencia VIP no válida o revocada.' });
  }

  foundKey.uses += 1;
  const userEmail = email || 'didier@facelessai.io';
  let user = mockDb.users.find(u => u.email.toLowerCase() === userEmail.toLowerCase());

  if (!user) {
    user = {
      id: `usr-${Date.now()}`,
      email: userEmail,
      name: userEmail.split('@')[0],
      plan: foundKey.plan,
      credits: foundKey.credits,
      role: 'VIP_USER',
      created_at: new Date().toISOString()
    };
    mockDb.users.push(user);
  } else {
    user.plan = foundKey.plan;
    user.credits += foundKey.credits;
  }

  return res.json({
    success: true,
    message: `¡Licencia ${foundKey.plan} activada con éxito! Se han cargado ${foundKey.credits} créditos en tu cuenta.`,
    user
  });
});

app.post('/api/auth/google', (req: Request, res: Response) => {
  const { email } = req.body;
  const userEmail = email || 'creador.google@facelessai.io';

  let user = mockDb.users.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
  if (!user) {
    user = {
      id: `usr-g-${Date.now()}`,
      email: userEmail,
      name: 'Creador Google',
      plan: 'PRO',
      credits: 800,
      role: 'USER',
      created_at: new Date().toISOString()
    };
    mockDb.users.push(user);
  }

  return res.json({
    success: true,
    message: 'Autenticación con Google 1-Click completada.',
    user
  });
});

// 3. STRIPE CHECKOUT SIMULATED ENDPOINT
app.post('/api/checkout', (req: Request, res: Response) => {
  const { plan, email } = req.body;
  const targetEmail = email || 'didier@facelessai.io';
  const creditsToAdd = plan === 'CREATOR' ? 300 : plan === 'PRO' ? 800 : 2000;

  let user = mockDb.users.find(u => u.email.toLowerCase() === targetEmail.toLowerCase());
  if (user) {
    user.plan = plan;
    user.credits = Math.max(user.credits, creditsToAdd);
  }

  return res.json({
    success: true,
    message: `Checkout exitoso para el plan ${plan}. Créditos cargados: ${creditsToAdd}`,
    checkoutUrl: 'https://stripe.com/demo-checkout-faceless-ai'
  });
});

// 4. SCRIPT & AI GENERATION ENDPOINT
app.post('/api/ai/generate-script', async (req: Request, res: Response) => {
  const { idea, videoUrl, niche, userEmail } = req.body || {};
  const email = userEmail || 'didier@facelessai.io';

  const deduction = deductUserCredits(email, 10, 'GENERACION_GUION_COMPLETO');
  if (!deduction.success) {
    return res.status(402).json({ error: deduction.message, success: false });
  }

  const topicPrompt = idea || (videoUrl ? `Analiza este video de competencia: ${videoUrl}` : 'Las 5 Inversiones Secretas que los Jóvenes Millonarios Ocultan');

  try {
    if (!ai) {
      const fallbackData = buildDynamicScript(topicPrompt, niche);
      return res.json({
        success: true,
        source: 'fallback-structured',
        credits_deducted: 10,
        remaining_credits: deduction.remainingCredits,
        data: fallbackData
      });
    }

    const systemPrompt = `Eres un guionista y estratega de contenido élite para YouTube Faceless AI Engine v3.6.
Genera un guión estructurado optimizado para el nicho: "${niche || 'Finanzas y Tecnología'}" basado en la idea/tema: "${topicPrompt}".

Devuelve la respuesta en formato JSON estrictamente válido con la siguiente estructura exacta:
{
  "tituloSEO": "Título viral optimizado para CTR",
  "descripcionSEO": "Descripción completa con marcas de tiempo y hashtags",
  "etiquetas": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "guion": {
    "hook": "Texto impactante para los primeros 5 segundos...",
    "introduccion": "Desarrollo del problema o misterio...",
    "cuerpo": "Contenido principal dividido en puntos clave...",
    "llamadoALaAccion": "Cierre y llamado a suscribirse..."
  },
  "promptsVisuales": [
    "High quality cinematic 16:9 image prompt in English for B-roll 1",
    "High quality cinematic 16:9 image prompt in English for B-roll 2"
  ],
  "configVoz": {
    "tono": "Dramático / Misterioso / Educativo",
    "velocidad": "1.0x"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json'
      }
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
    const fallbackData = buildDynamicScript(topicPrompt, niche);
    return res.json({
      success: true,
      source: 'fallback-structured',
      credits_deducted: 10,
      remaining_credits: deduction.remainingCredits,
      data: fallbackData
    });
  }
});

// 5. YOUTUBE API ENDPOINTS
app.post('/api/youtube/track-channel', async (req: Request, res: Response) => {
  const { url, handle } = req.body || {};
  const query = (handle ? handle.replace('@', '') : (url ? url.split('/').pop()?.replace('@', '') : 'terror')).trim();
  const youtubeApiKey = process.env.YOUTUBE_DATA_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY || '';

  if (!youtubeApiKey) {
    return res.status(500).json({
      error: 'La variable de entorno YOUTUBE_DATA_API_KEY no está configurada.',
      success: false
    });
  }

  try {
    const maxCount = req.body?.maxResults || 10;
    const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=viewCount&maxResults=${maxCount}&key=${youtubeApiKey}`;
    const ytRes = await fetch(ytUrl);

    if (!ytRes.ok) {
      const errorText = await ytRes.text();
      return res.status(ytRes.status).json({
        error: `Error HTTP ${ytRes.status} de la API de YouTube: ${errorText}`,
        success: false
      });
    }

    const ytData = await ytRes.json();
    const items = ytData.items || [];

    const recentVideos = items.map((item: any) => ({
      id: item.id?.videoId || '',
      title: item.snippet?.title || '',
      channelId: item.snippet?.channelId || '',
      channelTitle: item.snippet?.channelTitle || '',
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || '',
      publishedAt: item.snippet?.publishedAt ? `Publicado: ${item.snippet.publishedAt.substring(0, 10)}` : 'Reciente',
      views: '🔥 Top Relevancia en Vivo',
      isOutlier: true,
      outlierScore: 'YouTube API Real',
      cloneConcept: item.snippet?.description || `Concepto real extraído del canal ${item.snippet?.channelTitle}`
    }));

    const firstSnippet = items[0]?.snippet;
    const channelStats = {
      nombre: firstSnippet?.channelTitle || `${query.toUpperCase()} HQ`,
      handle: `@${query.toLowerCase().replace(/\s+/g, '')}`,
      url: `https://youtube.com/results?search_query=${encodeURIComponent(query)}`,
      subscriptores: 'Verificado Google API',
      totalVideos: items.length,
      totalViews: 'Datos en Vivo Google Cloud',
      avgBaselineViews: 'En Vivo',
      outliersCount: items.length,
      recentVideos,
      thumbnail: firstSnippet?.thumbnails?.high?.url || firstSnippet?.thumbnails?.medium?.url || ''
    };

    return res.json({
      success: true,
      source: 'YouTube Data API v3 (Oficial Google Cloud)',
      data: channelStats
    });
  } catch (err: any) {
    return res.status(500).json({
      error: err.message || 'Error al conectar con la API de YouTube',
      success: false
    });
  }
});

app.post('/api/youtube/niche-search', async (req: Request, res: Response) => {
  const { nicheKeyword, maxResults } = req.body || {};
  const query = (nicheKeyword || 'terror').trim();
  const limitCount = maxResults || 10;
  const youtubeApiKey = process.env.YOUTUBE_DATA_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_DATA_API_KEY || '';

  if (!youtubeApiKey) {
    return res.status(500).json({
      error: 'La variable de entorno YOUTUBE_DATA_API_KEY no está configurada.',
      success: false
    });
  }

  try {
    const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=viewCount&maxResults=${limitCount}&key=${youtubeApiKey}`;
    const ytRes = await fetch(ytUrl);

    if (!ytRes.ok) {
      const errorText = await ytRes.text();
      return res.status(ytRes.status).json({
        error: `Error HTTP ${ytRes.status} de la API de YouTube: ${errorText}`,
        success: false
      });
    }

    const ytData = await ytRes.json();
    const items = ytData.items || [];

    const topViralIdeas = items.map((item: any, idx: number) => ({
      id: item.id?.videoId || `yt-${idx}`,
      title: item.snippet?.title || '',
      channelId: item.snippet?.channelId || '',
      channelTitle: item.snippet?.channelTitle || '',
      description: item.snippet?.description || '',
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || '',
      publishedAt: item.snippet?.publishedAt ? item.snippet.publishedAt.substring(0, 10) : '',
      views: '🔥 Top Virales por Vistas',
      isOutlier: idx < 3,
      multiplier: `${(5.0 - idx * 0.2).toFixed(1)}x sobre el promedio`,
      concept: item.snippet?.description || `Concepto oficial extraído de YouTube para ${query}`
    }));

    return res.json({
      success: true,
      source: 'YouTube Data API v3 (Oficial Google Cloud)',
      data: {
        nicheName: query,
        viralPotentialIndex: 'ALTO',
        potentialScore: '100/100',
        estimatedCpm: 'API en Vivo Google Cloud',
        avgViewsPerVideo: `${items.length} Videos Virales Encontrados`,
        topViralIdeas
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      error: err.message || 'Error al conectar con la API oficial de YouTube',
      success: false
    });
  }
});

// Global Error Handler Middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Unhandled Express Error:", err);
  if (!res.headersSent) {
    res.status(500).json({
      error: err.message || 'Error interno del servidor backend.',
      success: false
    });
  }
});

export default app;
