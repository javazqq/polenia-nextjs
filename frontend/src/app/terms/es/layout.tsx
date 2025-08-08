import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Polenia",
  description:
    "Lee los Términos y Condiciones de Polenia sobre pedidos, precios, envíos, devoluciones, propiedad intelectual y más.",
  alternates: { canonical: "/terms/es" },
};

export default function TermsLayoutEs({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
