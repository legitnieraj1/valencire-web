import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VALENCIRÉ | Arm The Soul",
  description: "Luxury gothic fashion. We do not dress the body, we arm the soul.",
};

import AuthProvider from "@/components/providers/AuthProvider";
import { CartProvider } from "@/components/providers/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cinzel.variable} ${inter.variable} bg-black text-white antialiased selection:bg-white selection:text-black`}
      >
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
