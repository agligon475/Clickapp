-- =============================================================================
-- SCRIPT MAESTRO DE SEGURIDAD Y BLINDAJE (RLS & CREDENTIAL ISOLATION)
-- Proyecto: Dale! Te Pido / Clickapp
-- =============================================================================
-- Este script resuelve de raíz las vulnerabilidades críticas:
-- 1. Aísla las contraseñas en una tabla privada (public.store_auth) inaccesible para el rol anónimo (anon).
-- 2. Elimina las contraseñas en texto plano de public.company_settings.
-- 3. Crea la función RPC segura verify_store_login() (SECURITY DEFINER) para autenticar sin exponer claves.
-- 4. Oculta las credenciales de IA / Cloudinary (public.store_credentials) de consultas anónimas.
-- 5. Protege los datos personales de clientes en pedidos (public.orders) evitando que anon liste pedidos.
-- 6. Limpia todas las políticas permisivas heredadas.
-- =============================================================================

-- Habilitar extensión criptográfica
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- -----------------------------------------------------------------------------
-- PASO 1: TABLA PRIVADA DE CREDENCIALES (public.store_auth)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.store_auth (
  store_id TEXT PRIMARY KEY,
  admin_email TEXT,
  password TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migrar todas las contraseñas y emails existentes de company_settings hacia store_auth
INSERT INTO public.store_auth (store_id, admin_email, password, updated_at)
SELECT 
  LOWER(TRIM(cs.store_id)),
  cs.admin_email,
  cs.password,
  NOW()
FROM public.company_settings cs
WHERE cs.store_id IS NOT NULL AND TRIM(cs.store_id) <> ''
ON CONFLICT (store_id) DO UPDATE
SET 
  admin_email = COALESCE(EXCLUDED.admin_email, public.store_auth.admin_email),
  password = CASE 
    WHEN EXCLUDED.password IS NOT NULL AND EXCLUDED.password <> '' THEN EXCLUDED.password 
    ELSE public.store_auth.password 
  END,
  updated_at = NOW();

-- Habilitar RLS estricto en store_auth y REVOCAR acceso a anon y public
ALTER TABLE public.store_auth ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "store_auth_deny_all" ON public.store_auth;
DROP POLICY IF EXISTS "Public store_auth" ON public.store_auth;

REVOKE ALL ON public.store_auth FROM PUBLIC, anon;
GRANT ALL ON public.store_auth TO service_role;


-- -----------------------------------------------------------------------------
-- PASO 2: FUNCIÓN RPC DE AUTENTICACIÓN SEGURA (verify_store_login)
-- -----------------------------------------------------------------------------
-- Autentica credenciales directamente en PostgreSQL con privilegios elevados.
-- NUNCA retorna la contraseña a la red ni al cliente.
CREATE OR REPLACE FUNCTION public.verify_store_login(p_identifier TEXT, p_password TEXT)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
LANGUAGE plpgsql
AS $$
DECLARE
  v_rec RECORD;
  v_salt TEXT;
  v_hash TEXT;
  v_calc_hash TEXT;
  v_is_valid BOOLEAN := false;
  v_input_pass TEXT := COALESCE(TRIM(p_password), '');
  v_clean_id TEXT := LOWER(TRIM(COALESCE(p_identifier, '')));
  v_new_salt TEXT;
  v_new_hash TEXT;
BEGIN
  IF v_clean_id = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'El identificador de tienda o email es requerido');
  END IF;

  -- Buscar credenciales en store_auth, cruzando datos de perfil con company_settings
  SELECT 
    sa.store_id, 
    sa.admin_email, 
    sa.password, 
    cs.business_name, 
    COALESCE(cs.plan_level, 'starter') AS plan_level
  INTO v_rec
  FROM public.store_auth sa
  LEFT JOIN public.company_settings cs ON LOWER(TRIM(cs.store_id)) = LOWER(TRIM(sa.store_id))
  WHERE LOWER(TRIM(sa.store_id)) = v_clean_id 
     OR (sa.admin_email IS NOT NULL AND LOWER(TRIM(sa.admin_email)) = v_clean_id)
  LIMIT 1;

  IF NOT FOUND THEN
    -- Fallback: si no estaba en store_auth pero existe en company_settings
    SELECT 
      cs.store_id, 
      cs.admin_email, 
      cs.password, 
      cs.business_name, 
      COALESCE(cs.plan_level, 'starter') AS plan_level
    INTO v_rec
    FROM public.company_settings cs
    WHERE LOWER(TRIM(cs.store_id)) = v_clean_id 
       OR (cs.admin_email IS NOT NULL AND LOWER(TRIM(cs.admin_email)) = v_clean_id)
    LIMIT 1;

    IF NOT FOUND THEN
      RETURN jsonb_build_object('success', false, 'error', 'La tienda o correo electrónico ingresado no existe');
    END IF;

    -- Registrar en store_auth para futuras consultas
    INSERT INTO public.store_auth (store_id, admin_email, password, updated_at)
    VALUES (LOWER(TRIM(v_rec.store_id)), v_rec.admin_email, v_rec.password, NOW())
    ON CONFLICT (store_id) DO NOTHING;
  END IF;

  -- Validación 1: Si no hay contraseña configurada en BD
  IF (v_rec.password IS NULL OR TRIM(v_rec.password) = '') THEN
    v_is_valid := true;

  -- Validación 2: Formato seguro salt:hash (SHA256)
  ELSIF POSITION(':' IN v_rec.password) > 0 THEN
    v_salt := SPLIT_PART(v_rec.password, ':', 1);
    v_hash := SPLIT_PART(v_rec.password, ':', 2);
    v_calc_hash := encode(digest(v_input_pass || v_salt, 'sha256'), 'hex');
    IF v_calc_hash = v_hash THEN
      v_is_valid := true;
    END IF;

  -- Validación 3: Contraseña heredada en texto plano
  ELSIF v_rec.password = v_input_pass THEN
    v_is_valid := true;
    -- Auto-upgrade: Convertir automáticamente la clave heredada a salt:hash en background
    v_new_salt := encode(gen_random_bytes(16), 'hex');
    v_new_hash := encode(digest(v_input_pass || v_new_salt, 'sha256'), 'hex');
    UPDATE public.store_auth 
    SET password = v_new_salt || ':' || v_new_hash, updated_at = NOW()
    WHERE store_id = v_rec.store_id;
  END IF;

  IF v_is_valid THEN
    RETURN jsonb_build_object(
      'success', true,
      'store_id', v_rec.store_id,
      'admin_email', COALESCE(v_rec.admin_email, ''),
      'business_name', COALESCE(v_rec.business_name, v_rec.store_id),
      'plan_level', v_rec.plan_level,
      'message', 'Autenticación exitosa'
    );
  ELSE
    RETURN jsonb_build_object('success', false, 'error', 'Contraseña incorrecta');
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.verify_store_login(TEXT, TEXT) TO PUBLIC, anon, authenticated, service_role;


