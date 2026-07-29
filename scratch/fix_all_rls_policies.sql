-- Script SQL para corregir definitivamente todas las políticas de actualización RLS en Supabase
-- Permite SELECT, INSERT, UPDATE, DELETE para anon y authenticated en company_settings, categories, products y pickups

ALTER TABLE IF EXISTS public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.pickups ENABLE ROW LEVEL SECURITY;

-- 1. COMPANY_SETTINGS
DROP POLICY IF EXISTS "Public company_settings read" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings write" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings all" ON public.company_settings;
CREATE POLICY "Public company_settings all" ON public.company_settings FOR ALL USING (true) WITH CHECK (true);

-- 2. CATEGORIES
DROP POLICY IF EXISTS "Public categories read" ON public.categories;
DROP POLICY IF EXISTS "Public categories write" ON public.categories;
DROP POLICY IF EXISTS "Public categories all" ON public.categories;
CREATE POLICY "Public categories all" ON public.categories FOR ALL USING (true) WITH CHECK (true);

-- 3. PRODUCTS
DROP POLICY IF EXISTS "Public products read" ON public.products;
DROP POLICY IF EXISTS "Public products write" ON public.products;
DROP POLICY IF EXISTS "Public products all" ON public.products;
CREATE POLICY "Public products all" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- 4. PICKUPS
DROP POLICY IF EXISTS "Public pickups read" ON public.pickups;
DROP POLICY IF EXISTS "Public pickups write" ON public.pickups;
DROP POLICY IF EXISTS "Public pickups all" ON public.pickups;
CREATE POLICY "Public pickups all" ON public.pickups FOR ALL USING (true) WITH CHECK (true);

-- 5. AGREGAR COLUMNAS PARA SUPER ADMIN SI NO EXISTEN
ALTER TABLE public.company_settings ADD COLUMN IF NOT EXISTS status text DEFAULT 'ACTIVE';
ALTER TABLE public.company_settings ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'UP_TO_DATE';
ALTER TABLE public.company_settings ADD COLUMN IF NOT EXISTS upgrade_requested text DEFAULT NULL;
