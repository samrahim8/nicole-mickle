import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OGTemplateProps {
  eyebrow?: string;
  title: string;
  italicTail?: string;
  subtitle?: string;
}

export function renderOG({
  eyebrow,
  title,
  italicTail,
  subtitle,
}: OGTemplateProps) {
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
            maxWidth: 1000,
          }}
        >
          {eyebrow && (
            <p
              style={{
                fontSize: 14,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 24,
              }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            style={{
              fontSize: 68,
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              color: "white",
              lineHeight: 1.1,
              margin: 0,
              textWrap: "balance",
            }}
          >
            {title}
          </h1>
          {italicTail && (
            <h1
              style={{
                fontSize: 68,
                fontFamily: "Georgia, serif",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {italicTail}
            </h1>
          )}
          <div
            style={{
              width: 48,
              height: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
              margin: "32px 0",
            }}
          />
          {subtitle && (
            <p
              style={{
                fontSize: 22,
                color: "rgba(255,255,255,0.6)",
                margin: 0,
                marginBottom: 16,
                textWrap: "balance",
              }}
            >
              {subtitle}
            </p>
          )}
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}
          >
            nicolemickle.com
          </p>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
