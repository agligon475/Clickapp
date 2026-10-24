import React from "react";
import "./globals.css";

export const metadata = {
  title: "Dale! Te Pido — Plataforma de Pedidos por WhatsApp 0% Comisiones",
  description:
    "Catálogo online profesional y sistema de pedidos directo por WhatsApp para comercios de cercanía.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="bg-[#FFFFFF] text-[#010101] selection:bg-[#F60000] selection:text-[#FFFFFF] antialiased">
        {children}
      </body>
    </html>
  );
}
