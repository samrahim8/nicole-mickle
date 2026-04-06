import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nicole Mickle - Orlando Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1B3A2D",
          padding: "60px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 14,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: 24,
            }}
          >
            Nicole Mickle
          </p>
          <h1
            style={{
              fontSize: 64,
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              color: "white",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Orlando&apos;s Relocation
          </h1>
          <h1
            style={{
              fontSize: 64,
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              color: "white",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            &amp; New Construction
          </h1>
          <h1
            style={{
              fontSize: 64,
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Specialist
          </h1>
          <div
            style={{
              width: 48,
              height: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
              margin: "32px 0",
            }}
          />
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.5)",
              margin: 0,
            }}
          >
            nicolemickle.com
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
