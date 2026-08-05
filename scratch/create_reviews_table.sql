-- Script para crear la tabla de reseñas en Supabase
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id TEXT,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
  approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
DROP POLICY IF EXISTS "Permitir lectura publica de resenas aprobadas" ON public.reviews;
CREATE POLICY "Permitir lectura publica de resenas aprobadas" ON public.reviews
  FOR SELECT USING (approved = true);

DROP POLICY IF EXISTS "Permitir insercion publica de resenas" ON public.reviews;
CREATE POLICY "Permitir insercion publica de resenas" ON public.reviews
  FOR INSERT WITH CHECK (true);
