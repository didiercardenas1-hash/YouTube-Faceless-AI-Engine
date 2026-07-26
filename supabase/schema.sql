-- ========================================================
-- YOUTUBE FACELESS AI ENGINE - SUPABASE / POSTGRESQL SCHEMA
-- Persistent Architecture for Subscriptions, Users & Projects
-- ========================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. LICENSES TABLE (Códigos de Licencia Pro & VIP)
CREATE TABLE IF NOT EXISTS public.license_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key_code VARCHAR(100) UNIQUE NOT NULL,
  plan VARCHAR(50) NOT NULL DEFAULT 'PRO', -- 'CREATOR', 'PRO', 'AGENCY'
  credits INT NOT NULL DEFAULT 800,
  max_uses INT NOT NULL DEFAULT 1,
  current_uses INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. USERS TABLE (Perfil de Usuario, Suscripción y Créditos Persistentes)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL, -- Strict uniqueness constraint for account persistence
  stripe_customer_id VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  role VARCHAR(20) NOT NULL DEFAULT 'user', -- 'user' or 'admin'
  plan VARCHAR(50) NOT NULL DEFAULT 'PRO', -- 'CREATOR' ($27), 'PRO' ($57), 'AGENCY' ($199)
  credits INT NOT NULL DEFAULT 800,
  max_credits INT NOT NULL DEFAULT 800,
  subscription_status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'inactive', 'past_due', 'canceled'
  current_period_end TIMESTAMP WITH TIME ZONE,
  license_key_used VARCHAR(100) REFERENCES public.license_keys(key_code),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PROJECTS TABLE (Proyectos Creados: Guiones, Audios, Miniaturas y Videos)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE, -- Linked 1-to-N relation
  title VARCHAR(255) NOT NULL,
  niche VARCHAR(255),
  script_json JSONB,
  audio_url TEXT,
  thumbnail_prompts JSONB,
  video_url TEXT,
  watermark_free BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SAVED CHANNELS TABLE (Canales Guardados y Rastreo API)
CREATE TABLE IF NOT EXISTS public.saved_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE, -- Linked 1-to-N relation
  nombre VARCHAR(255) NOT NULL,
  nicho VARCHAR(255) NOT NULL,
  handle VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  subscriptores VARCHAR(50) DEFAULT '100K+',
  videos_procesados INT DEFAULT 0,
  tiene_nuevo_video BOOLEAN DEFAULT FALSE,
  ctr_promedio VARCHAR(20) DEFAULT '11.5%',
  ultimo_video_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. SYSTEM USAGE LOGS TABLE (Monitoreo de Consumo Global API)
CREATE TABLE IF NOT EXISTS public.system_usage_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  endpoint VARCHAR(100) NOT NULL,
  credits_deducted INT DEFAULT 0,
  gemini_tokens_used INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'SUCCESS',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_usage_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read/insert for license activation flow
CREATE POLICY "Allow public select active license_keys" ON public.license_keys
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Allow user read own data" ON public.users
  FOR ALL USING (TRUE);

CREATE POLICY "Allow user read own projects" ON public.projects
  FOR ALL USING (TRUE);

CREATE POLICY "Allow user read own channels" ON public.saved_channels
  FOR ALL USING (TRUE);

CREATE POLICY "Allow admin full access license_keys" ON public.license_keys
  FOR ALL USING (TRUE);

-- SEED INITIAL DATA (Licencias de Demostración & Usuario Admin)
INSERT INTO public.license_keys (key_code, plan, credits, max_uses, current_uses, is_active)
VALUES
  ('CYBER-2026-X94F-8821', 'PRO', 800, 100, 0, TRUE),
  ('VIP-CYBER-2026-X89K', 'AGENCY', 2000, 50, 0, TRUE),
  ('CREATOR-2026-FREE-01', 'CREATOR', 300, 200, 0, TRUE)
ON CONFLICT (key_code) DO NOTHING;

INSERT INTO public.users (email, role, plan, credits, max_credits, subscription_status, license_key_used)
VALUES
  ('admin@facelessai.io', 'admin', 'AGENCY', 2000, 2000, 'active', 'VIP-CYBER-2026-X89K'),
  ('didier@facelessai.io', 'user', 'PRO', 750, 800, 'active', 'CYBER-2026-X94F-8821')
ON CONFLICT (email) DO NOTHING;
