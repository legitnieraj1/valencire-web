import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import AppShell from "@/components/AppShell";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valenciré — Drop 01",
  description:
    "an indian designer label built around the trouser. drop 01, summer 2026.",
  openGraph: {
    title: "Valenciré",
    description: "an indian designer label built around the trouser.",
    images: ["/og-image.jpg"],
    siteName: "Valenciré",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valenciré",
    description: "an indian designer label built around the trouser.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} font-ui min-h-screen flex flex-col bg-paper text-ink antialiased`}
      >
        <CartProvider>
          <AppShell>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
