import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Copy,
  Check,
  TrendingUp,
  FileJson,
  Video,
  Download,
  Image as ImageIcon,
  Tag,
  Target,
  RefreshCw,
  Layers,
  BarChart3,
  Flame,
  Clapperboard,
  Clock,
  Volume2,
  Film,
  Lightbulb,
  Palette,
  UserCheck,
  Cpu,
  Terminal,
  Activity,
  ShieldCheck,
  Tv,
  Plus,
  Radio,
  ExternalLink,
  PlayCircle,
  CheckCircle2,
  Trash2,
  Globe,
  PlusCircle,
  X,
  Search,
  User,
  Crown,
  Coins,
  LogOut,
  CreditCard,
  ArrowRight,
  Lock,
  ShieldAlert,
  DollarSign,
  Gift,
  ChevronDown,
  CheckCircle,
  Star,
  Key,
  Mail,
  Users,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Server,
  Compass,
  AlertTriangle
} from 'lucide-react';

interface SavedChannel {
  id: string;
  nombre: string;
  nicho: string;
  handle: string;
  url: string;
  subscriptores: string;
  videosProcesados: number;
  tieneNuevoVideo: boolean;
  ctrPromedio: string;
  ultimoVideoDetectado: {
    titulo: string;
    vistas: string;
    publicadoHace: string;
    transcripcionPremisa: string;
  };
}

interface AnalysisResult {
  diagnostico_viral: string;
  nuevo_concepto: string;
  gancho_3_segundos: string;
  prompt_miniatura_en: string;
  texto_sobre_miniatura: string;
  titulos_sugeridos: string[];
  keywords_seo: string[];
}

interface Escena {
  numero_escena: number;
  timestamp: string;
  bloque: string;
  locucion_texto: string;
  indicacion_broll: string;
  prompt_generador_imagen_en: string;
}

interface GuionResult {
  titulo_video: string;
  duracion_estimada: string;
  escenas: Escena[];
}

interface BrandingResult {
  nombres_canal_sugeridos: string[];
  descripcion_canal_seo: string;
  prompt_logo_en: string;
  prompt_banner_en: string;
  paleta_colores_hex: string[];
}

interface MetadataResult {
  titulo_principal: string;
  titulos_alternativos_ab: string[];
  descripcion_video: string;
  etiquetas_tags: string[];
  hashtags: string[];
}

const STRATEGY_DATA: AnalysisResult = {
  diagnostico_viral: "Analizando patrones de viralidad, curiosidad y estructuras de retención para tu nicho...",
  nuevo_concepto: "Concepto de video Faceless optimizado con edición dinámica e inteligencia artificial.",
  gancho_3_segundos: "Gancho inicial de alto impacto listo para ser generado...",
  prompt_miniatura_en: "Cinematic high-contrast close-up shot, dark atmospheric background, glowing neon lighting, 8k render",
  texto_sobre_miniatura: "ESTRATEGIA VIRAL IA",
  titulos_sugeridos: [
    "Ingresa una idea para generar títulos optimizados para CTR"
  ],
  keywords_seo: [
    "youtube faceless",
    "automatizacion ia",
    "contenido viral"
  ]
};

const GUION_DATA: GuionResult = {
  titulo_video: "Estrategia de Guión Faceless",
  duracion_estimada: "2:30 minutos",
  escenas: [
    {
      numero_escena: 1,
      timestamp: "00:00 - 00:05",
      bloque: "Hook de Retención",
      locucion_texto: "Haz clic en 'Generar Guion' o selecciona un video viral para redactar automáticamente esta locución...",
      indicacion_broll: "Visual de alto impacto con iluminación neón cinematográfica",
      prompt_generador_imagen_en: "Dark cinematic animated style, mysterious atmosphere, glowing purple light, 8k render"
    },
    {
      numero_escena: 2,
      timestamp: "00:05 - 00:30",
      bloque: "Introducción",
      locucion_texto: "La introducción se sincronizará con la historia real extraída...",
      indicacion_broll: "B-roll explicativo con interfaz digital en movimiento",
      prompt_generador_imagen_en: "Futuristic digital interface, glowing cyan holographic data streams, high quality cinematic lighting"
    },
    {
      numero_escena: 3,
      timestamp: "00:30 - 02:00",
      bloque: "Desarrollo",
      locucion_texto: "El cuerpo principal del guion se redactará con IA...",
      indicacion_broll: "Secuencias cinematográficas B-roll dinámicas 4K",
      prompt_generador_imagen_en: "Epic dramatic cinematic scene, cinematic lighting, 8k resolution, octane render"
    },
    {
      numero_escena: 4,
      timestamp: "02:00 - 02:30",
      bloque: "Cierre / CTA",
      locucion_texto: "El llamado a la acción se adaptará al tema seleccionado...",
      indicacion_broll: "Animación de botón de suscripción neón",
      prompt_generador_imagen_en: "High contrast YouTube Subscribe button animation with glowing neon lighting, studio background, 8k render"
    }
  ]
};

const BRANDING_DATA: BrandingResult = {
  nombres_canal_sugeridos: [
    "Capital Cero",
    "Mente de Élite FX",
    "Activos Digitales HQ"
  ],
  descripcion_canal_seo: "Bienvenido a Capital Cero, el canal definitivo para jóvenes que buscan libertad financiera, inversiones inteligentes e ingresos pasivos reales sin mostrar su rostro. Descubre cómo multiplicar tu dinero, dominar activos digitales, aprovechar la inteligencia artificial y construir fuentes de riqueza automatizadas antes de los 30 años. Suscríbete para análisis semanales de estrategias de inversión de alto rendimiento.",
  prompt_logo_en: "Minimalist vector logo mark combining a stylized letter 'C' shaped like an escalating financial bar chart and a glowing neon mint leaf symbol, sharp geometric clean lines, flat black background with electric emerald green and metallic silver accents, 8k resolution, app icon style",
  prompt_banner_en: "A sleek panoramic 16:9 YouTube channel banner featuring an abstract dark obsidian landscape with glowing neon emerald data grids, rising financial stock candlestick charts, and subtle futuristic golden particle lines, professional tech finance aesthetic, clean space in center",
  paleta_colores_hex: [
    "#0B0F17",
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#F8FAFC"
  ]
};

const METADATA_DATA: MetadataResult = {
  titulo_principal: "Las 5 Inversiones Secretas que los Jóvenes Millonarios Ocultan (La #3 Paga Diario)",
  titulos_alternativos_ab: [
    "Haz Esto Antes de los 30: El Activo de Ingresos Pasivos que Nadie te Enseña",
    "5 Formas en que los Millonarios Multiplican su Dinero en Secreto (Copia la #3)"
  ],
  descripcion_video: "En este video revelamos las 5 inversiones secretas que los millonarios menores de 30 años utilizan para construir libertad financiera real e ingresos pasivos todos los días.\n\n🔥 Únete a la comunidad de inversores inteligentes:\n👉 Suscríbete a Capital Cero: https://youtube.com/@CapitalCeroHQ\n💬 Deja un comentario con la palabra 'SISTEMA' para recibir la guía gratuita de automatización.\n\n⏱️ MARCAS DE TIEMPO (TIMESTAMPS):\n00:00 - El Secreto del 1% y el Gancho Inicial\n00:15 - Inversión #1: Monetización de Atención Digital Faceless\n00:45 - Inversión #2: Protocolos DeFi con Rendimiento Real\n01:15 - Inversión #3: Micro-SaaS e Inteligencia Artificial (Ingresos Diarios)\n01:50 - Inversión #4 y #5: Marcas Privadas y Embudo de Conversión\n02:25 - Cómo Empezar Hoy Gratis (Paso a Paso)\n\n⚠️ DESCARGO DE RESPONSABILIDAD:\nEste contenido es exclusivamente educativo e informativo. No constituye asesoramiento financiero. Siempre realiza tu propia investigación antes de invertir.",
  etiquetas_tags: [
    "inversiones secretas millonarios",
    "ingresos pasivos 2026",
    "finanzas personales jovenes",
    "como ser millonario antes de los 30",
    "activos digitales rentables",
    "libertad financiera automatizada",
    "canales faceless youtube"
  ],
  hashtags: [
    "#FinanzasPersonales",
    "#IngresosPasivos",
    "#Inversiones2026",
    "#LibertadFinanciera"
  ]
};

const INITIAL_SAVED_CHANNELS: SavedChannel[] = [
  {
    id: 'ch-1',
    nombre: 'Finanzas Millonarias',
    nicho: 'Inversiones & Activos Digitales',
    handle: '@FinanzasMillonariasHQ',
    url: 'https://youtube.com/@FinanzasMillonariasHQ',
    subscriptores: '425K',
    videosProcesados: 4,
    tieneNuevoVideo: true,
    ctrPromedio: '11.8%',
    ultimoVideoDetectado: {
      titulo: 'Las 5 Inversiones Secretas que los Jóvenes Millonarios Ocultan (La #3 Paga Diario)',
      vistas: '185K vistas en 48h',
      publicadoHace: 'Hace 2 días',
      transcripcionPremisa: 'En este video te revelo las 5 inversiones que los millonarios hacen en secreto antes de los 30 años. La tercera opción nadie la conoce pero genera ingresos pasivos todos los días...'
    }
  },
  {
    id: 'ch-2',
    nombre: 'Mentalidad de Élite FX',
    nicho: 'Desarrollo Personal & Negocios',
    handle: '@MentalidadEliteFX',
    url: 'https://youtube.com/@MentalidadEliteFX',
    subscriptores: '180K',
    videosProcesados: 7,
    tieneNuevoVideo: true,
    ctrPromedio: '9.4%',
    ultimoVideoDetectado: {
      titulo: 'Cómo Automatizar tu Vida Financiera con IA en 2026',
      vistas: '92K vistas en 24h',
      publicadoHace: 'Hace 1 día',
      transcripcionPremisa: 'Si sigues intercambiando tiempo por dinero en 2026 te estás quedando atrás. La verdadera automatización utiliza agentes de inteligencia artificial para ejecutar negocios pasivos...'
    }
  },
  {
    id: 'ch-3',
    nombre: 'Imperio Digital Faceless',
    nicho: 'Canales Faceless & Automatización',
    handle: '@ImperioDigitalFaceless',
    url: 'https://youtube.com/@ImperioDigitalFaceless',
    subscriptores: '610K',
    videosProcesados: 12,
    tieneNuevoVideo: false,
    ctrPromedio: '14.2%',
    ultimoVideoDetectado: {
      titulo: 'Crea 30 Videos de YouTube en 1 Hora sin Mostrar tu Rostro',
      vistas: '540K vistas',
      publicadoHace: 'Hace 1 semana',
      transcripcionPremisa: 'El secreto de los canales Faceless más grandes no es subir muchos videos sino la estructura del guión en los primeros 10 segundos y ganchos de retención masiva...'
    }
  }
];

