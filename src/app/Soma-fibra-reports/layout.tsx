import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SOMA Informes | SOMA Group",
  description: "Accede a los informes y sitios web de SOMA y Fibra SOMA",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SomaInformsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
