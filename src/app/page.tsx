"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { BEST_SELLERS, ALL_PRODUCTS } from "@/data/products";

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useReveal();
  return (
    <section ref={ref} id={id} className={`reveal ${className}`}>
      {children}
    </section>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError(true);
      setTimeout(() => setError(false), 1500);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="mt-8 max-w-[360px] mx-auto">
      {submitted ? (
        <p
          className="text-base italic text-bark animate-fade-in"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          you&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nierajfreestyle@gmail.com"
            className={`w-full bg-transparent border-0 border-b py-3 pr-10 text-lg italic font-light text-ink placeholder:text-stone outline-none transition-colors duration-300 ${
              error ? "border-[#9B4444]" : "border-line focus:border-ink"
            }`}
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
          <button
            type="submit"
            className="absolute right-0 bottom-3 text-xl text-bark hover:text-ink transition-colors"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            &rarr;
          </button>
        </form>
      )}
    </div>
  );
}

export default function Home() {
  const trousers = ALL_PRODUCTS.filter((p) => p.category === "trousers" || p.category === "jeans");
  const shirts = ALL_PRODUCTS.filter((p) => p.category === "shirts");
  const collection = [...trousers, ...shirts].slice(0, 8);

  return (
    <div className="w-full bg-paper">
      <Hero />

      {/* ── Denim teaser ── */}
      <RevealSection className="bg-cream py-20 md:py-32">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-center">
            <div className="relative aspect-[3/4] bg-stone/20 overflow-hidden">
              <Image
                src="/images/bootcut_3.png"
                alt="Denim chapter"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <p
                className="text-xs font-light uppercase tracking-[0.2em] text-stone"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                coming soon
              </p>
              <h2
                className="mt-3 text-3xl md:text-4xl font-light italic text-ink tracking-[-0.02em] leading-[1.2]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                the denim chapter.
              </h2>
              <p
                className="mt-4 text-sm font-light text-stone leading-[1.7] max-w-[360px] mx-auto md:mx-0"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                denim, treated like tailoring. our jeans follow the same principles as the trousers — cut for drape, built for presence. three silhouettes. dropping soon.
              </p>
              <a
                href="#waitlist"
                className="link-cta mt-8 inline-block text-sm"
              >
                notify me &rarr;
              </a>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Collection ── */}
      <RevealSection className="py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-12 md:mb-16">
            <div>
              <p
                className="text-xs font-light uppercase tracking-[0.2em] text-stone"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                the collection
              </p>
              <h2
                className="mt-2 text-3xl font-light italic text-ink tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                trousers
              </h2>
            </div>
            <Link
              href="/collections/trousers"
              className="link-cta text-xs"
            >
              view all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {collection.map((prod) => (
              <ProductCard key={prod.id} prod={prod} />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Story ── */}
      <RevealSection id="story" className="scroll-mt-[80px] py-20 md:py-32 bg-cream overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p
                className="mb-4 text-xs font-light uppercase tracking-[0.2em] text-stone"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                the story
              </p>
              <h2
                className="max-w-xl text-3xl md:text-5xl font-light leading-[1.1] tracking-[-0.02em] text-ink"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                from valencia,<br />in our own language.
              </h2>
            </div>
            <p
              className="max-w-[420px] text-sm font-light leading-[1.7] text-stone"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              valenciré takes its name from valencia — a city built around art, architecture, and form. we borrow that vocabulary and bring it into indian tailoring. one trouser at a time. one drop at a time. nothing louder than it needs to be.
            </p>
          </div>

          {/* Polaroid cards */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-5 md:gap-x-6">
            {[
              { src: "/images/pleated_3.png", title: "The Pleat", copy: "the foundation. a wide-leg trouser cut for drape, not for show." },
              { src: "/images/jeans-2-mobile.png", title: "The Denim", copy: "denim, treated like tailoring. weight, fall, and a clean line." },
              { src: "/images/bush_4.png", title: "The Utility", copy: "softer construction. fewer details. the trouser you reach for first." },
              { src: "/images/bootcut_3.png", title: "The Cut", copy: "a longer break, a fuller leg. the silhouette doing the work." },
              { src: "/images/baggy_4.png", title: "The Ease", copy: "relaxed, not loose. volume held in proportion." },
            ].map((item, index) => (
              <article
                key={item.title}
                className={`group relative min-h-[300px] md:min-h-[460px] p-2 md:p-3 bg-paper shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-700 hover:shadow-[0_30px_50px_rgba(0,0,0,0.12)] hover:z-20 ${
                  index === 0 ? "col-span-2 md:col-span-1" : ""
                } ${index % 2 === 0 ? "md:translate-y-8 md:rotate-[-2deg]" : "md:-translate-y-4 md:rotate-[2.5deg]"} hover:!rotate-0 hover:scale-[1.02]`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                    <p
                      className="mb-2 text-[9px] font-light uppercase tracking-[0.35em] text-stone"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className="text-lg tracking-tight"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-2 max-w-[190px] text-[11px] leading-5 text-paper/80 lowercase font-light"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.copy}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Closing line */}
          <div className="mt-20 md:mt-28 border-y border-ink/10 py-12 flex flex-col items-center justify-center text-center">
            <p
              className="max-w-2xl text-xl md:text-2xl font-light italic leading-tight tracking-tight text-bark"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              made for those who dress quietly,<br />and are noticed anyway.
            </p>
            <Link
              href="/collections/trousers"
              className="link-cta mt-8 text-xs uppercase tracking-[0.15em]"
            >
              view the trousers &rarr;
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* ── Waitlist ── */}
      <RevealSection id="waitlist" className="bg-cream py-20 md:py-28">
        <div className="max-w-[480px] mx-auto px-6 text-center">
          <p
            className="text-xs font-light uppercase tracking-[0.2em] text-stone"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            join the list
          </p>
          <h2
            className="mt-3 text-2xl font-light italic text-ink"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            be first to know.
          </h2>
          <p
            className="mt-3 text-sm font-light text-stone leading-[1.7]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            early access to drops, behind-the-scenes, and things we don&apos;t share anywhere else.
          </p>
          <WaitlistForm />
        </div>
      </RevealSection>

      {/* ── Closing manifesto ── */}
      <RevealSection className="bg-cream py-20 md:py-28">
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <p
            className="text-xl md:text-2xl font-light italic text-bark leading-[1.8]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            not about the logo.<br />
            not about the noise.<br />
            about the way it falls.<br />
            about the way you stand.
          </p>
        </div>
      </RevealSection>
    </div>
  );
}
