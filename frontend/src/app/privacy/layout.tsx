import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Polenia",
  description:
    "Conoce cómo Polenia recopila, usa y protege tus datos personales.",
  alternates: {
    canonical: "/privacy",
    languages: {
      "es-MX": "/privacy",
      "en-US": "/privacy/en",
    },
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
