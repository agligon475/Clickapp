-- =============================================================================
-- SCRIPT DE CORRECCIÓN DE PERMISOS Y RLS PARA SUPER ADMIN Y COMPANY_SETTINGS
-- Proyecto: Dale! Te Pido / Clickapp
-- =============================================================================

-- 1. RE-CONCEDER EJECUCIÓN DE verify_store_token A ANON Y AUTHENTICATED
-- Evita el error PostgreSQL 42501 "permission denied for function verify_store_token" 
-- al ejecutar triggers o politicas de actualización en company_settings.
ALTER FUNCTION public.verify_store_token(token text, expected_store_id text)
  SET search_path = public, pg_temp;

ALTER FUNCTION public.verify_store_token(token text, expected_store_id text)
  SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.verify_store_token(token text, expected_store_id text) 
  TO PUBLIC, anon, authenticated, service_role;


-- 2. PERMITIR UPDATE/PATCH EN COMPANY_SETTINGS PARA ANON Y AUTHENTICATED
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "company_settings_update_policy" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings all" ON public.company_settings;
DROP POLICY IF EXISTS "Public company_settings write" ON public.company_settings;

CREATE POLICY "company_settings_update_policy"
  ON public.company_settings FOR UPDATE
  TO anon, authenticated, service_role
  USING (store_id IS NOT NULL AND length(store_id) > 0)
  WITH CHECK (store_id IS NOT NULL AND length(store_id) > 0);

-- Política fallback general si se requiere acceso completo
CREATE POLICY "company_settings_all_policy"
  ON public.company_settings FOR ALL
  TO anon, authenticated, service_role
  USING (true)
  WITH CHECK (true);
