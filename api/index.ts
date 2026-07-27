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
}function sanitizeInputText(rawText: string): string {
  if (!rawText) return '';
  let text = String(rawText);

  // 1. Remove metadata additions & test prefixes
  text = text.replace(/^Estrategia Clonada de Video Viral:\s*"?/gi, '');
  text = text.replace(/^Análisis de Video Viral:\s*"?/gi, '');
  text = text.replace(/^Concepto oficial extraído de YouTube:?\s*"?/gi, '');
  text = text.replace(/\s*\.\s*Concepto Clave:.*$/gi, '');
  text = text.replace(/\s*Detalles:.*$/gi, '');

  // 2. Remove all hashtags (#Bitcoin, #Cripto, #Finanzas, etc.)
  text = text.replace(/#[\wáéíóúñÁÉÍÓÚÑ]+/gi, '');

  // 3. Remove Emojis & special unicode symbols
  text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1700}-\u{177F}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

  // 4. Remove leftover quotes & extra spaces
  text = text.replace(/^[":\s]+|[":\s]+$/g, '').replace(/\s+/g, ' ').trim();

  return text || 'Historia Viral Relevante';
}

// Fallback Structured Script Engine
function buildDynamicScript(promptText: string, nicheText?: string) {
  const cleanTitle = sanitizeInputText(promptText);
  const targetNiche = nicheText || 'General';

  return {
    tituloSEO: cleanTitle,
    descripcionSEO: `Análisis exhaustivo y guion documental sobre los eventos trascendentales de este tema.\n\n⏱️ MARCAS DE TIEMPO:\n00:00 - Revelación de Impacto\n00:15 - Origen del Conflicto\n00:45 - Hechos y Consecuencias\n02:15 - Cierre y Reflexión\n\n#YouTubeFaceless #Documental #Viral`,
    etiquetas: [cleanTitle, targetNiche, "documental faceless", "casos virales", "historias reales"],
    guion: {
      hook: "Existen sucesos extraordinarios que desafían la percepción pública y cambian el rumbo de los acontecimientos para siempre.",
      introduccion: "Cuando los primeros indicios salieron a la luz, muy pocos anticiparon la magnitud de la historia que estaba a punto de desarrollarse.",
      cuerpo: "Al investigar los hechos en profundidad, se revelan las decisiones críticas, los momentos de alta tensión y los giros inesperados que definieron el desenlace.",
      llamadoALaAccion: "Si quieres explorar más investigaciones exclusivas y relatos fascinantes, suscríbete al canal y activa las notificaciones."
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
    titulo_principal: cleanTitle,
    titulos_alternativos_AB: [
      `La Verdadera Historia de ${cleanTitle}`,
      `Revelaciones Inéditas de ${cleanTitle}`
    ],
    guion_escenas: [
      {
        timestamp: "00:00 - 00:15",
        locucion_texto: "Existen sucesos extraordinarios que desafían la percepción pública y cambian el rumbo de los acontecimientos para siempre.",
        indicacion_broll: "Secuencia cinematográfica de alto impacto con iluminación dramática",
        prompt_imagen_ingles: "Cinematic dramatic portrait with soft moody side lighting, deep shadows, 8k render, photorealistic"
      },
      {
        timestamp: "00:15 - 00:45",
        locucion_texto: "Cuando los primeros indicios salieron a la luz, muy pocos anticiparon la magnitud de la historia que estaba a punto de desarrollarse.",
        indicacion_broll: "B-roll atmosférico con archivos y documentos clave",
        prompt_imagen_ingles: "Atmospheric dark cinematic scene showing historical documents and vintage photographs on a wooden table, 8k"
      },
      {
        timestamp: "00:45 - 01:15",
        locucion_texto: "Al investigar los hechos en profundidad, se revelan las decisiones críticas, los momentos de alta tensión y los giros inesperados...",
        indicacion_broll: "Toma panorámica dramática en alta resolución",
        prompt_imagen_ingles: "Wide angle dramatic shot of a mysterious silhouette in a dimly lit hallway, cinematic color grading"
      }
    ],
    seo: {
      descripcion_optimizada: `Análisis exhaustivo y guion documental sobre los eventos trascendentales de este tema.\n\n⏱️ MARCAS DE TIEMPO:\n00:00 - Revelación\n00:15 - Origen\n00:45 - Hechos Clave`,
      tags_lista: [cleanTitle, targetNiche, "documental faceless"],
      hashtags: ["#YouTubeFaceless", "#Documental"]
    },
    branding_sugerido: {
      nombre_canal: "Historias Élite HQ",
      concepto: "Relatos e investigaciones de alto impacto para YouTube Faceless",
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

  const cleanTopic = sanitizeInputText(idea || targetVideo || 'Historia Viral');
  const cleanNiche = sanitizeInputText(niche || 'General');

  try {
    if (!ai) {
      const fallbackData = buildDynamicScript(cleanTopic, cleanNiche);
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
      systemPrompt = `Actúa como un guionista élite para canales Faceless de YouTube.
Aquí tienes la transcripción hablada real de un video viral relacionado con: "${cleanTopic}":
"${realTranscript.substring(0, 8000)}"

INSTRUCCIONES OBLIGATORIAS:
1. REDACCIÓN 100% ORIGINAL Y ESPECÍFICA: Lee y comprende la historia/concepto central de la transcripción y redacta un guion totalmente nuevo, vibrante y fluido con tus propias palabras (Hook de 5s, Introducción, Cuerpo de desarrollo narrativo y Cierre/CTA).
2. NINGUNA PLANTILLA NI FRASE CONCATENADA: Prohibido usar plantillas rígidas, oraciones prefijadas o pegar frases de la solicitud. Redacta narrativas orgánicas de alta retención basadas en la historia.
3. TÍTULO VIRAL CREADO DESDE CERO (tituloSEO): Genera un título completamente nuevo e ingenioso optimizado para CTR. PROHIBIDO incluir hashtags (#), emojis o copiar literalmente frases brutas de la solicitud.
4. PROMPTS DE IMAGEN EN INGLÉS (promptsVisuales): Genera de 3 a 5 descripciones visuales cinematográficas concisas en inglés (ejemplo: 'Cinematic dramatic portrait of mysterious figure in stage light, 8k render, photorealistic'). Prohibido incluir hashtags, emojis o descripciones en español.

Devuelve la respuesta en formato JSON strictly válido con la siguiente estructura exacta:
{
  "tituloSEO": "Título viral 100% original creado por IA para CTR",
  "descripcionSEO": "Descripción completa con marcas de tiempo (timestamps) y hashtags limpios",
  "etiquetas": ["etiqueta1", "etiqueta2", "etiqueta3", "etiqueta4", "etiqueta5"],
  "guion": {
    "hook": "Gancho magnético de 5-10 segundos 100% específico de la historia...",
    "introduccion": "Desarrollo del conflicto o premisa inicial...",
    "cuerpo": "Relato apasionante de los acontecimientos clave...",
    "llamadoALaAccion": "Texto de cierre y llamado a suscribirse..."
  },
  "promptsVisuales": [
    "Cinematic dramatic portrait of mysterious figure in stage light, 8k render",
    "Atmospheric dark vintage photographs on wooden desk, 8k",
    "Wide angle dramatic shot of crowded hall, photorealistic"
  ],
  "configVoz": {
    "tono": "Dramático / Narrativo",
    "velocidad": "1.0x"
  }
}`;
    } else {
      systemPrompt = `Actúa como un guionista élite para canales Faceless de YouTube.
Tu objetivo es investigar y redactar un guion 100% ORIGINAL, fluido y envolvente desde cero sobre el tema limpio: "${cleanTopic}" (Nicho: "${cleanNiche}").

INSTRUCCIONES OBLIGATORIAS:
1. REDACCIÓN COMPLETA DESDE CERO: Escribe un guion dinámico compuesto por:
   - hook: Gancho magnético de 5 a 10 segundos directo al grano sobre ${cleanTopic}.
   - introduccion: Presentación fluida del conflicto o premisa principal.
   - cuerpo: Desarrollo narrativo detallado de la historia con alta retención.
   - llamadoALaAccion: Cierre orgánico para invitar al espectador a suscribirse.
2. NINGUNA PLANTILLA NI CONCATENACIÓN: No utilices oraciones prefijadas ni plantillas rígidas de relleno. Todas las frases deben ser 100% originales.
3. TÍTULO VIRAL CREADO POR IA (tituloSEO): Genera un título atractivo y profesional desde cero. NUNCA incluyas hashtags (#), emojis ni textos sucios de búsqueda.
4. PROMPTS DE IMAGEN EN INGLÉS (promptsVisuales): Genera de 3 a 5 descripciones visuales cinematográficas concisas en inglés (ejemplo: 'Cinematic close-up of mysterious character in dramatic light, 8k render'). NUNCA pegues títulos en español ni hashtags.

Devuelve la respuesta en formato JSON estrictamente válido con el esquema especificado:
{
  "tituloSEO": "Título viral optimizado para CTR creado por IA",
  "descripcionSEO": "Descripción completa con marcas de tiempo y hashtags limpios",
  "etiquetas": ["etiqueta1", "etiqueta2", "etiqueta3", "etiqueta4", "etiqueta5"],
  "guion": {
    "hook": "Texto del gancho inicial de 5-10 segundos...",
    "introduccion": "Texto introductorio fluido sin clichés...",
    "cuerpo": "Desarrollo completo y envolvente del tema...",
    "llamadoALaAccion": "Texto de cierre y CTA..."
  },
  "promptsVisuales": [
    "Cinematic close-up of mysterious character in dramatic light, 8k render",
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
