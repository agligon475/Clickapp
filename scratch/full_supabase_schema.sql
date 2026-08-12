-- ============================================================
-- SCRIPT MAESTRO DE BASE DE DATOS SUPABASE (IDEMPOTENTE Y SEGURO)
-- Proyecto: Dale! Te Pido / Clickapp
-- Descripción: Creación de Esquema + Migración de Columnas Faltantes + RLS
-- ============================================================

-- 0. HABILITAR EXTENSIONES NECESARIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------
-- 1. TABLA: STORES (Comercios / Tiendas)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.stores (
    store_id text PRIMARY KEY,
    name text NOT NULL,
    subdomain text UNIQUE NOT NULL,
    owner_name text,
    owner_email text,
    whatsapp_phone text,
    plan text DEFAULT 'free',
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- ------------------------------------------------------------
-- 2. TABLA: COMPANY_SETTINGS (Asegurar columnas)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.company_settings (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id text,
    business_name text,
    primary_color text DEFAULT '#D72638',
    secondary_color text DEFAULT '#D72638',
    logo_url text,
    banner1_label text,
    banner1_title text,
    banner1_img text,
    banner1_cat text,
    banner2_label text,
    banner2_title text,
    banner2_img text,
    banner2_cat text,
    watermark_enabled boolean DEFAULT false,
    updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.company_settings ADD COLUMN IF NOT EXISTS store_id text;

-- ------------------------------------------------------------
-- 3. TABLA: CATEGORIES (Asegurar columnas)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id text NOT NULL,
    name text NOT NULL,
    emoji text DEFAULT '📦',
    display_order integer DEFAULT 1,
    active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS store_id text;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS active boolean DEFAULT true;

-- ------------------------------------------------------------
-- 4. TABLA: PRODUCTS (Asegurar columnas)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id text NOT NULL,
    nombre text NOT NULL,
    precio numeric(12,2) NOT NULL DEFAULT 0.00,
    stock integer DEFAULT 0,
    categoria text,
    subcategoria text,
    emoji text DEFAULT '🏷️',
    detalles text,
    imagen_url text,
    imagen_url2 text,
    imagen_url3 text,
    oculto boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS store_id text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS oculto boolean DEFAULT false;

-- ------------------------------------------------------------
-- 5. TABLA: ORDERS (Asegurar existencia y todas las columnas)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    store_id text,
    customer_name text,
    customer_phone text,
    customer_address text,
    delivery_type text DEFAULT 'delivery',
    items jsonb DEFAULT '[]'::jsonb,
    total_amount numeric(12,2) DEFAULT 0.00,
    notes text,
    status text DEFAULT 'pendiente',
    notified_to_merchant boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Asegurar columnas si la tabla 'orders' ya existía previamente
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS store_id text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_name text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_phone text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_address text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_type text DEFAULT 'delivery';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS total_amount numeric(12,2) DEFAULT 0.00;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status text DEFAULT 'pendiente';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS notified_to_merchant boolean DEFAULT false;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();

-- ------------------------------------------------------------
-- 6. TABLA: REVIEWS (Asegurar existencia y columnas)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id text,
    order_id uuid,
    customer_name text,
    rating integer DEFAULT 5,
    comment text,
    created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS store_id text;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS order_id uuid;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS customer_name text;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS rating integer DEFAULT 5;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS comment text;

-- ------------------------------------------------------------
-- 7. TABLA: STORE_CREDENTIALS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.store_credentials (
    store_id text PRIMARY KEY,
    supabase_url text DEFAULT 'https://iaylgsthwildjkiiwgfd.supabase.co',
    supabase_key text,
    cloudinary_name text DEFAULT 'deuog0r34',
    cloudinary_preset text DEFAULT 'daletepido_preset',
    ai_provider text DEFAULT 'gemini',
    claude_key text,
    claude_model text DEFAULT 'claude-haiku-4-5-20251001',
    gemini_key text,
    gemini_model text DEFAULT 'gemini-2.5-flash',
    updated_at timestamp with time zone DEFAULT now()
);

-- ============================================================
-- ÍNDICES DE RENDIMIENTO (Crear solo tras asegurar columnas)
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_products_store_id ON public.products(store_id);
CREATE INDEX IF NOT EXISTS idx_categories_store_id ON public.categories(store_id);
CREATE INDEX IF NOT EXISTS idx_orders_store_id ON public.orders(store_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- ============================================================
-- SEGURIDAD ROW LEVEL SECURITY (RLS) & POLÍTICAS
-- ============================================================

ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_credentials ENABLE ROW LEVEL SECURITY;

-- Limpieza de políticas previas
DROP POLICY IF EXISTS "Public read stores" ON public.stores;
DROP POLICY IF EXISTS "Public read settings" ON public.company_settings;
DROP POLICY IF EXISTS "Public read categories" ON public.categories;
DROP POLICY IF EXISTS "Public read products" ON public.products;
DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
DROP POLICY IF EXISTS "Public read orders" ON public.orders;
DROP POLICY IF EXISTS "Public read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public read credentials" ON public.store_credentials;

-- Políticas de Lectura Pública (catálogo y configuración)
CREATE POLICY "Public read stores" ON public.stores FOR SELECT USING (is_active = true OR is_active IS NULL);
CREATE POLICY "Public read settings" ON public.company_settings FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (active = true OR active IS NULL);
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (oculto = false OR oculto IS NULL);
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public read credentials" ON public.store_credentials FOR SELECT USING (true);

-- Permisos para Pedidos y Reseñas desde la Web
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- DATOS SEMILLA DE EJEMPLO PARA TIENDAS
INSERT INTO public.stores (store_id, name, subdomain, owner_name, owner_email, whatsapp_phone)
VALUES 
    ('ferreteria-demo', 'FerreApp Demo', 'ferreteria-demo', 'Juan Pérez', 'juan@ferreapp.com', '5491100001111'),
    ('kiosco-demo', 'MaxiKiosco El Sol', 'kiosco-demo', 'María Gomez', 'maria@elsol.com', '5491100002222'),
    ('gastronomia-demo', 'Burger House Demo', 'gastronomia-demo', 'Carlos Ruiz', 'carlos@burgerhouse.com', '5491100003333')
ON CONFLICT (store_id) DO NOTHING;
