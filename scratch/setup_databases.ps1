$SUPABASE_URL = "https://iaylgsthwildjkiiwgfd.supabase.co"
$SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4"

$headers = @{
    "Content-Type" = "application/json"
    "apikey"       = $SUPABASE_KEY
    "Authorization" = "Bearer $SUPABASE_KEY"
}

# Helper to get emojis without encoding issues
function Get-Emoji([int]$code) {
    return [char]::ConvertFromUtf32($code)
}

function Clear-Store([string]$storeId) {
    Write-Host "Limpiando $storeId..."
    try {
        # Delete products FIRST to avoid foreign key conflicts
        $null = Invoke-RestMethod -Uri "$SUPABASE_URL/rest/v1/products?store_id=eq.$storeId" -Method Delete -Headers $headers -ErrorAction Stop
        $null = Invoke-RestMethod -Uri "$SUPABASE_URL/rest/v1/categories?store_id=eq.$storeId" -Method Delete -Headers $headers -ErrorAction Stop
    } catch {
        Write-Warning "Fallo al limpiar productos/categorias para $storeId"
    }
}

function Insert-Store([string]$storeId, $cfg, $cats, $prods) {
    Write-Host "Configurando $storeId..."
    
    # 1. Company Settings (Upsert using GET + POST/PATCH to avoid DELETE RLS errors)
    if ($cfg) {
        $settings = @{
            business_name = $cfg.name
            primary_color = $cfg.color
            secondary_color = $cfg.color
            banner1_label = "NUEVAS"
            banner1_title = "Ver novedades"
            banner1_img = ""
            banner1_cat = if ($cats.Count -gt 0) { $cats[0].name } else { "" }
            banner2_label = "PROMO"
            banner2_title = "Imperdibles"
            banner2_img = ""
            banner2_cat = if ($cats.Count -gt 1) { $cats[1].name } else { "" }
            store_id = $storeId
        }
        $body = $settings | ConvertTo-Json -Depth 5
        
        # Check if settings already exist
        try {
            $existing = Invoke-RestMethod -Uri "$SUPABASE_URL/rest/v1/company_settings?store_id=eq.$storeId" -Method Get -Headers $headers -ErrorAction Stop
            if ($existing.Count -gt 0) {
                # Update existing
                $null = Invoke-RestMethod -Uri "$SUPABASE_URL/rest/v1/company_settings?store_id=eq.$storeId" -Method Patch -Headers $headers -Body $body -ErrorAction Stop
                Write-Host "Settings actualizados para $storeId"
            } else {
                # Insert new
                $null = Invoke-RestMethod -Uri "$SUPABASE_URL/rest/v1/company_settings" -Method Post -Headers $headers -Body $body -ErrorAction Stop
                Write-Host "Settings creados para $storeId"
            }
        } catch {
            Write-Warning "Error al gestionar company_settings"
        }
    }

    # 2. Categories
    if ($cats.Count -gt 0) {
        $dbCats = @()
        $idx = 1
        foreach ($c in $cats) {
            $dbCats += @{
                name = $c.name
                emoji = $c.icon
                display_order = $idx
                active = $true
                store_id = $storeId
            }
            $idx++
        }
        $body = $dbCats | ConvertTo-Json -Depth 5
        $null = Invoke-RestMethod -Uri "$SUPABASE_URL/rest/v1/categories" -Method Post -Headers $headers -Body $body
    }

    # 3. Products
    if ($prods.Count -gt 0) {
        $dbProds = @()
        foreach ($p in $prods) {
            $dbProds += @{
                nombre = $p.name
                precio = $p.price
                stock = $p.stock
                categoria = $p.cat
                emoji = $p.emoji
                detalles = $p.desc
                oculto = $false
                store_id = $storeId
            }
        }
        $body = $dbProds | ConvertTo-Json -Depth 5
        $null = Invoke-RestMethod -Uri "$SUPABASE_URL/rest/v1/products" -Method Post -Headers $headers -Body $body
    }
    Write-Host "Store $storeId configurado con exito!"
}

