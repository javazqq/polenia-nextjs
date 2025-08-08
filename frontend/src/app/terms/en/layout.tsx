import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Polenia",
  description:
    "Read Polenia's Terms & Conditions covering orders, pricing, shipping, returns, intellectual property, and more.",
  alternates: { canonical: "/terms/en" },
};

export default function TermsLayoutEn({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
