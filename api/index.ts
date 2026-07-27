import express, { Request, Response } from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import { YoutubeTranscript } from 'youtube-transcript';

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
}function cleanTopicTitle(rawText: string): string {
  let cleaned = (rawText || '').trim();
  cleaned = cleaned.replace(/^Estrategia Clonada de Video Viral:\s*"/i, '');
  cleaned = cleaned.replace(/^Análisis de Video Viral:\s*"/i, '');
  cleaned = cleaned.replace(/\s*\.\s*Concepto Clave:.*$/i, '');
  cleaned = cleaned.replace(/\s*Detalles:.*$/i, '');
  cleaned = cleaned.replace(/"$/g, '').trim();
  return cleaned || 'Historia Viral Relevante';
}

// Fallback Structured Script Engine
function buildDynamicScript(promptText: string, nicheText?: string) {
  const topic = cleanTopicTitle(promptText);
  const targetNiche = nicheText || 'General';

  return {
    tituloSEO: `La Verdad Oculta Detrás de ${topic}`,
    descripcionSEO: `Descubre los detalles fascinantes y la narrativa detrás de ${topic}. Análisis exhaustivo de los momentos clave.\n\n⏱️ MARCAS DE TIEMPO:\n00:00 - Revelación Inicial\n00:15 - El Inconveniente Principal\n00:45 - Desarrollo de la Historia\n02:15 - Conclusión y Reflexión\n\n#${topic.replace(/[^a-zA-Z0-9]/g, '')} #YouTubeFaceless #HistoriaViral`,
    etiquetas: [topic, targetNiche, "documental faceless", "historia real", "casos virales"],
    guion: {
      hook: `Detrás del fenómeno de ${topic} se oculta un suceso impactante que muy pocos conocen en detalle.`,
      introduccion: `Todo comenzó cuando los acontecimientos alrededor de este caso tomaron un giro inesperado, capturando la atención de millones.`,
      cuerpo: `Al profundizar en los hechos clave, surgen verdades reveladoras: las decisiones trascendentales tomadas en el momento más crítico, la reacción de la audiencia y las consecuencias inevitables que cambiaron la historia.`,
      llamadoALaAccion: `Si te apasiona descubrir este tipo de historias, suscríbete al canal y activa la campana para explorar más relatos fascinantes.`
    },
    promptsVisuales: [
      "Cinematic dramatic portrait with soft moody side lighting, deep shadows, 8k render, photorealistic",
      "Atmospheric dark cinematic scene showing historical documents and vintage photographs on a wooden table, 8k",
      "Wide angle dramatic shot of a mysterious silhouette in a dimly lit hallway, cinematic color grading",
      "Minimalist glowing YouTube Subscribe animation overlay on dark ambient background, 8k resolution"
    ],
    configVoz: {
      tono: "Dramático / Narrativo",
      velocidad: "1.0x"
    },
    titulo_principal: `La Verdad Oculta Detrás de ${topic}`,
    titulos_alternativos_AB: [
      `La Verdadera Historia Detrás de ${topic}`,
      `Lo Que Nadie Te Contó Sobre ${topic}`
    ],
    guion_escenas: [
      {
        timestamp: "00:00 - 00:15",
        locucion_texto: `Detrás del fenómeno de ${topic} se oculta un suceso impactante que muy pocos conocen en detalle.`,
        indicacion_broll: "Secuencia cinematográfica de alto impacto con iluminación dramática",
        prompt_imagen_ingles: "Cinematic dramatic portrait with soft moody side lighting, deep shadows, 8k render, photorealistic"
      },
      {
        timestamp: "00:15 - 00:45",
        locucion_texto: "Todo comenzó cuando los acontecimientos alrededor de este caso tomaron un giro inesperado...",
        indicacion_broll: "B-roll atmosférico con archivos y documentos clave",
        prompt_imagen_ingles: "Atmospheric dark cinematic scene showing historical documents and vintage photographs on a wooden table, 8k"
      },
      {
        timestamp: "00:45 - 01:15",
        locucion_texto: "Al profundizar en los hechos clave, surgen verdades reveladoras sobre las decisiones más críticas...",
        indicacion_broll: "Toma panorámica dramática en alta resolución",
        prompt_imagen_ingles: "Wide angle dramatic shot of a mysterious silhouette in a dimly lit hallway, cinematic color grading"
      }
    ],
    seo: {
      descripcion_optimizada: `Descubre los detalles fascinantes sobre ${topic}.\n\n⏱️ MARCAS DE TIEMPO:\n00:00 - Revelación\n00:15 - Contexto\n00:45 - Hechos Clave`,
      tags_lista: [topic, targetNiche, "documental faceless"],
      hashtags: [`#${topic.replace(/[^a-zA-Z0-9]/g, '')}`, "#YouTubeFaceless"]
    },
    branding_sugerido: {
      nombre_canal: `${topic.split(' ')[0]} Historias`,
      concepto: `Relatos e historias de alto impacto sobre ${topic}`,
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

async function fetchYouTubeTranscript(videoIdOrUrl: string): Promise<string> {
  if (!videoIdOrUrl) return '';
  try {
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoIdOrUrl);
    if (transcriptItems && Array.isArray(transcriptItems) && transcriptItems.length > 0) {
      return transcriptItems.map((item: any) => item.text).join(' ');
    }
  } catch (err: any) {
    console.warn(`[YouTube Transcript Warning] ${videoIdOrUrl}:`, err?.message || err);
  }
  return '';
}

// 4. TRANSCRIPT EXTRACTION ENDPOINT
app.post('/api/transcript', async (req: Request, res: Response) => {
  const { videoId, videoUrl } = req.body || {};
  const target = videoId || videoUrl;

  if (!target) {
    return res.status(400).json({ error: 'videoId o videoUrl es requerido.', success: false });
  }

  try {
    const transcriptText = await fetchYouTubeTranscript(target);
    return res.json({
      success: true,
      videoId: target,
      transcript: transcriptText,
      hasTranscript: transcriptText.length > 0,
      length: transcriptText.length
    });
  } catch (err: any) {
    return res.status(500).json({
      error: `Error al extraer transcripción: ${err.message || err}`,
      success: false
    });
  }
});

// 5. SCRIPT & AI GENERATION ENDPOINT
app.post('/api/ai/generate-script', async (req: Request, res: Response) => {
  const { idea, videoId, videoUrl, transcript: inputTranscript, niche, userEmail } = req.body || {};
  const email = userEmail || 'didier@facelessai.io';

  const deduction = deductUserCredits(email, 10, 'GENERACION_GUION_COMPLETO');
  if (!deduction.success) {
    return res.status(402).json({ error: deduction.message, success: false });
  }

  const targetVideo = videoId || videoUrl;
  let realTranscript = inputTranscript || '';

  if (!realTranscript && targetVideo) {
    realTranscript = await fetchYouTubeTranscript(targetVideo);
  }

  const cleanTopic = cleanTopicTitle(idea || targetVideo || 'Historia Viral');

  try {
    if (!ai) {
      const fallbackData = buildDynamicScript(cleanTopic, niche);
      return res.json({
        success: true,
        source: 'fallback-structured',
        credits_deducted: 10,
        remaining_credits: deduction.remainingCredits,
        data: fallbackData
      });
    }

    let systemPrompt = '';
    if (realTranscript && realTranscript.trim().length > 0) {
      systemPrompt = `Aquí tienes la transcripción real de un video viral sobre "${cleanTopic}":
"${realTranscript.substring(0, 8000)}"

INSTRUCCIONES CRÍTICAS:
Analiza la historia y concepto central de esta transcripción y redacta un guion 100% ORIGINAL, fluido y fascinante para un canal de YouTube Faceless.
El guion debe ser ESTRUCTURADO Y ESPECÍFICO sobre la historia real de ${cleanTopic}.

PROHIBICIONES ABSOLUTAS:
1. PROHIBIDO usar frases de plantilla o texto de relleno como "En este video analizaremos...", "Para comprender verdaderamente...", "La clave radica en tres pilares...", "El 99% de las personas...", o "adaptada al nicho de...".
2. PROHIBIDO copiar oraciones textualmente de la transcripción. Transforma la historia en una narrativa épica de alta retención (Hook de 5s, Introducción, Cuerpo dinámico y CTA).
3. PROMPTS DE IMAGEN EN INGLÉS (promptsVisuales): Genera de 3 a 5 descripciones de imagen cinematográficas concisas en inglés (ejemplo: 'Cinematic dramatic portrait of mysterious figure in stage light, 8k render'). NUNCA pegues títulos en español ni descripciones largas dentro del prompt.

Devuelve la respuesta en formato JSON estrictamente válido con la siguiente estructura exacta:
{
  "tituloSEO": "Título viral optimizado para CTR",
  "descripcionSEO": "Descripción completa con marcas de tiempo (timestamps) y hashtags relevantes",
  "etiquetas": ["etiqueta1", "etiqueta2", "etiqueta3", "etiqueta4", "etiqueta5"],
  "guion": {
    "hook": "Gancho magnético de 5-10 segundos 100% específico de la historia...",
    "introduccion": "Desarrollo del conflicto o misterio inicial...",
    "cuerpo": "Relato fascinante de los hechos principales sin rodeos...",
    "llamadoALaAccion": "Texto de cierre y CTA..."
  },
  "promptsVisuales": [
    "Cinematic dramatic portrait of mysterious figure in stage light, 8k render",
    "Atmospheric dark vintage photographs on wooden desk, 8k",
    "Wide angle dramatic shot of crowded theater hall, photorealistic"
  ],
  "configVoz": {
    "tono": "Dramático / Misterioso / Educativo",
    "velocidad": "1.0x"
  }
}`;
    } else {
      systemPrompt = `Eres un guionista y estratega de contenido élite para canales Faceless de YouTube.
Tu tarea es actuar como un guionista profesional y redactar un guión 100% ORIGINAL, natural, fluido y libre sobre la historia/concepto: "${cleanTopic}" en el nicho: "${niche || 'General'}".

INSTRUCCIONES CRÍTICAS DE REDACCIÓN (PROHIBIDO USAR PLANTILLAS):
1. NO USES FRASES FÓRMULA NI MOLDES HARDCODEADOS: Prohibido usar "En este video analizaremos todo lo relacionado con...", "Para comprender verdaderamente...", "La clave radica en tres pilares...", "El 99% de las personas...", o "adaptada al nicho de...". Redacta escenas 1 a 4 completamente dinámicas e individuales sobre ${cleanTopic}.
2. REDACCIÓN PROFESIONAL DIRECTA:
   - hook: Redacta un gancho orgánico, fascinante e impactante de 5 a 10 segundos sobre ${cleanTopic}.
   - introduccion: Desarrolla el misterio o problema planteado de forma fluida y natural.
   - cuerpo: Explica exhaustivamente los puntos clave del tema con narrativa envolvente de alta retención.
   - llamadoALaAccion: Redacta una llamada a la acción limpia e impulsiva para suscribirse y comentar.
3. PROMPTS VISUALES CONCISOS EN INGLÉS (promptsVisuales): Genera de 3 a 5 prompts de imagen EN INGLÉS puramente descriptivos y concisos de estilo cinematográfico (ejemplo: 'Cinematic close-up of mysterious character in dramatic stage light, 8k render'). NUNCA pegues títulos en español ni oraciones largas dentro de los prompts.

Devuelve la respuesta en formato JSON estrictamente válido con el siguiente esquema:
{
  "tituloSEO": "Título viral optimizado para CTR",
  "descripcionSEO": "Descripción completa con marcas de tiempo (timestamps) y hashtags",
  "etiquetas": ["etiqueta1", "etiqueta2", "etiqueta3", "etiqueta4", "etiqueta5"],
  "guion": {
    "hook": "Texto del gancho inicial de 5-10 segundos...",
    "introduccion": "Texto introductorio fluido sin clichés...",
    "cuerpo": "Desarrollo completo y envolvente del tema...",
    "llamadoALaAccion": "Texto de cierre y CTA..."
  },
  "promptsVisuales": [
    "Cinematic close-up of mysterious character in dramatic stage light, 8k render",
    "Futuristic digital interface with cyan data streams, octane render, 16:9",
    "Dramatic cinematic lighting shot of high tech lab, photorealistic, 8k"
  ],
  "configVoz": {
    "tono": "Dramático / Misterioso / Educativo",
    "velocidad": "1.0x"
  }
}`;
    }

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
      has_real_transcript: Boolean(realTranscript && realTranscript.length > 0),
      data: parsedData
    });
  } catch (error: any) {
    const fallbackData = buildDynamicScript(cleanTopic, niche);
    return res.json({
      success: true,
      source: 'fallback-structured',
      credits_deducted: 10,
      remaining_credits: deduction.remainingCredits,
      data: fallbackData
    });
  }
});

// 6. YOUTUBE API ENDPOINTS
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
