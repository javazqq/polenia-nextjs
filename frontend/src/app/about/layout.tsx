import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Polenia | Our Story, Process & Distributors",
  description:
    "Discover Polenia's story, brewing process, values, and where to find our craft ginger beer. Meet our team and explore distributors on an interactive map.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
