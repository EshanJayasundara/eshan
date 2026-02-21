import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eshan Jayasundara | AI/ML Engineer",
  description: "Portfolio of Eshan Jayasundara, an AI/ML Engineer specializing in NLP and LLMs.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import NeuralNetworkBackground from "@/components/NeuralNetworkBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased relative overflow-x-hidden bg-background">
        <NeuralNetworkBackground />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10 w-full min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
