"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Lock, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, cartCount } = useCart();
  const [email, setEmail] = useState("");

  const subtotal = items.reduce((acc, item) => acc + parseInt(item.price.replace(/,/g, "")) * item.quantity, 0);
  const shipping = 0; // Free shipping as per PDP
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-ui pt-10 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Header / Brand */}
        <div className="grid grid-cols-3 items-center mb-12 border-b-4 border-black pb-8">
          <div className="justify-self-start">
            <Link href="/" className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-bold text-black hover:text-gray-600 transition-colors" style={{ fontFamily: "Courier New, monospace" }}>
              <ChevronLeft className="w-5 h-5 stroke-[3px]" />
              <span className="hidden sm:inline">Back to Shop</span>
            </Link>
          </div>
          <div className="justify-self-center text-center">
            <h1 className="text-2xl tracking-[0.4em] uppercase font-bold" style={{ fontFamily: "Courier New, monospace" }}>
              VALENCIRÉ
            </h1>
          </div>
          <div className="justify-self-end text-right">
            <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>
              <Lock className="w-5 h-5 stroke-[3px]" />
              <span className="hidden sm:inline">Secure Checkout</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Contact Information */}
            <section>
              <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold mb-8 flex items-center gap-4 text-black" style={{ fontFamily: "Courier New, monospace" }}>
                <span className="text-black bg-[#FFF44F] border-2 border-black px-2 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">01.</span> Contact Information
                <div className="h-1 flex-1 bg-black"></div>
              </h2>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-[#EAE8E3] border-2 border-black px-6 py-5 text-sm outline-none focus:bg-[#FFF44F] transition-all font-bold placeholder-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                  style={{ fontFamily: "Courier New, monospace" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex items-center gap-3 pl-2 mt-4">
                  <input type="checkbox" id="newsletter" className="w-5 h-5 rounded-none border-2 border-black accent-black cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
                  <label htmlFor="newsletter" className="text-[11px] uppercase tracking-widest text-black font-bold cursor-pointer select-none" style={{ fontFamily: "Courier New, monospace" }}>Keep me updated on new arrivals and exclusive offers</label>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold mb-8 flex items-center gap-4 text-black mt-16" style={{ fontFamily: "Courier New, monospace" }}>
                <span className="text-black bg-[#FFF44F] border-2 border-black px-2 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">02.</span> Shipping Address
                <div className="h-1 flex-1 bg-black"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="bg-[#EAE8E3] border-2 border-black px-6 py-5 text-sm outline-none focus:bg-[#FFF44F] transition-all font-bold placeholder-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }} />
                <input type="text" placeholder="Last Name" className="bg-[#EAE8E3] border-2 border-black px-6 py-5 text-sm outline-none focus:bg-[#FFF44F] transition-all font-bold placeholder-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }} />
                <input type="text" placeholder="Address" className="md:col-span-2 bg-[#EAE8E3] border-2 border-black px-6 py-5 text-sm outline-none focus:bg-[#FFF44F] transition-all font-bold placeholder-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }} />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="md:col-span-2 bg-[#EAE8E3] border-2 border-black px-6 py-5 text-sm outline-none focus:bg-[#FFF44F] transition-all font-bold placeholder-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }} />
                <input type="text" placeholder="City" className="bg-[#EAE8E3] border-2 border-black px-6 py-5 text-sm outline-none focus:bg-[#FFF44F] transition-all font-bold placeholder-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }} />
                <input type="text" placeholder="Postal Code" className="bg-[#EAE8E3] border-2 border-black px-6 py-5 text-sm outline-none focus:bg-[#FFF44F] transition-all font-bold placeholder-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }} />
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold mb-8 flex items-center gap-4 text-black mt-16" style={{ fontFamily: "Courier New, monospace" }}>
                <span className="text-black bg-[#FFF44F] border-2 border-black px-2 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">03.</span> Payment Method
                <div className="h-1 flex-1 bg-black"></div>
              </h2>
              <div className="border-4 border-black bg-[#FAF8F5] shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                <div className="bg-[#FFF44F] p-6 flex justify-between items-center border-b-4 border-black">
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full border-[6px] border-black bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]"></div>
                    <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-black" style={{ fontFamily: "Courier New, monospace" }}>Credit Card</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-black border-2 border-black"></div>
                    <div className="w-8 h-5 bg-gray-600 border-2 border-black"></div>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="relative">
                    <input type="text" placeholder="Card Number" className="w-full bg-[#EAE8E3] border-2 border-black px-6 py-5 text-sm outline-none focus:bg-white transition-all font-bold placeholder-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }} />
                    <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black stroke-[3px]" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <input type="text" placeholder="Exp (MM/YY)" className="bg-[#EAE8E3] border-2 border-black px-6 py-5 text-sm outline-none focus:bg-white transition-all font-bold placeholder-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }} />
                    <input type="text" placeholder="CVV" className="bg-[#EAE8E3] border-2 border-black px-6 py-5 text-sm outline-none focus:bg-white transition-all font-bold placeholder-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }} />
                  </div>
                </div>
              </div>
            </section>

            <button className="group w-full bg-[#FFF44F] border-4 border-black text-black py-6 text-[15px] font-bold uppercase tracking-[0.2em] transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none hover:bg-[#FFD700] flex items-center justify-center gap-4 mt-8" style={{ fontFamily: "Courier New, monospace" }}>
              Complete Purchase
              <ArrowRight className="w-6 h-6 stroke-[3px]" />
            </button>

            <p className="text-[11px] text-gray-800 font-bold text-center uppercase tracking-widest mt-6" style={{ fontFamily: "Courier New, monospace" }}>
              By clicking complete purchase, you agree to our <Link href="#" className="underline underline-offset-4 hover:text-black">Terms</Link> & <Link href="#" className="underline underline-offset-4 hover:text-black">Privacy</Link>.
            </p>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 bg-[#FAF8F5] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] p-8 md:p-10">
              <h2 className="text-[16px] uppercase tracking-[0.2em] font-bold mb-10 text-black border-b-4 border-black pb-4" style={{ fontFamily: "Courier New, monospace" }}>Order Summary ({cartCount})</h2>
              
              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6 items-center border-b-2 border-black pb-6 last:border-0">
                    <div className="relative w-24 h-32 flex-shrink-0 bg-[#EAE8E3] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] overflow-visible">
                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FFF44F] border-2 border-black text-black text-[12px] flex items-center justify-center font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] z-10" style={{ fontFamily: "Courier New, monospace" }}>
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-black mb-2 leading-tight" style={{ fontFamily: "Courier New, monospace" }}>{item.name}</h3>
                      <p className="text-[12px] uppercase tracking-widest text-black font-bold mb-2" style={{ fontFamily: "Courier New, monospace" }}>Size: {item.size}</p>
                      <p className="text-[14px] font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>RS. {item.price}.00</p>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="py-10 text-center">
                    <p className="text-[14px] text-black uppercase tracking-widest font-bold" style={{ fontFamily: "Courier New, monospace" }}>Your bag is empty.</p>
                  </div>
                )}
              </div>

              <div className="space-y-5 border-t-4 border-black pt-8">
                <div className="flex justify-between text-[13px] uppercase tracking-widest font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>
                  <span>Subtotal</span>
                  <span>RS. {subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-[13px] uppercase tracking-widest font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-[13px] uppercase tracking-widest font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>
                  <span>Tax</span>
                  <span>Calculated later</span>
                </div>
                <div className="flex justify-between text-[18px] font-bold text-black border-t-4 border-black pt-6 mt-6" style={{ fontFamily: "Courier New, monospace" }}>
                  <span className="uppercase tracking-[0.2em]">Total</span>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-black block mb-1 font-bold">INR</span>
                    RS. {total.toLocaleString()}.00
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-12 bg-[#FFF44F] border-4 border-black p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="flex gap-5 items-center">
                  <div className="w-12 h-12 bg-black border-2 border-white flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white stroke-[3px]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: "Courier New, monospace" }}>Secure Checkout</p>
                    <p className="text-[10px] font-bold text-black mt-1 uppercase tracking-widest" style={{ fontFamily: "Courier New, monospace" }}>Encrypted SSL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
