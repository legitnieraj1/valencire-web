"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Lock, ArrowRight, Check } from "lucide-react";

const mono = "'Courier New', Courier, monospace";

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
      className={`w-full bg-[#EAE8E3] border-[3px] border-black px-5 py-4 text-[13px] font-bold placeholder-gray-500 outline-none focus:bg-[#FFF44F] focus:placeholder-gray-600 transition-colors ${className}`}
      style={{ fontFamily: mono }}
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
    <div className="border-[4px] border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)]">
      <div className="bg-[#EAE8E3] border-b-[4px] border-black px-7 py-4 flex items-center gap-4">
        <span
          className="w-8 h-8 bg-black text-[#FFF44F] flex items-center justify-center text-[13px] font-bold flex-shrink-0"
          style={{ fontFamily: mono }}
        >
          {number}
        </span>
        <h2 className="text-[13px] font-bold uppercase tracking-[0.25em] text-black" style={{ fontFamily: mono }}>
          {title}
        </h2>
      </div>
      <div className="px-7 py-7">{children}</div>
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

      {/* ── Top bar ── */}
      <header className="border-b-[4px] border-black bg-[#EAE8E3] sticky top-0 z-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[60px] flex items-center justify-between">
          {/* Back */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-black hover:text-[#C9A96E] transition-colors"
            style={{ fontFamily: mono }}
          >
            <ChevronLeft className="w-4 h-4 stroke-[3px]" />
            <span className="hidden sm:inline">Back to Shop</span>
          </Link>

          {/* Brand */}
          <span className="text-[16px] font-bold uppercase tracking-[0.4em] text-black" style={{ fontFamily: mono }}>
            VALENCIRÉ
          </span>

          {/* Step pills */}
          <div className="flex items-center gap-2">
            {(["Info", "Payment"] as const).map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-1 border-[2px] border-black text-[10px] font-bold uppercase tracking-widest transition-all ${
                    i + 1 === step
                      ? "bg-[#FFF44F] text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                      : i + 1 < step
                      ? "bg-black text-[#FFF44F]"
                      : "bg-white text-gray-400"
                  }`}
                  style={{ fontFamily: mono }}
                >
                  {i + 1 < step ? <Check className="w-3 h-3 stroke-[3px]" /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 1 && <div className={`w-4 h-[2px] ${i + 1 < step ? "bg-black" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-7">

          {step === 1 && (
            <>
              {/* Contact */}
              <SectionCard number="01" title="Contact Information">
                <div className="flex flex-col gap-4">
                  <VintageInput
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 border-[3px] border-black bg-[#EAE8E3] checked:bg-[#FFF44F] cursor-pointer transition-colors"
                      />
                      <span className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 peer-checked:opacity-100 text-black font-bold text-sm leading-none">
                        ✕
                      </span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-600 leading-relaxed" style={{ fontFamily: mono }}>
                      Keep me updated on new arrivals and exclusive offers
                    </span>
                  </label>
                </div>
              </SectionCard>

              {/* Delivery */}
              <SectionCard number="02" title="Delivery Address">
                <div className="grid grid-cols-2 gap-4">
                  <VintageInput placeholder="First name" />
                  <VintageInput placeholder="Last name" />
                  <VintageInput placeholder="Street address" className="col-span-2" />
                  <VintageInput placeholder="Apartment / Suite (optional)" className="col-span-2" />
                  <VintageInput placeholder="City" />
                  <VintageInput placeholder="PIN Code" />
                </div>

                {/* Shipping option */}
                <div className="mt-6 border-[3px] border-black bg-[#FDFBF7] px-5 py-4 flex items-center justify-between shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-[3px] border-black bg-[#FFF44F]" />
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: mono }}>
                        Standard Shipping
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5" style={{ fontFamily: mono }}>
                        5–7 business days
                      </p>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-black bg-[#FFF44F] border-[2px] border-black px-3 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ fontFamily: mono }}>
                    FREE
                  </span>
                </div>
              </SectionCard>

              {/* CTA */}
              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#FFF44F] border-[4px] border-black py-5 text-[14px] font-bold uppercase tracking-[0.25em] text-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:bg-[#FFD700] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all flex items-center justify-center gap-4"
                style={{ fontFamily: mono }}
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5 stroke-[3px]" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Back */}
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-black hover:text-gray-500 transition-colors self-start"
                style={{ fontFamily: mono }}
              >
                <ChevronLeft className="w-4 h-4 stroke-[3px]" />
                Back to Delivery
              </button>

              {/* Payment */}
              <SectionCard number="03" title="Payment Details">
                <div className="flex flex-col gap-4">
                  {/* Card type tabs */}
                  <div className="flex gap-3 mb-2">
                    {["Credit Card", "UPI", "Net Banking"].map((tab, i) => (
                      <button
                        key={tab}
                        className={`px-4 py-2 border-[3px] border-black text-[10px] font-bold uppercase tracking-widest transition-all ${
                          i === 0
                            ? "bg-[#FFF44F] shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                            : "bg-white hover:bg-[#EAE8E3]"
                        }`}
                        style={{ fontFamily: mono }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <VintageInput placeholder="Card number" />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 stroke-[2.5px]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <VintageInput placeholder="MM / YY" />
                    <VintageInput placeholder="CVV" />
                  </div>
                  <VintageInput placeholder="Name on card" />
                </div>
              </SectionCard>

              {/* Billing checkbox */}
              <div className="border-[4px] border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] px-7 py-5 flex items-center gap-4">
                <div className="relative">
                  <input
                    type="checkbox"
                    defaultChecked
                    id="sameAddr"
                    className="peer appearance-none w-5 h-5 border-[3px] border-black bg-[#EAE8E3] checked:bg-[#FFF44F] cursor-pointer"
                  />
                  <span className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 peer-checked:opacity-100 text-black font-bold text-sm">✕</span>
                </div>
                <label htmlFor="sameAddr" className="text-[11px] font-bold uppercase tracking-widest text-black cursor-pointer" style={{ fontFamily: mono }}>
                  Billing address same as delivery
                </label>
              </div>

              {/* Pay CTA */}
              <button
                className="w-full bg-black text-[#FFF44F] border-[4px] border-black py-5 text-[15px] font-bold uppercase tracking-[0.25em] shadow-[8px_8px_0px_rgba(200,170,110,0.5)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all flex items-center justify-center gap-4"
                style={{ fontFamily: mono }}
              >
                <Lock className="w-5 h-5 stroke-[3px]" />
                Pay RS. {total.toLocaleString()}.00
              </button>

              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-500 border-[2px] border-black bg-[#EAE8E3] p-4" style={{ fontFamily: mono }}>
                By completing your purchase you agree to our{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-red-600 transition-colors">Terms</Link>
                {" "}and{" "}
                <Link href="#" className="underline underline-offset-2 hover:text-red-600 transition-colors">Privacy Policy</Link>.
              </p>
            </>
          )}
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <aside className="lg:sticky lg:top-[76px] space-y-5">

          {/* Main card */}
          <div className="border-[4px] border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            {/* Vintage header strip */}
            <div className="bg-[#EAE8E3] border-b-[4px] border-black px-7 py-4 flex justify-between items-center">
              <h2 className="text-[14px] font-bold uppercase tracking-[0.25em] text-black" style={{ fontFamily: mono }}>
                Order Summary
              </h2>
              <span className="text-[11px] font-bold text-gray-600 border-[2px] border-black px-2 py-0.5 bg-white" style={{ fontFamily: mono }}>
                {cartCount} item{cartCount !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Product list */}
            <div className="divide-y-[3px] divide-black max-h-[380px] overflow-y-auto">
              {items.length === 0 && (
                <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 text-center py-10" style={{ fontFamily: mono }}>
                  No items yet.
                </p>
              )}
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-5 px-7 py-5 items-center">
                  <div className="relative w-[64px] h-[82px] flex-shrink-0 bg-[#EAE8E3] border-[3px] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-contain filter sepia-[0.15]" />
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFF44F] border-[2px] border-black text-black text-[10px] font-bold flex items-center justify-center"
                      style={{ fontFamily: mono }}
                    >
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black leading-snug" style={{ fontFamily: mono }}>
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
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Promo code"
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
                { label: "Tax", value: "At next step" },
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

              {/* Total row */}
              <div className="flex justify-between items-baseline pt-4 border-t-[3px] border-black mt-2">
                <span className="text-[14px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: mono }}>
                  Total
                </span>
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1" style={{ fontFamily: mono }}>
                    INR · Indian Rupee
                  </p>
                  <span className="text-[22px] font-bold text-black" style={{ fontFamily: mono }}>
                    RS. {total.toLocaleString()}.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🔒", label: "SSL Secure" },
              { icon: "↩", label: "30-Day Returns" },
              { icon: "✦", label: "Premium" },
            ].map((b) => (
              <div
                key={b.label}
                className="border-[3px] border-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-2 py-4 px-2 text-center"
              >
                <span className="text-xl">{b.icon}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: mono }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          {/* Stamp */}
          <div className="flex items-center justify-center gap-3 opacity-60">
            <div className="flex-1 h-px bg-[#C9A96E]" />
            <span className="text-[8px] tracking-[0.5em] uppercase text-[#9A8F7E]" style={{ fontFamily: mono }}>
              Est. MMXXIV
            </span>
            <div className="flex-1 h-px bg-[#C9A96E]" />
          </div>
        </aside>
      </div>
    </div>
  );
}