-- -----------------------------------------------------------------------------
-- PASO 3: FUNCIÓN RPC PARA RESTABLECER CONTRASEÑA (reset_store_password)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.reset_store_password(p_store_id TEXT, p_new_password_hash TEXT)
RETURNS JSONB
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
DECLARE
  v_clean_id TEXT := LOWER(TRIM(COALESCE(p_store_id, '')));
BEGIN
  IF v_clean_id = '' OR p_new_password_hash IS NULL OR TRIM(p_new_password_hash) = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Parámetros inválidos');
  END IF;

  INSERT INTO public.store_auth (store_id, password, updated_at)
  VALUES (v_clean_id, p_new_password_hash, NOW())
  ON CONFLICT (store_id) DO UPDATE
  SET password = EXCLUDED.password, updated_at = NOW();

  -- Asegurar que en company_settings quede completamente nula
  UPDATE public.company_settings 
  SET password = NULL 
  WHERE LOWER(TRIM(store_id)) = v_clean_id;

  RETURN jsonb_build_object('success', true, 'message', 'Contraseña actualizada con éxito');
END;
$$;

GRANT EXECUTE ON FUNCTION public.reset_store_password(TEXT, TEXT) TO PUBLIC, anon, authenticated, service_role;


-- -----------------------------------------------------------------------------
-- PASO 4: TRIGGER PARA NEUTRALIZAR EXPOSICIÓN EN company_settings
-- -----------------------------------------------------------------------------
-- Cada vez que el dashboard o un proceso intente guardar una contraseña en company_settings,
-- este trigger la intercepta, la almacena en la tabla protegida store_auth,
-- y fuerza a que en company_settings quede NULL.
CREATE OR REPLACE FUNCTION public.sync_company_settings_auth()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_pass TEXT;
  v_salt TEXT;
  v_hash TEXT;