# ── 1. FERRETERIA DEMO ──
Clear-Store "ferreteria-demo"
$cats = @(
    @{ name = "Herramientas"; icon = Get-Emoji 0x1F527 }
    @{ name = "Electricidad"; icon = Get-Emoji 0x26A1 }
    @{ name = "Pintura"; icon = Get-Emoji 0x1F3A8 }
    @{ name = "Construccion"; icon = Get-Emoji 0x1F9F1 }
)
$prods = @(
    @{ name = "Taladro Percutor 500W"; price = 45000; stock = 5; cat = "Herramientas"; emoji = Get-Emoji 0x1F528; desc = "Ideal para uso domestico. Mandril 13mm." }
    @{ name = "Amoladora Angular 115mm"; price = 38000; stock = 3; cat = "Herramientas"; emoji = Get-Emoji 0x1F527; desc = "800W de potencia. Incluye disco." }
    @{ name = "Cable Taller 2x1.5 (10m)"; price = 12000; stock = 12; cat = "Electricidad"; emoji = Get-Emoji 0x1F50C; desc = "Rollo x 10 metros normalizado." }
    @{ name = "Cinta Aisladora 3M"; price = 1500; stock = 50; cat = "Electricidad"; emoji = Get-Emoji 0x26A1; desc = "19mm x 20m. Color negro." }
    @{ name = "Latex Interior Blanco 20L"; price = 28000; stock = 8; cat = "Pintura"; emoji = Get-Emoji 0x1F3A8; desc = "Blanco mate. Alto poder cubritivo." }
    @{ name = "Cemento Loma Negra 50kg"; price = 7500; stock = 100; cat = "Construccion"; emoji = Get-Emoji 0x1F9F1; desc = "Cemento portland normal." }
)
Insert-Store "ferreteria-demo" @{ name = "FerreApp Demo"; color = "#D72638" } $cats $prods

# ── 2. KIOSCO DEMO ──
Clear-Store "kiosco-demo"
$cats = @(
    @{ name = "Bebidas"; icon = Get-Emoji 0x1F964 }
    @{ name = "Cervezas"; icon = Get-Emoji 0x1F37A }
    @{ name = "Golosinas"; icon = Get-Emoji 0x1F36B }
    @{ name = "Snacks"; icon = Get-Emoji 0x1F37F }
)
$prods = @(
    @{ name = "Coca Cola 2.25L"; price = 2500; stock = 24; cat = "Bebidas"; emoji = Get-Emoji 0x1F964; desc = "Sabor original" }
    @{ name = "Agua Mineral 1.5L"; price = 900; stock = 30; cat = "Bebidas"; emoji = Get-Emoji 0x1F4A7; desc = "Sin gas" }
    @{ name = "Cerveza Quilmes 1L"; price = 1800; stock = 40; cat = "Cervezas"; emoji = Get-Emoji 0x1F37A; desc = "Retornable bien fria" }
    @{ name = "Gomitas Mogul 100g"; price = 1200; stock = 20; cat = "Golosinas"; emoji = Get-Emoji 0x1F36C; desc = "Sabores frutales surtidos" }
    @{ name = "Alfajor Triple"; price = 900; stock = 50; cat = "Golosinas"; emoji = Get-Emoji 0x1F36B; desc = "Sabor chocolate" }
    @{ name = "Papas Lays Clasicas 140g"; price = 1500; stock = 15; cat = "Snacks"; emoji = Get-Emoji 0x1F37F; desc = "Paquete grande" }
)
Insert-Store "kiosco-demo" @{ name = "MaxiKiosco El Sol Demo"; color = "#F39C12" } $cats $prods

