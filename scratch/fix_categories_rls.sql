-- Script SQL para permitir inserción de categorías y tiendas en Supabase RLS
DROP POLICY IF EXISTS "Public categories write" ON public.categories;
CREATE POLICY "Public categories write" ON public.categories FOR ALL USING (true);

DROP POLICY IF EXISTS "Public company_settings write" ON public.company_settings;
CREATE POLICY "Public company_settings write" ON public.company_settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Public products write" ON public.products;
CREATE POLICY "Public products write" ON public.products FOR ALL USING (true);
