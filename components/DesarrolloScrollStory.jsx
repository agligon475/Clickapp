"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered safely on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 5 Storytelling Scenes Data
const SCENES = [
  {
    id: "origen",
    number: "01",
    subtitle: "EL ORIGEN",
    title: "Ideando Dale!TePido: El fin de las comisiones abusivas",
    tagline: "Libreta de ideas & génesis de una solución barrial",
    description:
      "Nació de observar la realidad del comerciante de barrio: ahogado por plataformas que cobran entre 15% y 35% por venta y retienen el dinero por semanas. En una libreta de notas nació la premisa madre: crear un canal digital de pedidos directo por WhatsApp, sin fricción, sin comisiones y con acreditación inmediata.",
    bullets: [
      "0% comisiones sobre ventas para siempre",
      "Canal directo al WhatsApp comercial sin intermediarios",
      "Cobro instantáneo por Mercado Pago o efectivo al recibir",
    ],
    videoAlign: "right", // Escena 1: Margen derecho (right-8)
    textAreaAlign: "left",
    videoLabel: "ESCENA 01 // BOCETOS INICIALES & PROPÓSITO",
    webmSrc: "/videos/desarrollo/escena-01.webm",
    altWebmSrc: "/videos/desarrollo/escena-1.webm",
    videoSrc: "/videos/daletepido-motion/renders/daletepido_15s_promo.mp4",
    posterSrc: "/img/jaime/jaime-pensando.png",
    fallbackAlt: "Jaime ideando Dale!TePido en su libreta",
    centerCoords: { x: 1666, y: 536 },
  },
  {
    id: "tecnologias",
    number: "02",
    subtitle: "TECNOLOGÍAS",
    title: "Velocidad extrema y despliegue ágil en el borde",
    tagline: "Stack ultraliviano, Next.js & Supabase en tiempo real",
    description:
      "El usuario promedio abandona si una tienda tarda más de 3 segundos en abrir. Construimos una arquitectura hiperelegante sobre Edge Runtime y Supabase PostgreSQL con tiempo de respuesta inferior a 400ms. Catálogo PWA instalable con sincronización reactiva de stock y peso total menor a 150KB.",
    bullets: [
      "Tiempo de carga inicial sub-400ms en redes móviles 4G/5G",
      "Supabase PostgreSQL con suscripciones en tiempo real",
      "Progressive Web App (PWA) instalable en Android e iOS",
    ],
    videoAlign: "left", // Escena 2: Margen izquierdo (left-8)
    textAreaAlign: "right",
    videoLabel: "ESCENA 02 // EDGE ARCHITECTURE & SPEED",
    webmSrc: "/videos/desarrollo/escena-02.webm",
    altWebmSrc: "/videos/desarrollo/escena-2.webm",
    videoSrc: "/videos/daletepido-motion/renders/test.mp4",
    posterSrc: "/img/jaime/jaime-resolucion.png",
    fallbackAlt: "Desarrollo ágil de Dale!TePido con código de alta velocidad",
    centerCoords: { x: 369, y: 530 },
  },
  {
    id: "territorio",
    number: "03",
    subtitle: "TERRITORIO",
    title: "En el mostrador de cada barrio: el kit QR físico",
    tagline: "La tecnología se toca con las manos en el mostrador",
    description:
      "El software solo triunfa si vive en el mundo real. Diseñamos un kit físico imprimible de alta resolución con códigos QR vectoriales para vidrieras y mostradores. Los clientes escanean sin instalar ninguna aplicación pesada, eligen productos en segundos y envían el pedido estructurado al comercio.",
    bullets: [
      "Kit QR vectorial listo para imprimir en alta resolución",
      "Experiencia Zero-Install: el cliente escanea y compra",
      "Mensajes de WhatsApp estructurados listos para despachar",
    ],
    videoAlign: "right", // Escena 3: Margen derecho (right-8)
    textAreaAlign: "left",
    videoLabel: "ESCENA 03 // KIT QR & MOSTRADOR BARRIAL",
    webmSrc: "/videos/desarrollo/escena-03.webm",
    altWebmSrc: "/videos/desarrollo/escena-3.webm",
    videoSrc: "/videos/daletepido-motion/renders/daletepido_30s_promo.mp4",
    posterSrc: "/img/kit-imprimible-mostrador.jpg",
    fallbackAlt: "Kit QR de mostrador Dale!TePido en comercios de barrio",
    centerCoords: { x: 1650, y: 530 },
  },
  {
    id: "solidez",
    number: "04",
    subtitle: "SOLIDEZ",
    title: "Seguridad de grado bancario, RLS y privacidad total",
    tagline: "Aislamiento estricto por tienda y protección de datos",
    description:
      "Arquitectura Multi-tenant real con aislamiento estricto por tienda. Cada dato está blindado mediante políticas Row Level Security (RLS) en base de datos, cifrado criptográfico de credenciales y auditoría de accesos. Privacidad absoluta: los datos de tu comercio y de tus clientes nunca se comparten ni revenden.",
    bullets: [
      "Row Level Security (RLS) nativo con aislamiento multi-tenant",
      "Cifrado de credenciales y tokens con PBKDF2 / SHA-256",
      "Zero data leakage: base de clientes 100% privada y soberana",
    ],
    videoAlign: "left", // Escena 4: Margen izquierdo (left-8)
    textAreaAlign: "right",
    videoLabel: "ESCENA 04 // ROW LEVEL SECURITY & PRIVACY",
    webmSrc: "/videos/desarrollo/escena-04.webm",
    altWebmSrc: "/videos/desarrollo/escena-4.webm",
    videoSrc: "/videos/daletepido-motion/renders/daletepido_promo.mp4",
    posterSrc: "/img/jaime/jaime-buenaonda.png",
    fallbackAlt: "Arquitectura segura y blindaje criptográfico de Dale!TePido",
    centerCoords: { x: 327, y: 526 },
  },
  {
    id: "futuro",
    number: "05",
    subtitle: "EL FUTURO",
    title: "Evolución continua: La plataforma SaaS que no duerme",
    tagline: "Automatizaciones con IA, n8n y ecosistema en expansión",
    description:
      "Dale!TePido no se detiene. Desde asistentes de inteligencia artificial para generación automática de descripciones y fotografías de productos, hasta sincronización con n8n, métricas en vivo y cupones de fidelización. Estamos construyendo el estándar definitivo para el comercio de cercanía.",
    bullets: [
      "Motor IA para generación instantánea de catálogos y fotos",
      "Automatizaciones de logística y confirmación con n8n",
      "Comunidad activa y actualización semanal sin interrupciones",
    ],
    videoAlign: "center-right", // Escena 5: Margen centro/derecho (right-1/4)
    textAreaAlign: "left",
    videoLabel: "ESCENA 05 // VISIÓN A FUTURO & EXPANSIÓN SAAS",
    webmSrc: "/videos/desarrollo/escena-05.webm",
    altWebmSrc: "/videos/desarrollo/escena-5.webm",
    videoSrc: "/videos/daletepido-motion/renders/daletepido_15s_promo.mp4",
    posterSrc: "/img/jaime/jaime-alegria.png",
    fallbackAlt: "Visión a futuro de Dale!TePido con Jaime celebrando la evolución",
    centerCoords: { x: 1671, y: 530 },
  },
];

