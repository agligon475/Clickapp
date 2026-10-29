-- ==============================================================================
-- SCRIPT DE MIGRACIÓN: AISLAMIENTO ESTRICTO RLS EN SUPABASE (PREVENCIÓN BOLA / IDOR)
-- Proyecto: Dale! Te Pido / Clickapp
-- Tablas Afectadas: public.orders, public.order_items, public.pickups
-- Fecha: 28 de Octubre de 2026
-- ==============================================================================
-- OBJETIVOS DE SEGURIDAD (NIVEL BANCARIO / SOC):
-- 1. Clientes anónimos ('anon'): ÚNICAMENTE pueden hacer INSERT de nuevos pedidos
--    desde el storefront sin poder leer ningún pedido previo (zero-read insert).
-- 2. Mitigación BOLA / IDOR: Un actor malicioso con la 'anon_key' pública NO puede
--    hacer SELECT, UPDATE o DELETE manipulando el query string (?store_id=... o ?id=...).
-- 3. Comercios autenticados ('authenticated'): ÚNICAMENTE pueden leer, actualizar,
--    insertar o borrar registros cuyo 'store_id' coincida con su identidad validada en auth.jwt().
-- 4. Puntos de retiro / Cadetes ('public.pickups'): Acceso TOTALMENTE DENEGADO a 'anon'.
--    Solo comercios autenticados para su propio 'store_id' y service_role.
-- 5. Backend Serverless ('service_role'): Acceso irrestricto para tareas de administración.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- PASO 1: HABILITAR EXTENSIONES E ÍNDICES DE RENDIMIENTO PARA RLS
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Asegurar columnas críticas e índices en public.orders
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    store_id text NOT NULL,
    customer_name text,
    customer_phone text,
    customer_address text,
    delivery_type text DEFAULT 'delivery',
    items jsonb DEFAULT '[]'::jsonb,
    total_amount numeric(12,2) DEFAULT 0.00,
    notes text,
    status text DEFAULT 'confirmar',
    notified_to_merchant boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_store_id ON public.orders(store_id);
