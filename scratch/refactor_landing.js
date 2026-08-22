import fs from 'fs';

console.log('=== REFACTORING LANDING.HTML ===\n');

let html = fs.readFileSync('landing.html', 'utf8');

// 1. HERO SECTION REFACTOR
const oldHeroContent = `<div class="hero-content">
            <div class="hero-badge">⚡ 15 DÍAS DE PRUEBA GRATUITA · SIN COMISIONES POR VENTA</div>
            <h1>Vendé más con tu propio Catálogo Digital conectado a <span class="text-glow">WhatsApp</span></h1>
            <p>
                Creá tu tienda online en 15 minutos, cargá tus productos y recibí pedidos o solicitudes de presupuesto directo en tu celular, sin pagar porcentajes por venta.
            </p>
            <div class="hero-btns">
                <a href="/alta-usuario.html?action=register" class="btn-primary">
                    ⚡ Empezar 15 Días Gratis
                </a>
                <a href="#demo-stores-section" class="btn-secondary">
                    <i class="bi bi-shop"></i> Ver tiendas demo
                </a>
            </div>`;

const newHeroContent = `<div class="hero-content">
            <div class="hero-badge">⚡ 15 DÍAS DE PRUEBA GRATUITA · SIN COMISIONES POR VENTA</div>
            <h1>Armá tu catálogo online y recibí pedidos <span class="text-glow">directo en tu WhatsApp.</span></h1>
            <p>
                Sin comisiones por venta ni intermediarios. Subí tus productos en 15 minutos y dejá que tus clientes te compren de forma fácil y ordenada.
            </p>
            <div class="hero-btns">
                <a href="/alta-usuario.html?action=register" class="btn-primary">
                    🚀 Crear mi catálogo gratis
                </a>
                <a href="#demo-stores-section" class="btn-secondary">
                    <i class="bi bi-shop"></i> Ver Demos
                </a>
            </div>`;

if (html.includes(oldHeroContent)) {
  html = html.replace(oldHeroContent, newHeroContent);
  console.log('✅ 1. Hero Section actualizado.');
} else {
  console.log('⚠️ 1. Hero Section: no se encontró coincidencia exacta, intentando reemplazo regex...');
  html = html.replace(
    /<h1>Vendé más con tu propio Catálogo Digital conectado a <span class="text-glow">WhatsApp<\/span><\/h1>\s*<p>\s*Creá tu tienda online en 15 minutos, cargá tus productos y recibí pedidos o solicitudes de presupuesto directo en tu celular, sin pagar porcentajes por venta\.\s*<\/p>\s*<div class="hero-btns">\s*<a href="\/alta-usuario\.html\?action=register" class="btn-primary">\s*⚡ Empezar 15 Días Gratis\s*<\/a>\s*<a href="#demo-stores-section" class="btn-secondary">\s*<i class="bi bi-shop"><\/i> Ver tiendas demo\s*<\/a>\s*<\/div>/s,
    `<h1>Armá tu catálogo online y recibí pedidos <span class="text-glow">directo en tu WhatsApp.</span></h1>
            <p>
                Sin comisiones por venta ni intermediarios. Subí tus productos en 15 minutos y dejá que tus clientes te compren de forma fácil y ordenada.
            </p>
            <div class="hero-btns">
                <a href="/alta-usuario.html?action=register" class="btn-primary">
                    🚀 Crear mi catálogo gratis
                </a>
                <a href="#demo-stores-section" class="btn-secondary">
                    <i class="bi bi-shop"></i> Ver Demos
                </a>
            </div>`
  );
  console.log('✅ 1. Hero Section actualizado mediante Regex.');
}

// 2. BENEFICIOS RÁPIDOS SECTION
const oldFeaturesSection = html.slice(html.indexOf('<section class="features-section" id="features-section">'), html.indexOf('</section>', html.indexOf('<section class="features-section" id="features-section">')) + 10);

