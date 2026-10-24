"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Data model of the 5 scenes
export const SCENES = [
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
    videoAlign: "right", // Escena 1: Margen derecho
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
    videoAlign: "left", // Escena 2: Margen izquierdo
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
    videoAlign: "right", // Escena 3: Margen derecho
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
    videoAlign: "left", // Escena 4: Margen izquierdo
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
    videoAlign: "center-right", // Escena 5: Margen derecho
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
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // References for dynamic GSAP elements
  const videoRefs = useRef([]);
  const cardRefs = useRef([]);
  const nodeRefs = useRef([]);
  const lineRefs = useRef([]);
  const silRefs = useRef([]);
  const masterTlRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Setup initial state for SVG connector lines
      lineRefs.current.forEach((line) => {
        if (!line) return;
        const length = line.getTotalLength ? line.getTotalLength() : 1800;
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.95,
        });
      });

      // 2. Setup initial state for Videos
      videoRefs.current.forEach((videoBox, idx) => {
        if (!videoBox) return;
        gsap.set(videoBox, {
          opacity: idx === 0 ? 1 : 0,
          scale: 1,
          pointerEvents: "none",
        });
      });

      // 3. Setup initial state for Cards
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        if (idx === 0) {
          gsap.set(card, { opacity: 1, y: 0, pointerEvents: "auto" });
        } else {
          gsap.set(card, { opacity: 0, y: 30, pointerEvents: "none" });
        }
      });

      // 4. Setup initial state for Nodes
      nodeRefs.current.forEach((node, idx) => {
        if (!node) return;
        gsap.set(node, { opacity: idx === 0 ? 1 : 0.3 });
      });

      // 5. Setup initial state for Silhouettes
      silRefs.current.forEach((sil) => {
        if (!sil) return;
        gsap.set(sil, { opacity: 0 });
      });

      // 6. Master Pinned Timeline with scrub 0.8
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4500",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const prog = self.progress;
            setScrollProgress(Math.round(prog * 100));
            const sceneIdx = Math.min(
              SCENES.length - 1,
              Math.floor(prog * SCENES.length + 0.1)
            );
            setActiveScene(sceneIdx);
          },
        },
      });

      masterTlRef.current = masterTl;

      // 7. Build 4 Traveling Transitions
      for (let i = 0; i < SCENES.length - 1; i++) {
        const curVideo = videoRefs.current[i];
        const nextVideo = videoRefs.current[i + 1];
        const curCard = cardRefs.current[i];
        const nextCard = cardRefs.current[i + 1];
        const line = lineRefs.current[i];
        const nextNode = nodeRefs.current[i + 1];

        const trans = gsap.timeline();

        // 1. Línea roja viaja desde el personaje actual al próximo
        if (line) {
          trans.to(
            line,
            { strokeDashoffset: 0, duration: 0.85, ease: "power1.inOut" },
            0.05
          );
        }

        // 2. Transición suave de textos
        if (curCard) {
          trans.to(
            curCard,
            {
              opacity: 0,
              y: -25,
              duration: 0.35,
              ease: "power2.in",
              pointerEvents: "none",
            },
            0.1
          );
        }

        // 3. Crossfade cinematográfico continuo entre videos
        if (curVideo) {
          trans.to(
            curVideo,
            { opacity: 0, scale: 0.98, duration: 0.45, ease: "power1.inOut" },
            0.35
          );
        }
        if (nextVideo) {
          trans.to(
            nextVideo,
            { opacity: 1, scale: 1, duration: 0.45, ease: "power1.inOut" },
            0.45
          );
        }

        // 4. La línea llega a destino: se ilumina el nodo tecnológico
        if (nextNode) {
          trans.to(
            nextNode,
            { opacity: 1, duration: 0.25, ease: "back.out(2)" },
            0.75
          );
        }

        // 5. El nuevo texto entra en escena
        if (nextCard) {
          trans.to(
            nextCard,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              pointerEvents: "auto",
            },
            0.65
          );
        }

        masterTl.add(trans, i * 1.0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const jumpToScene = (idx) => {
    if (!masterTlRef.current?.scrollTrigger) return;
    const st = masterTlRef.current.scrollTrigger;
    const targetScroll = st.start + (idx / 4) * (st.end - st.start);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="relative w-full bg-[#FFFFFF] text-[#010101] selection:bg-[#F60000] selection:text-[#FFFFFF]"
      style={{
        backgroundColor: "#FFFFFF",
        color: "#010101",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* 0. HEADER SUPERIOR MINIMALISTA */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#010101]/10 transition-all duration-300">
        <div
          className="h-[3px] bg-[#F60000] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="https://www.daletepido.com.ar"
            className="group flex items-center gap-3 text-decoration-none"
            aria-label="Dale!TePido Inicio"
          >
            <img
              src="https://res.cloudinary.com/deuog0r34/image/upload/v1778811606/daletepido-logo-white_zpcolq.png"
              onError={(e) => {
                e.currentTarget.src = "/img-default/daletepido-logo-white-hq.png";
              }}
              alt="Dale! Te Pido"
              style={{ height: "32px", width: "auto", filter: "brightness(0)" }}
              className="transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-[10px] tracking-widest text-[#010101]/50 uppercase font-mono mt-0.5 hidden sm:inline-block border-l border-[#010101]/15 pl-2.5">
              Storytelling &middot; /desarrollo
            </span>
          </a>

          {/* Selector de Capítulos */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Navegación de escenas">
            {SCENES.map((scene, idx) => {
              const isActive = activeScene === idx;
              return (
                <button
                  key={scene.id}
                  onClick={() => jumpToScene(idx)}
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

          {/* CTA Header */}
          <a
            href="https://www.daletepido.com.ar"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#F60000] text-[#FFFFFF] hover:bg-[#D60000] transition-colors duration-200 shadow-sm"
          >
            <span>Crear Mi Tienda</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL PINNED (H-SCREEN) */}
      <div
        ref={containerRef}
        id="storyContainer"
        className="relative w-full h-screen bg-[#FFFFFF] overflow-hidden select-none"
      >
        {/* CAPA 1: VIDEOS EN FONDO BLANCO PURO (MIX-BLEND-MODE MULTIPLY) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
          {SCENES.map((scene, idx) => (
            <div
              key={`video-container-${scene.id}`}
              ref={(el) => (videoRefs.current[idx] = el)}
              className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0"
              style={{ zIndex: 2 }}
            >
              <video
                className="w-full h-full object-contain object-center"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={scene.posterSrc}
                style={{ mixBlendMode: "multiply" }}
              >
                {scene.webmSrc && <source src={scene.webmSrc} type="video/webm" />}
                {scene.altWebmSrc && <source src={scene.altWebmSrc} type="video/webm" />}
                {scene.videoSrc && <source src={scene.videoSrc} type="video/mp4" />}
              </video>
            </div>
          ))}
        </div>

        {/* CAPA 2: SVG CON LÍNEAS VIAJERAS ROJAS #F60000 */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <filter id="red-line-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" result="blur1" />
              <feGaussianBlur stdDeviation="3" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* LÍNEAS CONDUCTORAS QUE VIAJAN DE VIDEO EN VIDEO */}
          <path
            ref={(el) => (lineRefs.current[0] = el)}
            d="M 1666 536 C 1300 780, 700 280, 369 530"
            fill="none"
            stroke="#F60000"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />
          <path
            ref={(el) => (lineRefs.current[1] = el)}
            d="M 369 530 C 700 780, 1300 280, 1650 530"
            fill="none"
            stroke="#F60000"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />
          <path
            ref={(el) => (lineRefs.current[2] = el)}
            d="M 1650 530 C 1300 780, 700 280, 327 526"
            fill="none"
            stroke="#F60000"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />
          <path
            ref={(el) => (lineRefs.current[3] = el)}
            d="M 327 526 C 700 780, 1300 280, 1671 530"
            fill="none"
            stroke="#F60000"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#red-line-glow)"
          />

          {/* NODOS EN CADA PERSONAJE */}
          {[
            { cx: 1666, cy: 536 },
            { cx: 369, cy: 530 },
            { cx: 1650, cy: 530 },
            { cx: 327, cy: 526 },
            { cx: 1671, cy: 530 },
          ].map((node, idx) => (
            <g
              key={`node-${idx}`}
              ref={(el) => (nodeRefs.current[idx] = el)}
              opacity={idx === 0 ? 1 : 0.3}
            >
              <circle
                cx={node.cx}
                cy={node.cy}
                r="28"
                fill="none"
                stroke="#F60000"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              <circle cx={node.cx} cy={node.cy} r="6" fill="#F60000" />
            </g>
          ))}

        </svg>

        {/* CAPA 3: PANELES EDITORIALES DE TEXTO */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pointer-events-auto">
          {SCENES.map((scene, idx) => {
            const isTextLeft = scene.textAreaAlign === "left";
            return (
              <div
                key={`card-${scene.id}`}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`story-panel absolute ${
                  isTextLeft
                    ? "left-6 sm:left-12 lg:left-20"
                    : "right-6 sm:right-12 lg:right-20"
                } top-24 lg:top-32 w-full max-w-md lg:max-w-lg xl:max-w-xl text-left ${
                  idx === 0
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-6 pointer-events-none"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#010101]/5 text-[#010101] text-xs font-mono font-bold tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#F60000] animate-pulse" />
                  <span className="text-[#F60000]">{scene.number}</span>
                  <span className="text-[#010101]/30">/</span>
                  <span className="uppercase tracking-widest text-[11px]">{scene.subtitle}</span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#010101] tracking-tight leading-[1.12] mb-3"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  {scene.title}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-[#F60000] font-bold mb-4 tracking-wider uppercase">
                  // {scene.tagline}
                </p>
                <p className="text-sm sm:text-base text-[#010101]/75 leading-relaxed mb-6 font-normal">
                  {scene.description}
                </p>
                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-[#010101]/90">
                  {scene.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-[#F60000] flex-shrink-0 flex items-center justify-center text-[#FFFFFF] text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {idx === 4 && (
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href="https://www.daletepido.com.ar"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#F60000] text-[#FFFFFF] font-bold text-sm hover:bg-[#D60000] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_8px_20px_rgba(246,0,0,0.3)] text-decoration-none"
                    >
                      <span>Crear Mi Tienda en Dale!TePido</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-20 bg-[#FFFFFF] border-t border-[#010101]/10 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <img
            src="https://res.cloudinary.com/deuog0r34/image/upload/v1778811606/daletepido-logo-white_zpcolq.png"
            onError={(e) => {
              e.currentTarget.src = "/img-default/daletepido-logo-white-hq.png";
            }}
            alt="Dale! Te Pido"
            style={{ height: "38px", width: "auto", filter: "brightness(0)" }}
            className="mb-1"
          />
          <h3 className="text-xl font-bold text-[#010101] tracking-tight">
            Dale! Te Pido &mdash; Plataforma de Comercio Sin Comisiones
          </h3>
          <p className="text-xs text-[#010101]/60 max-w-lg leading-relaxed">
            Diseñado y desarrollado para potenciar los negocios de barrio de toda la Argentina y la región.
            Tecnología soberana, pedidos directos por WhatsApp y 0% de comisiones.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#010101]/70 font-mono mt-2">
            <a href="https://www.daletepido.com.ar" className="hover:text-[#F60000] transition-colors">Inicio</a>
            <span>&middot;</span>
            <a href="/tienda-demo.html" className="hover:text-[#F60000] transition-colors">Tienda Demo</a>
            <span>&middot;</span>
            <a href="/kit-imprimible.html" className="hover:text-[#F60000] transition-colors">Kit Imprimible</a>
            <span>&middot;</span>
            <a href="/terminos.html" className="hover:text-[#F60000] transition-colors">Términos</a>
            <span>&middot;</span>
            <a href="/privacidad.html" className="hover:text-[#F60000] transition-colors">Privacidad</a>
          </div>
          <p className="text-[10px] text-[#010101]/40 font-mono mt-4">
            &copy; {new Date().getFullYear()} Dale!TePido. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
