"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Heart, X, Menu, ChevronRight } from "lucide-react";
import { VCMark, ValencireWordmark } from "./Logo";
import { ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

const NAV = [
  {
    label: "Jeans",
    href: "/collections/jeans",
    mega: {
      cols: [
        { title: "Fit", links: ["Slim Fit", "Regular Fit", "Bootcut", "Straight Leg", "Relaxed Fit"] },
        { title: "Wash", links: ["Light Wash", "Dark Indigo", "Raw Selvedge", "Black Denim"] },
      ],
    },
  },
  {
    label: "Trousers & Pants",
    href: "/collections/trousers",
    mega: {
      cols: [
        { title: "Style", links: ["Pleated Pants", "Modern Fits", "Tailored Chinos", "Cargo Pants"] },
        { title: "Fabric", links: ["Premium Linen", "Wool Blend", "Cotton Twill", "Technical Fabric"] },
      ],
    },
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
    mega: {
      cols: [
        { title: "Essentials", links: ["Leather Belts", "Classic Watches", "Sunglasses"] },
        { title: "Leather Goods", links: ["Wallets", "Briefcases", "Weekend Bags"] },
      ],
    },
  },
  { label: "New Arrivals", href: "/new-in", mega: null },
  { label: "Sale", href: "/sale", mega: null, highlight: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        // setSearchOpen(false); // Removed to prevent closing on clicking results
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname === "/checkout") return null;

  const searchResults = searchQuery.length >= 2
    ? ALL_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-all duration-500 ${
          scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.08)]" : "border-b border-[#e8e8e8]"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* ── Top row ── */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[70px] flex items-center justify-between relative">

          {/* Left: desktop nav (first 4 items) */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {NAV.slice(0, 4).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-[10.5px] tracking-[0.22em] uppercase font-semibold transition-colors duration-200 py-1 ${
                  item.highlight ? "text-red-600" : "text-black hover:text-[#666]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
                onMouseEnter={() => item.mega ? setActiveMenu(item.label) : setActiveMenu(null)}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-px bg-black transition-transform duration-300 origin-left ${
                    activeMenu === item.label ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Center: VC logo mark + wordmark */}
          <div className="flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link
              href="/"
              onClick={() => setActiveMenu(null)}
              className="flex flex-col items-center gap-1 group"
            >
              <VCMark size={40} color="#000" />
              <ValencireWordmark size="0.62rem" color="#000" />
            </Link>
          </div>

          {/* Right: icons */}
          <div className="flex items-center gap-5 flex-1 justify-end">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="text-black hover:text-[#666] transition-colors"
            >
              {searchOpen ? <X className="w-[18px] h-[18px]" /> : <Search className="w-[18px] h-[18px]" />}
            </button>
            <Link href="/account" aria-label="Account" className="text-black hover:text-[#666] transition-colors hidden sm:block">
              <User className="w-[18px] h-[18px]" />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="text-black hover:text-[#666] transition-colors hidden sm:block">
              <Heart className="w-[18px] h-[18px]" />
            </Link>
            <button onClick={() => setIsCartOpen(true)} aria-label="Cart" className="text-black hover:text-[#666] transition-colors relative">
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-[14px] h-[14px] bg-black text-white text-[8px] flex items-center justify-center rounded-full font-bold leading-none">{cartCount}</span>
              )}
            </button>
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-black" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Category strip ── */}
        <div className="hidden lg:flex border-t border-[#e8e8e8] justify-center">
          <ul className="flex items-center gap-8 py-[10px]">
            {NAV.slice(4).map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`text-[10px] tracking-[0.22em] uppercase font-medium transition-colors duration-200 ${
                    item.highlight ? "text-red-600 font-bold" : "text-black hover:text-[#666]"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                  onMouseEnter={() => item.mega ? setActiveMenu(item.label) : setActiveMenu(null)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Search expand ── */}
        <div className={`border-t border-[#e8e8e8] overflow-hidden transition-all duration-300 ${searchOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-3 flex items-center gap-4 border-b border-black">
            <Search className="w-4 h-4 text-[#999] flex-shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search styles, collections, products..."
              className="flex-1 bg-transparent text-sm text-black placeholder-[#999] outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-[#999] hover:text-black transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-6 bg-white">
              <p className="text-[9px] tracking-[0.35em] uppercase font-semibold text-[#999] mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                {searchResults.length} Results
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {searchResults.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.id}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="relative w-full h-[120px] rounded-lg overflow-hidden bg-gray-50">
                      <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black leading-tight group-hover:text-gray-600 transition-colors">{prod.name}</p>
                      <p className="text-[10px] text-gray-400 mt-1">RS. {prod.price}.00</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {searchQuery.length >= 2 && searchResults.length === 0 && (
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-8 bg-white text-center">
              <p className="text-sm text-gray-400">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* ── Mega menu dropdown ── */}
        {NAV.map(
          (item) =>
            item.mega && activeMenu === item.label && (
              <div
                key={item.label}
                className="absolute top-full left-0 right-0 bg-white border-t border-[#e8e8e8] shadow-[0_24px_60px_rgba(0,0,0,0.07)] z-40"
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className="max-w-[1440px] mx-auto px-10 py-10 flex gap-16">
                  {item.mega.cols.map((col) => (
                    <div key={col.title} className="min-w-[130px]">
                      <p className="text-[9px] tracking-[0.35em] uppercase font-semibold text-[#999] mb-5" style={{ fontFamily: "var(--font-inter)" }}>
                        {col.title}
                      </p>
                      <ul className="space-y-3">
                        {col.links.map((link) => (
                          <li key={link}>
                            <Link
                              href={`${item.href}?sort=${link.toLowerCase().replace(/\s+/g, "-")}`}
                              className="flex items-center gap-2 text-sm text-black hover:text-[#666] transition-colors group"
                              style={{ fontFamily: "var(--font-inter)" }}
                              onClick={() => setActiveMenu(null)}
                            >
                              <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="ml-auto hidden xl:block w-[210px] h-[220px] overflow-hidden flex-shrink-0 bg-[#F0EBE3]">
                    <img src="/images/shirts.png" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            )
        )}
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[82vw] max-w-[340px] z-[70] bg-white shadow-2xl transition-transform duration-400 ease-out flex flex-col lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e8e8]">
          <div className="flex items-center gap-3">
            <VCMark size={34} color="#000" />
            <ValencireWordmark size="0.62rem" color="#000" />
          </div>
          <button onClick={() => setMobileOpen(false)} aria-label="Close"><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-6 py-4 text-[11px] font-semibold tracking-widest uppercase border-b border-[#f0f0f0] hover:bg-[#f7f7f7] transition-colors ${
                item.highlight ? "text-red-600" : "text-black"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.label}
              <ChevronRight className="w-4 h-4 text-[#bbb]" />
            </Link>
          ))}
        </nav>
        <div className="border-t border-[#e8e8e8] px-6 py-5 flex gap-6">
          <Link href="/account" className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-black" style={{ fontFamily: "var(--font-inter)" }}>
            <User className="w-4 h-4" /> Account
          </Link>
          <Link href="/wishlist" className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-black" style={{ fontFamily: "var(--font-inter)" }}>
            <Heart className="w-4 h-4" /> Wishlist
          </Link>
        </div>
      </div>
    </>
  );
}