const newFeaturesSection = `<section class="features-section" id="features-section" style="background: #ffffff; padding: 70px 24px; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
                <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(214,0,0,0.08); border: 1px solid rgba(214,0,0,0.25); color: var(--red); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; padding: 6px 16px; border-radius: 999px; margin-bottom: 12px;">
                    ⚡ LO QUE NECESITÁS SABER
                </div>
                <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 800; color: #0f172a; letter-spacing: -1px;">
                    Beneficios rápidos para tu negocio
                </h2>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; transition: transform 0.2s, border-color 0.2s;" onmouseenter="this.style.transform='translateY(-4px)'; this.style.borderColor='var(--red)';" onmouseleave="this.style.transform='translateY(0)'; this.style.borderColor='#e2e8f0';">
                    <div style="font-size: 32px; margin-bottom: 14px;">💰</div>
                    <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">La ganancia es 100% tuya</h3>
                    <p style="font-size: 14px; color: #475569; margin: 0; line-height: 1.5;">Cero comisiones por venta. Lo que cobrás ingresa directo a tu bolsillo o cuenta bancaria.</p>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; transition: transform 0.2s, border-color 0.2s;" onmouseenter="this.style.transform='translateY(-4px)'; this.style.borderColor='var(--red)';" onmouseleave="this.style.transform='translateY(0)'; this.style.borderColor='#e2e8f0';">
                    <div style="font-size: 32px; margin-bottom: 14px;">📲</div>
                    <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">Pedidos ordenados</h3>
                    <p style="font-size: 14px; color: #475569; margin: 0; line-height: 1.5;">Te llega la lista exacta al WhatsApp con cantidades, variantes y datos del cliente, lista para despachar.</p>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; transition: transform 0.2s, border-color 0.2s;" onmouseenter="this.style.transform='translateY(-4px)'; this.style.borderColor='var(--red)';" onmouseleave="this.style.transform='translateY(0)'; this.style.borderColor='#e2e8f0';">
                    <div style="font-size: 32px; margin-bottom: 14px;">⚡</div>
                    <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">Súper fácil</h3>
                    <p style="font-size: 14px; color: #475569; margin: 0; line-height: 1.5;">Tu tienda online activa hoy mismo. Subí tus productos en 15 minutos sin conocimientos técnicos.</p>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; transition: transform 0.2s, border-color 0.2s;" onmouseenter="this.style.transform='translateY(-4px)'; this.style.borderColor='var(--red)';" onmouseleave="this.style.transform='translateY(0)'; this.style.borderColor='#e2e8f0';">
                    <div style="font-size: 32px; margin-bottom: 14px;">🔗</div>
                    <h3 style="font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">Para mostrador o Instagram</h3>
                    <p style="font-size: 14px; color: #475569; margin: 0; line-height: 1.5;">Compartí tu link único en redes sociales o usá tu código QR impreso en el mostrador de tu local.</p>
                </div>
            </div>
        </div>
    </section>`;

if (oldFeaturesSection && oldFeaturesSection.length > 50) {
  html = html.replace(oldFeaturesSection, newFeaturesSection);
  console.log('✅ 2. Beneficios Rápidos (features-section) actualizado.');
}

// 3. TIENDAS DEMO SLIDER REFACTOR
const oldDemoSection = html.slice(html.indexOf('<section class="demo-stores-section"'), html.indexOf('</section>', html.indexOf('<section class="demo-stores-section"')) + 10);