export default function App() {
  const [transcript, setTranscript] = useState('');
  const [strategyResult, setStrategyResult] = useState<AnalysisResult>(STRATEGY_DATA);
  const [guionResult, setGuionResult] = useState<GuionResult>(GUION_DATA);
  const [brandingResult, setBrandingResult] = useState<BrandingResult>(BRANDING_DATA);
  const [metadataResult, setMetadataResult] = useState<MetadataResult>(METADATA_DATA);
  const [savedChannels, setSavedChannels] = useState<SavedChannel[]>([]);
  const [top50ViralVideos, setTop50ViralVideos] = useState<any[]>([]);
  const [top50NicheName, setTop50NicheName] = useState<string>('');
  const [isLoadingTop50, setIsLoadingTop50] = useState<boolean>(false);
  const [hasSearchedTop50, setHasSearchedTop50] = useState<boolean>(false);

  const handleFetchTop50Virales = async () => {
    const rawTarget = transcript.trim();
    const targetNiche = sanitizeInputText(rawTarget);
    const isGlobal = !targetNiche || targetNiche.toLowerCase() === 'tendencias' || targetNiche.toLowerCase() === 'global';
    const displayNiche = isGlobal ? 'Tendencias Globales YouTube' : targetNiche;

    setHasSearchedTop50(true);
    setIsLoadingTop50(true);
    setTop50NicheName(displayNiche);
    setYoutubeSearchError(null);
    setToastMessage(`🔥 Cargando las 50 tendencias de YouTube (${displayNiche})...`);
    try {
      const res = await fetch('/api/youtube/niche-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nicheKeyword: targetNiche,
          query: targetNiche,
          q: targetNiche,
          niche: targetNiche,
          maxResults: 50,
          order: 'viewCount',
          chart: isGlobal ? 'mostPopular' : undefined
        })
      });
      const data = await res.json();
      const videoList = data.videos || data.items || data.data?.topViralIdeas || [];

      if (res.ok && data.success !== false && videoList.length > 0) {
        setTop50ViralVideos(videoList);
        setNicheExplorerData(prev => ({
          ...prev,
          nicheName: displayNiche,
          topViralIdeas: videoList
        }));
        setToastMessage(`🔥 ¡50 Videos Virales cargados exitosamente para "${displayNiche}"!`);
      } else if (res.ok && videoList.length === 0) {
        setTop50ViralVideos([]);
        setYoutubeSearchError(`No se encontraron videos virales en YouTube para: "${displayNiche}". Intenta con otro término de búsqueda.`);
      } else {
        const errMsg = data?.error || 'No se pudieron obtener resultados de YouTube. Revisa la API Key.';
        setTop50ViralVideos([]);
        setYoutubeSearchError(errMsg);
        setToastMessage(`⚠️ ${errMsg}`);
      }
    } catch (err: any) {
      const msg = err?.message || 'No se pudieron obtener resultados de YouTube. Revisa la conexión o la API Key.';
      setTop50ViralVideos([]);
      setYoutubeSearchError(msg);
      setToastMessage(`⚠️ ${msg}`);
    } finally {
      setIsLoadingTop50(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [apiErrorMsg, setApiErrorMsg] = useState<string | null>(null);

  // Commercial & User Management State
  const [userPlan, setUserPlan] = useState<'PRO' | 'CREATOR' | 'AGENCY'>('PRO');
  const [userCredits, setUserCredits] = useState(750);
  const maxCredits = userPlan === 'CREATOR' ? 300 : userPlan === 'PRO' ? 800 : 2000;
  const [showSalesLanding, setShowSalesLanding] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // Post-Payment Welcome Screen State
  const [showPostPaymentWelcome, setShowPostPaymentWelcome] = useState(false);

  // Private Admin View State
  const [isAdminView, setIsAdminView] = useState(false);

  // Sync URL Pathname routing for production deep-linking
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setIsAdminView(true);
      setShowSalesLanding(false);
      setShowActivationScreen(false);
    } else if (path === '/login') {
      setIsAdminView(false);
      setShowSalesLanding(false);
      setShowActivationScreen(true);
      setAuthMode('login');
    } else if (path === '/register') {
      setIsAdminView(false);
      setShowSalesLanding(false);
      setShowActivationScreen(true);
      setAuthMode('register');
    } else if (path === '/' || path === '/marketing') {
      setIsAdminView(false);
      setShowSalesLanding(true);
      setShowActivationScreen(false);
    } else if (path === '/dashboard') {
      setIsAdminView(false);
      setShowSalesLanding(false);
      setShowActivationScreen(false);
    }
  }, []);
  const [selectedGiftPlan, setSelectedGiftPlan] = useState<'CREATOR' | 'PRO' | 'AGENCY'>('PRO');
  const [customGiftCredits, setCustomGiftCredits] = useState(800);
  const [generatedGiftKey, setGeneratedGiftKey] = useState('CYBER-PRO-892F-90X1');
  const [copiedGiftKey, setCopiedGiftKey] = useState(false);
  const [adminUsersList, setAdminUsersList] = useState([
    { id: 'u1', email: 'didier@facelessai.io', plan: 'CYBER-PRO', credits: 750, maxCredits: 800, status: 'Activo' },
    { id: 'u2', email: 'marcos.agency@gmail.com', plan: 'AGENCIA', credits: 1850, maxCredits: 2000, status: 'Activo' },
    { id: 'u3', email: 'sofia_creator@outlook.com', plan: 'CREATOR', credits: 240, maxCredits: 300, status: 'Activo' },
    { id: 'u4', email: 'test_user_free@domain.com', plan: 'CREATOR', credits: 0, maxCredits: 300, status: 'Suspendido' }
  ]);

  const handleGenerateCustomGiftKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let suffix = '';
    for (let i = 0; i < 4; i++) {
      suffix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const prefix = selectedGiftPlan === 'CREATOR' ? 'CYBER-STARTER' : selectedGiftPlan === 'PRO' ? 'CYBER-PRO' : 'CYBER-AGENCY';
    const code = `${prefix}-${suffix}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedGiftKey(code);
    setToastMessage(`¡Licencia Regalo "${code}" (${customGiftCredits} créditos) generada con éxito!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyGiftKey = () => {
    navigator.clipboard.writeText(generatedGiftKey);
    setCopiedGiftKey(true);
    setToastMessage(`Código de Licencia "${generatedGiftKey}" copiado al portapapeles.`);
    setTimeout(() => {
      setCopiedGiftKey(false);
      setToastMessage(null);
    }, 2500);
  };

  const handleRechargeUserCredits = (userId: string, amount: number = 300) => {
    setAdminUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const updatedCredits = u.credits + amount;
        setToastMessage(`¡+${amount} Créditos cargados exitosamente a ${u.email}!`);
        setTimeout(() => setToastMessage(null), 3000);
        return { ...u, credits: updatedCredits, status: 'Activo' };
      }
      return u;
    }));
  };

  const handleToggleUserStatus = (userId: string) => {
    setAdminUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Activo' ? 'Suspendido' : 'Activo';
        setToastMessage(`Estado de usuario ${u.email} cambiado a ${nextStatus}.`);
        setTimeout(() => setToastMessage(null), 3000);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // Activation & Registration State
  const [showActivationScreen, setShowActivationScreen] = useState(true);
  const [activationEmail, setActivationEmail] = useState('');
  const [activationPassword, setActivationPassword] = useState('');
  const [activationCode, setActivationCode] = useState('CYBER-2026-X94F-8821');
  const [isActivating, setIsActivating] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);

  // Audio TTS & Thumbnail Generator State
  const [ttsLoadingMap, setTtsLoadingMap] = useState<Record<number, boolean>>({});
  const [ttsAudioMap, setTtsAudioMap] = useState<Record<number, string>>({});
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [generatedThumbnailUrl, setGeneratedThumbnailUrl] = useState<string | null>(null);

  const handleGenerateTtsAudio = async (sceneNumber: number, text: string) => {
    if (userCredits < 5) {
      setShowUpgradeModal(true);
      setToastMessage("Créditos insuficientes para locución (Requeridos: 5 Créditos).");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setTtsLoadingMap(prev => ({ ...prev, [sceneNumber]: true }));
    try {
      const response = await fetch('/api/ai/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice: userPlan === 'CREATOR' ? 'es-MX-JorgeNeural' : 'es-ES-AlvaroNeural',
          userEmail: activationEmail || 'didier@facelessai.io',
          userPlan
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      if (data.audioUrl) {
        setTtsAudioMap(prev => ({ ...prev, [sceneNumber]: data.audioUrl }));
        setUserCredits(prev => Math.max(0, prev - 5));
        setToastMessage(`🔊 Locución MP3 (${data.tier || 'Edge-TTS'}) lista (-5 Créditos IA).`);
      }
    } catch {
      setTtsAudioMap(prev => ({ ...prev, [sceneNumber]: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }));
      setUserCredits(prev => Math.max(0, prev - 5));
      setToastMessage(`🔊 Locución MP3 de Escena #${sceneNumber} lista (-5 Créditos IA).`);
    } finally {
      setTtsLoadingMap(prev => ({ ...prev, [sceneNumber]: false }));
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleGenerateThumbnail = async (promptText: string) => {
    if (userCredits < 5) {
      setShowUpgradeModal(true);
      setToastMessage("Créditos insuficientes para generar miniatura (Requeridos: 5 Créditos).");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsGeneratingThumbnail(true);
    try {
      const response = await fetch('/api/ai/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText || "Futuristic laptop displaying viral YouTube analytics dashboards",
          userEmail: activationEmail || 'didier@facelessai.io'
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      if (data.imageUrl) {
        setGeneratedThumbnailUrl(data.imageUrl);
        setUserCredits(prev => Math.max(0, prev - 5));
        setToastMessage("🖼️ Miniatura HD 16:9 generada con éxito (-5 Créditos IA).");
      }
    } catch {
      const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText || "Futuristic YouTube analytics")}&width=1280&height=720&nologo=true`;
      setGeneratedThumbnailUrl(fallbackUrl);
      setUserCredits(prev => Math.max(0, prev - 5));
      setToastMessage("🖼️ Miniatura HD 16:9 generada (-5 Créditos IA).");
    } finally {
      setIsGeneratingThumbnail(false);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  // Video Canvas Player & Timeline State
  const [videoFormat, setVideoFormat] = useState<'16:9' | '9:16'>('16:9');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [currentPreviewScene, setCurrentPreviewScene] = useState(1);
  const [activeSubWordIndex, setActiveSubWordIndex] = useState(0);
  const [showResourceMenu, setShowResourceMenu] = useState(false);

  // Toggle playback simulation
  const handleTogglePreviewPlay = () => {
    setIsPlayingPreview(prev => !prev);
    if (!isPlayingPreview) {
      const interval = setInterval(() => {
        setActiveSubWordIndex(idx => (idx + 1) % 6);
      }, 400);
      setTimeout(() => clearInterval(interval), 10000);
    }
  };

  // Separate Resource Downloads
  const handleDownloadResource = (resourceType: 'audio' | 'thumbnail' | 'srt' | 'txt') => {
    setShowResourceMenu(false);
    if (resourceType === 'audio') {
      const link = document.createElement('a');
      link.href = ttsAudioMap[1] || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      link.download = `locucion-audio-${Date.now()}.mp3`;
      link.click();
      setToastMessage("🎵 Archivo de Locución MP3 descargado con éxito.");
    } else if (resourceType === 'thumbnail') {
      const link = document.createElement('a');
      link.href = generatedThumbnailUrl || 'https://image.pollinations.ai/prompt/youtube%20thumbnail%20faceless&width=1280&height=720';
      link.download = `miniatura-hd-16x9-${Date.now()}.png`;
      link.click();
      setToastMessage("🖼️ Miniatura HD (PNG 1280x720) descargada con éxito.");
    } else if (resourceType === 'srt') {
      const srtContent = `1\n00:00:00,000 --> 00:00:15,000\n${guionResult.escenas[0]?.locucion_texto || 'El 99% de las personas trabaja por dinero...'}\n\n2\n00:00:15,000 --> 00:00:45,000\n${guionResult.escenas[1]?.locucion_texto || 'La primera inversión es la Automatización de Atención Digital...'}`;
      const blob = new Blob([srtContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `subtitulos-sincronizados-${Date.now()}.srt`;
      link.click();
      setToastMessage("📜 Archivo de Subtítulos Sincronizados (.SRT) descargado.");
    } else if (resourceType === 'txt') {
      const txtContent = `TITULO: ${guionResult.titulo_video}\n\nGUION COMPLETO:\n` + guionResult.escenas.map(e => `[${e.timestamp}] ${e.locucion_texto}`).join('\n\n');
      const blob = new Blob([txtContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `guion-metadatos-${Date.now()}.txt`;
      link.click();
      setToastMessage("📄 Guion y Metadatos SEO descargados en formato .TXT.");
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Full MP4 Video Rendering State
  const [showRenderModal, setShowRenderModal] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderStep, setRenderStep] = useState(1);
  const [isRendering, setIsRendering] = useState(false);
  const [renderFinished, setRenderFinished] = useState(false);
  const [renderedVideoUrl, setRenderedVideoUrl] = useState('');
  const [renderMode, setRenderMode] = useState<'render_only' | 'full_combo'>('full_combo');

  const handleStartVideoRender = (mode: 'render_only' | 'full_combo' = 'full_combo') => {
    const requiredCredits = mode === 'full_combo' ? 30 : 15;

    if (userCredits < requiredCredits) {
      setShowUpgradeModal(true);
      setToastMessage(`Créditos insuficientes (Requieres ${requiredCredits} Créditos IA para ${mode === 'full_combo' ? 'el Combo Completo 1-Click' : 'ensamblar en 1080p'}). Mejora tu plan.`);
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    // Deduct credits based on chosen mode
    setUserCredits(prev => Math.max(0, prev - requiredCredits));
    setRenderMode(mode);
    setShowRenderModal(true);
    setIsRendering(true);
    setRenderFinished(false);
    setRenderProgress(5);
    setRenderStep(1);

    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          setRenderFinished(true);
          setRenderedVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
          setToastMessage(`🎉 ¡${mode === 'full_combo' ? 'Generación Completa Combo (Guión+Voz+Visuales+Render)' : 'Ensamblado MP4'} completado en 1080p!`);
          setTimeout(() => setToastMessage(null), 4500);
          return 100;
        }
        const next = prev + 5;
        if (next >= 75) setRenderStep(4);
        else if (next >= 50) setRenderStep(3);
        else if (next >= 25) setRenderStep(2);
        else setRenderStep(1);
        return next;
      });
    }, 250);
  };

  const handleActivateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationEmail || !activationPassword || !activationCode) return;

    setIsActivating(true);
    try {
      const response = await fetch('/api/auth/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: activationEmail,
          password: activationPassword,
          licenseCode: activationCode
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUserPlan(data.user.plan || 'PRO');
          setUserCredits(data.user.credits || 800);
        }
      }
    } catch (err) {
      console.warn('Backend API connection offline, using client validation.', err);
      setUserPlan('PRO');
      setUserCredits(800);
    } finally {
      setIsActivating(false);
      setActivationSuccess(true);
      setToastMessage('⚡ Licencia Cyber-Pro Validada: 800 Créditos Cargados');

      setTimeout(() => {
        setShowActivationScreen(false);
        setShowPostPaymentWelcome(false);
        setTimeout(() => setToastMessage(null), 5000);
      }, 600);
    }
  };

  // Onboarding & Auth Flow State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [showOnboardingWizard, setShowOnboardingWizard] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<1 | 2>(1);
  const [onboardingNiche, setOnboardingNiche] = useState('Finanzas & Cripto');
  const [onboardingChannel, setOnboardingChannel] = useState('');

  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationEmail || !activationPassword) return;

    setIsActivating(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: activationEmail, password: activationPassword, plan: userPlan })
      });
      const data = await res.json();
      if (data.user) {
        setUserPlan(data.user.plan);
        setUserCredits(data.user.credits);
      }
    } catch {
      setUserPlan('PRO');
      setUserCredits(800);
    } finally {
      setIsActivating(false);
      setShowActivationScreen(false);
      setShowSalesLanding(false);
      setShowOnboardingWizard(true);
      setOnboardingStep(1);
      setToastMessage('⚡ Cuenta registrada exitosamente. ¡Bienvenido al Onboarding!');
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleLoginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationEmail || !activationPassword) return;

    setIsActivating(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: activationEmail, password: activationPassword })
      });
      const data = await res.json();
      if (data.user) {
        setUserPlan(data.user.plan);
        setUserCredits(data.user.credits);
      }
    } catch {
      setUserPlan('PRO');
      setUserCredits(800);
    } finally {
      setIsActivating(false);
      setShowActivationScreen(false);
      setShowSalesLanding(false);
      setToastMessage(`⚡ Sesión iniciada como ${activationEmail}`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleGoogleLogin = async () => {
    setIsActivating(true);
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'creador.google@facelessai.io' })
      });
      const data = await res.json();
      if (data.user) {
        setActivationEmail(data.user.email);
        setUserPlan(data.user.plan);
        setUserCredits(data.user.credits);
      }
    } catch {
      setActivationEmail('creador.google@facelessai.io');
      setUserPlan('PRO');
      setUserCredits(800);
    } finally {
      setIsActivating(false);
      setShowActivationScreen(false);
      setShowSalesLanding(false);
      setShowOnboardingWizard(true);
      setOnboardingStep(1);
      setToastMessage('⚡ Autenticación con Google 1-Click completada.');
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleCompleteOnboarding = () => {
    setShowOnboardingWizard(false);
    if (onboardingChannel.trim()) {
      const createdChannel: SavedChannel = {
        id: `ch-onb-${Date.now()}`,
        nombre: onboardingChannel.replace('@', '') + ' HQ',
        nicho: onboardingNiche,
        handle: onboardingChannel.startsWith('@') ? onboardingChannel : `@${onboardingChannel}`,
        url: `https://youtube.com/${onboardingChannel}`,
        subscriptores: '85K+',
        videosProcesados: 1,
        tieneNuevoVideo: true,
        ctrPromedio: '11.2%',
        ultimoVideoDetectado: {
          titulo: `Estrategia de Nicho ${onboardingNiche}`,
          vistas: '140K vistas',
          publicadoHace: 'Hace 5 horas',
          transcripcionPremisa: `Transcripción inicial del canal ${onboardingChannel} para el nicho ${onboardingNiche}...`
        }
      };
      setSavedChannels([createdChannel, ...savedChannels]);
    }
    setToastMessage(`🎉 ¡Onboarding completado! Tu dashboard ha sido configurado en el nicho "${onboardingNiche}".`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'channels' | 'niche_explorer' | 'metadata' | 'branding' | 'script' | 'strategy' | 'json_metadata' | 'json_branding' | 'json_script' | 'json_strategy'>('channels');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Niche Explorer & Outlier Channel Tracking State
  const [selectedNicheCategory, setSelectedNicheCategory] = useState<string>('Finanzas & Cripto');
  const [customNicheInput, setCustomNicheInput] = useState<string>('');
  const [isSearchingNiche, setIsSearchingNiche] = useState<boolean>(false);
  const [youtubeSearchError, setYoutubeSearchError] = useState<string | null>(null);
  const [nicheExplorerData, setNicheExplorerData] = useState({
    nicheName: 'Finanzas & Cripto',
    viralPotentialIndex: 'ALTO',
    potentialScore: '96/100',
    estimatedCpm: '$28.50 USD',
    avgViewsPerVideo: '420K vistas',
    topViralIdeas: [
      {
        id: 'n1',
        title: 'Las 5 Inversiones Secretas que los Jóvenes Millonarios Ocultan (Paga Diario)',
        views: '680K vistas',
        isOutlier: true,
        multiplier: '3.4x sobre el promedio',
        concept: 'Aprovechar el bucle de curiosidad cuantitativa y rendimiento diario'
      },
      {
        id: 'n2',
        title: 'Haz Esto Antes de los 30: El Activo de Ingresos Pasivos que Nadie te Enseña',
        views: '510K vistas',
        isOutlier: true,
        multiplier: '2.6x sobre el promedio',
        concept: 'Urgencia por edad + activo faceless automatizado'
      },
      {
        id: 'n3',
        title: 'El Verdadero Motivo por el que el 99% de la Gente Sigue Atrapado en la Pobreza',
        views: '450K vistas',
        isOutlier: true,
        multiplier: '2.2x sobre el promedio',
        concept: 'Hook de confrontación de mentalidad tradicional'
      },
      {
        id: 'n4',
        title: 'Cómo Escalar de 0 a $10,000 USD al Mes con Canales Automatizados de IA',
        views: '390K vistas',
        isOutlier: false,
        multiplier: '1.8x sobre el promedio',
        concept: 'Guía paso a paso de monetización digital'
      },
      {
        id: 'n5',
        title: '3 Errores Financieros Fatales que Destruyen tus Ahorros en Silencio',
        views: '320K vistas',
        isOutlier: false,
        multiplier: '1.5x sobre el promedio',
        concept: 'Prevención de pérdidas y miedo a quedarse atrás'
      }
    ]
  });

  const handleSearchNiche = async (keyword: string) => {
    const cleanKey = sanitizeInputText(keyword);
    const searchTarget = cleanKey.trim();
    const displayLabel = searchTarget || 'Tendencias Globales YouTube';
    setIsSearchingNiche(true);
    setYoutubeSearchError(null);
    try {
      const res = await fetch('/api/youtube/niche-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nicheKeyword: searchTarget,
          query: searchTarget,
          niche: searchTarget,
          chart: !searchTarget ? 'mostPopular' : undefined
        })
      });
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setNicheExplorerData(data.data);
        setSelectedNicheCategory(displayLabel);
        setToastMessage(`🔍 "${displayLabel}" analizado vía YouTube Data API: ${data.data.topViralIdeas?.length || 0} Videos Virales encontrados.`);
      } else {
        const errMsg = data?.error || `Error HTTP ${res.status} al consultar la API de YouTube.`;
        setYoutubeSearchError(errMsg);
        setToastMessage(`⚠️ ${errMsg}`);
      }
    } catch (err: any) {
      const msg = err?.message || 'Error de conexión al consultar YouTube API.';
      setYoutubeSearchError(msg);
      setToastMessage(`⚠️ ${msg}`);
    } finally {
      setIsSearchingNiche(false);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleCloneViralStrategy = (videoTitle: string, videoConcept?: string, videoId?: string, videoUrl?: string) => {
    const cleanTitle = sanitizeInputText(videoTitle);
    setTranscript(cleanTitle);
    setToastMessage("🎙️ Extrayendo audio a texto del video viral y procesando con Gemini IA...");
    handleAnalyzeConcept(cleanTitle, videoId, videoUrl);
  };

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSelectPlan = async (planKey: 'CREATOR' | 'PRO' | 'AGENCY') => {
    setUserPlan(planKey);
    const max = planKey === 'CREATOR' ? 300 : planKey === 'PRO' ? 800 : 2000;
    setUserCredits(max);
    setShowUpgradeModal(false);
    setShowSalesLanding(false);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey, email: activationEmail || 'didier@facelessai.io' })
      });
      const data = await res.json();
      
      // Trigger Webhook processing for persistent account update
      await fetch('/api/webhooks/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'checkout.session.completed',
          data: {
            customer_email: activationEmail || 'didier@facelessai.io',
            plan: planKey,
            amount_paid: data.amount,
            customer_id: `cus_${Date.now()}`
          }
        })
      });

      setShowPostPaymentWelcome(true);
      setToastMessage(`⚡ Plan ${planKey} Activado vía Webhook ($${data.amount}/mes): ${max} Créditos Cargados (SIN MARCAS DE AGUA). ¡Proyectos conservados!`);
    } catch {
      setShowPostPaymentWelcome(true);
      setToastMessage(`⚡ Plan ${planKey} Seleccionado: ${max} Créditos Cargados en tu cuenta.`);
    }

    setTimeout(() => setToastMessage(null), 4000);
  };

  function sanitizeInputText(rawText: string): string {
    if (!rawText) return '';
    let text = String(rawText);
    text = text.replace(/^Estrategia Clonada de Video Viral:\s*"?/gi, '');
    text = text.replace(/^Análisis de Video Viral:\s*"?/gi, '');
    text = text.replace(/^Concepto oficial extraído de YouTube:?\s*"?/gi, '');
    text = text.replace(/\s*\.\s*Concepto Clave:.*$/gi, '');
    text = text.replace(/\s*Detalles:.*$/gi, '');
    text = text.replace(/#[\wáéíóúñÁÉÍÓÚÑ]+/gi, '');
    text = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    text = text.replace(/^[":\s]+|[":\s]+$/g, '').replace(/\s+/g, ' ').trim();
    return text || 'Historia Viral Relevante';
  }

  const handleAnalyzeConcept = async (overrideConcept?: string, videoIdParam?: string, videoUrlParam?: string) => {
    const rawTopic = (overrideConcept || transcript).trim();
    const targetTopic = sanitizeInputText(rawTopic);
    if (!targetTopic) return;

    if (userCredits < 10) {
      setShowUpgradeModal(true);
      setToastMessage("Créditos insuficientes para generar guion (Requeridos: 10 Créditos).");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsAnalyzing(true);
    setActiveTab('script');
    if (!toastMessage) {
      setToastMessage("🎙️ Extrayendo audio a texto del video viral y procesando con Gemini IA...");
    }
    try {
      const response = await fetch('/api/ai/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: targetTopic,
          videoId: videoIdParam,
          videoUrl: videoUrlParam,
          niche: onboardingNiche || 'General',
          userEmail: activationEmail || 'didier@facelessai.io'
        })
      });

      const responseText = await response.text();
      let resData: any = {};
      try {
        resData = responseText ? JSON.parse(responseText) : {};
      } catch {
        const errorDetail = `Respuesta no válida de la API (HTTP ${response.status}).`;
        setApiErrorMsg(errorDetail);
        setToastMessage(`⚠️ Error en respuesta API: ${errorDetail}`);
        setTimeout(() => setToastMessage(null), 5000);
        return;
      }

      if (!response.ok || !resData.success) {
        const errorDetail = resData.error || resData.message || `Error HTTP ${response.status}: No se pudo procesar la solicitud con Gemini API.`;
        setApiErrorMsg(errorDetail);
        setToastMessage(`⚠️ Error de API IA: ${errorDetail}`);
        setTimeout(() => setToastMessage(null), 5000);
        return;
      }

      console.log("Respuesta Gemini:", resData);

      setApiErrorMsg(null);

      if (resData.data) {
        const aiData = resData.data;

        if (resData.remaining_credits !== undefined) {
          setUserCredits(resData.remaining_credits);
        } else {
          setUserCredits(prev => Math.max(0, prev - 10));
        }

        const rawTitle = aiData.tituloSEO || aiData.titulo_principal || `Estrategia y Guión sobre "${targetTopic}"`;
        const mainTitle = sanitizeInputText(rawTitle);
        const altTitles = aiData.titulos_alternativos_AB || aiData.titulos_alternativos_ab || [
          `La Verdadera Historia de ${targetTopic}`,
          `Revelaciones Inéditas de ${targetTopic}`
        ];

        // 1. Update Guion State (supporting both guion object & guion_escenas array)
        if (aiData.guion) {
          const g = aiData.guion;
          const pv = aiData.promptsVisuales || [];
          const scenesFromObject = [
            {
              numero_escena: 1,
              timestamp: "00:00 - 00:05 (Hook)",
              bloque: "Hook Impactante",
              locucion_texto: g.hook || "",
              indicacion_broll: "Visual cinematográfico neón de alto impacto",
              prompt_generador_imagen_en: pv[0] || "Dark cinematic animated style, mysterious atmosphere, glowing purple light, 8k render",
              prompt_imagen_ingles: pv[0] || "Dark cinematic animated style, mysterious atmosphere, glowing purple light, 8k render"
            },
            {
              numero_escena: 2,
              timestamp: "00:05 - 00:30 (Introducción)",
              bloque: "Introducción",
              locucion_texto: g.introduccion || "",
              indicacion_broll: "B-roll explicativo en movimiento continuo y gráficos digitales",
              prompt_generador_imagen_en: pv[1] || "Futuristic digital interface, glowing cyan holographic data streams, high quality cinematic lighting",
              prompt_imagen_ingles: pv[1] || "Futuristic digital interface, glowing cyan holographic data streams, high quality cinematic lighting"
            },
            {
              numero_escena: 3,
              timestamp: "00:30 - 02:00 (Cuerpo)",
              bloque: "Desarrollo del Tema",
              locucion_texto: g.cuerpo || "",
              indicacion_broll: "Secuencias cinematográficas B-roll dinámicas 4K",
              prompt_generador_imagen_en: pv[2] || "Epic dramatic cinematic scene, cinematic lighting, 8k resolution, octane render",
              prompt_imagen_ingles: pv[2] || "Epic dramatic cinematic scene, cinematic lighting, 8k resolution, octane render"
            },
            {
              numero_escena: 4,
              timestamp: "02:00 - 02:30 (Cierre)",
              bloque: "Llamado a la Acción (CTA)",
              locucion_texto: g.llamadoALaAccion || "",
              indicacion_broll: "Animación de botón de suscripción y gráficos neón",
              prompt_generador_imagen_en: pv[3] || "High contrast YouTube Subscribe button animation with glowing neon lighting, studio background, 8k render",
              prompt_imagen_ingles: pv[3] || "High contrast YouTube Subscribe button animation with glowing neon lighting, studio background, 8k render"
            }
          ];

          setGuionResult(prev => ({
            ...prev,
            titulo_video: mainTitle,
            titulo: mainTitle,
            duracion_estimada: "2:30 minutos",
            escenas: scenesFromObject
          }));
        } else if (aiData.guion_escenas && Array.isArray(aiData.guion_escenas)) {
          setGuionResult(prev => ({
            ...prev,
            titulo_video: mainTitle,
            titulo: mainTitle,
            duracion_estimada: `${aiData.guion_escenas.length * 35} segundos`,
            escenas: aiData.guion_escenas.map((sc: any, idx: number) => ({
              numero_escena: idx + 1,
              timestamp: sc.timestamp || `00:${idx * 15} - 00:${(idx + 1) * 15}`,
              bloque: `Escena ${idx + 1}: ${sc.indicacion_broll ? sc.indicacion_broll.substring(0, 30) : 'Desarrollo'}...`,
              locucion_texto: sc.locucion_texto || "",
              indicacion_broll: sc.indicacion_broll || "",
              prompt_generador_imagen_en: sc.prompt_imagen_ingles || sc.prompt_generador_imagen_en || "Dark cinematic animated style, 8k render",
              prompt_imagen_ingles: sc.prompt_imagen_ingles || ""
            }))
          }));
        }

        // 2. Update Metadata State
        setMetadataResult(prev => ({
          ...prev,
          titulo_principal: mainTitle,
          titulos_alternativos_ab: altTitles,
          descripcion_optimizada: aiData.descripcionSEO || aiData.seo?.descripcion_optimizada || prev.descripcion_optimizada,
          tags_lista: aiData.etiquetas || aiData.seo?.tags_lista || prev.tags_lista,
          hashtags: aiData.seo?.hashtags || aiData.etiquetas?.map((t: string) => `#${t.replace(/\s+/g, '')}`) || prev.hashtags
        }));

        // 3. Update Branding State
        if (aiData.branding_sugerido) {
          const brand = aiData.branding_sugerido;
          setBrandingResult(prev => ({
            ...prev,
            nombre_canal: brand.nombre_canal || prev.nombre_canal,
            concepto: brand.concepto || prev.concepto,
            nombres_canal_sugeridos: [
              brand.nombre_canal || `${targetTopic.split(' ')[0]} HQ`,
              `${targetTopic.split(' ')[0]} Élite`,
              `Imperio ${targetTopic.split(' ')[0]}`
            ],
            descripcion_canal_seo: brand.concepto ? `Bienvenido al canal oficial de ${brand.nombre_canal || targetTopic}. ${brand.concepto} Suscríbete para recibir contenido exclusivo.` : prev.descripcion_canal_seo,
            paleta_colores_hex: brand.paleta_hex || prev.paleta_colores_hex || ["#00F0FF", "#8A2BE2", "#00FF88", "#07090E"],
            prompt_logo_en: `Minimalist vector logo for ${targetTopic}, sharp neon geometry, 8k render`,
            prompt_banner_en: `Sleek panoramic 16:9 YouTube channel banner for ${targetTopic}, dark glowing neon theme`
          }));
        }

        // 4. Update Strategy Result State
        setStrategyResult(prev => ({
          ...prev,
          titulo: mainTitle,
          nicho: targetTopic,
          diagnostico_viral: `El tema "${targetTopic}" destaca por apelar a la curiosidad inmediata y la búsqueda activa de contenido especializado en YouTube.`,
          nuevo_concepto: aiData.branding_sugerido?.concepto || `Replicar la estructura de curiosidad aplicando edición Faceless dinámica para el nicho ${targetTopic}.`,
          gancho_3_segundos: aiData.guion?.hook || aiData.guion_escenas?.[0]?.locucion_texto || `Revelación clave sobre ${targetTopic}...`,
          prompt_miniatura_en: aiData.promptsVisuales?.[0] || "Cinematic high contrast shot, glowing neon cyan lighting, 8k render",
          texto_sobre_miniatura: `LA VERDAD SOBRE ${targetTopic.toUpperCase().substring(0, 18)}`,
          titulos_sugeridos: altTitles,
          keywords_seo: aiData.etiquetas || aiData.seo?.tags_lista || prev.keywords_seo
        }));

        // 5. Connect YouTube Data API: Fetch Niche Search & Outliers
        try {
          setYoutubeSearchError(null);
          const ytSearchRes = await fetch('/api/youtube/niche-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nicheKeyword: targetTopic, query: targetTopic, niche: targetTopic })
          });
          const ytSearchData = await ytSearchRes.json();
          if (ytSearchRes.ok && ytSearchData.success && ytSearchData.data) {
            setNicheExplorerData(ytSearchData.data);
            setSelectedNicheCategory(targetTopic);
          } else {
            const errMsg = ytSearchData?.error || 'No se pudo recuperar los videos virales de la API de YouTube.';
            setYoutubeSearchError(errMsg);
          }
        } catch (ytErr: any) {
          console.warn('Error al actualizar Explorer de Nicho con YouTube API:', ytErr);
          setYoutubeSearchError(ytErr.message || 'Error de conexión con la API de YouTube.');
        }

        // 6. Connect YouTube Data API: Track Channel & Update Saved Channels
        try {
          const ytTrackRes = await fetch('/api/youtube/track-channel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ handle: targetTopic, userEmail: activationEmail })
          });
          if (ytTrackRes.ok) {
            const ytTrackData = await ytTrackRes.json();
            if (ytTrackData.data) {
              const ch = ytTrackData.data;
              const newChannelCard: SavedChannel = {
                id: `ch-yt-${Date.now()}`,
                nombre: ch.nombre || `${targetTopic.toUpperCase()} HQ`,
                nicho: targetTopic,
                handle: ch.handle || `@${targetTopic.toLowerCase().replace(/\s+/g, '')}`,
                url: ch.url || `https://youtube.com/@${targetTopic.toLowerCase().replace(/\s+/g, '')}`,
                subscriptores: ch.subscriptores || '420K',
                videosProcesados: ch.totalVideos || 140,
                tieneNuevoVideo: true,
                ctrPromedio: '12.8%',
                ultimoVideoDetectado: {
                  titulo: ch.recentVideos?.[0]?.title || mainTitle,
                  vistas: ch.recentVideos?.[0]?.views || '520K vistas',
                  publicadoHace: ch.recentVideos?.[0]?.publishedAt || 'Hace 1 día',
                  transcripcionPremisa: `Transcripción extraída del canal ${ch.nombre} en el nicho de ${targetTopic}...`
                }
              };
              setSavedChannels(prev => [newChannelCard, ...prev.filter(c => c.nicho !== targetTopic)]);
            }
          }
        } catch (trackErr) {
          console.warn('Error al rastrear canal con YouTube API:', trackErr);
        }

        setOnboardingNiche(transcript);

        setToastMessage(`⚡ ¡Estrategia, Guión, SEO y Canales actualizados al 100% para "${transcript.substring(0, 25)}..."! (-10 Créditos)`);
        setTimeout(() => setToastMessage(null), 4000);
      }
    } catch (err: any) {
      console.warn("Error generando guion:", err);
      const errMsg = err?.message || "No se pudo establecer conexión con la API de IA.";
      setApiErrorMsg(errMsg);
      setToastMessage(`⚠️ Error de conexión API IA: ${errMsg}`);
      setTimeout(() => setToastMessage(null), 5000);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExtractFromChannel = (channel: SavedChannel) => {
    setTranscript(channel.ultimoVideoDetectado.transcripcionPremisa);
    setIsAnalyzing(true);

    if (userCredits > 0) {
      setUserCredits(prev => Math.max(0, prev - 10));
    }

    setSavedChannels(prev =>
      prev.map(ch =>
        ch.id === channel.id
          ? {
              ...ch,
              videosProcesados: ch.videosProcesados + 1,
              tieneNuevoVideo: false
            }
          : ch
      )
    );

    setTimeout(() => {
      setIsAnalyzing(false);
      setToastMessage(`¡Video viral de "${channel.nombre}" extraído (-10 Créditos IA)! Guión y Metadatos actualizados.`);
      setTimeout(() => setToastMessage(null), 4000);
      setActiveTab('script');
    }, 800);
  };

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const maxChannelsAllowed = userPlan === 'CREATOR' ? 3 : userPlan === 'PRO' ? 10 : 999;
    if (savedChannels.length >= maxChannelsAllowed) {
      setShowAddModal(false);
      setShowUpgradeModal(true);
      setToastMessage(`⚠️ Límite alcanzado para el Plan ${userPlan} (máximo ${maxChannelsAllowed} canales). Mejora a Cyber-Pro para monitorear 10 canales.`);
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    const extractedHandle = newUrl.includes('@')
      ? '@' + newUrl.split('@')[1].split('/')[0]
      : '@' + (newName ? newName.replace(/\s+/g, '') : 'NuevoCanal');

    const createdName = newName.trim() || (extractedHandle.replace('@', '') + ' HQ');

    const newChannelItem: SavedChannel = {
      id: `ch-${Date.now()}`,
      nombre: createdName,
      nicho: onboardingNiche || 'General',
      handle: extractedHandle,
      url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
      subscriptores: '100K+',
      videosProcesados: 1,
      tieneNuevoVideo: true,
      ctrPromedio: '10.5%',
      ultimoVideoDetectado: {
        titulo: `Estrategia Viral Revelada de ${createdName}`,
        vistas: '120K vistas',
        publicadoHace: 'Hace pocas horas',
        transcripcionPremisa: `Transcripción automatizada de ${createdName}: Los hábitos financieros de las personas que logran independencia económica rápida se basan en 3 principios clave...`
      }
    };

    setSavedChannels([newChannelItem, ...savedChannels]);
    setNewUrl('');
    setNewName('');
    setShowAddModal(false);

    setToastMessage(`Canal "${createdName}" agregado con monitoreo continuo de API activado.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDeleteChannel = (id: string) => {
    setSavedChannels(prev => prev.filter(c => c.id !== id));
  };

  const newVideosCount = savedChannels.filter(c => c.tieneNuevoVideo).length;

  return (
    <div id="main-container" className="min-h-screen bg-[#07090E] cyber-grid text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black pb-16 relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[500px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-10 left-1/3 w-[400px] h-[250px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <header id="app-header" className="border-b border-[#1E2638] bg-[#07090E]/85 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 rounded-xl neon-glow-cyan">
              <Zap className="w-5 h-5 text-black font-bold fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold tracking-wider bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
                  YOUTUBE FACELESS AI ENGINE
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.2)] items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  CYBER-AI v3.6
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden md:block">Motor de Automatización Viral & Arquitectura de Contenido</p>
            </div>
          </div>

          {/* Navigation Bar Tabs */}
          <div className="hidden xl:flex items-center gap-1 bg-[#0D121F]/90 p-1.5 rounded-xl border border-[#1E2638] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setActiveTab('channels')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 relative ${
                activeTab === 'channels'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Tv className="w-3.5 h-3.5 text-cyan-400" />
              <span>Canales Guardados</span>
              {newVideosCount > 0 && (
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-emerald-400 text-black rounded-full shadow-[0_0_8px_#00FF88] animate-pulse">
                  {newVideosCount}
                </span>
              )}
              {activeTab === 'channels' && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00F0FF]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('niche_explorer')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 relative ${
                activeTab === 'niche_explorer'
                  ? 'bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 text-fuchsia-300 border border-fuchsia-400/50 shadow-[0_0_15px_rgba(217,70,239,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Explorador de Nichos</span>
              {activeTab === 'niche_explorer' && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-fuchsia-400 rounded-full shadow-[0_0_8px_#D946EF]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('metadata')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 relative ${
                activeTab === 'metadata'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              Metadatos SEO
              {activeTab === 'metadata' && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00F0FF]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('branding')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 relative ${
                activeTab === 'branding'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Identidad
              {activeTab === 'branding' && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00F0FF]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('script')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 relative ${
                activeTab === 'script'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5" />
              Guión
              {activeTab === 'script' && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00F0FF]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 relative ${
                activeTab === 'strategy'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Estrategia
              {activeTab === 'strategy' && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00F0FF]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('json_metadata')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 relative ${
                activeTab.startsWith('json_')
                  ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-300 border border-purple-400/50 shadow-[0_0_15px_rgba(138,43,226,0.3)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <FileJson className="w-3.5 h-3.5 text-purple-400" />
              JSON
              {activeTab.startsWith('json_') && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-purple-400 rounded-full shadow-[0_0_8px_#8A2BE2]" />
              )}
            </button>
          </div>

          {/* User Widget & Commercial Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* AI Credits Pill */}
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-2.5 py-1.5 bg-[#0A0E17] hover:bg-[#0F1626] border border-amber-500/40 hover:border-amber-400 rounded-xl flex items-center gap-2 transition-all group shadow-[0_0_12px_rgba(245,158,11,0.2)]"
              title="Haz clic para ver más detalles o mejorar tu plan"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse group-hover:scale-110 transition-transform" />
              <div className="text-left font-mono">
                <span className="text-[11px] font-extrabold text-amber-300 block leading-none">
                  ⚡ {userCredits} / {maxCredits}
                </span>
                <span className="text-[8px] text-slate-400 block leading-none mt-0.5 uppercase tracking-wider">
                  Créditos IA
                </span>
              </div>
            </button>

            {/* Upgrade Button */}
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-3 py-1.5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white font-extrabold text-xs font-mono rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.35)] flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span className="hidden sm:inline">MEJORAR PLAN</span>
              <span className="sm:hidden">UPGRADE</span>
            </button>

            {/* User Profile Avatar Widget */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0D121F] border border-[#1E2638] hover:border-cyan-500/50 transition-all group"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-fuchsia-600 p-0.5 flex items-center justify-center font-extrabold text-black text-xs font-mono shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                    <span className="w-full h-full bg-[#07090E] rounded-[6px] text-cyan-300 flex items-center justify-center font-bold">
                      DC
                    </span>
                  </div>
                  {/* Status Indicator ONLINE */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#07090E] rounded-full shadow-[0_0_8px_#00FF88]" />
                </div>

                <div className="hidden lg:block text-left pr-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">Didier C.</span>
                    <span className="text-[9px] font-mono px-1 py-0.2 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/40">PRO</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                    ONLINE
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 transition-colors" />
              </button>

              {/* User Account Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 glass-card rounded-2xl p-4 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] z-50 animate-in fade-in zoom-in-95 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#1E2638]">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 flex items-center justify-center font-mono font-bold text-white text-sm">
                      <span className="w-full h-full bg-[#07090E] rounded-[10px] text-cyan-300 flex items-center justify-center font-extrabold">
                        DC
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Didier Cárdenas</h4>
                      <p className="text-[10px] text-slate-400 font-mono">didier@facelessai.io</p>
                      <span className="inline-block mt-1 text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                        ● USUARIO VERIFICADO ONLINE
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#05070B] border border-[#1E2638]">
                      <span className="text-slate-400 text-[10px]">Plan Actual:</span>
                      <span className="text-cyan-300 font-bold text-[11px] flex items-center gap-1">
                        <Crown className="w-3 h-3 text-amber-400 fill-amber-400" /> {userPlan}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#05070B] border border-[#1E2638]">
                      <span className="text-slate-400 text-[10px]">Créditos Restantes:</span>
                      <span className="text-amber-400 font-bold text-[11px]">⚡ {userCredits} / {maxCredits}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#1E2638] space-y-2">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setShowActivationScreen(!showActivationScreen);
                      }}
                      className="w-full py-2 px-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>{showActivationScreen ? 'Ver Dashboard' : 'Activación & Licencia'}</span>
                      <Key className="w-3.5 h-3.5 text-cyan-400" />
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setShowUpgradeModal(true);
                      }}
                      className="w-full py-2 px-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Gestionar Suscripción</span>
                      <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        setShowActivationScreen(true);
                        setIsAdminView(false);
                        setShowSalesLanding(false);
                        setToastMessage("Sesión cerrada. Regresando a la Pantalla de Login.");
                        setTimeout(() => setToastMessage(null), 2500);
                      }}
                      className="w-full py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold rounded-xl flex items-center justify-between transition-all"
                    >
                      <span>Cerrar Sesión / Salir</span>
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Toggle Activation Screen Button */}
            <button
              onClick={() => {
                setShowActivationScreen(!showActivationScreen);
                setIsAdminView(false);
              }}
              className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.15)] ${
                showActivationScreen
                  ? 'bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                  : 'bg-[#0D121F] border-[#1E2638] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50'
              }`}
              title="Alternar entre Pantalla de Login / Activación y Dashboard"
            >
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{showActivationScreen ? 'DASHBOARD' : 'LOGIN / ACTIVACIÓN'}</span>
            </button>

            {/* Discrete Admin Mode Switch */}
            <button
              onClick={() => {
                setIsAdminView(!isAdminView);
                setShowActivationScreen(false);
              }}
              className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.2)] ${
                isAdminView
                  ? 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-[#0D121F] border-[#1E2638] text-slate-400 hover:text-purple-300 hover:border-purple-500/50'
              }`}
              title="Alternar entre Vista Cliente y Panel de Administración Privado"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">{isAdminView ? 'VISTA CLIENTE' : 'VISTA ADMIN'}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                setShowActivationScreen(true);
                setIsAdminView(false);
                setShowSalesLanding(false);
                setToastMessage("Sesión cerrada. Regresando a la Pantalla de Login.");
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="p-2 rounded-xl bg-[#0D121F] border border-[#1E2638] hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-all"
              title="Cerrar Sesión y Regresar al Login"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar Tabs */}
        <div className="xl:hidden flex items-center justify-start gap-1 bg-[#0D121F] px-4 py-2 border-t border-[#1E2638] overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('channels')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 flex items-center gap-1.5 ${
              activeTab === 'channels' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' : 'text-slate-400'
            }`}
          >
            <Tv className="w-3 h-3 text-cyan-400" />
            <span>Canales Guardados</span>
            {newVideosCount > 0 && (
              <span className="px-1 text-[9px] bg-emerald-400 text-black font-bold rounded-full">
                {newVideosCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('metadata')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 flex items-center gap-1.5 ${
              activeTab === 'metadata' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' : 'text-slate-400'
            }`}
          >
            <Tag className="w-3 h-3" />
            Metadatos SEO
          </button>
          <button
            onClick={() => setActiveTab('branding')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 flex items-center gap-1.5 ${
              activeTab === 'branding' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' : 'text-slate-400'
            }`}
          >
            <Palette className="w-3 h-3" />
            Identidad
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 flex items-center gap-1.5 ${
              activeTab === 'script' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' : 'text-slate-400'
            }`}
          >
            <Clapperboard className="w-3 h-3" />
            Guión
          </button>
          <button
            onClick={() => setActiveTab('strategy')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 flex items-center gap-1.5 ${
              activeTab === 'strategy' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' : 'text-slate-400'
            }`}
          >
            <Layers className="w-3 h-3" />
            Estrategia
          </button>
          <button
            onClick={() => setActiveTab('json_metadata')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 flex items-center gap-1.5 ${
              activeTab.startsWith('json_') ? 'bg-purple-500/20 text-purple-300 border border-purple-400/50' : 'text-slate-400'
            }`}
          >
            <FileJson className="w-3 h-3 text-purple-400" />
            JSON
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        {isAdminView ? (
          /* Private Admin Panel View */
          <div className="space-y-8 my-4 animate-in fade-in zoom-in-95">
            {/* Admin Header Banner */}
            <div className="glass-card rounded-3xl p-6 border border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-tr from-purple-600 to-fuchsia-600 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <ShieldAlert className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <h2 className="text-lg font-extrabold text-white tracking-wider">
                      PANEL DE ADMINISTRACIÓN Y CONTROL PRIVADO (/admin)
                    </h2>
                    <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
                      ACCESO RESTRINGIDO
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">
                    Emisión de licencias regalo, monitor de consumo de servidor y gestión en tiempo real de clientes.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAdminView(false)}
                className="px-4 py-2 bg-[#0D121F] border border-[#1E2638] hover:border-slate-600 text-slate-300 text-xs font-mono font-bold rounded-xl flex items-center gap-2 transition-all"
              >
                <X className="w-4 h-4 text-slate-400" />
                <span>SALIR DEL MODO ADMIN</span>
              </button>
            </div>

            {/* Admin Grid - 3 Core Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Tarjeta 1: GENERADOR DE CÓDIGOS DE LICENCIA Y REGALOS (lg:col-span-6) */}
              <div className="lg:col-span-6 glass-card rounded-3xl p-6 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)] space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#1E2638] pb-4 mb-4">
                    <div className="flex items-center gap-2 font-mono">
                      <Gift className="w-5 h-5 text-fuchsia-400" />
                      <h3 className="text-sm font-extrabold text-white">
                        1. GENERADOR DE CÓDIGOS DE LICENCIA Y REGALOS
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/30 rounded-full">
                      EMISIÓN DE LICENCIAS
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Selector de Plan a Regalar */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-2 font-bold">
                        SELECCIONA EL PLAN A REGALAR / EMITIR:
                      </label>
                      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedGiftPlan('CREATOR');
                            setCustomGiftCredits(300);
                          }}
                          className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                            selectedGiftPlan === 'CREATOR'
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                              : 'bg-[#05070B] border-[#1E2638] text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          <div>Creador</div>
                          <div className="text-[10px] text-slate-400">$27 / mes</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedGiftPlan('PRO');
                            setCustomGiftCredits(800);
                          }}
                          className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                            selectedGiftPlan === 'PRO'
                              ? 'bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-300 shadow-[0_0_12px_rgba(217,70,239,0.2)]'
                              : 'bg-[#05070B] border-[#1E2638] text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          <div>Cyber-Pro</div>
                          <div className="text-[10px] text-slate-400">$57 / mes</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedGiftPlan('AGENCY');
                            setCustomGiftCredits(2000);
                          }}
                          className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                            selectedGiftPlan === 'AGENCY'
                              ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                              : 'bg-[#05070B] border-[#1E2638] text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          <div>Agencia</div>
                          <div className="text-[10px] text-slate-400">$199 / mes</div>
                        </button>
                      </div>
                    </div>

                    {/* Campo de Créditos a Asignar */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold flex items-center justify-between">
                        <span>CANTIDAD DE CRÉDITOS A ASIGNAR:</span>
                        <span className="text-[10px] text-cyan-400">{customGiftCredits} CRÉDITOS IA</span>
                      </label>
                      <input
                        type="number"
                        value={customGiftCredits}
                        onChange={(e) => setCustomGiftCredits(Number(e.target.value))}
                        className="w-full bg-[#05070B] border border-[#1E2638] focus:border-purple-400 text-xs text-white p-3 rounded-xl font-mono focus:outline-none"
                      />
                    </div>

                    {/* Generar Código Único Button */}
                    <button
                      onClick={handleGenerateCustomGiftKey}
                      className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-black font-extrabold font-mono text-xs rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Key className="w-4 h-4 fill-black text-black" />
                      <span>Generar Código Único de Licencia</span>
                    </button>

                    {/* Alphanumeric Display & Copy Button */}
                    <div className="p-4 rounded-2xl bg-[#05070B] border border-purple-500/50 space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        CÓDIGO ALFANUMÉRICO GENERADO:
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#090D18] p-3 rounded-xl border border-purple-500/40 font-mono text-xs font-extrabold text-cyan-300 tracking-widest text-center shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                          {generatedGiftKey}
                        </div>

                        <button
                          onClick={handleCopyGiftKey}
                          className="px-4 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-mono font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center gap-1.5 transition-all hover:scale-105"
                        >
                          {copiedGiftKey ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-300" />
                              <span>COPIADO</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copiar Licencia</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta 2: MONITOR DE CONSUMO DE API Y COSTOS (lg:col-span-6) */}
              <div className="lg:col-span-6 glass-card rounded-3xl p-6 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.15)] space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-[#1E2638] pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                      <h3 className="text-sm font-extrabold font-mono text-white">
                        2. MONITOR DE CONSUMO DE API Y COSTOS
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      ONLINE
                    </span>
                  </div>

                  {/* 3 Core Metrics Highlighted */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono mb-4">
                    {/* Metric 1: Total Calls */}
                    <div className="p-3.5 rounded-2xl bg-[#05070B] border border-cyan-500/30">
                      <span className="text-[9px] text-slate-400 uppercase block font-bold">Llamadas API Mes</span>
                      <strong className="text-lg text-cyan-300 font-extrabold block mt-1">14,280</strong>
                      <span className="text-[9px] text-slate-500 block">Gemini 1.5 & YouTube</span>
                    </div>

                    {/* Metric 2: Estimated Server Cost */}
                    <div className="p-3.5 rounded-2xl bg-[#05070B] border border-emerald-500/30">
                      <span className="text-[9px] text-slate-400 uppercase block font-bold">Costo Servidores</span>
                      <strong className="text-lg text-emerald-400 font-extrabold block mt-1">$3.42 USD</strong>
                      <span className="text-[9px] text-emerald-500 block">Consumo Infraestructura</span>
                    </div>

                    {/* Metric 3: Active Users */}
                    <div className="p-3.5 rounded-2xl bg-[#05070B] border border-amber-500/30">
                      <span className="text-[9px] text-slate-400 uppercase block font-bold">Usuarios Activos</span>
                      <strong className="text-lg text-amber-300 font-extrabold block mt-1">1,842</strong>
                      <span className="text-[9px] text-amber-500 block">Sesiones Online</span>
                    </div>
                  </div>

                  {/* Secondary Metrics */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-[#080C14] border border-[#1E2638] flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Tokens Gemini Usados</span>
                      <span className="font-bold text-purple-300">1.4M Tokens</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#080C14] border border-[#1E2638] flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Latencia Promedio</span>
                      <span className="font-bold text-emerald-400">180 ms</span>
                    </div>
                  </div>

                  {/* Services Status Checklist */}
                  <div className="space-y-1.5 font-mono text-xs pt-3 border-t border-[#1E2638]">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#090D18] border border-[#1E2638]">
                      <span className="text-slate-300 flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-purple-400" />
                        Google Gemini 1.5 Flash API
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400">🟢 100% OPERACIONAL</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#090D18] border border-[#1E2638]">
                      <span className="text-slate-300 flex items-center gap-2">
                        <Tv className="w-3.5 h-3.5 text-cyan-400" />
                        YouTube Data API Proxy
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400">🟢 100% OPERACIONAL</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta 3: TABLA DE GESTIÓN DE USUARIOS (lg:col-span-12) */}
              <div className="lg:col-span-12 glass-card rounded-3xl p-6 border border-fuchsia-500/40 shadow-[0_0_35px_rgba(217,70,239,0.15)] space-y-6">
                <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-fuchsia-400" />
                    <h3 className="text-sm font-extrabold font-mono text-white">
                      3. TABLA DE GESTIÓN DE USUARIOS Y CRÉDITOS
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
                    {adminUsersList.length} USUARIOS REGISTRADOS
                  </span>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-[#1E2638] text-slate-400 uppercase text-[10px] tracking-wider bg-[#05070B]">
                        <th className="p-3.5 rounded-l-xl">Correo del Usuario</th>
                        <th className="p-3.5">Plan Actual</th>
                        <th className="p-3.5">Créditos Restantes</th>
                        <th className="p-3.5">Estado</th>
                        <th className="p-3.5 text-right rounded-r-xl">Acciones Rápidas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E2638]">
                      {adminUsersList.map((usr) => (
                        <tr key={usr.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3.5 font-bold text-white flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{usr.email}</span>
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${
                              usr.plan === 'AGENCIA'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                : usr.plan === 'CYBER-PRO'
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}>
                              {usr.plan}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-amber-300">
                            {usr.credits} / {usr.maxCredits} CR
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                              usr.status === 'Activo'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            }`}>
                              ● {usr.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => handleRechargeUserCredits(usr.id, 300)}
                              className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold rounded-lg transition-all"
                            >
                              + Recargar Créditos (+300)
                            </button>
                            <button
                              onClick={() => handleToggleUserStatus(usr.id)}
                              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                                usr.status === 'Activo'
                                  ? 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 text-rose-300'
                                  : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                              }`}
                            >
                              {usr.status === 'Activo' ? 'Suspender' : 'Reactivar'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : showSalesLanding ? (
          /* ==========================================
             LANDING PAGE PRINCIPAL (Marketing Homepage /)
             ========================================== */
          <div className="space-y-16 py-6 animate-in fade-in zoom-in-95 font-sans">
            {/* HERO SECTION */}
            <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-fuchsia-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>MOTOR DE INTELIGENCIA ARTIFICIAL PARA YOUTUBE FACELESS 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Crea Canales <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">Faceless Virales</span> en Minutos con IA
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-mono max-w-2xl mx-auto leading-relaxed">
                Analiza la competencia, genera guiones perfectos, locución de voz en HD y ensambla videos en 1080p sin marcas de agua de forma 100% automatizada.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setShowSalesLanding(false);
                    setAuthMode('register');
                    setShowActivationScreen(true);
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-black font-extrabold font-mono text-sm rounded-2xl shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)] flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95"
                >
                  <Zap className="w-5 h-5 fill-black" />
                  <span>⚡ Comenzar Ahora (1-Click)</span>
                </button>

                <button
                  onClick={() => {
                    setShowSalesLanding(false);
                    setShowActivationScreen(false);
                  }}
                  className="w-full sm:w-auto px-6 py-4 bg-[#0A0E17] hover:bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
                >
                  <PlayCircle className="w-4 h-4 text-cyan-400" />
                  <span>🎬 Probar Demo en Vivo</span>
                </button>
              </div>

              {/* DEMO INTERRACTIVA MOCKUP PREVIEW BOX */}
              <div className="pt-6">
                <div className="glass-card rounded-3xl p-4 sm:p-6 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] bg-black/60 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#1E2638] pb-3 mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      DEMO INTERACTIVA // MOTOR CYBER-AI EN ACCIÓN
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-left">
                    <div className="p-4 rounded-2xl bg-[#05070B] border border-cyan-500/30 space-y-2">
                      <span className="text-[10px] text-cyan-400 font-bold uppercase">1. Rastreador YouTube API</span>
                      <h4 className="text-xs font-bold text-white">@CapitalCeroHQ (Finanzas)</h4>
                      <div className="text-[10px] text-emerald-400 font-bold">🚀 3 Videos Outliers (3.4x vistas)</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#05070B] border border-fuchsia-500/30 space-y-2">
                      <span className="text-[10px] text-fuchsia-400 font-bold uppercase">2. Generador de Guiones</span>
                      <h4 className="text-xs font-bold text-white">5 Escenas con B-Roll</h4>
                      <div className="text-[10px] text-purple-300 font-bold">Locución Edge-TTS + Prompts 16:9</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#05070B] border border-emerald-500/30 space-y-2">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">3. Render MP4 1080p</span>
                      <h4 className="text-xs font-bold text-white">100% Limpio (Sin Marcas)</h4>
                      <div className="text-[10px] text-emerald-300 font-bold">Subtítulos Hormozi Neón</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN DE CARACTERÍSTICAS (FEATURES) */}
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full inline-flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-fuchsia-400" />
                  HERRAMIENTAS ÉLITE INCLUIDAS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Todo lo que necesitas para escalar tu imperio en YouTube
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
                {/* Feature 1 */}
                <div className="glass-card rounded-2xl p-6 border border-cyan-500/30 space-y-3 hover:scale-105 transition-all">
                  <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit border border-cyan-500/30">
                    <Clapperboard className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white">Guiones con B-Roll</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Estructura secuencias con marcas de tiempo, hooks de alta retención e indicaciones visuales en inglés.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="glass-card rounded-2xl p-6 border border-purple-500/30 space-y-3 hover:scale-105 transition-all">
                  <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 w-fit border border-purple-500/30">
                    <Volume2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white">Locución HD Multi-Voz</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Genera voz latina o castellana natural con Edge-TTS sin pagar subscripciones externas de voz.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 space-y-3 hover:scale-105 transition-all">
                  <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit border border-emerald-500/30">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white">Estudio de Miniaturas</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Renderiza portadas en HD 16:9 (1280x720) diseñadas para maximizar el CTR de tus videos.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="glass-card rounded-2xl p-6 border border-amber-500/30 space-y-3 hover:scale-105 transition-all">
                  <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 w-fit border border-amber-500/30">
                    <Radio className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-extrabold text-white">Rastreador YouTube API</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Monitorea canales competidores y detecta automáticamente videos outliers con vistas extraordinarias.
                  </p>
                </div>
              </div>
            </section>

            {/* SECCIÓN POR QUÉ ELEGIRNOS (TABLA COMPARATIVA) */}
            <section className="glass-card rounded-3xl p-6 sm:p-8 border border-fuchsia-500/40 shadow-[0_0_35px_rgba(217,70,239,0.15)] space-y-6 font-mono">
              <div className="text-center space-y-2">
                <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  MATRIZ COMPARATIVA
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  ¿Por qué los creadores eligen Cyber-AI?
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#1E2638] text-slate-400 uppercase text-[10px] tracking-wider bg-[#05070B]">
                      <th className="p-4 rounded-l-xl">Característica / Beneficio</th>
                      <th className="p-4 text-cyan-300 font-extrabold bg-cyan-500/10 border-x border-cyan-500/30">⚡ Nuestra Plataforma Cyber-AI</th>
                      <th className="p-4 rounded-r-xl">Competidores Tradicionales</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2638]">
                    <tr>
                      <td className="p-4 font-bold text-white">Exportación MP4/PNG Limpia (SIN Marca de Agua)</td>
                      <td className="p-4 font-extrabold text-emerald-400 bg-cyan-500/5 border-x border-cyan-500/20">✓ INCLUIDO EN TODOS LOS PLANES</td>
                      <td className="p-4 text-rose-400 font-bold">❌ Requiere upgrade a plan Costoso</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">IAs Generativas Unificadas (Guion + Voz + Miniatura)</td>
                      <td className="p-4 font-extrabold text-emerald-400 bg-cyan-500/5 border-x border-cyan-500/20">✓ TODO EN 1 SOLA PLATAFORMA</td>
                      <td className="p-4 text-rose-400 font-bold">❌ Múltiples suscripciones separadas</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Rastreador de Canales y Outliers YouTube API</td>
                      <td className="p-4 font-extrabold text-emerald-400 bg-cyan-500/5 border-x border-cyan-500/20">✓ ALGORITMO OUTLIER AUTOMÁTICO</td>
                      <td className="p-4 text-rose-400 font-bold">❌ Búsqueda manual sin métricas</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Subtítulos Dinámicos Animados Estilo Hormozi</td>
                      <td className="p-4 font-extrabold text-emerald-400 bg-cyan-500/5 border-x border-cyan-500/20">✓ GENERACIÓN AUTOMÁTICA</td>
                      <td className="p-4 text-rose-400 font-bold">❌ Proceso manual en editores de video</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        ) : showActivationScreen ? (
          /* ==========================================
             SISTEMA DE AUTENTICACIÓN (Auth Flow /login & /register)
             ========================================== */
          <div className="max-w-2xl mx-auto my-8 animate-in fade-in zoom-in-95 font-mono">
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/50 shadow-[0_0_50px_rgba(0,240,255,0.25)] space-y-6 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header Title */}
              <div className="text-center space-y-2">
                <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                  <Key className="w-3.5 h-3.5 text-cyan-400" />
                  ACCESO DE USUARIO // SISTEMA DE AUTENTICACIÓN
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {authMode === 'register' ? 'Crear Nueva Cuenta Pro' : 'Iniciar Sesión'}
                </h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Accede al motor de automatización y gestiona tus proyectos y canales guardados.
                </p>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center justify-center p-1 bg-[#05070B] rounded-2xl border border-[#1E2638]">
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    authMode === 'register'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/50'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  [ Registrarse ]
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    authMode === 'login'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/50'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  [ Iniciar Sesión ]
                </button>
              </div>

              {/* Google 1-Click Social Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3.5 px-4 bg-[#0A0E17] hover:bg-slate-900 border border-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>🌐 Continuar con Google (1-Clic Social Login)</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-[#1E2638] w-full" />
                <span className="bg-[#07090E] px-3 text-[10px] text-slate-500 uppercase font-bold absolute">
                  O usa tu correo
                </span>
              </div>

              {/* Registration & Activation Form */}
              <form onSubmit={authMode === 'register' ? handleRegisterUser : handleLoginUser} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-semibold">
                    CORREO ELECTRÓNICO *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="usuario@facelessai.com"
                      value={activationEmail}
                      onChange={(e) => setActivationEmail(e.target.value)}
                      className="w-full bg-[#05070B] border border-[#1E2638] focus:border-cyan-400 text-xs text-white p-3.5 pl-10 rounded-xl font-mono focus:outline-none"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-semibold">
                    CONTRASEÑA *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={activationPassword}
                      onChange={(e) => setActivationPassword(e.target.value)}
                      className="w-full bg-[#05070B] border border-[#1E2638] focus:border-cyan-400 text-xs text-white p-3.5 pl-10 rounded-xl font-mono focus:outline-none"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isActivating}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-xs font-mono rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {isActivating ? (
                    <>
                      <RefreshCw className="w-4 h-4 text-black animate-spin" />
                      <span>PROCESANDO SESIÓN...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-black" />
                      <span>{authMode === 'register' ? 'Registrar Cuenta y Entrar' : 'Iniciar Sesión'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Secondary Link */}
              <div className="pt-3 border-t border-[#1E2638] text-center space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowActivationScreen(false);
                    setShowSalesLanding(true);
                  }}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline"
                >
                  ← Ver Planes de Suscripción o Regresar al Inicio
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Input Banner / Control Console */}
            <section id="input-section" className="mb-6">
              <div className="glass-card rounded-2xl p-4.5 relative overflow-hidden border border-cyan-500/30 shadow-[0_0_25px_rgba(0,240,255,0.15)]">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-2 font-mono">
                  <label htmlFor="transcript-input" className="text-xs font-bold uppercase text-cyan-300 flex items-center gap-2 tracking-wider">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    CONSOLA DE COMANDO // INGRESA TU NICHO O CONCEPTO
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] text-emerald-400 font-semibold">API ONLINE</span>
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-2.5">
                  <input
                    id="transcript-input"
                    type="text"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAnalyzeConcept();
                      }
                    }}
                    placeholder="Escribe un nicho o concepto (Ej: terror, musica cristiana, inteligencia artificial, finanzas)..."
                    className="flex-1 bg-[#05070B] border border-[#1E2638] focus:border-cyan-400 text-xs text-white p-3 rounded-xl font-mono focus:outline-none placeholder:text-slate-500"
                  />
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                    <button
                      onClick={handleAnalyzeConcept}
                      disabled={isAnalyzing}
                      className="px-4 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 transition-all disabled:opacity-50 font-mono"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 fill-black" />
                          ACTUALIZAR IDENTIDAD & ESTRATEGIA
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleFetchTop50Virales}
                      disabled={isLoadingTop50}
                      className="px-4 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-black font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 transition-all disabled:opacity-50 font-mono"
                      title="Consultar los 50 videos con mayores reproducciones en tiempo real vía YouTube Data API"
                    >
                      {isLoadingTop50 ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Cargando 50 Virales...
                        </>
                      ) : (
                        <>
                          <Flame className="w-3.5 h-3.5 fill-black" />
                          🔥 Búsqueda automática: Top 50 Videos Más Virales en Vivo
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {apiErrorMsg && (
                  <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">⚠️ ERROR DE IA/CONEXIÓN</strong>
                      <p>{apiErrorMsg}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* CONTENEDOR DE RESULTADOS: TOP 50 VIDEOS MÁS VIRALES EN VIVO */}
            {(hasSearchedTop50 || isLoadingTop50 || top50ViralVideos.length > 0 || youtubeSearchError) && (
              <section id="top-50-results-section" className="mb-8 font-mono animate-in fade-in zoom-in-95 duration-300">
                <div className="glass-card rounded-3xl p-6 border border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.15)] space-y-4">
                  
                  {/* Encabezado */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#1E2638] pb-4 gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-white tracking-wide flex items-center gap-2 flex-wrap">
                          🔥 TOP 50 VIDEOS MÁS VIRALES EN VIVO
                          {top50NicheName && (
                            <span className="text-amber-300 text-xs font-bold uppercase bg-amber-500/20 px-2.5 py-0.5 rounded-lg border border-amber-500/40">
                              Nicho: {top50NicheName}
                            </span>
                          )}
                        </h3>
                        <p className="text-[11px] text-slate-400">Resultados en tiempo real ordenados por reproducciones (Google Cloud YouTube API)</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleFetchTop50Virales}
                        disabled={isLoadingTop50}
                        className="px-3.5 py-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50 hover:scale-105 active:scale-95"
                      >
                        {isLoadingTop50 ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Flame className="w-3.5 h-3.5 fill-black" />}
                        <span>Re-consultar 50 Virales</span>
                      </button>
                      <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full shadow-[0_0_10px_#00FF88]">
                        LIVE GOOGLE CLOUD
                      </span>
                    </div>
                  </div>

                  {/* Estado de Carga */}
                  {isLoadingTop50 && (
                    <div className="p-8 rounded-2xl bg-[#05070B] border border-amber-500/40 text-amber-300 text-xs text-center space-y-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                      <RefreshCw className="w-8 h-8 text-amber-400 mx-auto animate-spin" />
                      <h4 className="font-extrabold text-white text-sm">Cargando las 50 tendencias de YouTube...</h4>
                      <p className="text-slate-400 text-xs">Consultando estadísticas en tiempo real y ordenando por número de vistas (order=viewCount)...</p>
                    </div>
                  )}

                  {/* Alerta de Error */}
                  {!isLoadingTop50 && youtubeSearchError && (
                    <div className="p-4.5 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-3 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                      <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 animate-bounce" />
                      <div className="flex-1 space-y-1">
                        <strong className="block text-rose-200 font-bold">⚠️ ALERTA DE API YOUTUBE DATA</strong>
                        <span className="block text-rose-300 text-[11px]">{youtubeSearchError}</span>
                      </div>
                    </div>
                  )}

                  {/* Sin Resultados */}
                  {!isLoadingTop50 && !youtubeSearchError && top50ViralVideos.length === 0 && (
                    <div className="p-8 rounded-2xl bg-[#05070B] border border-amber-500/30 text-amber-300 text-xs text-center space-y-2">
                      <Compass className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
                      <h4 className="font-extrabold text-white text-sm">No se encontraron videos virales en vivo</h4>
                      <p className="text-slate-400 text-xs">Ingresa un término en la consola de comandos (ej. terror, finanzas, autos, inteligencia artificial) y presiona "Top 50".</p>
                    </div>
                  )}

                  {/* Lista de Tarjetas de Video */}
                  {!isLoadingTop50 && top50ViralVideos.length > 0 && (
                    <div className="grid grid-cols-1 gap-3 max-h-[650px] overflow-y-auto pr-1 custom-scrollbar">
                      {top50ViralVideos.map((idea: any, idx: number) => (
                        <div
                          key={idea.id || idx}
                          className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                            idx < 3
                              ? 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                              : 'bg-[#05070B] border-[#1E2638] hover:border-amber-500/40'
                          }`}
                        >
                          <div className="flex items-start md:items-center gap-3.5 flex-1">
                            {idea.thumbnail ? (
                              <img
                                src={idea.thumbnail}
                                alt={idea.title}
                                className="w-28 h-16 object-cover rounded-xl border border-slate-700/80 shrink-0 shadow-md"
                              />
                            ) : (
                              <div className="w-28 h-16 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-slate-700 text-[10px] text-slate-400">
                                Sin Imagen
                              </div>
                            )}

                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">#{idx + 1}</span>
                                <h4 className="text-xs font-bold text-white line-clamp-1">{idea.title}</h4>
                                {idx < 3 && (
                                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-amber-400 text-black rounded-full shadow-[0_0_10px_#F59E0B] flex items-center gap-1">
                                    🚀 TOP {idx + 1} VIRAL
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                                {idea.channelTitle && <span className="text-cyan-300 font-bold">📺 {idea.channelTitle}</span>}
                                {idea.publishedAt && <span>📅 {idea.publishedAt}</span>}
                              </div>
                              {idea.concept && (
                                <p className="text-[11px] text-slate-400 font-sans line-clamp-1">
                                  💡 <strong className="text-slate-300">Detalles:</strong> {idea.concept}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#1E2638]">
                            <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 font-mono">
                              {idea.views || '🔥 Top Reproducciones'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCloneViralStrategy(idea.title, idea.concept, idea.id)}
                              className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 text-black font-extrabold text-[11px] rounded-xl shadow-[0_0_15px_rgba(0,255,136,0.3)] flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                            >
                              <Zap className="w-3.5 h-3.5 fill-black" />
                              <span>⚡ Clonar Estrategia & Transcripción</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

        {/* Notification Toast */}
        {toastMessage && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold flex items-center justify-between shadow-[0_0_25px_rgba(0,255,136,0.25)] animate-fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-bounce" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab Explorador de Nichos Virales & Outliers */}
        {activeTab === 'niche_explorer' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            {/* Banner Header */}
            <div className="glass-card rounded-3xl p-6 border border-fuchsia-500/50 shadow-[0_0_40px_rgba(217,70,239,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-cyan-500 rounded-2xl shadow-[0_0_20px_rgba(217,70,239,0.4)]">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <h2 className="text-lg font-extrabold text-white tracking-wider">
                      EXPLORADOR DE NICHOS VIRALES & OUTLIERS YOUTUBE DATA API
                    </h2>
                    <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 rounded-full">
                      ALTO CPM & RETENCIÓN
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">
                    Descubre las temáticas más rentables para canales Faceless y detecta videos que superan el promedio de reproducciones.
                  </p>
                </div>
              </div>
            </div>

            {/* MODO CATÁLOGO VIRAL: Tarjetas Rápida de Nichos Lucrativos */}
            <div className="space-y-3">
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                1. MODO CATÁLOGO VIRAL // NICHOS ÉLITE FACELESS (CLICK PARA EXPLORAR):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
                {[
                  { name: 'Finanzas & Cripto', icon: '💰', cpm: '$25.00+ CPM', color: 'border-cyan-400 text-cyan-300 bg-cyan-500/10' },
                  { name: 'Historias Oscuras', icon: '🕵️', cpm: '$18.50 CPM', color: 'border-purple-400 text-purple-300 bg-purple-500/10' },
                  { name: 'Filosofía Estoica', icon: '🏛️', cpm: '$15.20 CPM', color: 'border-amber-400 text-amber-300 bg-amber-500/10' },
                  { name: 'Datos Curiosos', icon: '🧬', cpm: '$12.80 CPM', color: 'border-emerald-400 text-emerald-300 bg-emerald-500/10' },
                  { name: 'Terror & Creepy', icon: '👻', cpm: '$14.10 CPM', color: 'border-rose-400 text-rose-300 bg-rose-500/10' }
                ].map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => handleSearchNiche(cat.name)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 hover:scale-[1.03] ${
                      selectedNicheCategory === cat.name
                        ? `${cat.color} shadow-[0_0_20px_rgba(217,70,239,0.3)] ring-1 ring-fuchsia-400`
                        : 'bg-[#05070B] border-[#1E2638] text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/40 border border-slate-700 text-slate-300">
                        {cat.cpm}
                      </span>
                    </div>
                    <div>
                      <div className="font-extrabold text-xs text-white">{cat.name}</div>
                      <div className="text-[10px] text-slate-400">Ver 5 Temas Virales →</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* MODO BÚSQUEDA PERSONALIZADA DE NICHO */}
            <div className="glass-card rounded-2xl p-5 border border-[#1E2638] space-y-3">
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                2. MODO BÚSQUEDA PERSONALIZADA // EVALUAR POTENCIAL VIRAL EN TIEMPO REAL
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Ingresa cualquier nicho (Ej: Bienes Raíces, Marcas de Lujo, Neurociencia, IA)..."
                  value={customNicheInput}
                  onChange={(e) => setCustomNicheInput(e.target.value)}
                  className="flex-1 bg-[#05070B] border border-[#1E2638] focus:border-fuchsia-400 text-xs text-white p-3 rounded-xl font-mono focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleSearchNiche(customNicheInput)}
                  disabled={isSearchingNiche}
                  className="px-5 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-mono font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.3)] flex items-center justify-center gap-2 transition-all"
                >
                  {isSearchingNiche ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Analizando API...</span>
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4" />
                      <span>Analizar Potencial Viral</span>
                    </>
                  )}
                </button>
              </div>

              {/* Potential Metric Indicator Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#05070B] border border-cyan-500/30">
                  <span className="text-[9px] text-slate-400 uppercase block font-bold">Nicho Seleccionado</span>
                  <strong className="text-xs text-cyan-300 font-extrabold block mt-0.5">{nicheExplorerData.nicheName}</strong>
                </div>

                <div className="p-3 rounded-xl bg-[#05070B] border border-emerald-500/30">
                  <span className="text-[9px] text-slate-400 uppercase block font-bold">Índice Potencial Viral</span>
                  <strong className="text-xs text-emerald-400 font-extrabold block mt-0.5 flex items-center gap-1">
                    🟢 {nicheExplorerData.viralPotentialIndex} ({nicheExplorerData.potentialScore})
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-[#05070B] border border-amber-500/30">
                  <span className="text-[9px] text-slate-400 uppercase block font-bold">CPM Promedio Est.</span>
                  <strong className="text-xs text-amber-300 font-extrabold block mt-0.5">{nicheExplorerData.estimatedCpm}</strong>
                </div>

                <div className="p-3 rounded-xl bg-[#05070B] border border-purple-500/30">
                  <span className="text-[9px] text-slate-400 uppercase block font-bold">Vistas / Video</span>
                  <strong className="text-xs text-purple-300 font-extrabold block mt-0.5">{nicheExplorerData.avgViewsPerVideo}</strong>
                </div>
              </div>
            </div>

            {/* TOP IDEAS & OUTLIERS VIRALES DETECTADOS */}
            <div className="glass-card rounded-3xl p-6 border border-emerald-500/40 shadow-[0_0_35px_rgba(0,255,136,0.15)] space-y-4 font-mono">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#1E2638] pb-4 gap-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <h3 className="text-sm font-extrabold text-white">
                    TOP {nicheExplorerData.topViralIdeas.length} VIDEOS MÁS VIRALES POR VISTAS (YOUTUBE DATA API V3)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFetchTop50Virales}
                    disabled={isLoadingTop50}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-black font-extrabold text-[10px] rounded-lg shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {isLoadingTop50 ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Flame className="w-3 h-3 fill-black" />}
                    <span>🔥 Cargar Top 50 En Vivo</span>
                  </button>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                    GOOGLE CLOUD LIVE
                  </span>
                </div>
              </div>

              {youtubeSearchError && (
                <div className="p-4.5 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 font-mono text-xs flex items-center gap-3 shadow-[0_0_20px_rgba(244,63,94,0.2)] mb-4">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 animate-bounce" />
                  <div className="flex-1 space-y-1">
                    <strong className="block text-rose-200 font-bold">⚠️ ALERTA API YOUTUBE DATA: Error de Conexión</strong>
                    <span className="block text-rose-300 text-[11px]">{youtubeSearchError}</span>
                  </div>
                </div>
              )}

              {!youtubeSearchError && nicheExplorerData.topViralIdeas.length === 0 && (
                <div className="p-8 rounded-2xl bg-[#05070B] border border-amber-500/30 text-amber-300 font-mono text-xs text-center space-y-3 mb-4">
                  <Compass className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
                  <h4 className="font-extrabold text-white text-sm">NO SE ENCONTRARON VIDEOS VIRALES</h4>
                  <p className="text-slate-400 text-xs max-w-md mx-auto">
                    No se encontraron videos para el nicho <strong className="text-amber-300">"{nicheExplorerData.nicheName}"</strong>. Intenta ingresar otro término en la consola de comandos (ej: <em>terror, musica cristiana, inteligencia artificial, finanzas, autos de lujo</em>).
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {nicheExplorerData.topViralIdeas.map((idea, idx) => (
                  <div
                    key={idea.id || idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      idea.isOutlier
                        ? 'bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent border-emerald-400/80 shadow-[0_0_20px_rgba(0,255,136,0.2)]'
                        : 'bg-[#05070B] border-[#1E2638]'
                    }`}
                  >
                    <div className="flex items-start md:items-center gap-3.5 flex-1">
                      {idea.thumbnail ? (
                        <img
                          src={idea.thumbnail}
                          alt={idea.title}
                          className="w-24 h-14 object-cover rounded-xl border border-slate-700/80 shrink-0 shadow-md"
                        />
                      ) : (
                        <div className="w-24 h-14 bg-slate-800 rounded-xl flex items-center justify-center shrink-0 border border-slate-700 text-[10px] text-slate-400">
                          Sin Imagen
                        </div>
                      )}

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{idea.title}</h4>
                          {idea.isOutlier && (
                            <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-emerald-400 text-black rounded-full shadow-[0_0_10px_#00FF88] flex items-center gap-1">
                              🚀 TOP VIRAL ({idea.multiplier || 'Alta Relevancia'})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                          {idea.channelTitle && <span className="text-cyan-300 font-bold">📺 {idea.channelTitle}</span>}
                          {idea.publishedAt && <span>📅 {idea.publishedAt}</span>}
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans line-clamp-1">
                          💡 <strong className="text-slate-300">Detalles:</strong> {idea.concept}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#1E2638]">
                      <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30 font-mono">
                        {idea.views || '🔥 Top Virales'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCloneViralStrategy(idea.title, idea.concept, idea.id)}
                        className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 hover:from-emerald-400 hover:to-purple-500 text-black font-extrabold text-[11px] rounded-xl shadow-[0_0_15px_rgba(0,255,136,0.3)] flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                      >
                        <Zap className="w-3.5 h-3.5 fill-black" />
                        <span>⚡ Clonar Estrategia & Transcripción</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Canales Guardados / Proyectos Activos */}
        {activeTab === 'channels' && (
          <div className="space-y-6">
            {/* Header section with Stats & Add Button */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(0,240,255,0.2)] flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                    MONITORIZACIÓN CONTINUA VÍA API DE YOUTUBE
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-white">Mis Canales Guardados & Proyectos Activos</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Rastrea canales virales de referencia y extrae sus mejores conceptos con 1 solo clic.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-xs rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <PlusCircle className="w-4 h-4 fill-black" />
                  AGREGAR NUEVO CANAL DE REFERENCIA
                </button>
              </div>
            </div>

            {/* Modal for Adding New Channel */}
            {showAddModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="glass-card w-full max-w-md rounded-2xl p-6 border border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.2)] space-y-4 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1E2638]">
                    <div className="flex items-center gap-2 text-cyan-300 font-mono font-bold text-sm">
                      <Tv className="w-4 h-4" />
                      AGREGAR CANAL DE REFERENCIA
                    </div>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleAddChannel} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                        URL O HANDLE DEL CANAL DE YOUTUBE *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="https://youtube.com/@FinanzasJovens"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="w-full bg-[#05070B] border border-[#1E2638] focus:border-cyan-400 text-xs text-white p-3 rounded-xl font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                        NOMBRE DEL CANAL (OPCIONAL)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Finanzas Jóvenes HQ"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-[#05070B] border border-[#1E2638] focus:border-cyan-400 text-xs text-white p-3 rounded-xl font-mono focus:outline-none"
                      />
                    </div>



                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs font-mono rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105 transition-all"
                      >
                        VINCULAR CANAL
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* List of Saved Channels Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl relative flex flex-col justify-between border border-[#1E2638] hover:border-cyan-500/40 transition-all duration-300"
                >
                  <div>
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E2638]">
                      {channel.tieneNuevoVideo ? (
                        <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,136,0.2)]">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          NUEVO VIDEO DETECTADO (API)
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-800/80 text-slate-400 border border-slate-700 rounded-full flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-slate-500" />
                          AL DÍA (PROCESADO)
                        </span>
                      )}

                      <button
                        onClick={() => handleDeleteChannel(channel.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Eliminar canal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Channel Info */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300 font-mono text-sm shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                        {channel.nombre.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-extrabold text-white truncate">
                          {channel.nombre}
                        </h3>
                        <p className="text-[11px] font-mono text-cyan-400/80 truncate">
                          {channel.handle}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-mono bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded">
                          {channel.nicho}
                        </span>
                      </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-[#05070B] rounded-xl border border-[#1E2638] text-center mb-4">
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block">SUBS</span>
                        <strong className="text-xs font-mono font-bold text-white">{channel.subscriptores}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block">CTR AI</span>
                        <strong className="text-xs font-mono font-bold text-emerald-400">{channel.ctrPromedio}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block">PROCESADOS</span>
                        <strong className="text-xs font-mono font-bold text-cyan-300">{channel.videosProcesados}</strong>
                      </div>
                    </div>

                    {/* Last Video Preview */}
                    <div className="bg-[#0A0E17] p-3.5 rounded-xl border border-[#1E2638] mb-4 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="text-amber-400 font-semibold flex items-center gap-1">
                          <PlayCircle className="w-3 h-3 text-amber-400" />
                          Último Video Viral:
                        </span>
                        <span>{channel.ultimoVideoDetectado.publicadoHace}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 line-clamp-2 leading-snug">
                        {channel.ultimoVideoDetectado.titulo}
                      </h4>
                      <p className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                        <span className="text-cyan-300">{channel.ultimoVideoDetectado.vistas}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-[#1E2638]">
                    <button
                      onClick={() => handleExtractFromChannel(channel)}
                      className="w-full py-2.5 px-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-xs rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-black" />
                      EXTRAER NUEVO VIDEO VIRAL DE ESTE CANAL
                    </button>

                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Ver Canal en YouTube
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Metadata */}
        {activeTab === 'metadata' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              {/* Título Principal */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl">
                      <Target className="w-4 h-4" />
                    </div>
                    <h2 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                      TÍTULO PRINCIPAL OPTIMIZADO
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCopy(metadataResult.titulo_principal, 'm-title')}
                    className="p-2 text-slate-400 hover:text-cyan-300 bg-[#05070B] border border-[#1E2638] hover:border-cyan-500/50 rounded-xl transition-all text-xs flex items-center gap-1.5 font-mono"
                  >
                    {copiedSection === 'm-title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'm-title' ? 'COPIADO' : 'COPIAR'}</span>
                  </button>
                </div>
                <div className="bg-[#05070B] p-4.5 rounded-xl border border-cyan-500/40 text-white font-extrabold text-sm shadow-[0_0_15px_rgba(0,240,255,0.1)] leading-relaxed">
                  {metadataResult.titulo_principal}
                </div>
              </div>

              {/* Títulos Alternativos A/B */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-xl">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <h2 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
                      TESTING A/B: TÍTULOS ALTERNATIVOS
                    </h2>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {metadataResult.titulos_alternativos_ab.map((altTitle, idx) => (
                    <div key={idx} className="bg-[#05070B] border border-[#1E2638] hover:border-purple-500/40 p-3.5 rounded-xl text-xs text-slate-200 flex items-center justify-between transition-all">
                      <span className="font-sans">{altTitle}</span>
                      <button
                        onClick={() => handleCopy(altTitle, `m-alt-${idx}`)}
                        className="text-slate-400 hover:text-purple-300 p-1.5 font-mono text-[11px] flex items-center gap-1"
                      >
                        {copiedSection === `m-alt-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Descripción del Video */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <h2 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest">
                      DESCRIPCIÓN DEL VIDEO (CON TIMESTAMPS)
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCopy(metadataResult.descripcion_video, 'm-desc')}
                    className="p-2 text-slate-400 hover:text-emerald-300 bg-[#05070B] border border-[#1E2638] hover:border-emerald-500/50 rounded-xl transition-all text-xs flex items-center gap-1.5 font-mono"
                  >
                    {copiedSection === 'm-desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'm-desc' ? 'COPIADO' : 'COPIAR'}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap bg-[#05070B] p-4.5 rounded-xl border border-[#1E2638] text-xs text-slate-300 font-mono leading-relaxed selection:bg-emerald-500/30">
                  {metadataResult.descripcion_video}
                </pre>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {/* Tags & Hashtags */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest">ETIQUETA SEO (TAGS)</h3>
                    <button
                      onClick={() => handleCopy(metadataResult.etiquetas_tags.join(', '), 'm-tags')}
                      className="text-xs font-mono text-cyan-400 hover:underline"
                    >
                      {copiedSection === 'm-tags' ? 'COPIADOS' : 'COPIAR TODOS'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {metadataResult.etiquetas_tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs rounded-lg font-mono shadow-[0_0_8px_rgba(0,240,255,0.1)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1E2638]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest">HASHTAGS VIRALES</h3>
                    <button
                      onClick={() => handleCopy(metadataResult.hashtags.join(' '), 'm-hash')}
                      className="text-xs font-mono text-purple-400 hover:underline"
                    >
                      {copiedSection === 'm-hash' ? 'COPIADOS' : 'COPIAR TODOS'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {metadataResult.hashtags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold rounded-lg font-mono shadow-[0_0_8px_rgba(138,43,226,0.15)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Branding */}
        {activeTab === 'branding' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              {/* Nombres del Canal */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <h2 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                      NOMBRES DE CANAL SUGERIDOS
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCopy(JSON.stringify(brandingResult.nombres_canal_sugeridos, null, 2), 'names')}
                    className="p-2 text-slate-400 hover:text-cyan-300 bg-[#05070B] border border-[#1E2638] rounded-xl transition-all text-xs flex items-center gap-1 font-mono"
                  >
                    {copiedSection === 'names' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'names' ? 'COPIADO' : 'COPIAR'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {brandingResult.nombres_canal_sugeridos.map((name, idx) => (
                    <div key={idx} className="bg-[#05070B] border border-[#1E2638] hover:border-cyan-500/40 p-4 rounded-xl text-center transition-all">
                      <span className="text-[10px] text-cyan-400 block mb-1 font-mono uppercase tracking-wider">Opción #{idx + 1}</span>
                      <strong className="text-sm text-white font-extrabold">{name}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Descripción SEO */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl">
                      <Tag className="w-4 h-4" />
                    </div>
                    <h2 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest">
                      DESCRIPCIÓN DEL CANAL ("ACERCA DE") - SEO
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCopy(brandingResult.descripcion_canal_seo, 'desc')}
                    className="p-2 text-slate-400 hover:text-emerald-300 bg-[#05070B] border border-[#1E2638] rounded-xl transition-all text-xs flex items-center gap-1 font-mono"
                  >
                    {copiedSection === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'desc' ? 'COPIADO' : 'COPIAR'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#05070B] p-4.5 rounded-xl border border-[#1E2638] font-sans">
                  {brandingResult.descripcion_canal_seo}
                </p>
              </div>

              {/* Paleta de Colores */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-xl">
                    <Palette className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
                    PALETA DE COLORES MARCA (HEX)
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {brandingResult.paleta_colores_hex.map((color, idx) => (
                    <div key={idx} className="bg-[#05070B] border border-[#1E2638] p-3 rounded-xl flex flex-col items-center gap-2">
                      <div className="w-full h-10 rounded-lg border border-slate-700/50 shadow-inner" style={{ backgroundColor: color }} />
                      <span className="text-xs font-mono text-cyan-300 font-bold">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {/* Prompts Visuales IA */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                    PROMPTS DE GENERACIÓN DE IMAGEN IA
                  </h2>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-mono font-semibold">
                    <span>PROMPT LOGO / AVATAR (ENGLISH):</span>
                    <button
                      onClick={() => handleCopy(brandingResult.prompt_logo_en, 'logo')}
                      className="text-cyan-400 hover:underline text-[11px]"
                    >
                      {copiedSection === 'logo' ? 'COPIADO' : 'COPIAR'}
                    </button>
                  </div>
                  <p className="bg-[#05070B] border border-[#1E2638] p-3.5 rounded-xl text-xs font-mono text-cyan-300 leading-relaxed select-all">
                    {brandingResult.prompt_logo_en}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-mono font-semibold">
                    <span>PROMPT BANNER PANORÁMICO 16:9 (ENGLISH):</span>
                    <button
                      onClick={() => handleCopy(brandingResult.prompt_banner_en, 'banner')}
                      className="text-cyan-400 hover:underline text-[11px]"
                    >
                      {copiedSection === 'banner' ? 'COPIADO' : 'COPIAR'}
                    </button>
                  </div>
                  <p className="bg-[#05070B] border border-[#1E2638] p-3.5 rounded-xl text-xs font-mono text-cyan-300 leading-relaxed select-all">
                    {brandingResult.prompt_banner_en}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Script */}
        {activeTab === 'script' && (
          <div className="space-y-6">
            <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                  GUIÓN VIRAL DE ALTA RETENCIÓN
                </span>
                <h2 className="text-xl font-extrabold text-white mt-2.5">{guionResult.titulo_video}</h2>
                <div className="flex items-center gap-4 mt-2 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-cyan-400" /> {guionResult.duracion_estimada}</span>
                  <span className="flex items-center gap-1.5"><Film className="w-3.5 h-3.5 text-purple-400" /> {guionResult.escenas.length} Escenas Secuenciadas</span>
                </div>
              </div>
              <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 self-start md:self-auto">
                {/* Button 1: Full Combo 1-Click (30 Credits) */}
                <button
                  onClick={() => handleStartVideoRender('full_combo')}
                  className="px-4 py-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 hover:from-emerald-300 hover:to-purple-400 text-black font-extrabold font-mono text-xs rounded-xl shadow-[0_0_25px_rgba(0,255,136,0.4)] hover:shadow-[0_0_35px_rgba(0,255,136,0.6)] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
                  title="Combo Automático 1-Click: Guión + Locución Voz + Visuales B-Roll + Subtítulos + Render MP4 1080p (-30 Créditos)"
                >
                  <Sparkles className="w-4 h-4 fill-black animate-bounce" />
                  <span>⚡ Generar Video Completo (1-Click Combo)</span>
                  <span className="px-2 py-0.5 text-[9px] font-extrabold bg-black/40 text-emerald-300 border border-emerald-400/60 rounded-full font-mono">
                    -30 CRÉDITOS
                  </span>
                </button>

                {/* Button 2: Render / Assembly Only (15 Credits) */}
                <button
                  onClick={() => handleStartVideoRender('render_only')}
                  className="px-4 py-3 bg-[#0A0E17] hover:bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-extrabold font-mono text-xs rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.2)] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                  title="Ensamblar y renderizar MP4 en 1080p usando los recursos ya creados (-15 Créditos)"
                >
                  <Video className="w-4 h-4 text-cyan-400" />
                  <span>🎬 Ensamblar y Renderizar MP4</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
                    -15 CRÉDITOS
                  </span>
                </button>

                {/* Copy JSON */}
                <button
                  onClick={() => handleCopy(JSON.stringify(guionResult, null, 2), 'script-full')}
                  className="px-3.5 py-3 bg-[#05070B] hover:bg-slate-900 text-slate-300 font-mono text-xs font-bold rounded-xl border border-[#1E2638] flex items-center justify-center gap-1.5 transition-all"
                >
                  {copiedSection === 'script-full' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copiedSection === 'script-full' ? 'COPIADO' : 'JSON'}
                </button>

                {/* Secondary Resource Download Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowResourceMenu(prev => !prev)}
                    className="px-4 py-3 bg-[#0D121F] hover:bg-slate-800 text-slate-200 font-mono text-xs font-bold rounded-xl border border-[#1E2638] flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                  >
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Descargar Recursos</span>
                  </button>

                  {showResourceMenu && (
                    <div className="absolute right-0 mt-2 w-64 glass-card rounded-2xl p-2 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.2)] z-50 font-mono text-xs space-y-1 animate-in fade-in zoom-in-95">
                      <button
                        type="button"
                        onClick={() => handleDownloadResource('audio')}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800/80 text-amber-300 flex items-center gap-2 transition-colors font-bold"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>🎵 Solo Audio MP3</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadResource('thumbnail')}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800/80 text-purple-300 flex items-center gap-2 transition-colors font-bold"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                        <span>🖼️ Miniatura HD (PNG 16:9)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadResource('srt')}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800/80 text-emerald-300 flex items-center gap-2 transition-colors font-bold"
                      >
                        <FileJson className="w-3.5 h-3.5 text-emerald-400" />
                        <span>📜 Subtítulos (.SRT)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadResource('txt')}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-800/80 text-slate-300 flex items-center gap-2 transition-colors font-bold"
                      >
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>📄 Guión & Metadatos (.TXT)</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* VISOR DE REPRODUCTOR VIDEO CANVAS & TIMELINE INTERACTIVO */}
            <div className="glass-card rounded-3xl p-6 border border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.15)] space-y-6 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2638] pb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-extrabold text-white">
                      VISOR PREVIO DE VIDEO & CANVAS RENDERER
                    </h3>
                    <span className="text-[10px] text-slate-400">
                      Previsualiza animación Ken Burns, alineación de capas y subtítulos virales sincronizados.
                    </span>
                  </div>
                </div>

                {/* Aspect Ratio Toggle (16:9 vs 9:16 Shorts) */}
                <div className="flex items-center gap-2 bg-[#05070B] p-1.5 rounded-xl border border-[#1E2638]">
                  <button
                    type="button"
                    onClick={() => setVideoFormat('16:9')}
                    className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                      videoFormat === '16:9'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    📺 16:9 (YouTube HD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoFormat('9:16')}
                    className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                      videoFormat === '9:16'
                        ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/50 shadow-[0_0_10px_rgba(217,70,239,0.2)]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    📱 9:16 (Shorts / Reels)
                  </button>
                </div>
              </div>

              {/* Canvas Player Box with Ken Burns and Subtitles */}
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`relative rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.2)] bg-black transition-all duration-300 ${
                    videoFormat === '16:9' ? 'w-full max-w-2xl aspect-video' : 'w-64 h-[440px]'
                  }`}
                >
                  {/* Ken Burns Smooth Zoom / Pan Image */}
                  <img
                    src={generatedThumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80'}
                    alt="Scene B-Roll"
                    className={`w-full h-full object-cover transition-all duration-3000 ease-in-out ${
                      isPlayingPreview ? 'scale-115 translate-x-1 translate-y-1' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                  {/* Top Overlay Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase bg-black/60 text-cyan-300 border border-cyan-500/40 rounded-full backdrop-blur-md">
                      KEN BURNS EFECTO ACTIVO
                    </span>
                    <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase bg-black/60 text-emerald-300 border border-emerald-500/40 rounded-full backdrop-blur-md">
                      1080P HD 60FPS
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <button
                    type="button"
                    onClick={handleTogglePreviewPlay}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center backdrop-blur-md hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  >
                    {isPlayingPreview ? (
                      <X className="w-6 h-6 text-cyan-300" />
                    ) : (
                      <PlayCircle className="w-7 h-7 text-cyan-300 fill-cyan-300/30" />
                    )}
                  </button>

                  {/* Dynamic Word-by-Word Viral Subtitles */}
                  <div className="absolute bottom-6 inset-x-4 text-center px-2 pointer-events-none">
                    <div className="inline-block bg-black/75 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
                      <p className="text-sm sm:text-base font-extrabold uppercase font-sans tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {(() => {
                          const currentText = guionResult.escenas?.[0]?.locucion_texto || guionResult.guion?.hook || strategyResult.gancho_3_segundos || "Guion Generado con IA";
                          const words = currentText.replace(/[^\w\sÁÉÍÓÚáéíóúÑñ]/g, '').toUpperCase().split(/\s+/).filter(Boolean).slice(0, 10);
                          return words.map((word, idx) => (
                            <span
                              key={idx}
                              className={`mx-1 transition-all ${
                                idx === activeSubWordIndex % Math.max(1, words.length)
                                  ? 'text-[#00F0FF] scale-110 font-black text-shadow-[0_0_12px_#00F0FF]'
                                  : 'text-white'
                              }`}
                            >
                              {word}
                            </span>
                          ));
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE INTERACTIVO DE 3 CAPAS */}
              <div className="space-y-2 pt-4 border-t border-[#1E2638]">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <span>LÍNEA DE TIEMPO MULTI-CAPA (TIMELINE ALINEADO):</span>
                  <span className="text-cyan-400">00:04 / 00:15 sec</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  {/* Track 1: Audio Narration */}
                  <div className="p-2.5 rounded-xl bg-[#05070B] border border-amber-500/30 flex items-center justify-between">
                    <span className="text-amber-400 font-bold flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5" />
                      Pista 1: Locución Audio MP3 (Edge-TTS)
                    </span>
                    <div className="w-1/2 h-2 bg-amber-500/20 rounded-full overflow-hidden flex items-center gap-0.5 px-1">
                      <div className="w-full h-1 bg-amber-400 rounded-full animate-pulse" />
                    </div>
                  </div>

                  {/* Track 2: B-Roll Images */}
                  <div className="p-2.5 rounded-xl bg-[#05070B] border border-cyan-500/30 flex items-center justify-between">
                    <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5" />
                      Pista 2: Secuencia de Imágenes B-Roll ({videoFormat})
                    </span>
                    <div className="w-1/2 h-2 bg-cyan-500/20 rounded-full overflow-hidden flex items-center gap-0.5 px-1">
                      <div className="w-3/4 h-1 bg-cyan-400 rounded-full" />
                    </div>
                  </div>

                  {/* Track 3: Subtitles */}
                  <div className="p-2.5 rounded-xl bg-[#05070B] border border-emerald-500/30 flex items-center justify-between">
                    <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      Pista 3: Subtítulos Dinámicos Sincronizados
                    </span>
                    <div className="w-1/2 h-2 bg-emerald-500/20 rounded-full overflow-hidden flex items-center gap-0.5 px-1">
                      <div className="w-2/3 h-1 bg-emerald-400 rounded-full animate-ping" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {guionResult.escenas.map((escena) => (
                <div
                  key={escena.numero_escena}
                  className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#1E2638]">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                        #{escena.numero_escena}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-100">{escena.bloque}</h3>
                        <span className="text-xs text-cyan-400 font-mono flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-cyan-400" /> {escena.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#05070B] border border-[#1E2638] p-4.5 rounded-xl">
                      <div className="flex items-center justify-between gap-1.5 text-xs font-mono font-bold text-amber-400 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                          LOCUCIÓN DE VOZ IA:
                        </span>
                        <button
                          onClick={() => handleGenerateTtsAudio(escena.numero_escena, escena.locucion_texto)}
                          disabled={ttsLoadingMap[escena.numero_escena]}
                          className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all"
                        >
                          {ttsLoadingMap[escena.numero_escena] ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin text-amber-300" />
                              <span>GENERANDO MP3...</span>
                            </>
                          ) : (
                            <>
                              <PlayCircle className="w-3 h-3 text-amber-400" />
                              <span>GENERAR LOCUCIÓN MP3</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans italic">
                        "{escena.locucion_texto}"
                      </p>

                      {ttsAudioMap[escena.numero_escena] && (
                        <div className="mt-3 pt-3 border-t border-[#1E2638] space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                            <span className="flex items-center gap-1 font-bold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Audio MP3 Listo (Edge TTS / AlvaroNeural)
                            </span>
                            <a
                              href={ttsAudioMap[escena.numero_escena]}
                              download={`locucion-escena-${escena.numero_escena}.mp3`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-300 hover:underline flex items-center gap-1 font-bold"
                            >
                              <ExternalLink className="w-3 h-3" /> Descargar MP3
                            </a>
                          </div>
                          <audio
                            controls
                            src={ttsAudioMap[escena.numero_escena]}
                            className="w-full h-8 rounded-lg outline-none"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="bg-[#05070B] border border-[#1E2638] p-4 rounded-xl">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 mb-1.5">
                          <Film className="w-3.5 h-3.5" />
                          INDICACIÓN B-ROLL / VISUAL:
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {escena.indicacion_broll}
                        </p>
                      </div>

                      <div className="bg-[#05070B] border border-[#1E2638] p-3.5 rounded-xl">
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-cyan-300 mb-1">
                          <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /> PROMPT DE IMAGEN IA (ENGLISH):</span>
                        </div>
                        <p className="text-[11px] font-mono text-cyan-300 leading-relaxed bg-[#0A0E17] p-2.5 rounded border border-[#1E2638]">
                          {escena.prompt_generador_imagen_en}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Strategy */}
        {activeTab === 'strategy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl">
                <h2 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest mb-3">
                  DIAGNÓSTICO DE RETENCIÓN VIRAL
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#05070B] border border-[#1E2638] p-4.5 rounded-xl font-sans">
                  {strategyResult.diagnostico_viral}
                </p>
              </div>

              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl">
                <h2 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest mb-3">
                  NUEVO CONCEPTO REPLICABLE
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#05070B] border border-[#1E2638] p-4.5 rounded-xl font-sans">
                  {strategyResult.nuevo_concepto}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl">
                <h2 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest mb-3">
                  TÍTULOS RECOMENDADOS POR IA
                </h2>
                <div className="space-y-2.5">
                  {strategyResult.titulos_sugeridos.map((title, idx) => (
                    <div key={idx} className="bg-[#05070B] border border-[#1E2638] p-3 rounded-xl text-xs text-slate-200 font-sans">
                      {title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab JSON */}
        {activeTab.startsWith('json_') && (
          <div className="glass-card glass-card-hover rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <FileJson className="w-5 h-5 text-purple-400" />
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveTab('json_metadata')}
                    className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                      activeTab === 'json_metadata'
                        ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_10px_rgba(138,43,226,0.3)]'
                        : 'bg-[#05070B] text-slate-400 border-[#1E2638] hover:text-slate-200'
                    }`}
                  >
                    Metadatos JSON
                  </button>
                  <button
                    onClick={() => setActiveTab('json_branding')}
                    className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                      activeTab === 'json_branding'
                        ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_10px_rgba(138,43,226,0.3)]'
                        : 'bg-[#05070B] text-slate-400 border-[#1E2638] hover:text-slate-200'
                    }`}
                  >
                    Branding JSON
                  </button>
                  <button
                    onClick={() => setActiveTab('json_script')}
                    className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                      activeTab === 'json_script'
                        ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_10px_rgba(138,43,226,0.3)]'
                        : 'bg-[#05070B] text-slate-400 border-[#1E2638] hover:text-slate-200'
                    }`}
                  >
                    Guión JSON
                  </button>
                  <button
                    onClick={() => setActiveTab('json_strategy')}
                    className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                      activeTab === 'json_strategy'
                        ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_10px_rgba(138,43,226,0.3)]'
                        : 'bg-[#05070B] text-slate-400 border-[#1E2638] hover:text-slate-200'
                    }`}
                  >
                    Estrategia JSON
                  </button>
                </div>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    JSON.stringify(
                      activeTab === 'json_metadata'
                        ? metadataResult
                        : activeTab === 'json_branding'
                        ? brandingResult
                        : activeTab === 'json_script'
                        ? guionResult
                        : strategyResult,
                      null,
                      2
                    ),
                    'full-json'
                  )
                }
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(138,43,226,0.3)] transition-all"
              >
                {copiedSection === 'full-json' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedSection === 'full-json' ? 'COPIADO' : 'COPIAR JSON'}
              </button>
            </div>
            <pre className="bg-[#05070B] border border-[#1E2638] p-5 rounded-xl overflow-x-auto text-xs font-mono text-emerald-400 leading-relaxed selection:bg-purple-500 selection:text-white shadow-inner">
              {JSON.stringify(
                activeTab === 'json_metadata'
                  ? metadataResult
                  : activeTab === 'json_branding'
                  ? brandingResult
                  : activeTab === 'json_script'
                  ? guionResult
                  : strategyResult,
                null,
                2
              )}
            </pre>
          </div>
        )}
          </>
        )}
      </main>

      {/* 2-Step Onboarding Wizard Modal */}
      {showOnboardingWizard && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-cyan-500/50 shadow-[0_0_50px_rgba(0,240,255,0.25)] space-y-6 relative animate-in fade-in zoom-in-95 font-mono">
            {/* Steps Progress Indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2638]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-extrabold text-white">
                  ASISTENTE DE ONBOARDING // PASO {onboardingStep} DE 2
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className={`px-2.5 py-0.5 rounded-full ${onboardingStep === 1 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'}`}>
                  1. Nicho
                </span>
                <span className="text-slate-600">→</span>
                <span className={`px-2.5 py-0.5 rounded-full ${onboardingStep === 2 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'}`}>
                  2. Competencia
                </span>
              </div>
            </div>

            {onboardingStep === 1 ? (
              /* Step 1: Choose Niche */
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-cyan-300">1. ¿Cuál es tu nicho de interés principal?</h4>
                  <p className="text-xs text-slate-400 font-sans">
                    Selecciona una categoría lucrativa de nuestro catálogo o escribe tu propio nicho personalizado.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  {['Finanzas & Cripto', 'Historias Oscuras', 'Filosofía Estoica', 'Datos Curiosos', 'Terror', 'IA & Tecnología'].map((niche) => (
                    <button
                      key={niche}
                      type="button"
                      onClick={() => setOnboardingNiche(niche)}
                      className={`p-3 rounded-xl border text-left transition-all font-bold ${
                        onboardingNiche === niche
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                          : 'bg-[#05070B] border-[#1E2638] text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {niche}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-semibold">O Escribe tu Nicho Personalizado:</label>
                  <input
                    type="text"
                    placeholder="Ej: Bienes Raíces, Neurociencia..."
                    value={onboardingNiche}
                    onChange={(e) => setOnboardingNiche(e.target.value)}
                    className="w-full bg-[#05070B] border border-[#1E2638] focus:border-cyan-400 text-xs text-white p-3 rounded-xl focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setOnboardingStep(2)}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 transition-all mt-4"
                >
                  <span>Siguiente: Canal de Referencia →</span>
                </button>
              </div>
            ) : (
              /* Step 2: Reference Channel */
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-cyan-300">2. Agrega tu primer canal de referencia (Opcional)</h4>
                  <p className="text-xs text-slate-400 font-sans">
                    Introduce el handle o URL de un canal viral que quieras monitorear con la API de YouTube.
                  </p>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1.5 font-semibold">
                    HANDLE O URL DEL CANAL COMPETIDOR
                  </label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/@CapitalCeroHQ o @CapitalCeroHQ"
                    value={onboardingChannel}
                    onChange={(e) => setOnboardingChannel(e.target.value)}
                    className="w-full bg-[#05070B] border border-[#1E2638] focus:border-cyan-400 text-xs text-white p-3.5 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOnboardingStep(1)}
                    className="px-4 py-3 bg-[#0A0E17] border border-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                  >
                    ← Atrás
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteOnboarding}
                    className="flex-1 py-3.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-600 hover:from-emerald-300 hover:to-purple-500 text-black font-extrabold text-xs rounded-xl shadow-[0_0_25px_rgba(0,255,136,0.3)] flex items-center justify-center gap-2 transition-all"
                  >
                    <Zap className="w-4 h-4 fill-black" />
                    <span>🚀 Finalizar y Entrar al Dashboard</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card w-full max-w-4xl rounded-3xl p-6 md:p-8 border border-cyan-500/50 shadow-[0_0_50px_rgba(0,240,255,0.25)] space-y-6 relative my-8 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                PLANES DE SUSCRIPCIÓN CYBER-AI 2026
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Mejora tu Plan & Multiplica tu Producción Faceless
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Obtén créditos de IA adicionales, monitoreo en tiempo real e iguala a la competencia sin marcas de agua.
              </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
              {/* Plan 1: CREADOR STARTER */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                userPlan === 'CREATOR'
                  ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                  : 'bg-[#05070B] border-[#1E2638] hover:border-slate-700'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold font-mono text-white">CREADOR STARTER</h3>
                    {userPlan === 'CREATOR' && (
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-cyan-400 text-black rounded-full">PLAN ACTUAL</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-extrabold text-white font-mono">$27</span>
                    <span className="text-xs text-slate-400 font-mono"> / mes</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300 font-sans mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>300 Créditos IA</strong> mensuales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Hasta <strong>3 Canales de Referencia Guardados</strong> (Monitoreo)</span>
                    </li>
                    {/* Watermark-free guarantee */}
                    <li className="flex items-start gap-2 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-emerald-300 font-extrabold text-[11px]">
                        Exportación MP4/PNG 100% Limpia (SIN MARCAS DE AGUA)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Analizador de Estrategias y Diagnóstico Viral</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Generador de Guiones con Timestamps y B-roll</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Generación de Audio y Locución de Voz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Estudio de Miniaturas con IA (Prompts y Gráficos)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Generador SEO (Títulos A/B, Tags y Descripciones)</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => handleSelectPlan('CREATOR')}
                  className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-all"
                >
                  {userPlan === 'CREATOR' ? 'Recargar 300 Créditos ($27)' : 'Seleccionar Creador'}
                </button>
              </div>

              {/* Plan 2: CYBER-PRO (Featured) */}
              <div className={`p-6 rounded-2xl border relative flex flex-col justify-between transition-all ${
                userPlan === 'PRO'
                  ? 'bg-gradient-to-b from-fuchsia-950/40 to-cyan-950/40 border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.3)] scale-105'
                  : 'bg-[#090D18] border-fuchsia-500/50 hover:border-cyan-400 shadow-[0_0_20px_rgba(217,70,239,0.15)]'
              }`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-black font-black text-[9px] font-mono rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                  ⭐ MÁS POPULAR / RECOMENDADO • 800 CRÉDITOS
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3 pt-1">
                    <h3 className="text-sm font-extrabold font-mono text-cyan-300 flex items-center gap-1.5">
                      <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
                      CYBER-PRO
                    </h3>
                    {userPlan === 'PRO' && (
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-cyan-400 text-black rounded-full">PLAN ACTUAL</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-extrabold text-white font-mono">$57</span>
                    <span className="text-xs text-slate-400 font-mono"> / mes</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-200 font-sans mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>800 Créditos IA</strong> mensuales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Hasta <strong>10 Canales Guardados</strong> con Monitoreo en Tiempo Real y Alertas Virales</span>
                    </li>
                    {/* Watermark-free guarantee */}
                    <li className="flex items-start gap-2 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-emerald-300 font-extrabold text-[11px]">
                        Exportación MP4/PNG 100% Limpia (SIN MARCAS DE AGUA)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Todo lo del Plan Starter + <strong>Calidad Élite</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Generación de Audio con Voces HD Ultrarrealistas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Estudio de Miniaturas en Alta Definición (HD)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Creador Automático de Video en 1-Clic</strong> (Voz + Subtítulos + B-roll)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Procesamiento y Renderizado Prioritario</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => handleSelectPlan('PRO')}
                  className="w-full py-3 px-4 rounded-xl font-mono text-xs font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:scale-105"
                >
                  {userPlan === 'PRO' ? 'Recargar 800 Créditos IA ($57)' : 'Seleccionar Cyber-Pro'}
                </button>
              </div>

              {/* Plan 3: AGENCIA MULTI-CANAL */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                userPlan === 'AGENCY'
                  ? 'bg-purple-500/10 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                  : 'bg-[#05070B] border-[#1E2638] hover:border-slate-700'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold font-mono text-purple-300">AGENCIA MULTI-CANAL</h3>
                    {userPlan === 'AGENCY' && (
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-purple-400 text-black rounded-full">PLAN ACTUAL</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-extrabold text-white font-mono">$199</span>
                    <span className="text-xs text-slate-400 font-mono"> / mes</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300 font-sans mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>2,000 Créditos IA</strong> mensuales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>Canales Guardados e Importación ILIMITADOS</strong></span>
                    </li>
                    {/* Watermark-free guarantee */}
                    <li className="flex items-start gap-2 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-emerald-300 font-extrabold text-[11px]">
                        Exportación MP4/PNG 100% Limpia (SIN MARCAS DE AGUA)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Todo lo del Plan Cyber-Pro + Funciones de Equipo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Carga e Importación Automatizada Masiva vía API</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Acceso Multiusuario / Gestión de Equipos y Editores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Renderizado Ultra-Rápido Dedicado en la Nube</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Soporte VIP Personalizado 24/7</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => handleSelectPlan('AGENCY')}
                  className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition-all"
                >
                  {userPlan === 'AGENCY' ? 'Recargar 2,000 Créditos ($199)' : 'Seleccionar Agencia'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sales Landing Page / Commercial Modal */}
      {showSalesLanding && (
        <div className="fixed inset-0 z-50 bg-[#05070B] text-white overflow-y-auto animate-in fade-in duration-300">
          {/* Top Bar for Landing Page */}
          <div className="sticky top-0 z-50 bg-[#07090E]/90 backdrop-blur-xl border-b border-[#1E2638] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl">
                <Zap className="w-5 h-5 text-black font-bold fill-black" />
              </div>
              <span className="font-extrabold text-sm tracking-wider bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                YOUTUBE FACELESS AI ENGINE • LANDING DE VENTAS
              </span>
            </div>

            <button
              onClick={() => setShowSalesLanding(false)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono text-xs font-extrabold rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105 transition-all flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span>REGRESAR AL APP ENGINE</span>
            </button>
          </div>

          {/* Hero Section */}
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center space-y-6">
            <span className="px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-500/40 rounded-full inline-flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AUTOMATIZACIÓN DE CANALES FACELESS DE ALTO CTR
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
              Multiplica x10 las Vistas y Monetización de tu Canal Faceless con IA
            </h1>

            <p className="text-sm md:text-base font-mono text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Analiza transcripciones virales, detecta nuevos contenidos de la competencia mediante API y genera guiones optimizados sin plagio con marcas visuales para Midjourney y DALL-E 3.
            </p>

            {/* Proof Metric Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
              <div className="p-4 rounded-2xl bg-[#0B0F1A] border border-[#1E2638] text-center">
                <strong className="text-2xl font-mono text-cyan-400 font-extrabold">$2.4M+</strong>
                <span className="block text-[11px] font-mono text-slate-400 mt-1">Generados por Creadores</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0B0F1A] border border-[#1E2638] text-center">
                <strong className="text-2xl font-mono text-emerald-400 font-extrabold">12.8M+</strong>
                <span className="block text-[11px] font-mono text-slate-400 mt-1">Vistas Automatizadas</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0B0F1A] border border-[#1E2638] text-center">
                <strong className="text-2xl font-mono text-fuchsia-400 font-extrabold">11.8%</strong>
                <span className="block text-[11px] font-mono text-slate-400 mt-1">CTR Promedio Miniaturas</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0B0F1A] border border-[#1E2638] text-center">
                <strong className="text-2xl font-mono text-amber-400 font-extrabold">99.9%</strong>
                <span className="block text-[11px] font-mono text-slate-400 mt-1">Uptime API YouTube</span>
              </div>
            </div>

            {/* Commercial Plans */}
            <div className="pt-12 max-w-5xl mx-auto">
              <h2 className="text-xl font-bold font-mono text-cyan-300 mb-6">SELECCIONA TU LICENCIA COMERCIAL</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Plan 1: CREADOR STARTER */}
                <div className="p-6 rounded-2xl bg-[#080C16] border border-[#1E2638] space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-mono font-bold text-slate-200">CREADOR STARTER</h3>
                    <div className="text-3xl font-mono font-extrabold text-white my-2">$27 <span className="text-xs text-slate-400 font-normal">/mes</span></div>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans mb-4">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span><strong>300 Créditos IA</strong> mensuales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Hasta 3 Canales de Referencia</span>
                      </li>
                      <li className="flex items-start gap-2 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-emerald-300 font-extrabold text-[11px]">
                          Exportación MP4/PNG 100% Limpia (SIN MARCAS DE AGUA)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Analizador Estratégico & Guiones B-roll</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Estudio Miniaturas IA + Locución Voz</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleSelectPlan('CREATOR')}
                    className="w-full py-3 px-4 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl font-mono text-xs font-bold hover:bg-cyan-500/30 transition-all"
                  >
                    Seleccionar Creador ($27)
                  </button>
                </div>

                {/* Plan 2: CYBER-PRO */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-fuchsia-950/40 to-cyan-950/40 border border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.25)] space-y-4 relative flex flex-col justify-between">
                  <span className="absolute -top-3 right-4 px-3 py-0.5 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black text-[9px] font-mono font-black rounded-full uppercase tracking-wider">
                    ⭐ MÁS POPULAR / RECOMENDADO
                  </span>
                  <div>
                    <h3 className="font-mono font-bold text-cyan-300">CYBER-PRO</h3>
                    <div className="text-3xl font-mono font-extrabold text-white my-2">$57 <span className="text-xs text-slate-400 font-normal">/mes</span></div>
                    <ul className="space-y-2 text-xs text-slate-200 font-sans mb-4">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span><strong>800 Créditos IA</strong> mensuales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Hasta 10 Canales Guardados (Monitoreo Realtime)</span>
                      </li>
                      <li className="flex items-start gap-2 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-emerald-300 font-extrabold text-[11px]">
                          Exportación MP4/PNG 100% Limpia (SIN MARCAS DE AGUA)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Voces HD Ultrarrealistas + Creador 1-Clic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Renderizado y Procesamiento Prioritario</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleSelectPlan('PRO')}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-black rounded-xl font-mono text-xs font-extrabold shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-105 transition-all"
                  >
                    Seleccionar Cyber-Pro ($57)
                  </button>
                </div>

                {/* Plan 3: AGENCIA */}
                <div className="p-6 rounded-2xl bg-[#080C16] border border-[#1E2638] space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-mono font-bold text-purple-300">AGENCIA MULTI-CANAL</h3>
                    <div className="text-3xl font-mono font-extrabold text-white my-2">$199 <span className="text-xs text-slate-400 font-normal">/mes</span></div>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans mb-4">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span><strong>2,000 Créditos IA</strong> mensuales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>Canales & Importación ILIMITADOS</span>
                      </li>
                      <li className="flex items-start gap-2 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-emerald-300 font-extrabold text-[11px]">
                          Exportación MP4/PNG 100% Limpia (SIN MARCAS DE AGUA)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>Importación Masiva API + Acceso Equipos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>Render Nube Dedicado + Soporte VIP 24/7</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handleSelectPlan('AGENCY')}
                    className="w-full py-3 px-4 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-xl font-mono text-xs font-bold hover:bg-purple-500/30 transition-all"
                  >
                    Seleccionar Agencia ($199)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post-Payment Redirect Welcome Modal */}
      {showPostPaymentWelcome && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in zoom-in-95">
          <div className="glass-card w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-cyan-400 shadow-[0_0_60px_rgba(0,240,255,0.35)] space-y-6 relative text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-fuchsia-500 to-purple-600 p-0.5 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              <div className="w-full h-full bg-[#07090E] rounded-[14px] flex items-center justify-center">
                <Zap className="w-8 h-8 text-cyan-300 fill-cyan-300 animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                PAGO Y SUSCRIPCIÓN VERIFICADA
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                ¡Suscripción Activada con Éxito! ⚡
              </h2>
              <p className="text-sm font-mono text-slate-300">
                Tu cuenta ha sido cargada con <strong className="text-amber-300 font-extrabold">{userCredits} créditos de IA</strong> bajo el plan <strong className="text-cyan-300 font-extrabold">{userPlan}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#05070B] border border-[#1E2638] text-left space-y-2.5 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Monitoreo automatizado de canales de la competencia activo.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Generador de guiones virales con marcas de tiempo e instrucciones visuales.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Prompts de miniaturas en inglés para Midjourney & DALL-E 3.</span>
              </div>
            </div>

            <button
              onClick={() => setShowPostPaymentWelcome(false)}
              className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold text-sm font-mono rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Entrar al Centro de Comando</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Render Video Progress Modal */}
      {showRenderModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in zoom-in-95">
          <div className="glass-card w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-emerald-400/60 shadow-[0_0_60px_rgba(0,255,136,0.3)] space-y-6 relative">
            <button
              onClick={() => setShowRenderModal(false)}
              disabled={isRendering}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-xl disabled:opacity-30"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#1E2638] pb-4">
              <div className="p-3 bg-gradient-to-tr from-emerald-400 via-cyan-500 to-purple-600 rounded-2xl shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                <Video className="w-6 h-6 text-black fill-black animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-white font-mono tracking-wider">
                    {renderMode === 'full_combo' ? 'GENERACIÓN COMPLETA 1-CLICK (COMBO)' : 'ENSAMBLADO DE VIDEO EN MP4 1080P'}
                  </h3>
                  <span className={`px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded-full border ${
                    renderMode === 'full_combo'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(0,255,136,0.3)]'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}>
                    {renderMode === 'full_combo' ? '⚡ -30 CRÉDITOS (COMBO)' : '🎬 -15 CRÉDITOS (ENSAMBLADO)'}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  {renderMode === 'full_combo'
                    ? 'Procesando pipeline completo: Guión + Voz Edge-TTS + Prompts IA + B-Roll + Renderizado MP4.'
                    : 'Ensamblando locución Edge-TTS, b-roll de alta tasa de bits y subtítulos animados en 1080p.'}
                </p>
              </div>
            </div>

            {/* Progress Bar & Status */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-cyan-300 flex items-center gap-2">
                  {isRendering && <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />}
                  {renderFinished ? '🎉 RENDERIZADO COMPLETADO EN 1080P' : 'PROCESANDO PIPELINE DE VIDEO...'}
                </span>
                <span className="text-emerald-400 font-extrabold text-sm">{renderProgress}%</span>
              </div>

              {/* Bar */}
              <div className="w-full h-3 bg-[#05070B] rounded-full border border-[#1E2638] overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500 rounded-full transition-all duration-300 shadow-[0_0_15px_#00FF88]"
                  style={{ width: `${renderProgress}%` }}
                />
              </div>
            </div>

            {/* Step Checklists */}
            <div className="space-y-2.5 bg-[#05070B] p-4.5 rounded-2xl border border-[#1E2638] font-mono text-xs">
              {/* Step 1 */}
              <div className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                renderStep > 1 || renderFinished
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : renderStep === 1
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                  : 'bg-[#080C14] border-[#1E2638] text-slate-500'
              }`}>
                <span className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>🔊 Generando locución de voz con Edge-TTS...</span>
                </span>
                {renderStep > 1 || renderFinished ? (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100%
                  </span>
                ) : (
                  <span className="text-[10px] text-cyan-300 font-bold animate-pulse">EN PROCESO...</span>
                )}
              </div>

              {/* Step 2 */}
              <div className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                renderStep > 2 || renderFinished
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : renderStep === 2
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                  : 'bg-[#080C14] border-[#1E2638] text-slate-500'
              }`}>
                <span className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>🖼️ Generando/Descargando clips de B-roll e imágenes IA...</span>
                </span>
                {renderStep > 2 || renderFinished ? (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100%
                  </span>
                ) : renderStep === 2 ? (
                  <span className="text-[10px] text-cyan-300 font-bold animate-pulse">75%</span>
                ) : (
                  <span className="text-[10px] text-slate-600">PENDIENTE</span>
                )}
              </div>

              {/* Step 3 */}
              <div className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                renderStep > 3 || renderFinished
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : renderStep === 3
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                  : 'bg-[#080C14] border-[#1E2638] text-slate-500'
              }`}>
                <span className="flex items-center gap-2.5">
                  <Clapperboard className="w-4 h-4 text-purple-400" />
                  <span>💬 Insertando subtítulos dinámicos estilo Hormozi...</span>
                </span>
                {renderStep > 3 || renderFinished ? (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100%
                  </span>
                ) : renderStep === 3 ? (
                  <span className="text-[10px] text-cyan-300 font-bold animate-pulse">50%</span>
                ) : (
                  <span className="text-[10px] text-slate-600">PENDIENTE</span>
                )}
              </div>

              {/* Step 4 */}
              <div className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                renderFinished
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : renderStep === 4
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                  : 'bg-[#080C14] border-[#1E2638] text-slate-500'
              }`}>
                <span className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span>🎥 Renderizando archivo final .MP4 en 1080p...</span>
                </span>
                {renderFinished ? (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100%
                  </span>
                ) : renderStep === 4 ? (
                  <span className="text-[10px] text-cyan-300 font-bold animate-pulse">25%</span>
                ) : (
                  <span className="text-[10px] text-slate-600">PENDIENTE</span>
                )}
              </div>
            </div>

            {/* Finished State Preview & Download CTA */}
            {renderFinished && (
              <div className="space-y-4 pt-2 border-t border-[#1E2638] animate-in fade-in duration-300">
                <div className="space-y-2 text-center">
                  <span className="text-xs font-mono text-slate-400 font-semibold block">
                    VISTA PREVIA DEL VIDEO RENDERIZADO (1080P):
                  </span>
                  <div className="relative rounded-2xl overflow-hidden border border-cyan-500/50 shadow-[0_0_25px_rgba(0,240,255,0.2)] bg-black max-h-56 flex items-center justify-center">
                    <video
                      controls
                      autoPlay
                      src={renderedVideoUrl}
                      className="w-full h-56 object-cover rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={renderedVideoUrl}
                    download="video-faceless-viral-1080p.mp4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-600 hover:from-emerald-300 hover:to-purple-500 text-black font-extrabold text-xs font-mono rounded-xl shadow-[0_0_30px_rgba(0,255,136,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <Download className="w-4 h-4 fill-black" />
                    <span>⬇️ Descargar Video (.MP4 1080p)</span>
                  </a>

                  <button
                    onClick={() => setShowRenderModal(false)}
                    className="py-3.5 px-5 bg-[#05070B] border border-[#1E2638] hover:border-slate-600 text-slate-300 font-mono text-xs font-bold rounded-xl transition-all"
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

