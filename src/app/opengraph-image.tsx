import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Magimatix — Web Design & AI Automations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            Magimatix
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#71717a",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Web Design · AI Automations
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 20,
              color: "#a1a1aa",
              maxWidth: 700,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Premium digital experiences and intelligent automations that elevate
            your brand.
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, #00d4ff, #8b5cf6, #ec4899)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
