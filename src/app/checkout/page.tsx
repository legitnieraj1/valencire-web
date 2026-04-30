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
    <div className="min-h-screen bg-[#FDFBF7] text-black pt-10 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Header / Brand */}
        <div className="grid grid-cols-3 items-center mb-16 border-b-[4px] border-black pb-8">
          <div className="justify-self-start">
            <Link href="/" className="flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-bold text-black hover:text-[#FFD700] transition-colors" style={{ fontFamily: "Courier New, monospace" }}>
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
            <div className="flex items-center gap-2 text-[12px] uppercase tracking-widest font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>
              <Lock className="w-4 h-4 stroke-[3px]" />
              <span className="hidden sm:inline">Secure Checkout</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Contact Information */}
            <section className="bg-white border-[4px] border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold mb-8 flex items-center gap-4 text-black border-b-[3px] border-black pb-4" style={{ fontFamily: "Courier New, monospace" }}>
                <span className="bg-black text-white px-2 py-1">01</span> Contact Information
              </h2>
              <div className="space-y-6">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-[#EAE8E3] border-[3px] border-black px-6 py-5 text-[14px] font-bold outline-none focus:bg-[#FFF44F] transition-colors placeholder-gray-500"
                  style={{ fontFamily: "Courier New, monospace" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex items-start gap-4 pt-2">
                  <div className="relative flex items-center justify-center pt-1">
                    <input type="checkbox" id="newsletter" className="peer appearance-none w-6 h-6 border-[3px] border-black bg-[#EAE8E3] checked:bg-[#FFF44F] cursor-pointer transition-colors" />
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 peer-checked:opacity-100 pb-1">
                       <span className="text-black font-bold text-[18px]">×</span>
                    </div>
                  </div>
                  <label htmlFor="newsletter" className="text-[12px] uppercase tracking-widest text-black font-bold cursor-pointer select-none leading-relaxed mt-1" style={{ fontFamily: "Courier New, monospace" }}>
                    Keep me updated on new arrivals and exclusive offers
                  </label>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="bg-white border-[4px] border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold mb-8 flex items-center gap-4 text-black border-b-[3px] border-black pb-4" style={{ fontFamily: "Courier New, monospace" }}>
                <span className="bg-black text-white px-2 py-1">02</span> Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="bg-[#EAE8E3] border-[3px] border-black px-6 py-5 text-[14px] font-bold outline-none focus:bg-[#FFF44F] transition-colors placeholder-gray-500" style={{ fontFamily: "Courier New, monospace" }} />
                <input type="text" placeholder="Last Name" className="bg-[#EAE8E3] border-[3px] border-black px-6 py-5 text-[14px] font-bold outline-none focus:bg-[#FFF44F] transition-colors placeholder-gray-500" style={{ fontFamily: "Courier New, monospace" }} />
                <input type="text" placeholder="Address" className="md:col-span-2 bg-[#EAE8E3] border-[3px] border-black px-6 py-5 text-[14px] font-bold outline-none focus:bg-[#FFF44F] transition-colors placeholder-gray-500" style={{ fontFamily: "Courier New, monospace" }} />
                <input type="text" placeholder="Apartment, suite, etc." className="md:col-span-2 bg-[#EAE8E3] border-[3px] border-black px-6 py-5 text-[14px] font-bold outline-none focus:bg-[#FFF44F] transition-colors placeholder-gray-500" style={{ fontFamily: "Courier New, monospace" }} />
                <input type="text" placeholder="City" className="bg-[#EAE8E3] border-[3px] border-black px-6 py-5 text-[14px] font-bold outline-none focus:bg-[#FFF44F] transition-colors placeholder-gray-500" style={{ fontFamily: "Courier New, monospace" }} />
                <input type="text" placeholder="Postal Code" className="bg-[#EAE8E3] border-[3px] border-black px-6 py-5 text-[14px] font-bold outline-none focus:bg-[#FFF44F] transition-colors placeholder-gray-500" style={{ fontFamily: "Courier New, monospace" }} />
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white border-[4px] border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              <h2 className="text-[14px] uppercase tracking-[0.2em] font-bold mb-8 flex items-center gap-4 text-black border-b-[3px] border-black pb-4" style={{ fontFamily: "Courier New, monospace" }}>
                <span className="bg-black text-white px-2 py-1">03</span> Payment Method
              </h2>
              <div className="border-[3px] border-black bg-[#FAF8F5]">
                <div className="bg-[#EAE8E3] p-6 flex justify-between items-center border-b-[3px] border-black">
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 border-[3px] border-black bg-[#FFF44F] flex items-center justify-center"><div className="w-2 h-2 bg-black"></div></div>
                    <span className="text-[14px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: "Courier New, monospace" }}>Credit Card</span>
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                  <div className="relative">
                    <input type="text" placeholder="Card Number" className="w-full bg-white border-[3px] border-black px-6 py-5 text-[14px] font-bold outline-none focus:bg-[#FFF44F] transition-colors placeholder-gray-400" style={{ fontFamily: "Courier New, monospace" }} />
                    <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black stroke-[3px]" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <input type="text" placeholder="MM/YY" className="bg-white border-[3px] border-black px-6 py-5 text-[14px] font-bold outline-none focus:bg-[#FFF44F] transition-colors placeholder-gray-400" style={{ fontFamily: "Courier New, monospace" }} />
                    <input type="text" placeholder="CVV" className="bg-white border-[3px] border-black px-6 py-5 text-[14px] font-bold outline-none focus:bg-[#FFF44F] transition-colors placeholder-gray-400" style={{ fontFamily: "Courier New, monospace" }} />
                  </div>
                </div>
              </div>
            </section>

            <button 
              className="w-full bg-[#FFF44F] border-[4px] border-black text-black py-8 text-[16px] font-bold uppercase tracking-[0.2em] shadow-[8px_8px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none hover:bg-[#FFD700] transition-all flex items-center justify-center gap-4 group"
              style={{ fontFamily: "Courier New, monospace" }}
            >
              Complete Purchase
              <ArrowRight className="w-6 h-6 stroke-[3px]" />
            </button>

            <p className="text-[11px] text-black text-center uppercase tracking-widest leading-relaxed font-bold border-[2px] border-black p-4 bg-[#EAE8E3]" style={{ fontFamily: "Courier New, monospace" }}>
              By clicking complete purchase, you agree to our <Link href="#" className="underline underline-offset-4 hover:text-red-600">Terms of Service</Link> and <Link href="#" className="underline underline-offset-4 hover:text-red-600">Privacy Policy</Link>.
            </p>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 bg-white border-[4px] border-black p-8 md:p-10 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              <h2 className="text-[16px] uppercase tracking-[0.2em] font-bold mb-10 text-black border-b-[3px] border-black pb-4" style={{ fontFamily: "Courier New, monospace" }}>Order Summary ({cartCount})</h2>
              
              <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6 items-center border-b-[2px] border-black pb-6 last:border-b-0">
                    <div className="relative w-20 h-28 flex-shrink-0 bg-[#EAE8E3] border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                      <Image src={item.image} alt={item.name} fill className="object-cover filter sepia-[0.2]" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FFF44F] border-[2px] border-black text-black text-[12px] flex items-center justify-center font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }}>
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-black mb-2 leading-tight" style={{ fontFamily: "Courier New, monospace" }}>{item.name}</h3>
                      <p className="text-[11px] uppercase tracking-widest text-gray-800 font-bold mb-3" style={{ fontFamily: "Courier New, monospace" }}>Size: {item.size}</p>
                      <p className="text-[14px] font-bold text-black bg-[#EAE8E3] inline-block px-2 py-1 border-[2px] border-black" style={{ fontFamily: "Courier New, monospace" }}>RS. {item.price}.00</p>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="py-10 text-center border-[3px] border-black bg-[#EAE8E3]">
                    <p className="text-[12px] text-black uppercase tracking-widest font-bold" style={{ fontFamily: "Courier New, monospace" }}>Your bag is empty.</p>
                  </div>
                )}
              </div>

              <div className="space-y-6 border-t-[4px] border-black pt-8">
                <div className="flex justify-between text-[12px] uppercase tracking-widest font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>
                  <span>Subtotal</span>
                  <span>RS. {subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-[12px] uppercase tracking-widest font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>
                  <span>Shipping</span>
                  <span className="text-red-600">Free</span>
                </div>
                <div className="flex justify-between text-[12px] uppercase tracking-widest font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>
                  <span>Estimated Tax</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-black border-t-[3px] border-black pt-8 mt-8 bg-[#FFF44F] p-4 border-[3px] shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }}>
                  <span className="uppercase tracking-[0.2em]">Total</span>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-black block mb-2 font-bold bg-white px-1 border-black border">INR / Indian Rupee</span>
                    RS. {total.toLocaleString()}.00
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-12 bg-[#EAE8E3] border-[3px] border-black p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 bg-black flex items-center justify-center border-[2px] border-white outline outline-[2px] outline-black">
                    <Lock className="w-5 h-5 text-white stroke-[3px]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-black" style={{ fontFamily: "Courier New, monospace" }}>Secure Checkout</p>
                    <p className="text-[10px] text-black mt-2 font-bold uppercase tracking-widest" style={{ fontFamily: "Courier New, monospace" }}>Encrypted SSL Transaction</p>
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