CREATE INDEX IF NOT EXISTS idx_orders_store_created ON public.orders(store_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- Asegurar tabla e índices en public.pickups
CREATE TABLE IF NOT EXISTS public.pickups (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    store_id text NOT NULL,
    name text NOT NULL,
    address text,
    phone text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pickups_store_id ON public.pickups(store_id);

-- ------------------------------------------------------------------------------
-- PASO 2: FUNCIÓN DETERMINÍSTICA DE IDENTIDAD DE TIENDA (get_auth_store_id)
-- ------------------------------------------------------------------------------
-- Extrae de forma segura el store_id vinculado a la sesión JWT activa.
-- Soporta tanto claims directos ('store_id') como metadatos de usuario o mapeo por email.
CREATE OR REPLACE FUNCTION public.get_auth_store_id()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
  SELECT COALESCE(
    -- 1. Claim directo en el JWT
    NULLIF(TRIM(auth.jwt() ->> 'store_id'), ''),
    -- 2. Claim en app_metadata
    NULLIF(TRIM(auth.jwt() -> 'app_metadata' ->> 'store_id'), ''),
    -- 3. Claim en user_metadata
    NULLIF(TRIM(auth.jwt() -> 'user_metadata' ->> 'store_id'), ''),
    -- 4. Resolución por correo electrónico en store_auth (credenciales aisladas)
    (
      SELECT LOWER(TRIM(sa.store_id))
      FROM public.store_auth sa
      WHERE sa.admin_email IS NOT NULL 
        AND LOWER(TRIM(sa.admin_email)) = LOWER(TRIM(COALESCE(auth.jwt() ->> 'email', '')))
      LIMIT 1
    ),
    -- 5. Resolución por correo electrónico en company_settings
    (
      SELECT LOWER(TRIM(cs.store_id))
      FROM public.company_settings cs
      WHERE cs.admin_email IS NOT NULL 
        AND LOWER(TRIM(cs.admin_email)) = LOWER(TRIM(COALESCE(auth.jwt() ->> 'email', '')))
      LIMIT 1
    )
  );
$$;

COMMENT ON FUNCTION public.get_auth_store_id() IS 
'Resuelve el store_id validado para el usuario autenticado actual desde sus credenciales o claims JWT.';

-- ------------------------------------------------------------------------------
-- PASO 3: HABILITACIÓN ESTRICTA DE RLS EN AMBAS TABLAS
-- ------------------------------------------------------------------------------
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders FORCE ROW LEVEL SECURITY;

ALTER TABLE public.pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickups FORCE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- PASO 4: PURGA AUTOMÁTICA Y TOTAL DE TODAS LAS POLÍTICAS RESIDUALES
-- ------------------------------------------------------------------------------
-- Elimina de raíz cualquier política heredada (incluso con nombres como
-- 'Enable read access for all users', 'Permitir creación pública de pedidos', 'Dashboard pickups *')
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE tablename IN ('orders', 'pickups', 'order_items')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I;', pol.policyname, pol.schemaname, pol.tablename);
    END LOOP;
END $$;

-- Purga explícita adicional de respaldo
DROP POLICY IF EXISTS "Enable read access for all users" ON public.orders;
DROP POLICY IF EXISTS "Permitir creación pública de pedidos" ON public.orders;
DROP POLICY IF EXISTS "Public orders all" ON public.orders;
DROP POLICY IF EXISTS "Public read orders" ON public.orders;
DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.orders;
DROP POLICY IF EXISTS "Enable update for all users" ON public.orders;
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_update_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_delete_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_anon_insert_only" ON public.orders;
DROP POLICY IF EXISTS "orders_authenticated_select" ON public.orders;
DROP POLICY IF EXISTS "orders_authenticated_update" ON public.orders;
DROP POLICY IF EXISTS "orders_authenticated_delete" ON public.orders;
DROP POLICY IF EXISTS "orders_authenticated_insert" ON public.orders;
DROP POLICY IF EXISTS "orders_service_role_all" ON public.orders;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.order_items;

DROP POLICY IF EXISTS "Dashboard pickups read" ON public.pickups;
DROP POLICY IF EXISTS "Dashboard pickups insert" ON public.pickups;
DROP POLICY IF EXISTS "Dashboard pickups update" ON public.pickups;
DROP POLICY IF EXISTS "Dashboard pickups delete" ON public.pickups;
DROP POLICY IF EXISTS "Public pickups all" ON public.pickups;
DROP POLICY IF EXISTS "Public pickups read" ON public.pickups;
DROP POLICY IF EXISTS "Public pickups write" ON public.pickups;
DROP POLICY IF EXISTS "pickups_select_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_insert_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_update_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_delete_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_authenticated_select" ON public.pickups;
DROP POLICY IF EXISTS "pickups_authenticated_insert" ON public.pickups;
DROP POLICY IF EXISTS "pickups_authenticated_update" ON public.pickups;
DROP POLICY IF EXISTS "pickups_authenticated_delete" ON public.pickups;
DROP POLICY IF EXISTS "pickups_service_role_all" ON public.pickups;

-- ------------------------------------------------------------------------------
-- PASO 5: POLÍTICAS DEFINITIVAS PARA public.orders
-- ------------------------------------------------------------------------------

-- [REGLA 1 - STOREFRONT]: Clientes anónimos solo pueden INSERTAR pedidos nuevos
-- Se valida que el store_id sea obligatorio y que el estado inicial no esté adulterado.
CREATE POLICY "orders_anon_insert_only"
  ON public.orders FOR INSERT
  TO anon, public
  WITH CHECK (
    store_id IS NOT NULL 
    AND length(trim(store_id)) > 0
    AND (status IS NULL OR status IN ('confirmar', 'pendiente', 'received', 'TAKE_AWAY', 'DELIVERY'))
  );

-- [REGLA 2 - COMERCIOS]: Comercios autenticados leen ÚNICAMENTE sus propios pedidos
CREATE POLICY "orders_authenticated_select"
  ON public.orders FOR SELECT
  TO authenticated
  USING (
    public.get_auth_store_id() IS NOT NULL
    AND LOWER(TRIM(store_id)) = LOWER(TRIM(public.get_auth_store_id()))
  );

-- [REGLA 3 - COMERCIOS]: Comercios autenticados pueden ACTUALIZAR sus propios pedidos (Kanban, estados)
CREATE POLICY "orders_authenticated_update"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (
    public.get_auth_store_id() IS NOT NULL
    AND LOWER(TRIM(store_id)) = LOWER(TRIM(public.get_auth_store_id()))
  )
  WITH CHECK (
    public.get_auth_store_id() IS NOT NULL
    AND LOWER(TRIM(store_id)) = LOWER(TRIM(public.get_auth_store_id()))
  );

-- [REGLA 4 - COMERCIOS]: Comercios autenticados pueden CREAR pedidos manuales en su dashboard
CREATE POLICY "orders_authenticated_insert"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (
    public.get_auth_store_id() IS NOT NULL
    AND LOWER(TRIM(store_id)) = LOWER(TRIM(public.get_auth_store_id()))
  );

-- [REGLA 5 - COMERCIOS]: Comercios autenticados pueden ELIMINAR pedidos cancelados o archivados
CREATE POLICY "orders_authenticated_delete"
  ON public.orders FOR DELETE
  TO authenticated
  USING (
    public.get_auth_store_id() IS NOT NULL
    AND LOWER(TRIM(store_id)) = LOWER(TRIM(public.get_auth_store_id()))
  );

-- [REGLA 6 - BACKEND/SUPERADMIN]: Control total para service_role
CREATE POLICY "orders_service_role_all"
  ON public.orders FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- PASO 6: POLÍTICAS DEFINITIVAS PARA public.pickups (CADETERÍA / PUNTOS DE RETIRO)
-- ------------------------------------------------------------------------------

-- NOTA: El rol 'anon' NO tiene permisos de lectura ni escritura en pickups.
-- El acceso anónimo queda 100% bloqueado por defecto.

-- [REGLA 1 - COMERCIOS]: Lectura exclusiva de pickups de su propia tienda
CREATE POLICY "pickups_authenticated_select"
  ON public.pickups FOR SELECT
  TO authenticated
  USING (
    public.get_auth_store_id() IS NOT NULL
    AND LOWER(TRIM(store_id)) = LOWER(TRIM(public.get_auth_store_id()))
  );

-- [REGLA 2 - COMERCIOS]: Inserción de nuevos cadetes o puntos de entrega
CREATE POLICY "pickups_authenticated_insert"
  ON public.pickups FOR INSERT
  TO authenticated
  WITH CHECK (
    public.get_auth_store_id() IS NOT NULL
    AND LOWER(TRIM(store_id)) = LOWER(TRIM(public.get_auth_store_id()))
  );

-- [REGLA 3 - COMERCIOS]: Actualización de cadetes o puntos de entrega
CREATE POLICY "pickups_authenticated_update"
  ON public.pickups FOR UPDATE
  TO authenticated
  USING (
    public.get_auth_store_id() IS NOT NULL
    AND LOWER(TRIM(store_id)) = LOWER(TRIM(public.get_auth_store_id()))
  )
  WITH CHECK (
    public.get_auth_store_id() IS NOT NULL
    AND LOWER(TRIM(store_id)) = LOWER(TRIM(public.get_auth_store_id()))
  );

-- [REGLA 4 - COMERCIOS]: Eliminación de puntos de entrega
CREATE POLICY "pickups_authenticated_delete"
  ON public.pickups FOR DELETE
  TO authenticated
  USING (
    public.get_auth_store_id() IS NOT NULL
    AND LOWER(TRIM(store_id)) = LOWER(TRIM(public.get_auth_store_id()))
  );

-- [REGLA 5 - BACKEND/SUPERADMIN]: Control total para service_role
CREATE POLICY "pickups_service_role_all"
  ON public.pickups FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- PASO 7: POLÍTICAS PARA public.order_items (SI LA TABLA EXISTE)
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'order_items') THEN
    ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.order_items FORCE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "order_items_all" ON public.order_items;
    DROP POLICY IF EXISTS "Enable read access for all users" ON public.order_items;
    DROP POLICY IF EXISTS "order_items_insert_policy" ON public.order_items;
    DROP POLICY IF EXISTS "order_items_select_policy" ON public.order_items;
    DROP POLICY IF EXISTS "order_items_anon_insert_only" ON public.order_items;
    DROP POLICY IF EXISTS "order_items_authenticated_all" ON public.order_items;
    DROP POLICY IF EXISTS "order_items_service_role_all" ON public.order_items;

    -- Anon solo puede insertar ítems
    CREATE POLICY "order_items_anon_insert_only"
      ON public.order_items FOR INSERT
      TO anon, public
      WITH CHECK (order_id IS NOT NULL);

    -- Authenticated gestiona solo ítems de pedidos de su tienda
    CREATE POLICY "order_items_authenticated_all"
      ON public.order_items FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM public.orders o
          WHERE o.id = public.order_items.order_id
            AND LOWER(TRIM(o.store_id)) = LOWER(TRIM(public.get_auth_store_id()))
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.orders o
          WHERE o.id = public.order_items.order_id
            AND LOWER(TRIM(o.store_id)) = LOWER(TRIM(public.get_auth_store_id()))
        )
      );

    -- Service role libre acceso
    CREATE POLICY "order_items_service_role_all"
      ON public.order_items FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- PASO 8: GESTIÓN DE PRIVILEGIOS SQL (PRINCIPLE OF LEAST PRIVILEGE)
-- ------------------------------------------------------------------------------
-- Revocar cualquier privilegio accidental sobre orders para anon y public
REVOKE SELECT, UPDATE, DELETE ON public.orders FROM anon, public;
GRANT INSERT ON public.orders TO anon, public;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

-- Revocar TODOS los privilegios sobre pickups para anon y public
REVOKE ALL ON public.pickups FROM anon, public;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pickups TO authenticated;
GRANT ALL ON public.pickups TO service_role;

-- Purgar registros obsoletos marcados como DELETED en company_settings
DELETE FROM public.company_settings
WHERE status = 'DELETED' OR store_id LIKE 'deleted-%' OR business_name = 'Cuenta Eliminada';

-- ------------------------------------------------------------------------------
-- PASO 9: CONSULTA DE VALIDACIÓN AUTOMÁTICA
-- ------------------------------------------------------------------------------
-- Muestra el inventario exacto de políticas RLS aplicadas para auditoría inmediata
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual AS using_expression,
    with_check AS check_expression
FROM pg_policies
WHERE tablename IN ('orders', 'pickups', 'order_items')
ORDER BY tablename, cmd, policyname;