const newDemoSection = `<section class="demo-stores-section" id="demo-stores-section" style="background: #f4f5f8; padding: 80px 24px; border-top: 1px solid #e4e4e7; border-bottom: 1px solid #e4e4e7; position: relative; overflow: hidden;">
        <div class="container" style="position: relative; z-index: 2; max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 36px;">
                <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(214,0,0,0.08); border: 1px solid rgba(214,0,0,0.25); color: var(--red); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; padding: 6px 16px; border-radius: 999px; margin-bottom: 12px;">
                    🛍️ DEMOS INTERACTIVAS
                </div>
                <h2 style="font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 800; color: #0f172a; letter-spacing: -1px; margin-bottom: 10px;">
                    Explorá nuestras Tiendas Demo
                </h2>
                <p style="font-size: 15px; color: #64748b; max-width: 600px; margin: 0 auto;">
                    Hacé clic en cualquiera de nuestras plantillas para ver cómo lucirá tu catálogo en vivo.
                </p>
            </div>

            <!-- DEMO SLIDER WRAPPER -->
            <div style="position: relative; max-width: 820px; margin: 0 auto;">
                
                <!-- SLIDE CONTAINER -->
                <div id="demo-slider-container" style="overflow: hidden; border-radius: 24px; box-shadow: 0 15px 35px rgba(0,0,0,0.06); background: #ffffff; border: 1px solid #e2e8f0;">
                    <div id="demo-slider-track" style="display: flex; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
                        
                        <!-- SLIDE 1: GASTRONOMÍA & SIN TACC -->
                        <div style="min-width: 100%; padding: 36px; box-sizing: border-box;">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
                                <span style="font-size: 42px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); width: 68px; height: 68px; border-radius: 18px; display: flex; align-items: center; justify-content: center;">🥐</span>
                                <span style="background: rgba(16, 185, 129, 0.1); color: #047857; border: 1px solid rgba(16, 185, 129, 0.25); font-size: 12px; font-weight: 800; text-transform: uppercase; padding: 6px 14px; border-radius: 99px;">
                                    🌾 Gastronomía & Sin TACC
                                </span>
                            </div>
                            <h3 style="font-size: 26px; font-weight: 900; color: #0f172a; margin-bottom: 6px;">Gluten Free Bakery</h3>
                            <div style="display: inline-flex; align-items: center; gap: 6px; font-family: monospace; font-size: 13px; color: #047857; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); padding: 5px 12px; border-radius: 8px; margin-bottom: 16px;">
                                <i class="bi bi-globe"></i> glutenfree.daletepido.com.ar
                            </div>
                            <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
                                Menú interactivo con productos de panadería y repostería artesanal sin gluten. Permite a los clientes elegir sus sabores y enviar su pedido directo al WhatsApp de la panadería.
                            </p>
                            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                                <span style="font-size: 13px; color: #64748b; font-weight: 600;"><i class="bi bi-geo-alt-fill" style="color:#047857;"></i> Buenos Aires · Retiro & Envíos</span>
                                <a href="https://glutenfree.daletepido.com.ar/" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #059669; color: #ffffff; font-weight: 800; font-size: 14px; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.3);">
                                    Probar Demo <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                            </div>
                        </div>

                        <!-- SLIDE 2: FERRETERÍA & PRO -->
                        <div style="min-width: 100%; padding: 36px; box-sizing: border-box;">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
                                <span style="font-size: 42px; background: rgba(234, 88, 12, 0.1); border: 1px solid rgba(234, 88, 12, 0.25); width: 68px; height: 68px; border-radius: 18px; display: flex; align-items: center; justify-content: center;">🛠️</span>
                                <span style="background: rgba(234, 88, 12, 0.1); color: #c2410c; border: 1px solid rgba(234, 88, 12, 0.25); font-size: 12px; font-weight: 800; text-transform: uppercase; padding: 6px 14px; border-radius: 99px;">
                                    🔧 Ferretería & Pro
                                </span>
                            </div>
                            <h3 style="font-size: 26px; font-weight: 900; color: #0f172a; margin-bottom: 6px;">FerreNow Herramientas</h3>
                            <div style="display: inline-flex; align-items: center; gap: 6px; font-family: monospace; font-size: 13px; color: #c2410c; background: rgba(234, 88, 12, 0.08); border: 1px solid rgba(234, 88, 12, 0.2); padding: 5px 12px; border-radius: 8px; margin-bottom: 16px;">
                                <i class="bi bi-globe"></i> ferrenow.daletepido.com.ar
                            </div>
                            <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
                                Catálogo completo de herramientas eléctricas, insumos de electricidad y construcción con fotos, precios y stock organizado por categorías y subrubros.
                            </p>
                            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                                <span style="font-size: 13px; color: #64748b; font-weight: 600;"><i class="bi bi-geo-alt-fill" style="color:#c2410c;"></i> Buenos Aires · Envíos en el Día</span>
                                <a href="https://ferrenow.daletepido.com.ar/" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #ea580c; color: #ffffff; font-weight: 800; font-size: 14px; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 14px rgba(234, 88, 12, 0.3);">
                                    Probar Demo <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                            </div>
                        </div>

                        <!-- SLIDE 3: KIOSCO 24HS -->
                        <div style="min-width: 100%; padding: 36px; box-sizing: border-box;">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
                                <span style="font-size: 42px; background: rgba(219, 39, 119, 0.1); border: 1px solid rgba(219, 39, 119, 0.25); width: 68px; height: 68px; border-radius: 18px; display: flex; align-items: center; justify-content: center;">🍬</span>
                                <span style="background: rgba(219, 39, 119, 0.1); color: #be185d; border: 1px solid rgba(219, 39, 119, 0.25); font-size: 12px; font-weight: 800; text-transform: uppercase; padding: 6px 14px; border-radius: 99px;">
                                    🥤 Kiosco 24hs
                                </span>
                            </div>
                            <h3 style="font-size: 26px; font-weight: 900; color: #0f172a; margin-bottom: 6px;">Kiosco Julio 24hs</h3>
                            <div style="display: inline-flex; align-items: center; gap: 6px; font-family: monospace; font-size: 13px; color: #be185d; background: rgba(219, 39, 119, 0.08); border: 1px solid rgba(219, 39, 119, 0.2); padding: 5px 12px; border-radius: 8px; margin-bottom: 16px;">
                                <i class="bi bi-globe"></i> kioscojulio.daletepido.com.ar
                            </div>
                            <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
                                Catálogo dinámico de golosinas, chocolates, energizantes, snacks y bebidas heladas listo para tomar pedidos inmediatos a domicilio o retiro.
                            </p>
                            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                                <span style="font-size: 13px; color: #64748b; font-weight: 600;"><i class="bi bi-geo-alt-fill" style="color:#be185d;"></i> Buenos Aires · Abierto 24hs</span>
                                <a href="https://kioscojulio.daletepido.com.ar/" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #be185d; color: #ffffff; font-weight: 800; font-size: 14px; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 14px rgba(190, 24, 93, 0.3);">
                                    Probar Demo <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- NAVIGATION BUTTONS & DOTS -->
                <button onclick="moveDemoSlide(-1)" style="position: absolute; left: -20px; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: #ffffff; border: 1px solid #e2e8f0; box-shadow: 0 6px 20px rgba(0,0,0,0.1); cursor: pointer; display: flex; align-items: center; justify-content: center; color: #0f172a; font-size: 18px; z-index: 10;">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button onclick="moveDemoSlide(1)" style="position: absolute; right: -20px; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: #ffffff; border: 1px solid #e2e8f0; box-shadow: 0 6px 20px rgba(0,0,0,0.1); cursor: pointer; display: flex; align-items: center; justify-content: center; color: #0f172a; font-size: 18px; z-index: 10;">
                    <i class="bi bi-chevron-right"></i>
                </button>

                <!-- DOTS -->
                <div style="display: flex; justify-content: center; gap: 8px; margin-top: 20px;">
                    <button class="demo-dot active" onclick="setDemoSlide(0)" style="width: 28px; height: 8px; border-radius: 4px; background: var(--red); border: none; cursor: pointer; transition: all 0.3s;"></button>
                    <button class="demo-dot" onclick="setDemoSlide(1)" style="width: 10px; height: 8px; border-radius: 4px; background: #cbd5e1; border: none; cursor: pointer; transition: all 0.3s;"></button>
                    <button class="demo-dot" onclick="setDemoSlide(2)" style="width: 10px; height: 8px; border-radius: 4px; background: #cbd5e1; border: none; cursor: pointer; transition: all 0.3s;"></button>
                </div>

            </div>
        </div>
    </section>`;

