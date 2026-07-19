# Especificación Técnica de Optimización: Dale! Te Pido (SEO / AEO / GEO)

**Destinatario:** Equipo de Desarrollo (Antigravity)  
**Autor:** Administración de Dale! Te Pido  
**Fecha:** 16 de Julio de 2026  
**Objetivo:** Elevar el puntaje global de optimización (actualmente en 48/100) y configurar el sitio y sus subdominios para indexación tradicional (SEO) y motores de respuesta por Inteligencia Artificial (AEO / GEO).

---

## PARTE 1: SITIO PRINCIPAL (www.daletepido.com.ar)
*Puntaje de Auditoría: 48/100 (F)*

### 1. Acciones Críticas e Inmediatas (Impacto Directo en Indexación)

*   **Implementar Enlaces Contextuales Internos:**
    *   **Problema:** El rastreador detecta 0 enlaces internos contextuales.
    *   **Solución:** Agregar entre 5 y 8 enlaces dentro del texto que dirijan a páginas de soporte, planes o características internas del sitio para evitar páginas huérfanas.
*   **Agregar Etiqueta Canonical:**
    *   **Problema:** Falta en el `<head>`. Riesgo de canibalización y contenido duplicado.
    *   **Solución:** Insertar en el `<head>` de la página principal:
        ```html
        <link rel="canonical" href="https://www.daletepido.com.ar/" />
        ```
*   **Estructurar Datos Schema JSON-LD (Puntaje de Schema actual: 0%):**
    *   **Problema:** Falta absoluta de marcado de datos estructurados.
    *   **Solución:** Insertar en el `<head>` el marcado base en formato JSON-LD:
        ```json
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Dale! Te Pido",
          "url": "https://www.daletepido.com.ar",
          "logo": "https://www.daletepido.com.ar/logo.png",
          "sameAs": [
            "https://www.linkedin.com/company/daletepido"
          ]
        }
        ```

### 2. Prioridad Alta (Metaetiquetas y CTR)

*   **Optimizar Meta Description:**
    *   **Problema:** Actualmente tiene solo 104 caracteres (demasiado corta).
    *   **Solución:** Ampliar a un rango de **120 a 160 caracteres**, incluyendo keywords clave y un llamado a la acción claro.
*   **Implementar Etiqueta Open Graph (`og:image`):**
    *   **Problema:** Falta la previsualización de imagen para redes sociales y WhatsApp.
    *   **Solución:** Agregar en el `<head>` apuntando a un asset estático de 1200x630px:
        ```html
        <meta property="og:image" content="https://www.daletepido.com.ar/assets/og-image.jpg" />
        ```
*   **Sitemap XML Invalido:**
    *   **Problema:** El archivo `sitemap.xml` actual está corrupto o mal formateado.
    *   **Solución:** Regenerar el archivo XML bajo estándares correctos y vincularlo en el `robots.txt` agregando la directiva:
        ```text
        Sitemap: https://www.daletepido.com.ar/sitemap.xml
        ```

### 3. Ajustes de Rendimiento y Seguridad (Prioridad Media)

*   **CLS (Cumulative Layout Shift):** Definir atributos `width` y `height` en las 4 imágenes que carecen de ellos.
*   **Formatos de Imagen Modernos:** Convertir imágenes PNG/JPG de la home a **WebP** o **AVIF** (reducción del 25-50% del peso del archivo).
*   **Carga Diferida (Lazy Loading):** Implementar el atributo `loading="lazy"` en las 3 imágenes fuera del primer scroll.
*   **Cabeceras de Seguridad HTTP:** Configurar en servidor:
    *   `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'`
    *   `X-Content-Type-Options: nosniff`
    *   `X-Frame-Options: SAMEORIGIN`

---

## PARTE 2: PLANTILLA MAESTRA PARA SUBDOMINIOS (*.daletepido.com.ar)
*Puntaje de Muestra (cocostore): 46/100 (F)*

> **IMPORTANTE:** No realizar optimizaciones manuales en tiendas individuales. Las correcciones deben aplicarse en el **motor de plantillas (layout dinámico)** en el backend para que se hereden en todos los subdominios de clientes de manera automática.

*   **Generación de Títulos e H1 Dinámicos (Crítico):**
    *   **Problema:** Las tiendas carecen de etiqueta H1 y usan títulos genéricos que afectan el CTR.
    *   **Solución:** Inyectar dinámicamente el nombre de la tienda del cliente en el `<title>` de la página y en el elemento principal `<h1>`:
        ```html
        <h1>[Nombre del Comercio] - Catálogo Online</h1>
        ```
*   **Meta Descriptions Dinámicas (Crítico):**
    *   **Problema:** Ausencia de meta descripciones en los subdominios.
    *   **Solución:** Crear una regla de fallback automática en la plantilla base:
        ```html
        <meta name="description" content="Explorá el catálogo online de [NombreTienda]. Realizá tu pedido directamente por WhatsApp de forma fácil." />
        ```
*   **Etiquetas Canonical Dinámicas (Crítico):**
    *   **Problema:** Peligro alto de contenido duplicado entre subdominios.
    *   **Solución:** Forzar que cada subdominio apunte a su propia URL canónica absoluta de manera dinámica:
        ```html
        <link rel="canonical" href="https://[subdominio].daletepido.com.ar/" />
        ```
*   **Solución para el "Contenido Pobre" (Thin Content):**
    *   **Problema:** El scanner detecta muy pocas palabras por tienda (~107 palabras).
    *   **Solución:** Habilitar un onboarding en el panel de cliente para obligar/incentivar al comerciante a agregar un texto de "Quiénes somos" o "Zonas de cobertura" de por lo menos 300 palabras para asegurar volumen semántico indexable.

---

## PARTE 3: PORTAL GENERAL DE SOPORTE / AYUDA (daletepido.com.ar/ayuda)
*Puntaje de Auditoría: 51/100 (D)*

La sección de soporte es clave para el tráfico orgánico a través de consultas informativas en motores de respuesta IA (AEO / GEO).

*   **Falta de Enlaces Internos en Soporte (Crítico):**
    *   **Problema:** Se detectan solo 2 enlaces internos en el portal, lo que dificulta el rastreo total del contenido.
    *   **Solución:** Implementar en el sidebar o footer del post un widget dinámico de "Artículos de ayuda relacionados" para mejorar la interconectividad.
*   **Optimización de Estructura de Texto para IA (AEO):**
    *   Utilizar listas ordenadas (`<ol>`) para los pasos de configuración o tutoriales.
    *   Implementar un acordeón de Preguntas Frecuentes interactivo usando etiquetas HTML5 semánticas nativas:
        ```html
        <details>
          <summary>¿Cómo configuro mi catálogo?</summary>
          <p>Para configurar tu catálogo de Dale! Te Pido, ingresá al panel y...</p>
        </details>
        ```
*   **Marcado de Datos Estructurados:** Implementar dinámicamente el Schema JSON-LD de tipo `TechArticle` o `FAQPage` en la plantilla de la sección de soporte.

---

## 🛠️ ASPECTOS A MANTENER (ESTADO CORRECTO)
*   **Rastreo por Inteligencia Artificial:** No bloquear en `robots.txt` a los bots `GPTBot`, `ClaudeBot` y `PerplexityBot`. Deben seguir estando con acceso permitido.
*   **HTTPS/SSL:** Mantener el correcto funcionamiento de los certificados SSL en todo el ecosistema de subdominios.
