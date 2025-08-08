import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Polenia",
  description:
    "Consulta los Términos y Condiciones de Polenia: pedidos, precios, envíos, devoluciones, propiedad intelectual y más.",
  alternates: {
    canonical: "/terms",
    languages: {
      "es-MX": "/terms",
      "en-US": "/terms/en",
    },
  },
};

export default function TermsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
