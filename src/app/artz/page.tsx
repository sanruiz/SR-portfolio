import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARTZ — Propuesta de página de inicio",
  description: "Propuesta de experiencia digital para ARTZ.",
};

export default function ArtzPage() {
  return (
    <main aria-label="Propuesta de página de inicio para ARTZ">
      <iframe
        title="Propuesta ARTZ"
        src="/artz/Main.dc.html"
        style={{
          display: "block",
          width: "100%",
          height: "8340px",
          border: 0,
        }}
      />
    </main>
  );
}