if (oldDemoSection && oldDemoSection.length > 50) {
  html = html.replace(oldDemoSection, newDemoSection);
  console.log('✅ 3. Tiendas Demo (Slider de 3 diapositivas) actualizado.');
}

// 4. PASOS DE CATÁLOGO A PRESUPUESTO REFACTOR
const oldHowSection = html.slice(html.indexOf('<section class="how-section" id="how-section">'), html.indexOf('</section>', html.indexOf('<section class="how-section" id="how-section">')) + 10);

const newHowSection = `<section class="how-section" id="how-section" style="padding: 80px 24px;">
        <div class="container" style="max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 44px;">
                <div class="section-label">Así de simple</div>
                <h2 class="section-title">De catálogo a presupuesto en 3 pasos</h2>
                <p class="section-sub">Textos reducidos al mínimo para escaneo visual rápido.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px 24px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.03);">
                    <div style="width: 52px; height: 52px; background: rgba(214,0,0,0.08); border: 1px solid rgba(214,0,0,0.2); color: var(--red); font-size: 22px; font-weight: 900; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px auto;">1</div>
                    <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Eligen</h3>
                    <p style="font-size: 14.5px; color: #475569; line-height: 1.55; margin: 0;">Tus clientes entran a tu link y ven lo que vendés, sin bajar apps.</p>
                </div>

                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px 24px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.03);">
                    <div style="width: 52px; height: 52px; background: rgba(214,0,0,0.08); border: 1px solid rgba(214,0,0,0.2); color: var(--red); font-size: 22px; font-weight: 900; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px auto;">2</div>
                    <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Piden</h3>
                    <p style="font-size: 14.5px; color: #475569; line-height: 1.55; margin: 0;">Arman su carrito de compras en segundos.</p>
                </div>

                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px 24px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.03);">
                    <div style="width: 52px; height: 52px; background: rgba(214,0,0,0.08); border: 1px solid rgba(214,0,0,0.2); color: var(--red); font-size: 22px; font-weight: 900; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px auto;">3</div>
                    <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Vendés</h3>
                    <p style="font-size: 14.5px; color: #475569; line-height: 1.55; margin: 0;">Recibís el pedido claro y detallado en tu WhatsApp, listo para preparar.</p>
                </div>
            </div>
        </div>
    </section>`;

