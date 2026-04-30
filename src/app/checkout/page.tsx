"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Lock, ArrowRight, Check, ShieldCheck, RotateCcw, Truck } from "lucide-react";
import { VCMark } from "@/components/Logo";

const mono = "'Courier New', Courier, monospace";
const sf = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

/* ── Floating label input ── */
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
  const [focused, setFocused] = useState(false);
  const filled = (value ?? "").length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        className="peer w-full bg-transparent border-b-2 border-[#D0CBC2] pt-6 pb-2 px-0 text-[15px] text-[#1A1A1A] outline-none focus:border-black transition-colors duration-200 placeholder-transparent"
        style={{ fontFamily: sf }}
        placeholder={label}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label
        className={`absolute left-0 transition-all duration-200 pointer-events-none ${
          focused || filled
            ? "top-0 text-[10px] tracking-[0.3em] uppercase font-bold text-[#9A8F7E]"
            : "top-5 text-[14px] text-[#9A8F7E]"
        }`}
        style={{ fontFamily: focused || filled ? mono : sf }}
      >
        {label}
      </label>
      {/* Active underline */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-300 ${
          focused ? "w-full" : "w-0"
        }`}
      />
    </div>
  );
}

/* ── Step pill ── */
function StepPill({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
          done
            ? "bg-black border-black text-white"
            : active
            ? "bg-[#FFF44F] border-black text-black"
            : "bg-white border-[#D0CBC2] text-[#9A8F7E]"
        }`}
        style={{ fontFamily: mono }}
      >
        {done ? <Check className="w-3.5 h-3.5 stroke-[3px]" /> : n}
      </div>
      <span
        className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-colors hidden sm:block ${
          active || done ? "text-black" : "text-[#9A8F7E]"
        }`}
        style={{ fontFamily: mono }}
      >
        {label}
      </span>
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

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: sf }}>

      {/* ── Minimal top bar ── */}
      <header className="border-b border-[#E8E4DC] bg-white sticky top-0 z-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between">
          {/* Back */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[12px] text-[#6B6560] hover:text-black transition-colors group"
            style={{ fontFamily: sf }}
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back</span>
          </Link>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <VCMark size={36} color="#000" />
          </Link>

          {/* Steps */}
          <div className="flex items-center gap-4">
            <StepPill n={1} label="Delivery" active={step === 1} done={step > 1} />
            <div className={`w-8 h-px transition-colors duration-500 ${step > 1 ? "bg-black" : "bg-[#D0CBC2]"}`} />
            <StepPill n={2} label="Payment" active={step === 2} done={false} />
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

        {/* ── Left: Form ── */}
        <div>

          {step === 1 && (
            <div className="space-y-14">

              {/* Contact */}
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#9A8F7E] mb-1" style={{ fontFamily: mono }}>
                  01 — Contact
                </p>
                <h2 className="text-[28px] font-semibold text-black mb-8 tracking-tight">
                  How should we reach you?
                </h2>
                <div className="space-y-8">
                  <Field type="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 border-2 border-[#D0CBC2] bg-white checked:bg-black checked:border-black cursor-pointer transition-all rounded-sm"
                      />
                      <Check className="absolute inset-0 m-auto w-3 h-3 stroke-[3px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                    <span className="text-[13px] text-[#6B6560] group-hover:text-black transition-colors">
                      Send me new arrivals and exclusive offers
                    </span>
                  </label>
                </div>
              </div>

              {/* Delivery */}
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#9A8F7E] mb-1" style={{ fontFamily: mono }}>
                  02 — Delivery
                </p>
                <h2 className="text-[28px] font-semibold text-black mb-8 tracking-tight">
                  Where should we send it?
                </h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                    <Field label="First name" />
                    <Field label="Last name" />
                  </div>
                  <Field label="Street address" />
                  <Field label="Apartment, suite, etc. (optional)" />
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                    <Field label="City" />
                    <Field label="PIN Code" />
                  </div>
                </div>

                {/* Shipping option */}
                <div className="mt-10 flex items-center justify-between py-4 border-t border-b border-[#E8E4DC]">
                  <div className="flex items-center gap-4">
                    <Truck className="w-5 h-5 text-[#6B6560]" strokeWidth={1.5} />
                    <div>
                      <p className="text-[14px] font-semibold text-black">Standard Shipping</p>
                      <p className="text-[12px] text-[#6B6560] mt-0.5">5 – 7 business days</p>
                    </div>
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#3A9B5C] border border-[#C3E6CB] bg-[#F0FBF4] px-3 py-1 rounded-full" style={{ fontFamily: mono }}>
                    Free
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setStep(2)}
                className="group w-full bg-black text-white py-5 text-[15px] font-semibold flex items-center justify-center gap-3 hover:bg-[#1A1A1A] transition-all duration-200 rounded-xl shadow-lg shadow-black/10 active:scale-[0.99]"
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-[12px] text-[#9A8F7E]">
                Secure checkout powered by 256-bit SSL encryption
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-14">

              {/* Back */}
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-[12px] text-[#6B6560] hover:text-black transition-colors group -mb-4"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Edit delivery
              </button>

              {/* Payment */}
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#9A8F7E] mb-1" style={{ fontFamily: mono }}>
                  03 — Payment
                </p>
                <h2 className="text-[28px] font-semibold text-black mb-8 tracking-tight">
                  Almost there.
                </h2>

                {/* Method tabs */}
                <div className="flex gap-3 mb-8">
                  {["Card", "UPI", "Net Banking"].map((tab, i) => (
                    <button
                      key={tab}
                      className={`px-5 py-2.5 text-[12px] font-semibold border rounded-xl transition-all ${
                        i === 0
                          ? "bg-black text-white border-black"
                          : "bg-white text-[#6B6560] border-[#E8E4DC] hover:border-black hover:text-black"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-8">
                  <div className="relative">
                    <Field label="Card number" />
                    <Lock className="absolute right-0 bottom-2.5 w-4 h-4 text-[#9A8F7E]" strokeWidth={1.5} />
                  </div>
                  <div className="grid grid-cols-2 gap-x-8">
                    <Field label="Expiry (MM / YY)" />
                    <Field label="CVV" />
                  </div>
                  <Field label="Name on card" />
                </div>
              </div>

              {/* Billing */}
              <div className="py-4 border-t border-b border-[#E8E4DC] flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    id="sameBilling"
                    defaultChecked
                    className="peer appearance-none w-5 h-5 border-2 border-[#D0CBC2] bg-white checked:bg-black checked:border-black cursor-pointer transition-all rounded-sm"
                  />
                  <Check className="absolute inset-0 m-auto w-3 h-3 stroke-[3px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                </div>
                <label htmlFor="sameBilling" className="text-[13px] text-[#6B6560] cursor-pointer hover:text-black transition-colors">
                  Billing address same as delivery address
                </label>
              </div>

              {/* Pay CTA */}
              <div className="space-y-4">
                <button className="group w-full bg-black text-white py-5 text-[16px] font-semibold flex items-center justify-center gap-3 hover:bg-[#1A1A1A] transition-all duration-200 rounded-xl shadow-lg shadow-black/10 active:scale-[0.99]">
                  <Lock className="w-4 h-4" strokeWidth={2} />
                  Pay RS. {subtotal.toLocaleString()}.00
                </button>

                <p className="text-center text-[12px] text-[#9A8F7E]">
                  By placing your order you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2 hover:text-black transition-colors">Terms</Link>
                  {" "}and{" "}
                  <Link href="#" className="underline underline-offset-2 hover:text-black transition-colors">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Order summary ── */}
        <aside className="lg:sticky lg:top-[76px]">
          <div className="bg-[#FAFAF8] border border-[#E8E4DC] rounded-2xl overflow-hidden">

            {/* Header */}
            <div className="px-7 py-5 border-b border-[#E8E4DC] flex justify-between items-center">
              <h3 className="text-[15px] font-semibold text-black">Order Summary</h3>
              <span
                className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560] bg-[#EEEAE4] px-3 py-1 rounded-full"
                style={{ fontFamily: mono }}
              >
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Items */}
            <div className="px-7 py-5 space-y-5 max-h-[320px] overflow-y-auto">
              {items.length === 0 && (
                <p className="text-[13px] text-[#9A8F7E] text-center py-6">No items yet.</p>
              )}
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                  <div className="relative w-[56px] h-[72px] flex-shrink-0 bg-[#EEEAE4] rounded-lg overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-contain filter sepia-[0.1]" />
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white rounded-full text-[9px] flex items-center justify-center font-bold"
                      style={{ fontFamily: mono }}
                    >
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-black truncate">{item.name}</p>
                    <p className="text-[11px] text-[#9A8F7E] mt-0.5" style={{ fontFamily: mono }}>
                      Size: {item.size}
                    </p>
                  </div>
                  <p className="text-[13px] font-semibold text-black flex-shrink-0" style={{ fontFamily: mono }}>
                    RS. {item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Promo */}
            <div className="px-7 py-4 border-t border-[#E8E4DC]">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 bg-white border border-[#E8E4DC] rounded-xl px-4 py-3 text-[13px] text-[#1A1A1A] placeholder-[#9A8F7E] outline-none focus:border-black transition-colors"
                  style={{ fontFamily: sf }}
                />
                <button
                  className="px-4 py-3 bg-[#1A1A1A] text-white text-[12px] font-semibold rounded-xl hover:bg-[#333] transition-colors"
                  style={{ fontFamily: sf }}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="px-7 py-5 border-t border-[#E8E4DC] space-y-3">
              {[
                { label: "Subtotal", value: `RS. ${subtotal.toLocaleString()}.00` },
                { label: "Shipping", value: "Free", green: true },
                { label: "Tax", value: "Calculated next" },
              ].map(({ label, value, green }) => (
                <div key={label} className="flex justify-between text-[13px]">
                  <span className="text-[#6B6560]">{label}</span>
                  <span className={`font-medium ${green ? "text-[#3A9B5C]" : "text-black"}`}>{value}</span>
                </div>
              ))}

              {/* Total */}
              <div className="pt-4 border-t border-[#E8E4DC] flex justify-between items-baseline">
                <span className="text-[15px] font-semibold text-black">Total</span>
                <div className="text-right">
                  <span className="text-[22px] font-bold text-black" style={{ fontFamily: mono }}>
                    RS. {subtotal.toLocaleString()}.00
                  </span>
                  <p className="text-[10px] text-[#9A8F7E] mt-0.5" style={{ fontFamily: mono }}>INR</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, label: "SSL Secure" },
              { icon: RotateCcw, label: "30-Day Returns" },
              { icon: Truck, label: "Free Shipping" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 py-4 px-2 text-center border border-[#E8E4DC] rounded-xl bg-white">
                <Icon className="w-5 h-5 text-[#6B6560]" strokeWidth={1.5} />
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6560]" style={{ fontFamily: mono }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Stamp */}
          <div className="mt-5 flex items-center justify-center gap-3 opacity-50">
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
