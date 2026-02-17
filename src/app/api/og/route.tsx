import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "ProofLayer AI";
  const description = searchParams.get("description") || "The SSL Certificate of the AI Age";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage: "radial-gradient(circle at 50% 50%, #1a3a5c 0%, #0a0a0a 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <div
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#3b82f6",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span style={{ color: "white", fontSize: 32, fontWeight: 700 }}>ProofLayer AI</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 800,
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "white", fontSize: 52, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            {title}
          </h1>
          <p style={{ color: "#a0a0a0", fontSize: 24, marginTop: 16 }}>
            {description}
          </p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
