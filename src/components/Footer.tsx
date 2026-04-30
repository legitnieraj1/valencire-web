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
    <footer className="bg-[#FAF8F5] border-t-4 border-black font-ui">

      {/* Main grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.4fr] gap-12 text-center sm:text-left">

        {/* Brand column */}
        <div className="lg:pr-12 flex flex-col items-center sm:items-start">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <VCMark size={44} color="#000" />
            <ValencireWordmark size="0.7rem" color="#000" />
          </div>
          <p
            className="mt-6 text-[12px] text-gray-800 leading-[1.8] max-w-[280px] font-bold"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            Premium luxury menswear. Defining modern editorial style with precision tailoring, refined materials, and a cinematic approach to dressing.
          </p>

          {/* Social */}
          <div className="mt-8 flex justify-center sm:justify-start gap-4">
            {["Instagram", "Pinterest", "Facebook"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-10 h-10 border-2 border-black bg-[#EAE8E3] shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center text-[12px] tracking-widest text-black hover:bg-[#FFF44F] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all duration-200"
                aria-label={s}
                style={{ fontFamily: "Courier New, monospace" }}
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
              className="text-[14px] font-bold text-black mb-6 uppercase tracking-[0.2em] inline-block border-b-2 border-black pb-1"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              {section}
            </h3>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[12px] font-bold text-gray-700 hover:text-black hover:underline underline-offset-4 transition-all duration-200"
                    style={{ fontFamily: "Courier New, monospace" }}
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
            className="text-[14px] font-bold text-black mb-6 uppercase tracking-[0.2em] inline-block border-b-2 border-black pb-1"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            Contact
          </h3>
          <address className="not-italic space-y-4">
            <p className="text-[12px] font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>
              Mon–Sat, 10am–7pm IST
            </p>
            <a
              href="mailto:hello@valencire.com"
              className="text-[12px] font-bold text-black hover:text-gray-600 transition-colors block"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              hello@valencire.com
            </a>
            <a
              href="tel:+919876543210"
              className="text-[12px] font-bold text-black hover:text-gray-600 transition-colors block"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              +91 98765 43210
            </a>
          </address>

          {/* Trust badges */}
          <div className="mt-8 space-y-3">
            {["Secure Checkout", "30-Day Returns", "Free Shipping ₹2,999+"].map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-black bg-[#FFF44F] flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3L3 5L7 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: "Courier New, monospace" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Payment icons strip ── */}
      <div className="border-t-4 border-black bg-[#EAE8E3]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-3">
            {["Visa", "MC", "UPI", "Paytm", "GPay", "NetBanking"].map((pay) => (
              <span
                key={pay}
                className="px-3 py-1 border-2 border-black bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] text-[10px] font-bold tracking-widest text-black uppercase"
                style={{ fontFamily: "Courier New, monospace" }}
              >
                {pay}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[12px] font-bold text-black uppercase tracking-widest" style={{ fontFamily: "Courier New, monospace" }}>India (INR ₹)</span>
            <span className="text-[12px] font-bold text-black uppercase tracking-widest" style={{ fontFamily: "Courier New, monospace" }}>English</span>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="bg-black border-t-4 border-black">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[11px] font-bold text-[#FFF44F] tracking-widest uppercase"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            © 2026 VALENCIRE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[11px] font-bold text-white hover:text-[#FFF44F] tracking-widest uppercase transition-colors"
                style={{ fontFamily: "Courier New, monospace" }}
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