if (oldHowSection && oldHowSection.length > 50) {
  html = html.replace(oldHowSection, newHowSection);
  console.log('✅ 4. Pasos (how-section) actualizado.');
}

// 5. PLANES REFACTOR
const oldPricingSection = html.slice(html.indexOf('<section class="pricing-section" id="pricing-section">'), html.indexOf('</section>', html.indexOf('<section class="pricing-section" id="pricing-section">')) + 10);

const newPricingSection = `<section class="pricing-section" id="pricing-section">
        <div class="container">
            <div style="text-align:center">
                <div class="section-label">Planes</div>
                <h2 class="section-title">Empezá hoy,<br>crecé sin límites</h2>
                <p class="section-sub" style="margin:0 auto">Sin permanencia mínima. Cancelás cuando quieras.</p>
            </div>
            <div class="pricing-grid">
                <!-- PLAN STARTER -->
                <div class="price-card">
                    <div class="price-name">Plan Starter</div>
                    <div class="price-amount">$19.900 <small>/ mes</small></div>
                    <div class="price-period">Para empezar sin riesgos</div>
                    <ul class="price-features" style="list-style:none; padding:0; display:flex; flex-direction:column; gap:10px; margin-top: 16px;">
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Hasta 12 productos</li>
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> QR para tu local</li>
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Pedidos ilimitados al celular</li>
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Subdominio personalizado</li>
                    </ul>
                    <button class="price-cta" onclick="openRegisterModal()" style="margin-top:24px;">Crear mi tienda Starter</button>
                </div>

                <!-- PLAN PRO -->
                <div class="price-card featured">
                    <div class="price-badge">⚡ MÁS VENDIDO</div>
                    <div class="price-name">Plan PRO</div>
                    <div class="price-amount">$29.900 <small>/ mes</small></div>
                    <div class="price-period">Para comercios que crecen</div>
                    <ul class="price-features" style="list-style:none; padding:0; display:flex; flex-direction:column; gap:10px; margin-top: 16px;">
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Productos e imágenes ilimitadas</li>
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Posicionamiento local (SEO/GEO)</li>
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Métricas de tus clientes</li>
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Pedidos ilimitados a WhatsApp</li>
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Soporte prioritario por WhatsApp</li>
                    </ul>
                    <button class="price-cta" onclick="openRegisterModal()" style="margin-top:24px;">Quiero el Plan PRO</button>
                </div>

                <!-- PLAN ENTERPRISE -->
                <div class="price-card">
                    <div class="price-name">Plan Enterprise</div>
                    <div class="price-amount">$59.900 <small>/ mes</small></div>
                    <div class="price-period">Para negocios a gran escala</div>
                    <ul class="price-features" style="list-style:none; padding:0; display:flex; flex-direction:column; gap:10px; margin-top: 16px;">
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Soporte prioritario 24/7</li>
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Te ayudamos a cargar todo tu catálogo</li>
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Todo lo del Plan PRO</li>
                        <li style="display:flex; align-items:center; gap:8px;"><span style="color:#10b981; font-weight:bold;">✓</span> Asistencia personalizada en tu local</li>
                    </ul>
                    <button class="price-cta" onclick="openRegisterModal()" style="margin-top:24px;">Contactar por Enterprise</button>
                </div>
            </div>

            <!-- BANNER SETUP INICIAL ASISTIDO -->
            <div style="max-width:1080px; margin:36px auto 0; background:var(--fog); border:2px dashed var(--red); border-radius:18px; padding:24px 32px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
                <div>
                    <div style="font-size:16px; font-weight:800; color:var(--dark); display:flex; align-items:center; gap:8px;">
                        🛠️ Setup Inicial Asistido — $35.000 <span style="font-size:11px; font-weight:700; color:var(--red); background:rgba(214,0,0,0.1); padding:3px 10px; border-radius:999px; text-transform:uppercase;">Pago único</span>
                    </div>
                    <div style="font-size:13.5px; color:#555; margin-top:4px; max-width:720px; line-height:1.5;">
                        ¿No tenés tiempo para configurar tu tienda? Un especialista de nuestro equipo te acompaña para dejar tu catálogo cargado y 100% funcionando.
                    </div>
                </div>
                <button class="price-cta" onclick="openRegisterModal()" style="width:auto; padding:12px 24px; font-size:13.5px;">Quiero mi Setup</button>
            </div>
        </div>
    </section>`;

