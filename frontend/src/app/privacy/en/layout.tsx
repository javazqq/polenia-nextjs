import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Polenia",
  description:
    "Learn how Polenia collects, uses, and protects your personal data.",
  alternates: {
    canonical: "/privacy/en",
    languages: {
      "es-MX": "/privacy",
      "en-US": "/privacy/en",
    },
  },
};

export default function PrivacyEnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