# ── 3. GASTRONOMIA DEMO ──
Clear-Store "gastronomia-demo"
$cats = @(
    @{ name = "Hamburguesas"; icon = Get-Emoji 0x1F354 }
    @{ name = "Papas & Snacks"; icon = Get-Emoji 0x1F35F }
    @{ name = "Bebidas"; icon = Get-Emoji 0x1F964 }
    @{ name = "Postres"; icon = Get-Emoji 0x1F370 }
)
$prods = @(
    @{ name = "Doble Cheddar Bacon"; price = 8500; stock = 100; cat = "Hamburguesas"; emoji = Get-Emoji 0x1F354; desc = "Doble medallon 120g, doble cheddar, panceta crocante y salsa de la casa." }
    @{ name = "Onion Smash"; price = 7900; stock = 100; cat = "Hamburguesas"; emoji = Get-Emoji 0x1F354; desc = "Medallon 150g, cebolla crispy, queso provolone." }
    @{ name = "Papas Fritas Grandes"; price = 4000; stock = 100; cat = "Papas & Snacks"; emoji = Get-Emoji 0x1F35F; desc = "Porcion grande para compartir" }
    @{ name = "Nuggets de Pollo (x10)"; price = 4500; stock = 50; cat = "Papas & Snacks"; emoji = Get-Emoji 0x1F357; desc = "Acompanados con salsa barbacoa" }
    @{ name = "Lata Coca Cola 354ml"; price = 1200; stock = 200; cat = "Bebidas"; emoji = Get-Emoji 0x1F964; desc = "Bien fria" }
    @{ name = "Chocotorta"; price = 3500; stock = 15; cat = "Postres"; emoji = Get-Emoji 0x1F370; desc = "Porcion individual casera" }
)
Insert-Store "gastronomia-demo" @{ name = "Burger House Demo"; color = "#E74C3C" } $cats $prods

# ── 4. ELECTRONICA DEMO ──
Clear-Store "electronica-demo"
$cats = @(
    @{ name = "Smartphones"; icon = Get-Emoji 0x1F4F1 }
    @{ name = "Auriculares"; icon = Get-Emoji 0x1F3A7 }
    @{ name = "Accesorios"; icon = Get-Emoji 0x1F50C }
    @{ name = "Gaming"; icon = Get-Emoji 0x1F3AE }
)
$prods = @(
    @{ name = "iPhone 13 128GB"; price = 900000; stock = 5; cat = "Smartphones"; emoji = Get-Emoji 0x1F4F1; desc = "Cerrado en caja, garantia oficial Apple" }
    @{ name = "Samsung Galaxy S23"; price = 850000; stock = 4; cat = "Smartphones"; emoji = Get-Emoji 0x1F4F1; desc = "Color negro, 256GB" }
    @{ name = "AirPods Pro 2"; price = 250000; stock = 5; cat = "Auriculares"; emoji = Get-Emoji 0x1F3A7; desc = "Cancelacion de ruido activa" }
    @{ name = "Cargador Rapido 20W"; price = 15000; stock = 30; cat = "Accesorios"; emoji = Get-Emoji 0x1F50C; desc = "Ficha tipo C" }
    @{ name = "Funda Silicona"; price = 8000; stock = 50; cat = "Accesorios"; emoji = Get-Emoji 0x1F6E1; desc = "Consultar colores por WhatsApp" }
    @{ name = "Joystick PS5 DualSense"; price = 120000; stock = 8; cat = "Gaming"; emoji = Get-Emoji 0x1F3AE; desc = "Original en caja sellada" }
)
Insert-Store "electronica-demo" @{ name = "Electro Store Demo"; color = "#3498DB" } $cats $prods

# ── 5. FERRETERIA VACIA ──
Clear-Store "ferreteria-vacia"
$cats = @(@{ name = "General"; icon = Get-Emoji 0x1F4E6 })
Insert-Store "ferreteria-vacia" @{ name = "Mi Ferreteria"; color = "#D72638" } $cats @()

# ── 6. KIOSCO VACIA ──
Clear-Store "kiosco-vacia"
$cats = @(@{ name = "General"; icon = Get-Emoji 0x1F4E6 })
Insert-Store "kiosco-vacia" @{ name = "Mi Kiosco"; color = "#F39C12" } $cats @()

# ── 7. GASTRONOMIA VACIA ──
Clear-Store "gastronomia-vacia"
$cats = @(@{ name = "General"; icon = Get-Emoji 0x1F4E6 })
Insert-Store "gastronomia-vacia" @{ name = "Mi Local Gastronomico"; color = "#E74C3C" } $cats @()

# ── 8. ELECTRONICA VACIA ──
Clear-Store "electronica-vacia"
$cats = @(@{ name = "General"; icon = Get-Emoji 0x1F4E6 })
Insert-Store "electronica-vacia" @{ name = "Mi Tienda Electronica"; color = "#3498DB" } $cats @()

Write-Host "Las 8 tiendas en Supabase han sido inicializadas exitosamente!"