if (oldPricingSection && oldPricingSection.length > 50) {
  html = html.replace(oldPricingSection, newPricingSection);
  console.log('✅ 5. Planes (pricing-section) actualizado.');
}

// 6. FAQ REFACTOR (Acordeón Lateral / Limpio)
const oldFaqSection = html.slice(html.indexOf('<section id="faq-section"'), html.indexOf('</section>', html.indexOf('<section id="faq-section"')) + 10);

const newFaqSection = `<section id="faq-section" style="background: #ffffff; padding: 80px 24px; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: flex-start;">
                
                <!-- COLUMNA IZQUIERDA: TÍTULO E INFORMACIÓN -->
                <div>
                    <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(214,0,0,0.08); border: 1px solid rgba(214,0,0,0.25); color: var(--red); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; padding: 6px 16px; border-radius: 999px; margin-bottom: 14px;">
                        ❓ RESPUESTAS RÁPIDAS
                    </div>
                    <h2 style="font-size: clamp(2rem, 3.5vw, 2.6rem); font-weight: 800; color: #0f172a; letter-spacing: -1px; margin-bottom: 14px; line-height: 1.15;">
                        Preguntas Frecuentes (FAQ)
                    </h2>
                    <p style="font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
                        Resolvemos tus dudas principales para que puedas dar el paso y empezar a vender hoy mismo.
                    </p>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px;">
                        <div style="font-weight: 800; font-size: 14px; color: #0f172a; margin-bottom: 4px;">¿Tenés otra consulta?</div>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 12px;">Escribinos directamente a soporte por WhatsApp.</div>
                        <a href="https://wa.me/5491100000000" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; color: var(--red); font-weight: 700; font-size: 13px; text-decoration: none;">
                            <i class="bi bi-whatsapp"></i> Hablar con Soporte →
                        </a>
                    </div>
                </div>

                <!-- COLUMNA DERECHA: ACORDEÓN DESPLEGABLE -->
                <div style="display: flex; flex-direction: column; gap: 12px;" id="faq-accordion">
                    
                    <div class="faq-item" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; transition: all 0.2s;">
                        <button type="button" onclick="toggleFaq(this)" style="width: 100%; text-align: left; padding: 18px 22px; background: transparent; border: none; font-size: 15px; font-weight: 700; color: #0f172a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 12px; font-family: inherit;">
                            <span>¿Tiene algún costo de comisión por cada venta?</span>
                            <i class="bi bi-chevron-down faq-icon" style="font-size: 16px; color: var(--red); transition: transform 0.3s ease;"></i>
                        </button>
                        <div class="faq-answer" style="display: none; padding: 0 22px 20px 22px; color: #475569; font-size: 14px; line-height: 1.6; border-top: 1px solid #f1f5f9; padding-top: 14px;">
                            No. Dale! Te Pido cobra una tarifa fija mensual o podés empezar gratis. Toda la ganancia de tus ventas es 100% tuya, sin intermediarios ni porcentajes sobre tus productos.
                        </div>
                    </div>

                    <div class="faq-item" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; transition: all 0.2s;">
                        <button type="button" onclick="toggleFaq(this)" style="width: 100%; text-align: left; padding: 18px 22px; background: transparent; border: none; font-size: 15px; font-weight: 700; color: #0f172a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 12px; font-family: inherit;">
                            <span>¿Cómo reciben los clientes su pedido por WhatsApp?</span>
                            <i class="bi bi-chevron-down faq-icon" style="font-size: 16px; color: var(--red); transition: transform 0.3s ease;"></i>
                        </button>
                        <div class="faq-answer" style="display: none; padding: 0 22px 20px 22px; color: #475569; font-size: 14px; line-height: 1.6; border-top: 1px solid #f1f5f9; padding-top: 14px;">
                            El cliente ingresa a tu catálogo digital desde su celular, arma su carrito y al presionar "Enviar Pedido", se le abre automáticamente tu chat de WhatsApp con el desglose exacto de productos, cantidades y total.
                        </div>
                    </div>

                    <div class="faq-item" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; transition: all 0.2s;">
                        <button type="button" onclick="toggleFaq(this)" style="width: 100%; text-align: left; padding: 18px 22px; background: transparent; border: none; font-size: 15px; font-weight: 700; color: #0f172a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 12px; font-family: inherit;">
                            <span>¿Necesito conocimientos técnicos para armar mi tienda?</span>
                            <i class="bi bi-chevron-down faq-icon" style="font-size: 16px; color: var(--red); transition: transform 0.3s ease;"></i>
                        </button>
                        <div class="faq-answer" style="display: none; padding: 0 22px 20px 22px; color: #475569; font-size: 14px; line-height: 1.6; border-top: 1px solid #f1f5f9; padding-top: 14px;">
                            Para nada. El panel de control es súper intuitivo. Subís la foto, ponés título y precio, y en 15 minutos tenés tu catálogo activo y listo para difundir.
                        </div>
                    </div>

                    <div class="faq-item" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; transition: all 0.2s;">
                        <button type="button" onclick="toggleFaq(this)" style="width: 100%; text-align: left; padding: 18px 22px; background: transparent; border: none; font-size: 15px; font-weight: 700; color: #0f172a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 12px; font-family: inherit;">
                            <span>¿Cómo funciona el Código QR para el local?</span>
                            <i class="bi bi-chevron-down faq-icon" style="font-size: 16px; color: var(--red); transition: transform 0.3s ease;"></i>
                        </button>
                        <div class="faq-answer" style="display: none; padding: 0 22px 20px 22px; color: #475569; font-size: 14px; line-height: 1.6; border-top: 1px solid #f1f5f9; padding-top: 14px;">
                            Desde tu panel descargás tu Kit Imprimible con carteles para mostrador, vidriera y tarjetitas. Los clientes escanean el QR con la cámara de su celular y acceden a tu catálogo en el acto.
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>`;

