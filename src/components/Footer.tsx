"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VCMark, ValencireWordmark } from "./Logo";

const FOOTER_LINKS = {
  Shop: [
    { label: "New In", href: "/new-in" },
    { label: "Denim", href: "/denim" },
    { label: "Jackets", href: "/jackets" },
    { label: "Footwear", href: "/footwear" },
    { label: "Accessories", href: "/accessories" },
  ],
  Help: [
    { label: "Size Guide", href: "/size-guide" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Track My Order", href: "/track" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
  ],
  Company: [
    { label: "About Valencire", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers", href: "/careers" },
    { label: "Press & Media", href: "/press" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};



export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/checkout") return null;

  return (
    <footer className="bg-white border-t border-[#e8e8e8]">

      {/* Main grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.4fr] gap-12 text-center sm:text-left">

        {/* Brand column */}
        <div className="lg:pr-12 flex flex-col items-center sm:items-start">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <VCMark size={40} color="#000" />
            <ValencireWordmark size="0.62rem" color="#000" />
          </div>
          <p
            className="mt-6 text-[11px] text-[#666] leading-[1.8] max-w-[280px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Premium luxury menswear. Defining modern editorial style with precision tailoring, refined materials, and a cinematic approach to dressing.
          </p>

          {/* Social */}
          <div className="mt-8 flex justify-center sm:justify-start gap-4">
            {["Instagram", "Pinterest", "Facebook"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 border border-[#e8e8e8] flex items-center justify-center text-[10px] tracking-widest text-[#666] hover:border-black hover:text-black transition-all duration-200"
                aria-label={s}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div key={section}>
            <h3
              className="text-xl font-semibold text-black mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {section}
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[11px] text-[#666] hover:text-black transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact / Newsletter teaser */}
        <div>
          <h3
            className="text-xl font-semibold text-black mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Contact
          </h3>
          <address className="not-italic space-y-3">
            <p className="text-[11px] text-[#666]" style={{ fontFamily: "var(--font-inter)" }}>
              Mon–Sat, 10am–7pm IST
            </p>
            <a
              href="mailto:hello@valencire.com"
              className="text-[11px] text-black hover:text-[#666] transition-colors block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              hello@valencire.com
            </a>
            <a
              href="tel:+919876543210"
              className="text-[11px] text-[#666] block"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              +91 98765 43210
            </a>
          </address>

          {/* Trust badges */}
          <div className="mt-8 space-y-2.5">
            {["Secure Checkout", "30-Day Returns", "Free Shipping ₹2,999+"].map((b) => (
              <div key={b} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[11px] text-[#666]" style={{ fontFamily: "var(--font-inter)" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Payment icons strip ── */}
      <div className="border-t border-[#e8e8e8]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            {["Visa", "MC", "UPI", "Paytm", "GPay", "NetBanking"].map((pay) => (
              <span
                key={pay}
                className="px-2.5 py-1 border border-[#e8e8e8] text-[9px] tracking-wider text-[#999] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {pay}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#bbb]" style={{ fontFamily: "var(--font-inter)" }}>India (INR ₹)</span>
            <span className="text-[11px] text-[#bbb]" style={{ fontFamily: "var(--font-inter)" }}>English</span>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="bg-black">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[10px] text-white/40 tracking-wider"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © 2026 Valencire. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[10px] text-white/40 hover:text-white/70 tracking-wider transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
