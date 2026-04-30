"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Lock, ArrowRight, Check } from "lucide-react";
import { VCMark } from "@/components/Logo";

const mono = "'Courier New', Courier, monospace";
const sf = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

function VintageInput({
  placeholder,
  type = "text",
  className = "",
  value,
  onChange,
}: {
  placeholder: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full bg-[#EAE8E3] border-[3px] border-black px-5 py-4 text-[14px] placeholder-gray-500 outline-none focus:bg-[#FFF44F] focus:placeholder-gray-600 transition-colors ${className}`}
      style={{ fontFamily: sf }}
      value={value}
      onChange={onChange}
    />
  );
}

function SectionCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative border-[4px] border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
      {/* Yellow left accent bar */}
      <div className="absolute top-0 left-0 w-[5px] h-full bg-[#FFF44F]" />
      <div className="bg-[#EAE8E3] border-b-[4px] border-black pl-8 pr-7 py-4 flex items-center gap-4">
        <span
          className="w-7 h-7 bg-black text-[#FFF44F] flex items-center justify-center text-[11px] font-bold flex-shrink-0"
          style={{ fontFamily: mono }}
        >
          {number}
        </span>
        <h2 className="text-[18px] font-semibold text-black" style={{ fontFamily: sf }}>
          {title}
        </h2>
      </div>
      <div className="pl-8 pr-7 py-7">{children}</div>
    </div>
  );
}

/* ── Ruled divider ── */
function RuledDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-1">
      <div className="flex-1 h-[2px] bg-black" />
      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-600" style={{ fontFamily: mono }}>
        {label}
      </span>
      <div className="flex-1 h-[2px] bg-black" />
    </div>
  );
}

