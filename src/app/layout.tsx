import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Percurso · Protótipo educacional", description: "Protótipo demonstrativo para Discovery" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
