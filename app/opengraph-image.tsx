import { ImageResponse } from "next/og";

export const alt = "Fantômes — Débusque les abonnements que tu paies sans t'en servir";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(160deg, #ffe1cf 0%, #fbd0df 48%, #dcd6ff 100%)",
          color: "#1B1A17",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 800, marginBottom: 30 }}>Fantômes</div>
        <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.05 }}>
          Débusque les abonnements que tu paies
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.05, color: "#C2410C" }}>
          sans t&apos;en servir.
        </div>
      </div>
    ),
    { ...size }
  );
}
