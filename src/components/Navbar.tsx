"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Heart, X, ChevronRight, Home, Menu } from "lucide-react";
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
  const mobileOverlay = pathname === "/" && !scrolled && !searchOpen;
  const mobileTopLinks = [
    { label: "Jeans", href: "/collections/jeans" },
    { label: "Trousers", href: "/collections/trousers" },
    { label: "Shirt", href: "/collections/shirts" },
    { label: "Story", href: "/#story" },
  ];
  const desktopCategoryLinks = [
    { label: "Jeans", href: "/collections/jeans", menuLabel: "Jeans" },
    { label: "Trousers", href: "/collections/trousers", menuLabel: "Trousers & Pants" },
    { label: "Shirts", href: "/collections/shirts" },
    { label: "Story", href: "/#story" },
    { label: "New In", href: "/new-in" },
  ];

  return (
    <>
      <header
        className={`fixed lg:sticky top-0 z-50 w-full transition-all duration-500 ${
          mobileOverlay
            ? "bg-transparent text-white"
            : "bg-white/95 text-black shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur-md"
        } lg:bg-white lg:text-black lg:backdrop-blur-none ${
          scrolled ? "lg:shadow-[0_1px_0_rgba(0,0,0,0.08)]" : "lg:border-b lg:border-[#e8e8e8]"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* ── Mobile editorial top nav ── */}
        <div className="lg:hidden px-5 pt-[max(0.85rem,env(safe-area-inset-top))] pb-4">
          <Link
            href="/"
            onClick={() => setActiveMenu(null)}
            className={`mx-auto mb-5 flex w-fit flex-col items-center transition-[filter] duration-500 ${
              mobileOverlay ? "invert" : ""
            }`}
            aria-label="Valencire home"
          >
            <VCMark size={38} />
            <ValencireWordmark size="0.62rem" />
          </Link>
          <nav className="grid grid-cols-4 items-center gap-1">
            {mobileTopLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] transition-opacity active:opacity-60"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Desktop utility row ── */}
        <div className="hidden lg:grid max-w-[1440px] mx-auto px-8 xl:px-12 h-[82px] grid-cols-[1fr_auto_1fr] items-center relative">
          <div className="flex items-center gap-7">
            <button
              onClick={() => setActiveMenu(activeMenu === "Jeans" ? null : "Jeans")}
              className="flex items-center gap-3 text-[14px] font-medium text-black transition-colors hover:text-[#666]"
              style={{ fontFamily: "var(--font-inter)" }}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
              <span>Menu</span>
            </button>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="flex items-center gap-3 text-[14px] font-medium text-black transition-colors hover:text-[#666]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {searchOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Search className="h-5 w-5" strokeWidth={1.5} />}
              <span>Search</span>
            </button>
          </div>

          <Link
            href="/"
            onClick={() => setActiveMenu(null)}
            className="relative block h-[38px] w-[220px] overflow-hidden"
            aria-label="Valencire home"
          >
            <Image
              src="/images/text-logo-nav.png"
              alt="Valencire"
              fill
              priority
              className="object-contain"
              sizes="220px"
            />
          </Link>

          <div className="flex items-center justify-end gap-6">
            <a
              href="tel:+919876543210"
              className="text-[14px] font-medium text-black transition-colors hover:text-[#666]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Call Us
            </a>
            <Link href="/wishlist" aria-label="Wishlist" className="relative text-black transition-colors hover:text-[#666]">
              <Heart className="h-[22px] w-[22px]" strokeWidth={1.5} />
              <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-[#b56b18]" />
            </Link>
            <Link href="/account" aria-label="Account" className="text-black transition-colors hover:text-[#666]">
              <User className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </Link>
            <button onClick={() => setIsCartOpen(true)} aria-label="Cart" className="relative text-black transition-colors hover:text-[#666]">
              <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-[15px] h-[15px] bg-black text-white text-[8px] flex items-center justify-center rounded-full font-bold leading-none">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* ── Desktop category strip ── */}
        <div className="hidden lg:flex border-t border-[#eeeeee] justify-center">
          <ul className="flex items-center gap-10 py-[12px]">
            {desktopCategoryLinks.map((item) => {
              const megaItem = NAV.find((navItem) => navItem.label === item.menuLabel);
              return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="relative text-[10px] tracking-[0.3em] uppercase font-semibold text-black transition-colors duration-200 hover:text-[#666]"
                  style={{ fontFamily: "var(--font-inter)" }}
                  onMouseEnter={() => megaItem?.mega ? setActiveMenu(megaItem.label) : setActiveMenu(null)}
                >
                  {item.label}
                </Link>
              </li>
            )})}
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
              <p className="text-sm text-gray-400">No results found for &quot;{searchQuery}&quot;</p>
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
      {pathname !== "/" && <div className="h-[116px] lg:hidden" aria-hidden="true" />}

      {/* ── Mobile bottom nav ── */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 grid h-[76px] grid-cols-5 items-center border-t border-black/10 bg-white/95 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-3 text-black shadow-[0_-18px_40px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
        aria-label="Mobile navigation"
      >
        <Link href="/" aria-label="Home" className="flex h-full items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center border-b border-black">
            <Home className="h-[23px] w-[23px]" strokeWidth={1.35} />
          </span>
        </Link>
        <button
          onClick={() => setSearchOpen((open) => !open)}
          aria-label="Search"
          className="flex h-full items-center justify-center"
        >
          <Search className="h-[25px] w-[25px]" strokeWidth={1.25} />
        </button>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-full items-center justify-center text-[14px] font-medium uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-inter)" }}
          aria-label="Menu"
        >
          Menu
        </button>
        <Link href="/account" aria-label="Account" className="flex h-full items-center justify-center">
          <User className="h-[24px] w-[24px]" strokeWidth={1.25} />
        </Link>
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label="Cart"
          className="relative flex h-full items-center justify-center"
        >
          <ShoppingBag className="h-[25px] w-[25px]" strokeWidth={1.2} />
          {cartCount > 0 && (
            <span className="absolute right-[18%] top-1 flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#ff2f1f] px-1 text-[11px] font-bold leading-none text-white">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

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
