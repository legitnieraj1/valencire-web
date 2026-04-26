import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import AppShell from "@/components/AppShell";

/* ─── Display font: editorial, luxury serif ─── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/* ─── UI font: clean geometric sans ─── */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VALENCIRE | Luxury Menswear",
  description:
    "Premium luxury menswear. Defining modern editorial style with precision tailoring and refined materials.",
  keywords: "luxury menswear, premium fashion, designer clothing, Valencire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${inter.variable} font-ui min-h-screen flex flex-col bg-white text-black antialiased`}
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

