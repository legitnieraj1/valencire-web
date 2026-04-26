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
    <div className="min-h-screen bg-white text-black font-ui pt-10 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Header / Brand */}
        <div className="grid grid-cols-3 items-center mb-12 border-b border-gray-100 pb-8">
          <div className="justify-self-start">
            <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Shop</span>
            </Link>
          </div>
          <div className="justify-self-center text-center">
            <h1 className="text-xl tracking-[0.5em] uppercase font-bold">
              VALENCIRÉ
            </h1>
          </div>
          <div className="justify-self-end text-right">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Secure Checkout</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Contact Information */}
            <section>
              <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-4 text-black">
                <span className="text-gray-300">01.</span> Contact Information
                <div className="h-px flex-1 bg-gray-100"></div>
              </h2>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-gray-50 border-none px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-black transition-all rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex items-center gap-3 pl-2">
                  <input type="checkbox" id="newsletter" className="w-4 h-4 rounded-none border-gray-200 accent-black cursor-pointer" />
                  <label htmlFor="newsletter" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold cursor-pointer select-none">Keep me updated on new arrivals and exclusive offers</label>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-4 text-black">
                <span className="text-gray-300">02.</span> Shipping Address
                <div className="h-px flex-1 bg-gray-100"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="bg-gray-50 border-none px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-black transition-all rounded-xl" />
                <input type="text" placeholder="Last Name" className="bg-gray-50 border-none px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-black transition-all rounded-xl" />
                <input type="text" placeholder="Address" className="md:col-span-2 bg-gray-50 border-none px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-black transition-all rounded-xl" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="md:col-span-2 bg-gray-50 border-none px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-black transition-all rounded-xl" />
                <input type="text" placeholder="City" className="bg-gray-50 border-none px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-black transition-all rounded-xl" />
                <input type="text" placeholder="Postal Code" className="bg-gray-50 border-none px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-black transition-all rounded-xl" />
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-4 text-black">
                <span className="text-gray-300">03.</span> Payment Method
                <div className="h-px flex-1 bg-gray-100"></div>
              </h2>
              <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="bg-gray-50 p-6 flex justify-between items-center border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full border-[6px] border-black"></div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-black">Credit Card</span>
                  </div>
                  <div className="flex gap-2 grayscale opacity-30">
                    <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="relative">
                    <input type="text" placeholder="Card Number" className="w-full bg-gray-50 border-none px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-black transition-all rounded-xl" />
                    <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Expiration Date (MM/YY)" className="bg-gray-50 border-none px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-black transition-all rounded-xl" />
                    <input type="text" placeholder="Security Code (CVV)" className="bg-gray-50 border-none px-6 py-5 text-sm outline-none focus:ring-1 focus:ring-black transition-all rounded-xl" />
                  </div>
                </div>
              </div>
            </section>

            <button className="group w-full bg-black text-white py-6 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all shadow-xl shadow-black/10 rounded-xl flex items-center justify-center gap-4">
              Complete Purchase
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </button>

            <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest leading-relaxed">
              By clicking complete purchase, you agree to our <Link href="#" className="underline underline-offset-4 hover:text-black">Terms of Service</Link> and <Link href="#" className="underline underline-offset-4 hover:text-black">Privacy Policy</Link>.
            </p>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-10 text-black">Order Summary ({cartCount})</h2>
              
              <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6 items-center">
                    <div className="relative w-20 h-24 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-white/50">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-black text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-md">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-black mb-1 leading-tight">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Size: {item.size}</p>
                      <p className="text-xs font-bold text-neutral-800">RS. {item.price}.00</p>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="py-10 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Your bag is empty.</p>
                  </div>
                )}
              </div>

              <div className="space-y-5 border-t border-gray-200 pt-8">
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-black">RS. {subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-[11px] uppercase tracking-widest font-bold text-gray-500">
                  <span>Estimated Tax</span>
                  <span className="text-black">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black border-t border-gray-200 pt-8 mt-6">
                  <span className="uppercase tracking-[0.2em] text-xs">Total</span>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 block mb-1 font-bold">INR / Indian Rupee</span>
                    RS. {total.toLocaleString()}.00
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-12 bg-white/60 backdrop-blur-sm border border-white p-6 rounded-2xl shadow-sm">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg shadow-black/20">
                    <Lock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black">Secure Checkout</p>
                    <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-tighter">Encrypted SSL Transaction</p>
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
