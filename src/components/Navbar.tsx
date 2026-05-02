"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu as MenuIcon, Home } from "lucide-react";
import { useCart } from "@/context/CartContext";

const MENU_LINKS = [
  { label: "trousers", href: "/collections/trousers" },
  { label: "jeans", href: "/collections/jeans" },
  { label: "shirts", href: "/collections/shirts" },
  { label: "story", href: "/#story" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  if (pathname === "/checkout") return null;

  const isHome = pathname === "/";
  const showTransparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      {/* ── Desktop nav ── */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          showTransparent
            ? "bg-transparent"
            : "bg-paper/95 backdrop-blur-md border-b border-line"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-8 xl:px-12 h-[64px] grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: menu */}
          <div className="flex items-center">
            {/* Desktop: text "menu" */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`hidden lg:block text-xs font-light uppercase tracking-[0.2em] transition-colors duration-300 ${
                showTransparent ? "text-white/80 hover:text-white" : "text-ink hover:text-bark"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              menu
            </button>
            {/* Mobile: hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden transition-colors ${
                showTransparent ? "text-white" : "text-ink"
              }`}
              aria-label="Menu"
            >
              <MenuIcon className="h-5 w-5" strokeWidth={1} />
            </button>
          </div>

          {/* Center: wordmark */}
          <Link href="/" className="relative block h-[28px] w-[120px] md:h-[32px] md:w-[140px]">
            <Image
              src="/images/text-logo-nav.png"
              alt="Valenciré"
              fill
              priority
              className={`object-contain transition-all duration-500 ${
                showTransparent ? "invert brightness-200" : ""
              }`}
              sizes="140px"
            />
          </Link>

          {/* Right: bag */}
          <div className="flex items-center justify-end">
            {/* Desktop: text "bag" */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`hidden lg:flex items-center gap-2 text-xs font-light uppercase tracking-[0.2em] transition-colors duration-300 ${
                showTransparent ? "text-white/80 hover:text-white" : "text-ink hover:text-bark"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              bag{cartCount > 0 && <span className="text-[10px]">({cartCount})</span>}
            </button>
            {/* Mobile: bag icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`lg:hidden relative transition-colors ${
                showTransparent ? "text-white" : "text-ink"
              }`}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[9px] font-light" style={{ fontFamily: "var(--font-inter)" }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for non-home pages */}
      {!isHome && <div className="h-[64px]" aria-hidden="true" />}

      {/* ── Full-page menu overlay ── */}
      <div
        className={`fixed inset-0 z-[60] bg-paper transition-opacity duration-400 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close button */}
        <div className="absolute top-0 right-0 p-6 md:p-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-xs font-light uppercase tracking-[0.2em] text-ink hover:text-bark transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            close
          </button>
        </div>

        {/* Menu links */}
        <nav className="flex flex-col items-center justify-center h-full gap-0">
          {MENU_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl md:text-4xl font-light italic text-ink hover:text-bark transition-colors duration-300 leading-[1.8]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>


    </>
  );
}