if (oldFaqSection && oldFaqSection.length > 50) {
  html = html.replace(oldFaqSection, newFaqSection);
  console.log('✅ 6. FAQ Section (Acordeón Lateral) actualizado.');
}

// 7. ADD SLIDER JAVASCRIPT FUNCTIONS
const sliderJs = `
    <!-- DEMO SLIDER SCRIPT -->
    <script>
      let currentDemoIndex = 0;
      function moveDemoSlide(direction) {
        const track = document.getElementById('demo-slider-track');
        const dots = document.querySelectorAll('.demo-dot');
        if (!track) return;
        currentDemoIndex = (currentDemoIndex + direction + 3) % 3;
        track.style.transform = \`translateX(-\${currentDemoIndex * 100}%)\`;
        dots.forEach((dot, idx) => {
          if (idx === currentDemoIndex) {
            dot.style.background = 'var(--red)';
            dot.style.width = '28px';
          } else {
            dot.style.background = '#cbd5e1';
            dot.style.width = '10px';
          }
        });
      }
      function setDemoSlide(index) {
        currentDemoIndex = index;
        moveDemoSlide(0);
      }
    </script>
`;

if (!html.includes('currentDemoIndex')) {
  html = html.replace('</body>', sliderJs + '\n</body>');
  console.log('✅ 7. JavaScript del Slider de Demos agregado.');
}

fs.writeFileSync('landing.html', html);
console.log('\n🎉 LANDING.HTML REFACTORIZADO Y GUARDADO EXITOSAMENTE.');
