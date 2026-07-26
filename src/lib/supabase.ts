import { createClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;

const supabaseUrl = metaEnv?.VITE_SUPABASE_URL || 'https://mock-project.supabase.co';
const supabaseAnonKey = metaEnv?.VITE_SUPABASE_ANON_KEY || 'mock-key-cyberpunk-2026';

export const isSupabaseConfigured = () => {
  return !!(metaEnv?.VITE_SUPABASE_URL && metaEnv?.VITE_SUPABASE_ANON_KEY);
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
