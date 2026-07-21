-- ============================================================
-- SCRIPT DE SEGURIDAD SUPABASE (RLS & MULTI-TENANT ACCESS)
-- Proyecto: Dale! Te Pido / Clickapp
-- ============================================================

-- 1. HABILITAR ROW LEVEL SECURITY EN TODAS LAS TABLAS
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.company_settings ENABLE ROW LEVEL SECURITY;

-- 2. ELIMINAR POLÍTICAS ANTERIORES SI EXISTEN
DROP POLICY IF EXISTS "Public products read" ON public.products;
DROP POLICY IF EXISTS "Public categories read" ON public.categories;
DROP POLICY IF EXISTS "Public pickups read" ON public.pickups;
DROP POLICY IF EXISTS "Public company_settings read" ON public.company_settings;
DROP POLICY IF EXISTS "Deny public product writes" ON public.products;
DROP POLICY IF EXISTS "Deny public category writes" ON public.categories;
DROP POLICY IF EXISTS "Deny public settings writes" ON public.company_settings;

-- 3. POLÍTICAS DE LECTURA PÚBLICA (ROLE: anon)
-- Permitir que cualquier visitante lea los productos no ocultos de las tiendas
CREATE POLICY "Public products read"
ON public.products
FOR SELECT
TO anon, authenticated
USING (oculto = false OR oculto IS NULL);

-- Permitir que cualquier visitante lea las categorías activas
CREATE POLICY "Public categories read"
ON public.categories
FOR SELECT
TO anon, authenticated
USING (active = true OR active IS NULL);

-- Permitir que cualquier visitante consulte los puntos de retiro activos
CREATE POLICY "Public pickups read"
ON public.pickups
FOR SELECT
TO anon, authenticated
USING (active = true OR active IS NULL);

-- Permitir lectura pública de configuraciones de tiendas
CREATE POLICY "Public company_settings read"
ON public.company_settings
FOR SELECT
TO anon, authenticated
USING (true);

-- 4. RESTRICCIÓN DE ESCRITURA PARA EL ROL ANÓNIMO
-- Las operaciones de INSERT, UPDATE y DELETE desde el cliente web directo quedan bloqueadas para anon.
-- Se deberán ejecutar a través del backend Serverless o usando el Service Role / Usuario Autenticado.

COMMENT ON TABLE public.company_settings IS 'Políticas RLS activadas: Lectura pública restringida y escrituras bloqueadas para anon.';