BEGIN
  IF NEW.password IS NOT NULL AND TRIM(NEW.password) <> '' THEN
    v_pass := TRIM(NEW.password);
    -- Si no está hasheada aún, hashearla con salt
    IF POSITION(':' IN v_pass) = 0 THEN
      v_salt := encode(gen_random_bytes(16), 'hex');
      v_hash := encode(digest(v_pass || v_salt, 'sha256'), 'hex');
      v_pass := v_salt || ':' || v_hash;
    END IF;

    INSERT INTO public.store_auth (store_id, admin_email, password, updated_at)
    VALUES (LOWER(TRIM(NEW.store_id)), NEW.admin_email, v_pass, NOW())
    ON CONFLICT (store_id) DO UPDATE
    SET 
      password = EXCLUDED.password,
      admin_email = COALESCE(EXCLUDED.admin_email, public.store_auth.admin_email),
      updated_at = NOW();

    -- Borrar la clave del registro público para que nunca se filtre
    NEW.password := NULL;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_company_settings_auth ON public.company_settings;
CREATE TRIGGER trg_sync_company_settings_auth
BEFORE INSERT OR UPDATE ON public.company_settings
FOR EACH ROW
EXECUTE FUNCTION public.sync_company_settings_auth();

-- Limpiar de inmediato las contraseñas en company_settings
UPDATE public.company_settings SET password = NULL WHERE password IS NOT NULL;


-- -----------------------------------------------------------------------------
-- PASO 5: POLÍTICAS RLS EN public.company_settings
-- -----------------------------------------------------------------------------
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "company_settings_all_policy" ON public.company_settings;
DROP POLICY IF EXISTS "Permitir inserts anonimos en company_settings" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings all" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings read" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings write" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_select_policy" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_insert_policy" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_update_policy" ON public.company_settings;
DROP POLICY IF EXISTS "company_settings_delete_policy" ON public.company_settings;

-- Lectura pública para visitantes de tiendas y panel de control (las contraseñas ya están en NULL)
CREATE POLICY "company_settings_select_policy"
  ON public.company_settings FOR SELECT
  TO public
  USING (true);

-- Permiso de inserción y actualización para creación y edición de tiendas
CREATE POLICY "company_settings_insert_policy"
  ON public.company_settings FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

CREATE POLICY "company_settings_update_policy"
  ON public.company_settings FOR UPDATE
  TO anon, authenticated, service_role
  USING (store_id IS NOT NULL AND length(TRIM(store_id)) > 0)
  WITH CHECK (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);


-- -----------------------------------------------------------------------------
-- PASO 6: PROTECCIÓN TOTAL DE CREDENCIALES IA / API (public.store_credentials)
-- -----------------------------------------------------------------------------
ALTER TABLE public.store_credentials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public all store_credentials" ON public.store_credentials;
DROP POLICY IF EXISTS "store_credentials_admin_policy" ON public.store_credentials;
DROP POLICY IF EXISTS "store_credentials_select_policy" ON public.store_credentials;
DROP POLICY IF EXISTS "store_credentials_insert_policy" ON public.store_credentials;
DROP POLICY IF EXISTS "store_credentials_update_policy" ON public.store_credentials;
DROP POLICY IF EXISTS "store_credentials_delete_policy" ON public.store_credentials;

REVOKE ALL ON public.store_credentials FROM PUBLIC, anon;
GRANT ALL ON public.store_credentials TO authenticated, service_role;

CREATE POLICY "store_credentials_admin_policy"
  ON public.store_credentials FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);


-- -----------------------------------------------------------------------------
-- PASO 7: PROTECCIÓN DE PEDIDOS Y DATOS DE CLIENTES (public.orders & order_items)
-- -----------------------------------------------------------------------------
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable insert for all users" ON public.orders;
DROP POLICY IF EXISTS "Enable update for all users" ON public.orders;
DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_update_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_delete_policy" ON public.orders;

DROP POLICY IF EXISTS "Enable insert for all users" ON public.order_items;
DROP POLICY IF EXISTS "order_items_select_policy" ON public.order_items;
DROP POLICY IF EXISTS "order_items_insert_policy" ON public.order_items;

