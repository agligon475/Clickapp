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
    centerCoords: { x: 1480, y: 540 },
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
    centerCoords: { x: 440, y: 540 },
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
    centerCoords: { x: 1480, y: 540 },
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
    centerCoords: { x: 440, y: 540 },
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
    centerCoords: { x: 1200, y: 540 },
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
      {/* CAPA 1: CAPA FIJA DE FONDO (fixed inset-0 pointer-events-none)  */}
      {/* Contiene 5 reproductores de video 16:9 en márgenes laterales    */}
      {/* ============================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {SCENES.map((scene, idx) => {
          // Alignment positioning classes based on requirements:
          // Escena 1: right-8
          // Escena 2: left-8
          // Escena 3: right-8
          // Escena 4: left-8
          // Escena 5: right-1/4
          let alignClasses = "";
          if (scene.videoAlign === "right") {
            alignClasses = "right-4 sm:right-8 md:right-12 xl:right-16 left-auto";
          } else if (scene.videoAlign === "left") {
            alignClasses = "left-4 sm:left-8 md:left-12 xl:left-16 right-auto";
          } else if (scene.videoAlign === "center-right") {
            alignClasses =
              "right-4 sm:right-[10%] md:right-[15%] xl:right-1/4 left-auto";
          }

          return (
            <div
              key={`video-container-${scene.id}`}
              ref={(el) => (videoRefs.current[idx] = el)}
              className={`absolute top-1/2 -translate-y-1/2 ${alignClasses} w-[92vw] sm:w-[420px] md:w-[480px] lg:w-[540px] xl:w-[600px] aspect-video transition-transform duration-300`}
              style={{
                zIndex: 5,
              }}
            >
              {/* Card contenedor de video con estética minimalista */}
              <div className="relative w-full h-full rounded-2xl border border-[#010101]/10 bg-[#FFFFFF] shadow-[0_20px_60px_-15px_rgba(1,1,1,0.08)] overflow-hidden flex items-center justify-center">
                {/* Etiqueta superior del reproductor */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#010101]/10 text-[10px] font-mono font-bold tracking-wider text-[#010101]">
                  <span className="w-2 h-2 rounded-full bg-[#F60000] animate-pulse" />
                  <span>{scene.videoLabel}</span>
                </div>

                {/* Reproductor de Video */}
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={scene.posterSrc}
                  onError={() => handleVideoError(idx)}
                >
                  {scene.webmSrc && <source src={scene.webmSrc} type="video/webm" />}
                  {scene.altWebmSrc && <source src={scene.altWebmSrc} type="video/webm" />}
                  {scene.videoSrc && <source src={scene.videoSrc} type="video/mp4" />}
                </video>

                {/* Imagen Fallback si el video no carga o está en red lenta */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={scene.posterSrc}
                  alt={scene.fallbackAlt}
                  className="video-fallback-img absolute inset-0 w-full h-full object-cover hidden"
                />

                {/* Marca de agua sutil de Dale!TePido */}
                <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 rounded bg-[#010101]/80 text-[#FFFFFF] text-[9px] font-mono font-semibold tracking-widest uppercase">
                  DALE!TEPIDO
                </div>
              </div>
            </div>
          );
        })}

        {/* ============================================================== */}
        {/* CAPA SVG INTERMEDIA (viewBox 0 0 1920 1080)                    */}
        {/* Siluetas en trazo limpio (#010101) + Líneas conductoras #F60000 */}
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
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradiente sutil para trazos de siluetas */}
            <linearGradient id="stroke-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#010101" />
              <stop offset="100%" stopColor="#222222" />
            </linearGradient>
          </defs>

          {/* ------------------------------------------------------------ */}
          {/* LÍNEAS CONECTORAS DINÁMICAS (Acento Rojo #F60000)             */}
          {/* Viajan horizontalmente de margen a margen al scrollear       */}
          {/* ------------------------------------------------------------ */}
          {/* Línea 1 -> 2: De Margen Derecho (x:1480) a Margen Izquierdo (x:440) */}
          <path
            ref={(el) => (lineRefs.current[0] = el)}
            d="M 1480 540 C 1120 740, 840 340, 440 540"
            fill="none"
            stroke="#F60000"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />

          {/* Línea 2 -> 3: De Margen Izquierdo (x:440) a Margen Derecho (x:1480) */}
          <path
            ref={(el) => (lineRefs.current[1] = el)}
            d="M 440 540 C 800 780, 1160 300, 1480 540"
            fill="none"
            stroke="#F60000"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />

          {/* Línea 3 -> 4: De Margen Derecho (x:1480) a Margen Izquierdo (x:440) */}
          <path
            ref={(el) => (lineRefs.current[2] = el)}
            d="M 1480 540 C 1140 760, 800 320, 440 540"
            fill="none"
            stroke="#F60000"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />

          {/* Línea 4 -> 5: De Margen Izquierdo (x:440) a Centro-Derecho (x:1200) */}
          <path
            ref={(el) => (lineRefs.current[3] = el)}
            d="M 440 540 C 680 720, 960 360, 1200 540"
            fill="none"
            stroke="#F60000"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />

          {/* ------------------------------------------------------------ */}
          {/* SILUETAS EN TRAZOS LIMPIOS (stroke="#010101" strokeWidth="2") */}
          {/* Una por cada escena / postura de Jaime y el ecosistema       */}
          {/* ------------------------------------------------------------ */}

          {/* Silueta 1: Escena 1 (Margen derecho x:1480, y:540) - Libreta de ideas */}
          <g
            ref={(el) => (silhouetteRefs.current[0] = el)}
            id="silhouette-1-origen"
            transform="translate(1480, 540)"
            className="transition-opacity duration-300"
          >
            {/* Círculo guía de fondo */}
            <circle
              cx="0"
              cy="0"
              r="170"
              fill="rgba(1,1,1,0.015)"
              stroke="#010101"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            {/* Silueta: Figura sentada pensando con libreta de bocetos */}
            <g stroke="#010101" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* Cabeza y rostro de concentración */}
              <circle cx="-15" cy="-75" r="28" />
              <path d="M -15 -47 Q -15 -25 -5 -10" />
              {/* Torso inclinado hacia libreta */}
              <path d="M -5 -10 Q 15 25 -5 65" />
              {/* Brazo izquierdo sosteniendo libreta */}
              <path d="M 0 5 L -35 30 L -15 50" />
              {/* Brazo derecho con lápiz anotando */}
              <path d="M 5 10 L 35 30 L 10 50" />
              {/* Libreta abierta */}
              <polygon points="-25,45 0,40 25,45 15,80 -10,75 -35,80" />
              <line x1="-1" y1="40" x2="-1" y2="76" stroke="#F60000" strokeWidth="2" />
              {/* Líneas de escritura / notas */}
              <line x1="-18" y1="52" x2="-6" y2="52" strokeWidth="1.5" />
              <line x1="-18" y1="60" x2="-6" y2="60" strokeWidth="1.5" />
              <line x1="6" y1="52" x2="18" y2="52" strokeWidth="1.5" />
              <line x1="6" y1="60" x2="18" y2="60" strokeWidth="1.5" />
              {/* Bombilla de idea / génesis arriba */}
              <path d="M 35 -90 C 25 -90, 25 -75, 30 -65 L 30 -58 L 40 -58 L 40 -65 C 45 -75, 45 -90, 35 -90 Z" stroke="#F60000" />
              <line x1="32" y1="-55" x2="38" y2="-55" stroke="#F60000" />
              <line x1="35" y1="-100" x2="35" y2="-95" stroke="#F60000" />
              <line x1="50" y1="-85" x2="45" y2="-82" stroke="#F60000" />
              <line x1="20" y1="-85" x2="25" y2="-82" stroke="#F60000" />
            </g>
          </g>

          {/* Silueta 2: Escena 2 (Margen izquierdo x:440, y:540) - Laptop / Código */}
          <g
            ref={(el) => (silhouetteRefs.current[1] = el)}
            id="silhouette-2-tecnologias"
            transform="translate(440, 540)"
            className="transition-opacity duration-300"
          >
            <circle
              cx="0"
              cy="0"
              r="170"
              fill="rgba(1,1,1,0.015)"
              stroke="#010101"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            {/* Silueta: Programador en postura ágil con laptop y brackets */}
            <g stroke="#010101" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* Cabeza erguida y audífonos / foco */}
              <circle cx="0" cy="-75" r="28" />
              <path d="M -28 -75 C -28 -95, 28 -95, 28 -75" stroke="#F60000" strokeWidth="2" />
              {/* Torso */}
              <path d="M 0 -47 L 0 35" />
              {/* Brazos tecleando */}
              <path d="M 0 -20 L -35 10 L -15 35" />
              <path d="M 0 -20 L 35 10 L 15 35" />
              {/* Laptop abierta */}
              <line x1="-50" y1="45" x2="50" y2="45" strokeWidth="3" />
              <polygon points="-40,45 -30,0 30,0 40,45" />
              {/* Bracket de código en la pantalla < / > */}
              <path d="M -15 15 L -22 22 L -15 30" stroke="#F60000" strokeWidth="2" />
              <path d="M 15 15 L 22 22 L 15 30" stroke="#F60000" strokeWidth="2" />
              <line x1="-3" y1="30" x2="3" y2="15" stroke="#010101" strokeWidth="2" />
              {/* Rayo de velocidad / Edge runtime */}
              <polygon points="75,-50 60,-25 72,-25 58,5 90,-20 75,-20" fill="none" stroke="#F60000" strokeWidth="2" />
            </g>
          </g>

          {/* Silueta 3: Escena 3 (Margen derecho x:1480, y:540) - Kit QR en mostrador */}
          <g
            ref={(el) => (silhouetteRefs.current[2] = el)}
            id="silhouette-3-territorio"
            transform="translate(1480, 540)"
            className="transition-opacity duration-300"
          >
            <circle
              cx="0"
              cy="0"
              r="170"
              fill="rgba(1,1,1,0.015)"
              stroke="#010101"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            {/* Silueta: Mostrador barrial, exhibidor acrílico con código QR y teléfono escaneando */}
            <g stroke="#010101" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* Línea horizontal del mostrador de madera */}
              <line x1="-120" y1="55" x2="120" y2="55" strokeWidth="3.5" />
              {/* Soporte / Exhibidor Acrílico del Kit QR */}
              <polygon points="-50,55 -35,-35 35,-35 50,55" />
              <line x1="-30" y1="45" x2="30" y2="45" strokeWidth="2" />
              {/* Patrón de Código QR central */}
              <rect x="-22" y="-20" width="44" height="44" strokeWidth="2" />
              {/* Mini cuadrados en esquinas del QR */}
              <rect x="-18" y="-16" width="12" height="12" stroke="#F60000" strokeWidth="1.8" />
              <rect x="6" y="-16" width="12" height="12" stroke="#F60000" strokeWidth="1.8" />
              <rect x="-18" y="8" width="12" height="12" stroke="#F60000" strokeWidth="1.8" />
              <rect x="8" y="10" width="8" height="8" fill="#010101" />
              {/* Mano sosteniendo smartphone que escanea */}
              <rect x="-95" y="-60" width="34" height="60" rx="4" />
              <line x1="-85" y1="-54" x2="-71" y2="-54" strokeWidth="1.5" />
              {/* Haz láser de escaneo rojo */}
              <line x1="-61" y1="-30" x2="-25" y2="-10" stroke="#F60000" strokeWidth="2" strokeDasharray="3 3" />
            </g>
          </g>

          {/* Silueta 4: Escena 4 (Margen izquierdo x:440, y:540) - Postura erguida de seguridad */}
          <g
            ref={(el) => (silhouetteRefs.current[3] = el)}
            id="silhouette-4-solidez"
            transform="translate(440, 540)"
            className="transition-opacity duration-300"
          >
            <circle
              cx="0"
              cy="0"
              r="170"
              fill="rgba(1,1,1,0.015)"
              stroke="#010101"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            {/* Silueta: Postura erguida de guardián de seguridad con escudo y candado RLS */}
            <g stroke="#010101" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* Cabeza firme erguida */}
              <circle cx="0" cy="-80" r="28" />
              {/* Hombros anchos y postura vertical */}
              <path d="M -45 -35 Q 0 -45 45 -35" />
              <path d="M 0 -45 L 0 55" />
              {/* Escudo emblemático en el pecho */}
              <path
                d="M 0 -25 L 35 -10 L 35 25 C 35 55, 0 75, 0 75 C 0 75, -35 55, -35 25 L -35 -10 Z"
                stroke="#F60000"
                strokeWidth="2.5"
              />
              {/* Candado criptográfico central */}
              <rect x="-14" y="10" width="28" height="22" rx="3" stroke="#010101" strokeWidth="2" />
              <path d="M -8 10 L -8 0 C -8 -6, 8 -6, 8 0 L 8 10" stroke="#010101" strokeWidth="2" />
              <circle cx="0" cy="20" r="2.5" fill="#F60000" />
              {/* Llaves y anillos concéntricos de RLS */}
              <circle cx="0" cy="0" r="110" stroke="#010101" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="0" cy="0" r="135" stroke="#F60000" strokeWidth="1" strokeDasharray="2 6" />
            </g>
          </g>

          {/* Silueta 5: Escena 5 (Centro-Derecho x:1200, y:540) - Visión a futuro */}
          <g
            ref={(el) => (silhouetteRefs.current[4] = el)}
            id="silhouette-5-futuro"
            transform="translate(1200, 540)"
            className="transition-opacity duration-300"
          >
            <circle
              cx="0"
              cy="0"
              r="170"
              fill="rgba(1,1,1,0.015)"
              stroke="#010101"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            {/* Silueta: Postura mirando al horizonte hacia arriba, cohete/trayectoria ascendente */}
            <g stroke="#010101" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* Cabeza mirando hacia arriba y adelante */}
              <circle cx="-15" cy="-70" r="28" />
              {/* Brazo señalando hacia el futuro superior derecho */}
              <path d="M -10 -35 L 35 -60 L 70 -95" stroke="#F60000" strokeWidth="3" />
              <polygon points="68,-102 80,-97 73,-85" fill="#F60000" />
              {/* Torso y postura triunfal */}
              <path d="M -15 -42 L -10 45" />
              <path d="M -10 45 L -35 95" />
              <path d="M -10 45 L 20 95" />
              {/* Arco orbital de crecimiento exponencial */}
              <path d="M -100 70 Q 0 -40, 110 -110" stroke="#F60000" strokeWidth="2" strokeDasharray="5 5" />
              {/* Destellos de innovación / IA */}
              <path d="M 90 -50 L 98 -50 M 94 -54 L 94 -46" stroke="#010101" strokeWidth="2" />
              <path d="M -60 -100 L -52 -100 M -56 -104 L -56 -96" stroke="#F60000" strokeWidth="2" />
              <polygon points="120,-80 123,-73 130,-70 123,-67 120,-60 117,-67 110,-70 117,-73" fill="none" stroke="#010101" strokeWidth="1.5" />
            </g>
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
