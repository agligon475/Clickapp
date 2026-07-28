-- Script SQL para crear la tabla de credenciales por tienda en Supabase
CREATE TABLE IF NOT EXISTS public.store_credentials (
    store_id text PRIMARY KEY,
    supabase_url text DEFAULT 'https://iaylgsthwildjkiiwgfd.supabase.co',
    supabase_key text,
    cloudinary_name text DEFAULT 'deuog0r34',
    cloudinary_preset text DEFAULT 'daletepido_preset',
    ai_provider text DEFAULT 'gemini',
    claude_key text,
    claude_model text DEFAULT 'claude-haiku-4-5-20251001',
    gemini_key text,
    gemini_model text DEFAULT 'gemini-2.5-flash',
    updated_at timestamp with time zone DEFAULT now()
);

-- Habilitar Row Level Security (RLS) y políticas de lectura/escritura pública
ALTER TABLE public.store_credentials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read store_credentials" ON public.store_credentials;
CREATE POLICY "Public read store_credentials" ON public.store_credentials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public all store_credentials" ON public.store_credentials;
CREATE POLICY "Public all store_credentials" ON public.store_credentials FOR ALL USING (true);

-- Insertar filas por defecto para las tiendas principales
INSERT INTO public.store_credentials (store_id, cloudinary_name, cloudinary_preset, ai_provider)
VALUES 
    ('elquesabepoco', 'deuog0r34', 'daletepido_preset', 'gemini'),
    ('ferre-now', 'deuog0r34', 'daletepido_preset', 'gemini'),
    ('cocostore', 'deuog0r34', 'daletepido_preset', 'gemini'),
    ('ferreteria-demo', 'deuog0r34', 'daletepido_preset', 'gemini'),
    ('noutacc', 'deuog0r34', 'daletepido_preset', 'gemini')
ON CONFLICT (store_id) DO NOTHING;
