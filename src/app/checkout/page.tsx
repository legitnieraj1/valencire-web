"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Lock, ArrowRight, Check } from "lucide-react";

function Field({
  label,
  type = "text",
  className = "",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        className="peer w-full bg-transparent border-b border-line pt-6 pb-2 px-0 text-sm font-light text-ink outline-none focus:border-ink transition-colors duration-300 placeholder-transparent"
        style={{ fontFamily: "var(--font-inter)" }}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      <label
        className="absolute left-0 transition-all duration-200 pointer-events-none top-5 text-sm font-light text-stone peer-focus:top-0 peer-focus:text-[10px] peer-focus:tracking-[0.15em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.15em] peer-[:not(:placeholder-shown)]:uppercase"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {label}
      </label>
    </div>
  );
}

function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function CheckoutPage() {
  const { items, cartCount } = useCart();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  const subtotal = items.reduce(
    (acc, item) => acc + parseInt(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-paper" style={{ fontFamily: "var(--font-inter)" }}>

      {/* Top bar */}
      <header className="border-b border-line bg-paper sticky top-0 z-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-light text-stone hover:text-ink transition-colors"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1} />
            <span className="hidden sm:inline">back</span>
          </Link>

          <Link href="/" className="relative block h-[24px] w-[100px]">
            <Image
              src="/images/text-logo-nav.png"
              alt="Valenciré"
              fill
              className="object-contain"
              sizes="100px"
            />
          </Link>

          <div className="flex items-center gap-4">
            <span className={`text-xs font-light ${step >= 1 ? "text-ink" : "text-stone"}`}>
              {step === 1 ? "delivery" : "payment"}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">

        {/* Left: Form */}
        <div>
          {step === 1 && (
            <div className="space-y-14">
              <div>
                <p
                  className="text-xs font-light uppercase tracking-[0.15em] text-stone mb-1"
                >
                  01 — contact
                </p>
                <h2
                  className="text-2xl font-light text-ink mb-8 tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  how should we reach you?
                </h2>
                <div className="space-y-8">
                  <Field type="email" label="email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-line bg-transparent checked:bg-ink checked:border-ink cursor-pointer transition-all appearance-none"
                    />
                    <span className="text-xs font-light text-stone group-hover:text-ink transition-colors">
                      send me new arrivals and exclusive offers
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <p className="text-xs font-light uppercase tracking-[0.15em] text-stone mb-1">
                  02 — delivery
                </p>
                <h2
                  className="text-2xl font-light text-ink mb-8 tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  where should we send it?
                </h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                    <Field label="first name" />
                    <Field label="last name" />
                  </div>
                  <Field label="street address" />
                  <Field label="apartment, suite, etc. (optional)" />
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                    <Field label="city" />
                    <Field label="pin code" />
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between py-4 border-y border-line">
                  <div>
                    <p className="text-sm font-light text-ink">standard shipping</p>
                    <p className="text-xs font-light text-stone mt-0.5">5–7 business days</p>
                  </div>
                  <span className="text-xs font-light text-bark">free</span>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="btn-primary w-full justify-center py-4 gap-2"
              >
                continue to payment
                <ArrowRight className="w-4 h-4" strokeWidth={1} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-14">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-xs font-light text-stone hover:text-ink transition-colors -mb-4"
              >
                <ChevronLeft className="w-3 h-3" strokeWidth={1} />
                edit delivery
              </button>

              <div>
                <p className="text-xs font-light uppercase tracking-[0.15em] text-stone mb-1">
                  03 — payment
                </p>
                <h2
                  className="text-2xl font-light text-ink mb-8 tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  almost there.
                </h2>

                <div className="flex gap-3 mb-8">
                  {["card", "upi", "net banking"].map((tab, i) => (
                    <button
                      key={tab}
                      className={`px-5 py-2.5 text-xs font-light border transition-all ${
                        i === 0
                          ? "border-ink bg-ink text-paper"
                          : "border-line text-stone hover:border-ink hover:text-ink"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-8">
                  <div className="relative">
                    <Field label="card number" />
                    <Lock className="absolute right-0 bottom-2.5 w-4 h-4 text-stone" strokeWidth={1} />
                  </div>
                  <div className="grid grid-cols-2 gap-x-8">
                    <Field label="expiry (mm / yy)" />
                    <Field label="cvv" />
                  </div>
                  <Field label="name on card" />
                </div>
              </div>

              <div className="space-y-4">
                <button className="btn-primary w-full justify-center py-4 gap-2">
                  <Lock className="w-3 h-3" strokeWidth={1} />
                  pay {formatPrice(subtotal)}
                </button>
                <p className="text-center text-[11px] font-light text-stone">
                  by placing your order you agree to our{" "}
                  <Link href="/terms" className="underline underline-offset-2 hover:text-ink transition-colors">terms</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-ink transition-colors">privacy policy</Link>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order summary */}
        <aside className="lg:sticky lg:top-[76px]">
          <div className="bg-cream border border-line overflow-hidden">
            <div className="px-6 py-5 border-b border-line flex justify-between items-center">
              <h3
                className="text-base font-light text-ink"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                order summary
              </h3>
              <span className="text-[10px] font-light text-stone">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[320px] overflow-y-auto">
              {items.length === 0 && (
                <p className="text-xs font-light text-stone text-center py-6">no items yet.</p>
              )}
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                  <div className="relative w-[50px] h-[66px] flex-shrink-0 bg-paper overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-light text-ink truncate lowercase">{item.name}</p>
                    <p className="text-[10px] font-light text-stone mt-0.5">
                      {item.size} / qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-xs font-light text-ink flex-shrink-0">
                    {`₹${item.price}`}
                  </p>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t border-line space-y-3">
              <div className="flex justify-between text-xs font-light">
                <span className="text-stone">subtotal</span>
                <span className="text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs font-light">
                <span className="text-stone">shipping</span>
                <span className="text-bark">free</span>
              </div>
              <div className="pt-4 border-t border-line flex justify-between items-baseline">
                <span className="text-sm font-light text-ink">total</span>
                <span className="text-base font-light text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
