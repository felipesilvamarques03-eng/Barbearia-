import { ImageResponse } from "next/og";

/** Imagem exibida quando o link do site é compartilhado (WhatsApp, LinkedIn, etc.). */
export const alt = "NEXORA — Software sob medida, entregue com velocidade de IA e rigor de engenharia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0d12",
          color: "#e8eaf0",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="#e8eaf0" strokeWidth="1.5" />
            <path d="M10 22V10l12 12V10" fill="none" stroke="#e8eaf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="22" cy="10" r="2.6" fill="#3cc8f0" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: 6 }}>NEXORA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, maxWidth: 980 }}>
            Software sob medida, entregue com velocidade de IA e rigor de engenharia.
          </span>
          <span style={{ fontSize: 28, color: "#9aa1b2" }}>
            Sites · Sistemas · Aplicativos · Automações · Inteligência artificial
          </span>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#3cc8f0", borderRadius: 3 }} />
      </div>
    ),
    size,
  );
}
