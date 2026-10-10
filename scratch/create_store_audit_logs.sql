-- Script SQL: Tabla de Auditoría de Accesos, Seguridad y Actividad para Clickapp
-- Ejecutar en el SQL Editor de Supabase (Dashboard de Supabase)

CREATE TABLE IF NOT EXISTS public.store_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    details TEXT,
    device TEXT DEFAULT 'Navegador Web',
    ip TEXT DEFAULT '—',
    status TEXT DEFAULT 'Normal',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsqueda rápida por tienda y fecha
CREATE INDEX IF NOT EXISTS idx_store_audit_logs_store_id ON public.store_audit_logs(store_id);
CREATE INDEX IF NOT EXISTS idx_store_audit_logs_created_at ON public.store_audit_logs(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.store_audit_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso
DROP POLICY IF EXISTS "Permitir insercion anonima en store_audit_logs" ON public.store_audit_logs;
CREATE POLICY "Permitir insercion anonima en store_audit_logs" 
ON public.store_audit_logs FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura en store_audit_logs" ON public.store_audit_logs;
CREATE POLICY "Permitir lectura en store_audit_logs" 
ON public.store_audit_logs FOR SELECT TO anon USING (true);

COMMENT ON TABLE public.store_audit_logs IS 'Registro histórico de eventos de auditoría, logins y operaciones críticas de cada tienda';