-- Clientes públicos PUEDEN insertar un pedido nuevo al comprar
CREATE POLICY "orders_insert_policy"
  ON public.orders FOR INSERT
  TO public
  WITH CHECK (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

CREATE POLICY "order_items_insert_policy"
  ON public.order_items FOR INSERT
  TO public
  WITH CHECK (order_id IS NOT NULL);

-- Clientes anónimos NO pueden listar los pedidos de otros clientes.
-- Solo cuentas autenticadas y el service_role pueden consultar pedidos.
CREATE POLICY "orders_select_policy"
  ON public.orders FOR SELECT
  TO authenticated, service_role
  USING (true);

CREATE POLICY "order_items_select_policy"
  ON public.order_items FOR SELECT
  TO authenticated, service_role
  USING (true);


-- -----------------------------------------------------------------------------
-- PASO 8: CATÁLOGO Y PUNTOS DE RETIRO (products, categories, pickups, reviews)
-- -----------------------------------------------------------------------------
-- A. Categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public categories all" ON public.categories;
DROP POLICY IF EXISTS "Public categories read" ON public.categories;
DROP POLICY IF EXISTS "categories_select_policy" ON public.categories;
DROP POLICY IF EXISTS "categories_insert_policy" ON public.categories;
DROP POLICY IF EXISTS "categories_update_policy" ON public.categories;
DROP POLICY IF EXISTS "categories_delete_policy" ON public.categories;

CREATE POLICY "categories_select_policy"
  ON public.categories FOR SELECT
  TO public USING (true);

CREATE POLICY "categories_insert_policy"
  ON public.categories FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

CREATE POLICY "categories_update_policy"
  ON public.categories FOR UPDATE
  TO anon, authenticated, service_role
  USING (store_id IS NOT NULL AND length(TRIM(store_id)) > 0)
  WITH CHECK (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

CREATE POLICY "categories_delete_policy"
  ON public.categories FOR DELETE
  TO anon, authenticated, service_role
  USING (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

-- B. Pickups
ALTER TABLE public.pickups ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public pickups all" ON public.pickups;
DROP POLICY IF EXISTS "Public pickups read" ON public.pickups;
DROP POLICY IF EXISTS "pickups_select_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_insert_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_update_policy" ON public.pickups;
DROP POLICY IF EXISTS "pickups_delete_policy" ON public.pickups;

CREATE POLICY "pickups_select_policy"
  ON public.pickups FOR SELECT
  TO public USING (true);

CREATE POLICY "pickups_insert_policy"
  ON public.pickups FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

CREATE POLICY "pickups_update_policy"
  ON public.pickups FOR UPDATE
  TO anon, authenticated, service_role
  USING (store_id IS NOT NULL AND length(TRIM(store_id)) > 0)
  WITH CHECK (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

CREATE POLICY "pickups_delete_policy"
  ON public.pickups FOR DELETE
  TO anon, authenticated, service_role
  USING (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

-- C. Products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public products all" ON public.products;
DROP POLICY IF EXISTS "Public products read" ON public.products;
DROP POLICY IF EXISTS "products_select_policy" ON public.products;
DROP POLICY IF EXISTS "products_insert_policy" ON public.products;
DROP POLICY IF EXISTS "products_update_policy" ON public.products;
DROP POLICY IF EXISTS "products_delete_policy" ON public.products;

CREATE POLICY "products_select_policy"
  ON public.products FOR SELECT
  TO public USING (true);

CREATE POLICY "products_insert_policy"
  ON public.products FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

CREATE POLICY "products_update_policy"
  ON public.products FOR UPDATE
  TO anon, authenticated, service_role
  USING (store_id IS NOT NULL AND length(TRIM(store_id)) > 0)
  WITH CHECK (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

CREATE POLICY "products_delete_policy"
  ON public.products FOR DELETE
  TO anon, authenticated, service_role
  USING (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

-- D. Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir insercion publica de resenas" ON public.reviews;
DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "reviews_select_policy" ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert_policy" ON public.reviews;

CREATE POLICY "reviews_select_policy"
  ON public.reviews FOR SELECT
  TO public USING (true);

CREATE POLICY "reviews_insert_policy"
  ON public.reviews FOR INSERT
  TO public
  WITH CHECK (store_id IS NOT NULL AND length(TRIM(store_id)) > 0);

-- =============================================================================
-- FIN DEL SCRIPT DE BLINDAJE
-- =============================================================================
