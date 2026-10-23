import React from "react";
import DesarrolloScrollStory from "@/components/DesarrolloScrollStory";

export const metadata = {
  title: "Desarrollo & Storytelling | Dale! Te Pido",
  description:
    "Experiencia interactiva de scroll storytelling: de una libreta de notas al motor SaaS barrial sin comisiones para toda la región.",
  keywords: [
    "Dale Te Pido",
    "Storytelling",
    "Desarrollo",
    "Ecommerce WhatsApp",
    "Tecnología Barrial",
    "SaaS",
    "Next.js",
    "Supabase",
  ],
  openGraph: {
    title: "Historia y Evolución Tecnológica | Dale! Te Pido",
    description:
      "Descubrí cómo ideamos y construimos Dale!TePido: 0% comisiones, velocidad sub-400ms y kit QR para mostradores barriales.",
    url: "https://www.daletepido.com.ar/desarrollo",
    siteName: "Dale! Te Pido",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/deuog0r34/image/upload/v1778811606/daletepido-logo-white_zpcolq.png",
        width: 1200,
        height: 630,
        alt: "Dale! Te Pido Storytelling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo & Storytelling | Dale! Te Pido",
    description:
      "Experiencia interactiva: de una libreta de notas al motor SaaS barrial sin comisiones.",
    images: [
      "https://res.cloudinary.com/deuog0r34/image/upload/v1778811606/daletepido-logo-white_zpcolq.png",
    ],
  },
};

export default function DesarrolloPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#010101] selection:bg-[#F60000] selection:text-[#FFFFFF]">
      <DesarrolloScrollStory />
    </main>
  );
}
