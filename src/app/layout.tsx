import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eshan Jayasundara | AI/ML Engineer",
  description: "Portfolio of Eshan Jayasundara, an AI/ML Engineer specializing in NLP and LLMs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
