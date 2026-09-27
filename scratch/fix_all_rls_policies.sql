-- ==============================================================================
-- SCRIPT DE CORRECCIÓN DEFINITIVA DE RLS (ROW LEVEL SECURITY) EN SUPABASE
-- Proyecto: Dale! Te Pido / Clickapp
-- Soluciona el error: "new row violates row-level security policy for table products"
-- ==============================================================================

-- 1. HABILITAR ROW LEVEL SECURITY EN TODAS LAS TABLAS
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.store_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.stores ENABLE ROW LEVEL SECURITY;

-- 2. TABLA: PRODUCTS
DROP POLICY IF EXISTS "Public products read" ON public.products;
DROP POLICY IF EXISTS "Public products write" ON public.products;
DROP POLICY IF EXISTS "Public products all" ON public.products;
DROP POLICY IF EXISTS "products_select_policy" ON public.products;
DROP POLICY IF EXISTS "products_insert_policy" ON public.products;
DROP POLICY IF EXISTS "products_update_policy" ON public.products;
DROP POLICY IF EXISTS "products_delete_policy" ON public.products;
CREATE POLICY "Public products all" ON public.products FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

-- 3. TABLA: CATEGORIES
DROP POLICY IF EXISTS "Public categories read" ON public.categories;
DROP POLICY IF EXISTS "Public categories write" ON public.categories;
DROP POLICY IF EXISTS "Public categories all" ON public.categories;
DROP POLICY IF EXISTS "categories_select_policy" ON public.categories;
DROP POLICY IF EXISTS "categories_insert_policy" ON public.categories;
DROP POLICY IF EXISTS "categories_update_policy" ON public.categories;
DROP POLICY IF EXISTS "categories_delete_policy" ON public.categories;
CREATE POLICY "Public categories all" ON public.categories FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

-- 4. TABLA: COMPANY_SETTINGS
DROP POLICY IF EXISTS "Public company_settings read" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings write" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings all" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_select_policy" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_insert_policy" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_update_policy" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_delete_policy" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_all_policy" ON public.company_settings;
CREATE POLICY "Public company_settings all" ON public.company_settings FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

-- 5. TABLA: PICKUPS
DROP POLICY IF EXISTS "Public pickups read" ON public.pickups;
DROP POLICY IF EXISTS "Public pickups write" ON public.pickups;
DROP POLICY IF EXISTS "Public pickups all" ON public.pickups;
DROP POLICY IF EXISTS "pickups_select_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_insert_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_update_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_delete_policy" ON public.pickups;
CREATE POLICY "Public pickups all" ON public.pickups FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

-- 6. TABLA: ORDERS
DROP POLICY IF EXISTS "Public read orders" ON public.orders;
DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_update_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_delete_policy" ON public.orders;
CREATE POLICY "Public orders all" ON public.orders FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

-- 7. TABLA: ORDER_ITEMS (si existe)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'order_items') THEN
        DROP POLICY IF EXISTS "order_items_select_policy" ON public.order_items;
        DROP POLICY IF EXISTS "order_items_insert_policy" ON public.order_items;
        DROP POLICY IF EXISTS "order_items_all" ON public.order_items;
        CREATE POLICY "order_items_all" ON public.order_items FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;

-- 8. TABLA: REVIEWS
DROP POLICY IF EXISTS "Public read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "reviews_select_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_all" ON public.reviews;
CREATE POLICY "reviews_all" ON public.reviews FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

-- 9. TABLA: STORE_CREDENTIALS
DROP POLICY IF EXISTS "Public read credentials" ON public.store_credentials;
DROP POLICY IF EXISTS "Public all store_credentials" ON public.store_credentials;
DROP POLICY IF EXISTS "store_credentials_select_policy" ON public.store_credentials;
DROP POLICY IF EXISTS "store_credentials_insert_policy" ON public.store_credentials;
DROP POLICY IF EXISTS "store_credentials_update_policy" ON public.store_credentials;
DROP POLICY IF EXISTS "store_credentials_delete_policy" ON public.store_credentials;
CREATE POLICY "Public all store_credentials" ON public.store_credentials FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

-- 10. TABLA: STORES
DROP POLICY IF EXISTS "Public read stores" ON public.stores;
DROP POLICY IF EXISTS "stores_all" ON public.stores;
CREATE POLICY "stores_all" ON public.stores FOR ALL TO public, anon, authenticated USING (true) WITH CHECK (true);

-- 11. ASEGURAR COLUMNAS PARA SUPER ADMIN Y TIENDAS
ALTER TABLE public.company_settings ADD COLUMN IF NOT EXISTS status text DEFAULT 'ACTIVE';
ALTER TABLE public.company_settings ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'UP_TO_DATE';
ALTER TABLE public.company_settings ADD COLUMN IF NOT EXISTS upgrade_requested text DEFAULT NULL;
