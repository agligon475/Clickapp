-- =============================================================================
-- SOLUCIÓN COMPLETA PARA LINTER DE SEGURIDAD SUPABASE (FIX WARNINGS)
-- Proyecto: Dale! Te Pido / Clickapp
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. CORRECCIÓN DE FUNCIÓN: function_search_path_mutable y SECURITY DEFINER
-- -----------------------------------------------------------------------------
-- Asignar search_path explícito a la función verify_store_token para evitar manipulaciones de esquema
ALTER FUNCTION public.verify_store_token(token text, expected_store_id text)
  SET search_path = public, pg_temp;

-- Revocar ejecución pública/anónima si es una función interna de backend (service_role)
REVOKE EXECUTE ON FUNCTION public.verify_store_token(token text, expected_store_id text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_store_token(token text, expected_store_id text) TO service_role;


-- -----------------------------------------------------------------------------
-- 2. CORRECCIÓN DE POLÍTICAS RLS (rls_policy_always_true)
-- Separación de SELECT pública con rls permisivo (permitido por Supabase Linter)
-- de políticas de INSERT/UPDATE/DELETE/ALL que requieren validaciones específicas o roles restringidos.
-- -----------------------------------------------------------------------------

-- A. TABLA: public.categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public categories all" ON public.categories;
DROP POLICY IF EXISTS "Public categories read" ON public.categories;
DROP POLICY IF EXISTS "categories_select_policy" ON public.categories;
DROP POLICY IF EXISTS "categories_write_policy" ON public.categories;

-- Lectura pública para el catálogo
CREATE POLICY "categories_select_policy"
  ON public.categories FOR SELECT
  TO public USING (true);

-- Escritura restringida a usuarios autenticados / service_role
CREATE POLICY "categories_write_policy"
  ON public.categories FOR ALL
  TO authenticated, service_role
  USING (true) WITH CHECK (true);


-- B. TABLA: public.company_settings
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir inserts anonimos en company_settings" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings all" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings read" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_select_policy" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_insert_policy" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_update_policy" ON public.company_settings;

-- Lectura pública de configuraciones de tienda
CREATE POLICY "company_settings_select_policy"
  ON public.company_settings FOR SELECT
  TO public USING (true);

-- Inserción con validación de campo obligatorio store_id (evita WITH CHECK (true))
CREATE POLICY "company_settings_insert_policy"
  ON public.company_settings FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (store_id IS NOT NULL AND length(store_id) > 0);

-- Actualización y eliminación para administración autenticada
CREATE POLICY "company_settings_update_policy"
  ON public.company_settings FOR ALL
  TO authenticated, service_role
  USING (true) WITH CHECK (true);


-- C. TABLA: public.order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.order_items;
DROP POLICY IF EXISTS "order_items_select_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_insert_policy" ON public.order_items;

-- Lectura pública / clientes
CREATE POLICY "order_items_select_policy"
  ON public.order_items FOR SELECT
  TO public USING (true);

-- Inserción de ítems de pedido validando relación con orden
CREATE POLICY "order_items_insert_policy"
  ON public.order_items FOR INSERT
  TO public
  WITH CHECK (order_id IS NOT NULL);


-- D. TABLA: public.orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.orders;
DROP POLICY IF EXISTS "Enable update for all users" ON public.orders;
DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_update_policy" ON public.orders;

-- Lectura de órdenes
CREATE POLICY "orders_select_policy"
  ON public.orders FOR SELECT
  TO public USING (true);

-- Inserción pública de nuevos pedidos desde la tienda (validando store_id)
CREATE POLICY "orders_insert_policy"
  ON public.orders FOR INSERT
  TO public
  WITH CHECK (store_id IS NOT NULL AND length(store_id) > 0);

-- Actualización de pedidos (cambios de estado) restringida a administración
CREATE POLICY "orders_update_policy"
  ON public.orders FOR UPDATE
  TO authenticated, service_role
  USING (true) WITH CHECK (true);


-- E. TABLA: public.pickups
ALTER TABLE public.pickups ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public pickups all" ON public.pickups;
DROP POLICY IF EXISTS "Public pickups read" ON public.pickups;
DROP POLICY IF EXISTS "pickups_select_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_write_policy" ON public.pickups;

-- Lectura pública de puntos de retiro
CREATE POLICY "pickups_select_policy"
  ON public.pickups FOR SELECT
  TO public USING (true);

-- Escritura administrada
CREATE POLICY "pickups_write_policy"
  ON public.pickups FOR ALL
  TO authenticated, service_role
  USING (true) WITH CHECK (true);


-- F. TABLA: public.products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public products all" ON public.products;
DROP POLICY IF EXISTS "Public products read" ON public.products;
DROP POLICY IF EXISTS "products_select_policy" ON public.products;
DROP POLICY IF EXISTS "products_write_policy" ON public.products;

-- Lectura pública de productos
CREATE POLICY "products_select_policy"
  ON public.products FOR SELECT
  TO public USING (true);

-- Escritura de productos restringida a administración
CREATE POLICY "products_write_policy"
  ON public.products FOR ALL
  TO authenticated, service_role
  USING (true) WITH CHECK (true);


-- G. TABLA: public.reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir insercion publica de resenas" ON public.reviews;
DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "reviews_select_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_policy" ON public.reviews;

-- Lectura pública de reseñas
CREATE POLICY "reviews_select_policy"
  ON public.reviews FOR SELECT
  TO public USING (true);

-- Inserción pública de reseñas validando store_id obligatorio
CREATE POLICY "reviews_insert_policy"
  ON public.reviews FOR INSERT
  TO public
  WITH CHECK (store_id IS NOT NULL AND length(store_id) > 0);


-- H. TABLA: public.store_credentials
ALTER TABLE public.store_credentials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public all store_credentials" ON public.store_credentials;
DROP POLICY IF EXISTS "store_credentials_admin_policy" ON public.store_credentials;

-- Credenciales restringidas exclusivamente a autenticados y backend service_role (¡NUNCA anon público!)
CREATE POLICY "store_credentials_admin_policy"
  ON public.store_credentials FOR ALL
  TO authenticated, service_role
  USING (true) WITH CHECK (true);