export default function CheckoutPage() {
  const { items, cartCount } = useCart();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  const subtotal = items.reduce(
    (acc, item) => acc + parseInt(item.price.replace(/,/g, "")) * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="min-h-screen bg-[#FAF8F5]" style={{ fontFamily: mono }}>

      {/* Yellow top accent bar */}
      <div className="h-[5px] w-full bg-[#FFF44F]" />

      {/* Top bar */}
      <header className="border-b-[4px] border-black bg-[#EAE8E3] sticky top-0 z-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[66px] flex items-center justify-between">
          {/* Back */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black hover:text-gray-600 transition-colors"
            style={{ fontFamily: mono }}
          >
            <ChevronLeft className="w-4 h-4 stroke-[3px]" />
            <span className="hidden sm:inline">Back to Shop</span>
          </Link>

          {/* Brand logo — same as homepage */}
          <Link href="/" className="flex flex-col items-center">
            <VCMark size={38} color="#000" />
          </Link>

          {/* Step indicators */}
          <div className="flex items-center gap-2">
            {(["Info", "Payment"] as const).map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 border-[2px] border-black text-[10px] font-bold uppercase tracking-widest transition-all ${
                    i + 1 === step
                      ? "bg-[#FFF44F] text-black shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                      : i + 1 < step
                      ? "bg-black text-[#FFF44F]"
                      : "bg-white text-gray-400"
                  }`}
                  style={{ fontFamily: mono }}
                >
                  {i + 1 < step ? <Check className="w-3 h-3 stroke-[3px]" /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 1 && <div className={`w-5 h-[3px] ${i + 1 < step ? "bg-black" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-7">

          {step === 1 && (
            <>
              {/* Contact */}
              <SectionCard number="01" title="Contact Information">
                <div className="flex flex-col gap-5">
                  <VintageInput
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-1 flex-shrink-0">
                      <input
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 border-[3px] border-black bg-[#EAE8E3] checked:bg-[#FFF44F] cursor-pointer transition-colors"
                      />
                      <Check className="absolute inset-0 m-auto w-3 h-3 stroke-[3.5px] text-black opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 leading-relaxed" style={{ fontFamily: mono }}>
                      Keep me updated on new arrivals and exclusive offers
                    </span>
                  </label>
                </div>
              </SectionCard>

              {/* Delivery */}
              <SectionCard number="02" title="Delivery Address">
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <VintageInput placeholder="First name" />
                    <VintageInput placeholder="Last name" />
                  </div>
                  <VintageInput placeholder="Street address" />
                  <VintageInput placeholder="Apartment / Suite (optional)" />
                  <div className="grid grid-cols-2 gap-4">
                    <VintageInput placeholder="City" />
                    <VintageInput placeholder="PIN Code" />
                  </div>

                  <RuledDivider label="Shipping Method" />

                  {/* Shipping option — stacked neo box */}
                  <div className="relative">
                    <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-black" />
                    <div className="relative border-[3px] border-black bg-[#FDFBF7] px-5 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 border-[3px] border-black bg-[#FFF44F]" />
                        <div>
                          <p className="text-[13px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: mono }}>
                            Standard Shipping
                          </p>
                          <p className="text-[10px] text-gray-500 mt-0.5" style={{ fontFamily: mono }}>
                            5 – 7 business days
                          </p>
                        </div>
                      </div>
                      <span className="text-[12px] font-bold text-black bg-[#FFF44F] border-[2px] border-black px-3 py-1.5" style={{ fontFamily: mono }}>
                        FREE
                      </span>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* CTA */}
              <div className="relative">
                <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-black" />
                <button
                  onClick={() => setStep(2)}
                  className="relative w-full bg-[#FFF44F] border-[4px] border-black py-5 text-[16px] font-semibold text-black hover:bg-[#FFD700] active:translate-x-[6px] active:translate-y-[6px] transition-transform flex items-center justify-center gap-4"
                  style={{ fontFamily: sf }}
                >
                  Continue to Payment
                  <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Back */}
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black hover:text-gray-500 transition-colors self-start border-b-2 border-black hover:border-gray-400"
                style={{ fontFamily: mono }}
              >
                <ChevronLeft className="w-4 h-4 stroke-[3px]" />
                Back to Delivery
              </button>

              {/* Payment */}
              <SectionCard number="03" title="Payment Details">
                <div className="flex flex-col gap-5">
                  {/* Payment method tabs */}
                  <div className="flex gap-0 border-[3px] border-black overflow-hidden">
                    {["Credit Card", "UPI", "Net Banking"].map((tab, i) => (
                      <button
                        key={tab}
                        className={`flex-1 px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-colors border-r-[3px] border-black last:border-r-0 ${
                          i === 0
                            ? "bg-[#FFF44F] text-black"
                            : "bg-white text-gray-500 hover:bg-[#EAE8E3]"
                        }`}
                        style={{ fontFamily: mono }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <VintageInput placeholder="Card number" />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 stroke-[2px]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <VintageInput placeholder="MM / YY" />
                    <VintageInput placeholder="CVV" />
                  </div>
                  <VintageInput placeholder="Name on card" />
                </div>
              </SectionCard>

              {/* Billing same as shipping */}
              <div className="border-[3px] border-black bg-white px-7 py-4 flex items-center gap-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    defaultChecked
                    id="sameAddr"
                    className="peer appearance-none w-5 h-5 border-[3px] border-black bg-[#EAE8E3] checked:bg-[#FFF44F] cursor-pointer"
                  />
                  <Check className="absolute inset-0 m-auto w-3 h-3 stroke-[3.5px] text-black opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <label htmlFor="sameAddr" className="text-[11px] font-bold uppercase tracking-widest text-black cursor-pointer" style={{ fontFamily: mono }}>
                  Billing address same as delivery
                </label>
              </div>

              {/* Pay CTA */}
              <div className="relative">
                <div className="absolute inset-0 translate-x-[6px] translate-y-[6px] bg-[#C9A96E]" />
                <button
                  className="relative w-full bg-black text-[#FFF44F] border-[4px] border-black py-5 text-[17px] font-semibold hover:bg-[#111] active:translate-x-[6px] active:translate-y-[6px] transition-transform flex items-center justify-center gap-4"
                  style={{ fontFamily: sf }}
                >
                  <Lock className="w-5 h-5 stroke-[2px]" />
                  Pay RS. {total.toLocaleString()}.00
                </button>
              </div>

              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-500 border-[2px] border-black bg-[#EAE8E3] p-4" style={{ fontFamily: mono }}>
                By completing your purchase you agree to our{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-black transition-colors">Terms</Link>
                {" "}and{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-black transition-colors">Privacy Policy</Link>.
              </p>
            </>
          )}
        </div>

        {/* RIGHT: Order Summary */}
        <aside className="lg:sticky lg:top-[76px] space-y-5">

          {/* Main summary card */}
          <div className="border-[4px] border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            {/* Top yellow bar */}
            <div className="h-[5px] bg-[#FFF44F]" />

            {/* Header */}
            <div className="bg-[#EAE8E3] border-b-[4px] border-black px-7 py-4 flex justify-between items-center">
              <h2 className="text-[18px] font-semibold text-black" style={{ fontFamily: sf }}>
                Order Summary
              </h2>
              <span className="text-[10px] font-bold text-black border-[2px] border-black px-2 py-1 bg-[#FFF44F] shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ fontFamily: mono }}>
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Product list */}
            <div className="divide-y-[3px] divide-black max-h-[340px] overflow-y-auto">
              {items.length === 0 && (
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 text-center py-10" style={{ fontFamily: mono }}>
                  No items yet.
                </p>
              )}
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-5 px-7 py-5 items-center">
                  {/* Image with offset frame */}
                  <div className="relative w-[60px] h-[76px] flex-shrink-0">
                    <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] bg-black" />
                    <div className="relative w-full h-full border-[2px] border-black bg-[#EAE8E3] overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-contain filter sepia-[0.15]" />
                    </div>
                    {/* Qty badge */}
                    <div
                      className="absolute -top-2 -right-2 w-5 h-5 bg-[#FFF44F] border-[2px] border-black text-black text-[9px] font-bold flex items-center justify-center z-10"
                      style={{ fontFamily: mono }}
                    >
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-black leading-snug" style={{ fontFamily: sf }}>
                      {item.name}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1" style={{ fontFamily: mono }}>
                      Size: {item.size}
                    </p>
                  </div>
                  <p className="text-[13px] font-bold text-black flex-shrink-0" style={{ fontFamily: mono }}>
                    RS. {item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div className="border-t-[4px] border-black px-7 py-5 bg-[#FDFBF7]">
              <RuledDivider label="Promo Code" />
              <div className="flex gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 bg-[#EAE8E3] border-[3px] border-black px-4 py-3 text-[12px] font-bold placeholder-gray-500 outline-none focus:bg-[#FFF44F] transition-colors"
                  style={{ fontFamily: mono }}
                />
                <button
                  className="px-5 py-3 bg-black text-[#FFF44F] border-[3px] border-black text-[11px] font-bold uppercase tracking-widest shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-[#222] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
                  style={{ fontFamily: mono }}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="border-t-[4px] border-black px-7 py-6 bg-[#EAE8E3] space-y-3">
              {[
                { label: "Subtotal", value: `RS. ${subtotal.toLocaleString()}.00` },
                { label: "Shipping", value: "FREE" },
                { label: "Tax", value: "Next step" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-600" style={{ fontFamily: mono }}>
                    {label}
                  </span>
                  <span className="text-[11px] font-bold text-black" style={{ fontFamily: mono }}>
                    {value}
                  </span>
                </div>
              ))}

              {/* Total row — inverted box */}
              <div className="mt-2 pt-2 border-t-[3px] border-black">
                <div className="bg-black text-white px-5 py-4 flex justify-between items-baseline shadow-[4px_4px_0px_rgba(201,169,110,1)]">
                  <span className="text-[12px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: mono }}>
                    Total
                  </span>
                  <div className="text-right">
                    <p className="text-[9px] text-white/50 uppercase tracking-widest mb-1" style={{ fontFamily: mono }}>
                      INR · Indian Rupee
                    </p>
                    <span className="text-[22px] font-bold text-[#FFF44F]" style={{ fontFamily: mono }}>
                      RS. {total.toLocaleString()}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust row — no emoji, SVG icons */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "SSL Secure",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
              },
              {
                label: "30-Day Returns",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.49" />
                  </svg>
                ),
              },
              {
                label: "Premium Quality",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
              },
            ].map((b) => (
              <div
                key={b.label}
                className="border-[3px] border-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-2 py-4 px-2 text-center"
              >
                <span className="text-black">{b.icon}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: mono }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          {/* Ruled stamp */}
          <RuledDivider label="Est. MMXXIV · Valenciré" />
        </aside>
      </div>
    </div>
  );
}
