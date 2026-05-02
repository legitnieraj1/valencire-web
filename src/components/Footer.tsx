"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/checkout") return null;

  return (
    <footer className="bg-ink">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 text-center md:text-left items-start">
          {/* Left: wordmark */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-[80px] h-[48px]">
              <Image
                src="/images/logo_final.png"
                alt="Valenciré"
                fill
                className="object-contain invert brightness-200"
              />
            </div>
          </div>

          {/* Center: info */}
          <div
            className="text-xs font-light text-stone leading-[2.0] lowercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <p>valenciré</p>
            <p>coimbatore, india</p>
            <p>drop 01 — summer 2026</p>
          </div>

          {/* Right: links */}
          <div
            className="flex flex-col items-center md:items-end gap-2 text-xs font-light text-stone"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <a
              href="https://www.instagram.com/valencire.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper hover:underline transition-colors duration-300"
            >
              instagram &#8599;
            </a>
            <a
              href="mailto:hello@valencire.com"
              className="hover:text-paper hover:underline transition-colors duration-300"
            >
              contact
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-[11px] font-light text-stone/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            &copy; 2026 valenciré. all rights reserved.
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-[11px] font-light text-stone/40 hover:text-stone/70 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              privacy
            </Link>
            <Link
              href="/terms"
              className="text-[11px] font-light text-stone/40 hover:text-stone/70 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
