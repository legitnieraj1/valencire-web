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
        className={`sticky top-0 z-50 w-full bg-[#FDFBF7] transition-all duration-500 ${
          scrolled ? "shadow-[0_4px_0_rgba(0,0,0,1)]" : "border-b-4 border-black"
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
                className={`relative text-[12px] tracking-[0.2em] uppercase font-bold transition-colors duration-200 py-1 ${
                  item.highlight ? "text-red-600 bg-[#FFF44F] border-2 border-black px-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "text-black hover:text-gray-500"
                }`}
                style={{ fontFamily: "Courier New, monospace" }}
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
              className="text-black hover:text-gray-500 transition-colors"
            >
              {searchOpen ? <X className="w-[20px] h-[20px] stroke-[3px]" /> : <Search className="w-[20px] h-[20px] stroke-[3px]" />}
            </button>
            <Link href="/account" aria-label="Account" className="text-black hover:text-gray-500 transition-colors hidden sm:block">
              <User className="w-[20px] h-[20px] stroke-[3px]" />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="text-black hover:text-gray-500 transition-colors hidden sm:block">
              <Heart className="w-[20px] h-[20px] stroke-[3px]" />
            </Link>
            <button onClick={() => setIsCartOpen(true)} aria-label="Cart" className="text-black hover:text-gray-500 transition-colors relative flex items-center gap-2">
              <ShoppingBag className="w-[20px] h-[20px] stroke-[3px]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-[18px] h-[18px] bg-[#FFF44F] border-2 border-black text-black text-[10px] flex items-center justify-center font-bold leading-none shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }}>{cartCount}</span>
              )}
            </button>
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-black" aria-label="Menu">
              <Menu className="w-6 h-6 stroke-[3px]" />
            </button>
          </div>
        </div>

        {/* ── Category strip ── */}
        <div className="hidden lg:flex border-t-4 border-black justify-center bg-[#EAE8E3]">
          <ul className="flex items-center gap-8 py-[12px]">
            {NAV.slice(3).map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`text-[11px] tracking-[0.2em] uppercase font-bold transition-colors duration-200 ${
                    item.highlight ? "text-red-600 bg-[#FFF44F] border-2 border-black px-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "text-black hover:text-gray-500"
                  }`}
                  style={{ fontFamily: "Courier New, monospace" }}
                  onMouseEnter={() => item.mega ? setActiveMenu(item.label) : setActiveMenu(null)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Search expand ── */}
        <div className={`border-t-4 border-black overflow-hidden transition-all duration-300 bg-[#FAF8F5] ${searchOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-4 flex items-center gap-4 border-b-4 border-black">
            <Search className="w-5 h-5 text-black stroke-[3px] flex-shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search styles, collections, products..."
              className="flex-1 bg-transparent text-sm font-bold text-black placeholder-gray-400 outline-none uppercase tracking-widest"
              style={{ fontFamily: "Courier New, monospace" }}
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-black hover:text-gray-500 transition-colors">
              <X className="w-5 h-5 stroke-[3px]" />
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
                className="absolute top-full left-0 right-0 bg-[#FDFBF7] border-t-4 border-black shadow-[0_8px_0_rgba(0,0,0,1)] z-40"
                onMouseLeave={() => setActiveMenu(null)}
              >
                <div className="max-w-[1440px] mx-auto px-10 py-10 flex gap-16">
                  {item.mega.cols.map((col) => (
                    <div key={col.title} className="min-w-[130px]">
                      <p className="text-[12px] tracking-[0.2em] uppercase font-bold text-black mb-5 bg-[#FFF44F] border-2 border-black inline-block px-2 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }}>
                        {col.title}
                      </p>
                      <ul className="space-y-4">
                        {col.links.map((link) => (
                          <li key={link}>
                            <Link
                              href={`${item.href}?sort=${link.toLowerCase().replace(/\s+/g, "-")}`}
                              className="flex items-center gap-2 text-[12px] font-bold text-gray-600 hover:text-black transition-colors group uppercase tracking-widest"
                              style={{ fontFamily: "Courier New, monospace" }}
                              onClick={() => setActiveMenu(null)}
                            >
                              <ChevronRight className="w-4 h-4 stroke-[3px] text-[#FFF44F] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
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
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[340px] z-[70] bg-[#FDFBF7] border-r-4 border-black shadow-[8px_0_0_rgba(0,0,0,1)] transition-transform duration-400 ease-out flex flex-col lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b-4 border-black bg-[#FFF44F]">
          <div className="flex items-center gap-3">
            <VCMark size={34} color="#000" />
            <ValencireWordmark size="0.62rem" color="#000" />
          </div>
          <button onClick={() => setMobileOpen(false)} aria-label="Close" className="border-2 border-black bg-white p-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"><X className="w-5 h-5 stroke-[3px]" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto bg-[#FAF8F5]">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-6 py-5 text-[13px] font-bold tracking-[0.2em] uppercase border-b-2 border-black hover:bg-[#EAE8E3] transition-colors ${
                item.highlight ? "text-red-600 bg-[#FFF44F]" : "text-black"
              }`}
              style={{ fontFamily: "Courier New, monospace" }}
            >
              {item.label}
              <ChevronRight className="w-5 h-5 stroke-[3px]" />
            </Link>
          ))}
        </nav>
        <div className="border-t-4 border-black px-6 py-6 flex gap-6 bg-[#EAE8E3]">
          <Link href="/account" className="flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] uppercase text-black hover:text-gray-600" style={{ fontFamily: "Courier New, monospace" }}>
            <User className="w-5 h-5 stroke-[3px]" /> Account
          </Link>
          <Link href="/wishlist" className="flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] uppercase text-black hover:text-gray-600" style={{ fontFamily: "Courier New, monospace" }}>
            <Heart className="w-5 h-5 stroke-[3px]" /> Wishlist
          </Link>
        </div>
      </div>
    </>
  );
}
