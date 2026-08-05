-- Tabla para almacenar las plantillas personalizadas de email en Supabase
CREATE TABLE IF NOT EXISTS public.email_templates (
  id TEXT PRIMARY KEY,
  subject TEXT,
  greeting TEXT,
  badge_text TEXT,
  body_text TEXT,
  btn_text TEXT,
  btn_url TEXT,
  header_logo_url TEXT,
  extra_content TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS y políticas
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read email_templates" ON public.email_templates;
CREATE POLICY "Allow read email_templates" ON public.email_templates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow write email_templates" ON public.email_templates;
CREATE POLICY "Allow write email_templates" ON public.email_templates FOR ALL USING (true);