export default function DesarrolloScrollStory() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // References for dynamic GSAP elements
  const videoRefs = useRef([]);
  const silhouetteRefs = useRef([]);
  const lineRefs = useRef([]);
  const sectionRefs = useRef([]);

  // Video fallback error handler
  const handleVideoError = (idx) => {
    const video = videoRefs.current[idx];
    if (video) {
      video.style.display = "none";
      const fallback = video.parentElement?.querySelector(".video-fallback-img");
      if (fallback) fallback.style.display = "block";
    }
  };

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    // Wait until DOM is fully painted
    const ctx = gsap.context(() => {
      // 1. Setup initial state for SVG connector lines
      lineRefs.current.forEach((line) => {
        if (!line) return;
        const length = line.getTotalLength ? line.getTotalLength() : 1600;
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.95,
        });
      });

      // 2. Setup initial state for Videos
      videoRefs.current.forEach((videoBox, idx) => {
        if (!videoBox) return;
        if (idx === 0) {
          gsap.set(videoBox, { opacity: 1, scale: 1, pointerEvents: "auto" });
        } else {
          gsap.set(videoBox, { opacity: 0, scale: 0.96, pointerEvents: "none" });
        }
      });

      // 3. Setup initial state for Silhouettes
      silhouetteRefs.current.forEach((sil) => {
        if (!sil) return;
        gsap.set(sil, { opacity: 0, scale: 1 });
      });

      // 4. Create Master ScrollTrigger Timeline with scrub: 0.6
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const prog = self.progress;
            setScrollProgress(Math.round(prog * 100));
            // Calculate active index (0 to 4)
            const sceneIdx = Math.min(
              SCENES.length - 1,
              Math.floor(prog * SCENES.length + 0.15)
            );
            setActiveScene(sceneIdx);
          },
        },
      });

      // Duration slots for the 4 transitions between 5 scenes
      // Each transition takes a fraction of timeline
      const transitionDuration = 1.0;

      for (let i = 0; i < SCENES.length - 1; i++) {
        const currentVideo = videoRefs.current[i];
        const nextVideo = videoRefs.current[i + 1];
        const currentSilhouette = silhouetteRefs.current[i];
        const nextSilhouette = silhouetteRefs.current[i + 1];
        const connectorLine = lineRefs.current[i];

        const lineLen = connectorLine?.getTotalLength
          ? connectorLine.getTotalLength()
          : 1600;

        const transTl = gsap.timeline();

        // 1. El video de la escena saliente hace fade out (opacity: 0)
        if (currentVideo) {
          transTl.to(
            currentVideo,
            {
              opacity: 0,
              scale: 0.94,
              duration: 0.2,
              ease: "power2.out",
              pointerEvents: "none",
            },
            0
          );
        }

        // 2. Se enciende la silueta de trazos en esa misma posición (opacity: 1)
        if (currentSilhouette) {
          transTl.to(
            currentSilhouette,
            {
              opacity: 1,
              scale: 1,
              duration: 0.18,
              ease: "power2.inOut",
            },
            0.1
          );
        }

        // 3. La línea roja conductora #F60000 viaja cruzando la pantalla (strokeDashoffset: 0)
        if (connectorLine) {
          transTl.to(
            connectorLine,
            {
              strokeDashoffset: 0,
              duration: 0.45,
              ease: "power1.inOut",
            },
            0.22
          );
        }

        // 4. Se dibuja la silueta en trazo de la siguiente postura en el margen opuesto
        if (nextSilhouette) {
          transTl.to(
            nextSilhouette,
            {
              opacity: 1,
              scale: 1,
              duration: 0.22,
              ease: "power2.inOut",
            },
            0.55
          );
        }

        // 5. Se apagan los SVGs (siluetas y línea) y se enciende el nuevo video (opacity: 1) en loop
        if (currentSilhouette) {
          transTl.to(
            currentSilhouette,
            { opacity: 0, duration: 0.15, ease: "power2.out" },
            0.7
          );
        }
        if (nextSilhouette) {
          transTl.to(
            nextSilhouette,
            { opacity: 0, duration: 0.18, ease: "power2.out" },
            0.76
          );
        }
        if (connectorLine) {
          transTl.to(
            connectorLine,
            { opacity: 0.15, duration: 0.2, ease: "power2.out" },
            0.75
          );
        }

        if (nextVideo) {
          transTl.to(
            nextVideo,
            {
              opacity: 1,
              scale: 1,
              duration: 0.24,
              ease: "power2.out",
              pointerEvents: "auto",
            },
            0.76
          );
        }

        // Append to master timeline
        masterTl.add(transTl, i * transitionDuration);
      }

      // Add text entrance subtle parallax per section
      sectionRefs.current.forEach((section, idx) => {
        if (!section) return;
        const textBlock = section.querySelector(".story-text-card");
        if (textBlock) {
          gsap.fromTo(
            textBlock,
            { y: 30, opacity: 0.7 },
            {
              y: -20,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll helper for navigation dots
  const scrollToScene = (idx) => {
    const sec = sectionRefs.current[idx];
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FFFFFF] text-[#010101] selection:bg-[#F60000] selection:text-[#FFFFFF] overflow-x-hidden"
      style={{
        backgroundColor: "#FFFFFF",
        color: "#010101",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* ============================================================== */}
      {/* 0. HEADER SUPERIOR MINIMALISTA & BARRA DE PROGRESO ROJA         */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#010101]/10 transition-all duration-300">
        {/* Línea de progreso interactiva Rojo #F60000 */}
        <div
          className="h-[3px] bg-[#F60000] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo Brand Minimalista */}
          <a
            href="https://www.daletepido.com.ar"
            className="group flex items-center gap-3 text-decoration-none"
            aria-label="Dale!TePido Inicio"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F60000] flex items-center justify-center text-[#FFFFFF] font-black text-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
              !
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[#010101] text-base tracking-tight leading-none">
                DALE!<span className="text-[#F60000]">TEPIDO</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#010101]/50 uppercase font-mono mt-0.5">
                Storytelling &middot; /desarrollo
              </span>
            </div>
          </a>

          {/* Selector de Capítulos / Indicador de escenas */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Navegación de escenas">
            {SCENES.map((scene, idx) => {
              const isActive = activeScene === idx;
              return (
                <button
                  key={scene.id}
                  onClick={() => scrollToScene(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-[#010101] text-[#FFFFFF] shadow-sm"
                      : "bg-[#010101]/5 text-[#010101]/70 hover:bg-[#010101]/10"
                  }`}
                  aria-label={`Ir a escena ${scene.number}: ${scene.subtitle}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? "bg-[#F60000]" : "bg-[#010101]/40"
                    }`}
                  />
                  <span>{scene.number}</span>
                  <span className="hidden lg:inline">{scene.subtitle}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA Header a la Tienda Oficial */}
          <a
            href="https://www.daletepido.com.ar"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#F60000] text-[#FFFFFF] hover:bg-[#D60000] transition-colors duration-200 shadow-sm"
          >
            <span>Crear Mi Tienda</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </header>

      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* CAPA 1: CAPA FIJA DE FONDO FULL SIZE (fixed inset-0)           */}
      {/* Contiene los 5 videos en el fondo cubriendo todo el viewport   */}
      {/* ============================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
        {SCENES.map((scene, idx) => {
          const isTextLeft = scene.textAreaAlign === "left";
          return (
            <div
              key={`video-container-${scene.id}`}
              ref={(el) => (videoRefs.current[idx] = el)}
              className="absolute inset-0 w-full h-full transition-opacity duration-300"
              style={{ zIndex: 2 }}
            >
              {/* Video en Full Size cubriendo toda la pantalla, escalado ligeramente para fundir en blanco puro */}
              <video
                className="w-full h-full object-cover object-center transform scale-110 sm:scale-115 origin-center"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={scene.posterSrc}
                onError={() => handleVideoError(idx)}
              >
                {scene.webmSrc && <source src={scene.webmSrc} type="video/webm" />}
                {scene.altWebmSrc && <source src={scene.altWebmSrc} type="video/webm" />}
                {scene.videoSrc && <source src={scene.videoSrc} type="video/mp4" />}
              </video>

              {/* Imagen Fallback si el video no carga */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scene.posterSrc}
                alt={scene.fallbackAlt}
                className="video-fallback-img absolute inset-0 w-full h-full object-cover object-center hidden"
              />

              {/* Velo blanco gradiente sutil para garantizar legibilidad perfecta del texto */}
              <div
                className={`absolute inset-0 ${
                  isTextLeft
                    ? "bg-gradient-to-r from-[#FFFFFF]/95 via-[#FFFFFF]/80 sm:via-[#FFFFFF]/50 to-transparent"
                    : "bg-gradient-to-l from-[#FFFFFF]/95 via-[#FFFFFF]/80 sm:via-[#FFFFFF]/50 to-transparent"
                }`}
              />
            </div>
          );
        })}

        {/* ============================================================== */}
        {/* CAPA SVG INTERMEDIA (viewBox 0 0 1920 1080)                    */}
        {/* Siluetas vectoriales exactas del usuario + Acento Rojo #F60000 */}
        {/* ============================================================== */}
        <svg
          ref={svgRef}
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            {/* Glow sutil para la línea conductora roja #F60000 */}
            <filter id="red-line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ------------------------------------------------------------ */}
          {/* LÍNEAS CONECTORAS DINÁMICAS (Acento Rojo #F60000)             */}
          {/* Viajan horizontalmente de personaje a personaje al scrollear */}
          {/* ------------------------------------------------------------ */}
          {/* Línea 1 -> 2: De Margen Derecho (x:1666, y:536) a Margen Izquierdo (x:369, y:530) */}
          <path
            ref={(el) => (lineRefs.current[0] = el)}
            d="M 1666 536 C 1250 750, 750 320, 369 530"
            fill="none"
            stroke="#F60000"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />

          {/* Línea 2 -> 3: De Margen Izquierdo (x:369, y:530) a Margen Derecho (x:1650, y:530) */}
          <path
            ref={(el) => (lineRefs.current[1] = el)}
            d="M 369 530 C 760 760, 1250 300, 1650 530"
            fill="none"
            stroke="#F60000"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />

          {/* Línea 3 -> 4: De Margen Derecho (x:1650, y:530) a Margen Izquierdo (x:327, y:526) */}
          <path
            ref={(el) => (lineRefs.current[2] = el)}
            d="M 1650 530 C 1220 760, 750 300, 327 526"
            fill="none"
            stroke="#F60000"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />

          {/* Línea 4 -> 5: De Margen Izquierdo (x:327, y:526) a Margen Derecho (x:1671, y:530) */}
          <path
            ref={(el) => (lineRefs.current[3] = el)}
            d="M 327 526 C 750 750, 1250 310, 1671 530"
            fill="none"
            stroke="#F60000"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />

          {/* ------------------------------------------------------------ */}
          {/* SILUETAS VECTORIALES EXACTAS PROVISTAS POR EL USUARIO        */}
          {/* ------------------------------------------------------------ */}

          {/* Silueta 1: Escena 1 (Vector exacto - Libreta en Margen Derecho x:1666, y:536) */}
          <g
            ref={(el) => (silhouetteRefs.current[0] = el)}
            id="silhouette-1-origen"
            className="transition-opacity duration-300"
            opacity="0"
          >
            <image
              href="/img/silhouettes/silueta-01.svg"
              x="0"
              y="0"
              width="1920"
              height="1080"
              preserveAspectRatio="xMidYMid slice"
            />
            <circle cx="1666" cy="536" r="22" fill="none" stroke="#F60000" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
            <circle cx="1666" cy="536" r="5" fill="#F60000" />
          </g>

          {/* Silueta 2: Escena 2 (Vector exacto - Laptop en Margen Izquierdo x:369, y:530) */}
          <g
            ref={(el) => (silhouetteRefs.current[1] = el)}
            id="silhouette-2-tecnologias"
            className="transition-opacity duration-300"
            opacity="0"
          >
            <image
              href="/img/silhouettes/silueta-02.svg"
              x="0"
              y="0"
              width="1920"
              height="1080"
              preserveAspectRatio="xMidYMid slice"
            />
            <circle cx="369" cy="530" r="22" fill="none" stroke="#F60000" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
            <circle cx="369" cy="530" r="5" fill="#F60000" />
          </g>

          {/* Silueta 3: Escena 3 (Vector exacto - Mostrador en Margen Derecho x:1650, y:530) */}
          <g
            ref={(el) => (silhouetteRefs.current[2] = el)}
            id="silhouette-3-territorio"
            className="transition-opacity duration-300"
            opacity="0"
          >
            <image
              href="/img/silhouettes/silueta-03.svg"
              x="0"
              y="0"
              width="1920"
              height="1080"
              preserveAspectRatio="xMidYMid slice"
            />
            <circle cx="1650" cy="530" r="22" fill="none" stroke="#F60000" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
            <circle cx="1650" cy="530" r="5" fill="#F60000" />
          </g>

          {/* Silueta 4: Escena 4 (Vector exacto - Seguridad en Margen Izquierdo x:327, y:526) */}
          <g
            ref={(el) => (silhouetteRefs.current[3] = el)}
            id="silhouette-4-solidez"
            className="transition-opacity duration-300"
            opacity="0"
          >
            <image
              href="/img/silhouettes/silueta-04.svg"
              x="0"
              y="0"
              width="1920"
              height="1080"
              preserveAspectRatio="xMidYMid slice"
            />
            <circle cx="327" cy="526" r="22" fill="none" stroke="#F60000" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
            <circle cx="327" cy="526" r="5" fill="#F60000" />
          </g>

          {/* Silueta 5: Escena 5 (Vector exacto - Visión a futuro en Margen Derecho x:1671, y:530) */}
          <g
            ref={(el) => (silhouetteRefs.current[4] = el)}
            id="silhouette-5-futuro"
            className="transition-opacity duration-300"
            opacity="0"
          >
            <image
              href="/img/silhouettes/silueta-05.svg"
              x="0"
              y="0"
              width="1920"
              height="1080"
              preserveAspectRatio="xMidYMid slice"
            />
            <circle cx="1671" cy="530" r="22" fill="none" stroke="#F60000" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
            <circle cx="1671" cy="530" r="5" fill="#F60000" />
          </g>
        </svg>
      </div>

      {/* ============================================================== */}
      {/* CAPA 2: CAPA DELANTERA DE SCROLL (relative z-10)               */}
      {/* 5 secciones de min-h-screen con texto en margen opuesto al video*/}
      {/* ============================================================== */}
      <main className="relative z-10">
        {SCENES.map((scene, idx) => {
          // Opposite side text placement logic:
          // Scene 1: video is right -> text is LEFT
          // Scene 2: video is left  -> text is RIGHT
          // Scene 3: video is right -> text is LEFT
          // Scene 4: video is left  -> text is RIGHT
          // Scene 5: video is center-right -> text is LEFT
          const isTextLeft = scene.textAreaAlign === "left";

          return (
            <section
              key={`section-${scene.id}`}
              id={scene.id}
              ref={(el) => (sectionRefs.current[idx] = el)}
              className="min-h-screen w-full flex items-center justify-center px-6 sm:px-10 md:px-14 lg:px-20 py-28 relative"
            >
              <div className="w-full max-w-7xl mx-auto flex items-center">
                {/* Bloque de Texto Editorial */}
                <div
                  className={`story-text-card w-full lg:w-[48%] xl:w-[45%] ${
                    isTextLeft
                      ? "mr-auto text-left"
                      : "ml-auto text-left lg:text-left"
                  } bg-[#FFFFFF]/95 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl border border-[#010101]/10 shadow-[0_15px_40px_rgba(1,1,1,0.04)]`}
                >
                  {/* Badge de Sección con acento Rojo #F60000 */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F60000]/10 border border-[#F60000]/30 text-[#F60000] text-xs font-mono font-bold tracking-wider mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#F60000]" />
                    <span>{scene.number}</span>
                    <span className="text-[#010101]/40">&middot;</span>
                    <span>{scene.subtitle}</span>
                  </div>

                  {/* Título de la Sección */}
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#010101] tracking-tight leading-tight mb-3"
                    style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                  >
                    {scene.title}
                  </h2>

                  {/* Tagline secundario */}
                  <p className="text-xs sm:text-sm font-mono text-[#F60000] font-semibold mb-5 tracking-wide uppercase">
                    // {scene.tagline}
                  </p>

                  {/* Párrafo explicativo principal */}
                  <p className="text-sm sm:text-base text-[#010101]/80 leading-relaxed mb-6 font-normal">
                    {scene.description}
                  </p>

                  {/* Puntos destacados con check rojo */}
                  <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-[#010101]/90">
                    {scene.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-[#F60000] flex-shrink-0 flex items-center justify-center text-[#FFFFFF] text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Botón CTA especial en la última sección (Escena 5) */}
                  {idx === SCENES.length - 1 && (
                    <div className="pt-4 border-t border-[#010101]/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <a
                        href="https://www.daletepido.com.ar"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#F60000] text-[#FFFFFF] font-bold text-sm hover:bg-[#D60000] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_8px_20px_rgba(246,0,0,0.3)] text-decoration-none"
                      >
                        <span>Crear Mi Tienda en Dale!TePido</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                      <a
                        href="/tienda-demo.html"
                        className="inline-flex items-center justify-center px-4 py-3 rounded-2xl bg-transparent border border-[#010101]/20 text-[#010101] font-semibold text-xs hover:bg-[#010101]/5 transition-colors duration-200"
                      >
                        Ver Tienda Demo
                      </a>
                    </div>
                  )}

                  {/* Metadatos de scroll / paso */}
                  <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-[#010101]/40 pt-4 border-t border-[#010101]/5">
                    <span>CAPÍTULO {scene.number} DE 05</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#010101]/30" />
                      SCROLL HACIA ABAJO
                    </span>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* ============================================================== */}
      {/* FOOTER MINIMALISTA FINAL (100% BLANCO INFINITO)                */}
      {/* ============================================================== */}
      <footer className="relative z-20 bg-[#FFFFFF] border-t border-[#010101]/10 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#F60000] flex items-center justify-center text-[#FFFFFF] font-black text-xl">
            !
          </div>
          <h3 className="text-xl font-bold text-[#010101] tracking-tight">
            Dale! Te Pido &mdash; Plataforma de Comercio Sin Comisiones
          </h3>
          <p className="text-xs text-[#010101]/60 max-w-lg leading-relaxed">
            Diseñado y desarrollado para potenciar los negocios de barrio de toda la Argentina y la región.
            Tecnología soberana, pedidos directos por WhatsApp y 0% de comisiones.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#010101]/70 font-mono mt-2">
            <a href="https://www.daletepido.com.ar" className="hover:text-[#F60000] transition-colors">
              Inicio
            </a>
            <span>&middot;</span>
            <a href="/tienda-demo.html" className="hover:text-[#F60000] transition-colors">
              Tienda Demo
            </a>
            <span>&middot;</span>
            <a href="/kit-imprimible.html" className="hover:text-[#F60000] transition-colors">
              Kit Imprimible
            </a>
            <span>&middot;</span>
            <a href="/terminos.html" className="hover:text-[#F60000] transition-colors">
              Términos
            </a>
            <span>&middot;</span>
            <a href="/privacidad.html" className="hover:text-[#F60000] transition-colors">
              Privacidad
            </a>
          </div>
          <p className="text-[10px] text-[#010101]/40 font-mono mt-4">
            &copy; {new Date().getFullYear()} Dale!TePido. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
