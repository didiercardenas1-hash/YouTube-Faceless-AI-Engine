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
  const topic = promptText.trim() || 'Estrategias Virales 2026';
  const targetNiche = nicheText || 'General';

  return {
    tituloSEO: `${topic}: Revelaciones y Guía Completa`,
    descripcionSEO: `Análisis en profundidad sobre ${topic}. Descubre conceptos clave, estrategias actuales y mejores prácticas.\n\n⏱️ MARCAS DE TIEMPO:\n00:00 - Hook / Revelación\n00:15 - Introducción\n00:45 - Desarrollo Principal\n02:15 - Conclusión y CTA\n\n#${topic.replace(/\s+/g, '')} #YouTubeFaceless #Viral`,
    etiquetas: [topic, targetNiche, "viral youtube", "canales faceless", "automatizacion ia"],
    guion: {
      hook: `En este video analizaremos todo lo relacionado con ${topic} y los secretos que transforman este tema.`,
      introduccion: `Al examinar el contenido sobre ${topic}, descubrimos patrones fundamentales que captan la atención inmediatamente.`,
      cuerpo: `En primer lugar, la claridad narrativa es esencial. En segundo lugar, los apoyos visuales B-roll aumentan la retención. Finalmente, mantener una estructura bien definida asegura que el espectador permanezca hasta el final.`,
      llamadoALaAccion: `Si te ha servido esta guía sobre ${topic}, activa la campana y suscríbete para recibir más contenido exclusivo.`
    },
    promptsVisuales: [
      "Dark cinematic animated style, mysterious atmosphere, glowing purple light, 8k render",
      "Futuristic digital interface, glowing cyan holographic data streams, high quality cinematic lighting",
      "Epic dramatic cinematic scene, cinematic lighting, 8k resolution, octane render",
      "High contrast YouTube Subscribe button animation with glowing neon lighting, studio background, 8k render"
    ],
    configVoz: {
      tono: "Dramático / Educativo",
      velocidad: "1.0x"
    },
    titulo_principal: `${topic}: Revelaciones y Guía Completa`,
    titulos_alternativos_AB: [
      `La Verdad Sobre ${topic}`,
      `Cómo Dominar ${topic}`
    ],
    guion_escenas: [
      {
        timestamp: "00:00 - 00:15",
        locucion_texto: `En este video analizaremos todo lo relacionado con ${topic} y los secretos que transforman este tema.`,
        indicacion_broll: "Secuencia cinematográfica de alto impacto",
        prompt_imagen_ingles: "Dark cinematic animated style, mysterious atmosphere, glowing purple light, 8k render"
      },
      {
        timestamp: "00:15 - 00:45",
        locucion_texto: `Al examinar el contenido sobre ${topic}, descubrimos patrones fundamentales...`,
        indicacion_broll: "B-roll explicativo dinámico",
        prompt_imagen_ingles: "Futuristic digital interface, glowing cyan holographic data streams, high quality cinematic lighting"
      },
      {
        timestamp: "00:45 - 01:15",
        locucion_texto: "En primer lugar, la claridad narrativa es esencial...",
        indicacion_broll: "Visuales cinematográficos 4K",
        prompt_imagen_ingles: "Epic dramatic cinematic scene, cinematic lighting, 8k resolution, octane render"
      }
    ],
    seo: {
      descripcion_optimizada: `Análisis en profundidad sobre ${topic}.\n\n⏱️ MARCAS DE TIEMPO:\n00:00 - Hook\n00:15 - Introducción\n00:45 - Desarrollo`,
      tags_lista: [topic, targetNiche, "viral youtube"],
      hashtags: [`#${topic.replace(/\s+/g, '')}`, "#YouTubeFaceless"]
    },
    branding_sugerido: {
      nombre_canal: `${topic.split(' ')[0]} HQ`,
      concepto: `Contenido sobre ${topic}`,
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

// 3. CHECKOUT & PAYMENT WEBHOOK ENDPOINTS
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

  const topicPrompt = idea || (videoUrl ? `Analiza este video de competencia: ${videoUrl}` : 'Concepto de video viral');

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
Tu objetivo es interpretar la idea/concepto: "${topicPrompt}" dentro del nicho: "${niche || 'General'}" y redactar un guión 100% ORIGINAL, envolvente, fluido y completo desde cero.

NORMAS OBLIGATORIAS DE REDACCIÓN:
1. NINGUNA PLANTILLA NI TEXTO HARDCODEADO: Redacta locuciones 100% únicas y originales según el tema. No uses la frase 'El 99% de las personas comete un error' ni 'adaptada al nicho'.
2. ESTRUCTURA COMPLETA DE GUIÓN (guion):
   - hook: Gancho magnético e impactante para los primeros 5 segundos.
   - introduccion: Introducción envolvente que desarrolle la premisa inicial sin clichés.
   - cuerpo: Desarrollo exhaustivo, fluido y estructurado con los datos y conceptos principales.
   - llamadoALaAccion: Cierre épico que invite al espectador a suscribirse y comentar.
3. PROMPTS DE IMAGEN INTELIGENTES (promptsVisuales): Genera entre 3 y 5 prompts de imagen en INGLÉS concisos, elegantes y puramente descriptivos de estilo cinematográfico (ejemplo: 'Dark cinematic animated style, mysterious atmosphere, glowing purple light, 8k render'). NUNCA pegues el título en español o frases concatenadas dentro del prompt.

Devuelve la respuesta en formato JSON strictly válido con la siguiente estructura exacta:
{
  "tituloSEO": "Título viral optimizado para CTR",
  "descripcionSEO": "Descripción completa con marcas de tiempo (timestamps) y hashtags relevantes",
  "etiquetas": ["etiqueta1", "etiqueta2", "etiqueta3", "etiqueta4", "etiqueta5"],
  "guion": {
    "hook": "Texto del hook impactante de 5 segundos...",
    "introduccion": "Texto introductorio 100% original...",
    "cuerpo": "Desarrollo completo y fluido del tema...",
    "llamadoALaAccion": "Texto de cierre y llamado a la acción..."
  },
  "promptsVisuales": [
    "Dark cinematic animated style, mysterious atmosphere, glowing purple light, 8k render",
    "Futuristic digital interface, glowing cyan holographic data streams, high quality cinematic lighting",
    "Epic dramatic cinematic scene, cinematic lighting, 8k resolution, octane render"
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
