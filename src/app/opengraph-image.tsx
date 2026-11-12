import { ImageResponse } from "next/og";

export const runtime = "edge";
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
          justifyContent: "center",
          padding: "80px",
          background: "#070B10",
          color: "#E6EDF3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#14E3C6", letterSpacing: 4 }}>
          WEB DEVELOPER &amp; SEO PROFESSIONAL
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, marginTop: 20 }}>
          Rakibul Hasan
        </div>
        <div style={{ fontSize: 32, color: "#8B98A5", marginTop: 24, lineHeight: 1.4 }}>
          I build fast, modern websites and help your business grow on Google.
        </div>
        <div style={{ fontSize: 24, color: "#14E3C6", marginTop: 36 }}>
          Websites &nbsp;•&nbsp; SEO &nbsp;•&nbsp; Ecommerce
        </div>
      </div>
    ),
    size
  );
}
