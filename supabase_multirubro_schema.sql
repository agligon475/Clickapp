-- =====================================================================
-- DALE!TEPIDO 🤝 DALE!QUEVOY — UNIFIED MULTI-RUBRO SUPABASE SCHEMA
-- Multi-Rubro Catalog & Shared Multimodal Delivery Network
-- =====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. LOCALES / COMERCIOS MULTI-RUBRO (MERCHANTS)
CREATE TABLE IF NOT EXISTS public.merchants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL, -- ej: 'farmacia-central', 'ferre-now', 'boutique-chic'
    name TEXT NOT NULL,
    business_type TEXT NOT NULL CHECK (business_type IN (
        'GASTRONOMY', 'PHARMACY', 'ECOMMERCE', 'GROCERY', 
        'RETAIL', 'HARDWARE', 'PETSHOP', 'BOOKSTORE', 'ELECTRONICS', 'OTHER'
    )),
    address TEXT NOT NULL,
    lat NUMERIC(10, 7),
    lng NUMERIC(10, 7),
    phone TEXT NOT NULL,
    email TEXT,
    logo_url TEXT,
    banner_url TEXT,
    is_open BOOLEAN DEFAULT TRUE,
    minimum_order_ars NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CATEGORÍAS DEL CATÁLOGO (MULTI-RUBRO)
CREATE TABLE IF NOT EXISTS public.menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES public.merchants(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- ej: 'Herramientas Eléctricas', 'Alimentos Medicados', 'Calzado Deportivo', 'Cafetería'
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PRODUCTOS DEL CATÁLOGO MULTI-RUBRO (MENU_ITEMS)
-- Soporta atributos dinámicos (talles, colores, marcas, dosis, especificaciones técnicas) y peso de transporte
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID NOT NULL REFERENCES public.merchants(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.menu_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    price_ars NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    sku TEXT,
    weight_kg NUMERIC(6, 2) NOT NULL DEFAULT 0.5,
    is_available BOOLEAN DEFAULT TRUE,
    options JSONB DEFAULT '[]', -- Talles, colores, dosis, presentaciones, especificaciones técnicas
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABLA COMPARTIDA DE LOGÍSTICA MULTIMODAL CON DALE!QUEVOY (DELIVERIES)
CREATE TABLE IF NOT EXISTS public.deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    origin_app TEXT NOT NULL DEFAULT 'TEPIDO' CHECK (origin_app IN ('QUEVOY', 'TEPIDO')),
    requester_id UUID NOT NULL,
    driver_id UUID,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('PHARMACY', 'PETSHOP', 'RETAIL', 'FOOD', 'LARGE_CARGO', 'SMALL_BOX')),
    weight_kg NUMERIC(6, 2) NOT NULL,
    origin_address TEXT NOT NULL,
    origin_lat NUMERIC(10, 7),
    origin_lng NUMERIC(10, 7),
    destination_address TEXT NOT NULL,
    destination_lat NUMERIC(10, 7),
    destination_lng NUMERIC(10, 7),
    offered_price_ars NUMERIC(10, 2) NOT NULL,
    est_distance_km NUMERIC(5, 2) NOT NULL,
    pin_code VARCHAR(4) NOT NULL,
    status TEXT NOT NULL DEFAULT 'SEARCHING' CHECK (status IN ('SEARCHING', 'ACCEPTED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED')),
    is_commute_matched BOOLEAN DEFAULT FALSE,
    customer_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. PEDIDOS (ORDERS MULTI-RUBRO EN DALE!TEPIDO)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    merchant_id UUID REFERENCES public.merchants(id) ON DELETE SET NULL,
    order_number TEXT NOT NULL, -- ej: 'TP-3041'
    order_type TEXT NOT NULL CHECK (order_type IN ('TAKE_AWAY', 'DELIVERY', 'IN_STORE')),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    delivery_address TEXT,
    delivery_lat NUMERIC(10, 7),
    delivery_lng NUMERIC(10, 7),
    items JSONB NOT NULL,
    subtotal_ars NUMERIC(10, 2) NOT NULL,
    delivery_fee_ars NUMERIC(10, 2) DEFAULT 0,
    total_ars NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'RECEIVED' CHECK (status IN ('RECEIVED', 'PREPARING', 'READY_FOR_PICKUP', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED')),
    delivery_id UUID REFERENCES public.deliveries(id) ON DELETE SET NULL,
    pin_code VARCHAR(4),
    payment_method TEXT NOT NULL DEFAULT 'TRANSFER' CHECK (payment_method IN ('CASH', 'MERCADOPAGO', 'TRANSFER')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. COMPATIBILIDAD CON TABLAS EXISTENTES DE DALE!TEPIDO
-- Si ya existen 'products' y 'company_settings', asegurar columnas para retrocompatibilidad
DO $$ 
BEGIN
    -- Agregar weight_kg a products
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'products') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'weight_kg') THEN
            ALTER TABLE public.products ADD COLUMN weight_kg NUMERIC(6, 2) DEFAULT 0.5;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'options') THEN
            ALTER TABLE public.products ADD COLUMN options JSONB DEFAULT '[]';
        END IF;
    END IF;

    -- Agregar business_type a company_settings
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'company_settings') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'company_settings' AND column_name = 'business_type') THEN
            ALTER TABLE public.company_settings ADD COLUMN business_type TEXT DEFAULT 'OTHER';
        END IF;
    END IF;
END $$;

-- 8. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Merchants Public Read" ON public.merchants FOR SELECT USING (true);
CREATE POLICY "Menu Categories Public Read" ON public.menu_categories FOR SELECT USING (true);
CREATE POLICY "Menu Items Public Read" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Deliveries Public Read" ON public.deliveries FOR SELECT USING (true);
CREATE POLICY "Deliveries Insert All" ON public.deliveries FOR INSERT WITH CHECK (true);
CREATE POLICY "Deliveries Update All" ON public.deliveries FOR UPDATE USING (true);
CREATE POLICY "Orders Public Read" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Orders Insert All" ON public.orders FOR INSERT WITH CHECK (true);

-- 9. SUPABASE REALTIME PUBLICATION
-- Habilita eventos Realtime en la tabla compartida de envíos para trazabilidad en vivo
ALTER PUBLICATION supabase_realtime ADD TABLE public.deliveries;
