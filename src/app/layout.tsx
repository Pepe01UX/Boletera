import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Boletera Coronelas | Las Coronelas de Durango",
  description:
    "Compra boletos oficiales para los partidos de Las Coronelas en el Auditorio del Pueblo.",
};

export const viewport: Viewport = {
  themeColor: "#0B1020",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${manrope.variable} ${manrope.className} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
