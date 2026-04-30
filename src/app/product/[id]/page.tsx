"use client";

import { getProductById } from "@/data/products";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ChevronRight, Plus, Check, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  if (!product) {
    return notFound();
  }

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggleAccordion = (item: string) => {
    if (openAccordion === item) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(item);
    }
  };

  const displayImages = product.images && product.images.length > 1 ? product.images : [product.image];

  const handleNextImage = () => {
    setImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 font-ui">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-12">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="#" className="hover:text-black transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Product Images */}
          <div className="flex flex-col gap-4">
            <div className={`relative w-full border-4 border-black bg-[#EAE8E3] overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-500 ${imageIndex === 1 ? 'aspect-video' : 'h-[500px] md:h-[700px]'}`}>
              {displayImages.map((img, idx) => (
                <Image 
                  key={idx}
                  src={img} 
                  alt={`${product.name} view ${idx + 1}`} 
                  fill 
                  className={`object-contain object-center filter sepia-[0.2] transition-opacity duration-700 ${imageIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  priority={idx === 0}
                />
              ))}
              
              {displayImages.length > 1 && (
                <button 
                  onClick={handleNextImage}
                  className="absolute bottom-6 right-6 w-12 h-12 border-2 border-black bg-[#FFF44F] shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center active:translate-y-[4px] active:translate-x-[4px] active:shadow-none hover:bg-[#FFD700] transition-all cursor-pointer z-20"
                  title="Next Image"
                >
                  <ChevronRight className="w-8 h-8 text-black" strokeWidth={3} />
                </button>
              )}
            </div>
            
            {/* Thumbnails */}
            {displayImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 mt-2">
                {displayImages.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setImageIndex(idx)}
                    className={`relative w-24 h-24 border-2 border-black flex-shrink-0 transition-all ${imageIndex === idx ? 'shadow-[4px_4px_0px_rgba(0,0,0,1)] translate-y-[-2px] translate-x-[-2px]' : 'opacity-50 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx+1}`} fill className="object-cover filter sepia-[0.2]" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center max-w-lg">
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-4">New Season</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-black tracking-tight mb-6">{product.name}</h1>
            <p className="text-2xl font-medium text-gray-800 mb-10">RS. {product.price}.00</p>
            
            <div className="w-8 h-1 bg-black mb-10"></div>

            {/* Vintage Cloth Matter Section */}
            <div className="mb-10 p-6 border-4 border-black bg-[#EAE8E3] shadow-[6px_6px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-all duration-300">
              <h3 className="text-[16px] font-bold uppercase tracking-widest text-black mb-3 border-b-2 border-black pb-2 inline-block" style={{ fontFamily: "Courier New, monospace" }}>Cloth Matter</h3>
              <p className="text-[13px] font-bold text-gray-800 leading-relaxed" style={{ fontFamily: "Courier New, monospace" }}>
                Expertly woven from heritage threads, this garment honors traditional tailoring. The robust, textural weave guarantees durability while naturally softening over time. Pure vintage character built for modern resilience.
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-8 p-6 border-4 border-black bg-[#FDFBF7] shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
                <p className="text-[14px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: "Courier New, monospace" }}>Select Size</p>
                <button 
                  onClick={() => setShowSizeGuide(true)}
                  className="text-[12px] uppercase tracking-widest text-black hover:text-[#FFD700] transition-colors font-bold underline underline-offset-4" 
                  style={{ fontFamily: "Courier New, monospace" }}
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`py-3 text-[14px] font-bold uppercase tracking-widest border-2 border-black transition-all duration-200 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none ${
                      selectedSize === size
                        ? "bg-[#FFF44F] text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-black hover:bg-black hover:text-[#FFF44F] shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                    }`}
                    style={{ fontFamily: "Courier New, monospace" }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-[12px] text-red-500 mt-4 font-bold uppercase tracking-widest bg-red-100 p-2 border-2 border-red-500 inline-block" style={{ fontFamily: "Courier New, monospace" }}>Please select a size</p>
              )}
            </div>

            <button 
              onClick={handleAdd}
              className={`w-full px-12 py-5 text-[16px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border-4 border-black flex items-center justify-center gap-3 active:translate-y-[4px] active:translate-x-[4px] active:shadow-none ${
                added
                  ? "bg-[#4ade80] text-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                  : "bg-[#FFF44F] text-black hover:bg-[#FFD700] shadow-[6px_6px_0px_rgba(0,0,0,1)]"
              }`}
              style={{ fontFamily: "Courier New, monospace" }}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 border-2 border-black rounded-full p-0.5" />
                  Added to Bag
                </>
              ) : (
                "Add to Bag"
              )}
            </button>

            <div className="mt-8 flex gap-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> In Stock</span>
              <span>Free Shipping</span>
            </div>

            {/* Functional Vintage Accordions */}
            <div className="mt-16 border-t-[4px] border-black flex flex-col">
              {[
                { title: 'Details & Care', content: 'Vintage tailoring requires special care. Dry clean only. Do not tumble dry. Iron on low heat if necessary.' },
                { title: 'Size & Fit', content: 'Designed for a relaxed, vintage fit. Take your normal size. Model is 6\'2" and wears a size L.' },
                { title: 'Shipping & Returns', content: 'Free standard shipping on all orders over Rs. 5000. Returns accepted within 14 days of delivery in original condition.' }
              ].map((item, index) => (
                <div key={item.title} className={`border-b-[4px] border-black bg-[#FAF8F5]`}>
                  <div 
                    onClick={() => toggleAccordion(item.title)}
                    className="py-8 px-6 flex justify-between items-center cursor-pointer group hover:bg-[#EAE8E3] transition-colors"
                  >
                    <h3 className="text-[15px] font-bold uppercase tracking-[0.15em] text-black" style={{ fontFamily: "Courier New, monospace" }}>
                      {item.title}
                    </h3>
                    <Plus className={`w-7 h-7 text-black transition-transform duration-300 stroke-[3px] ${openAccordion === item.title ? 'rotate-45' : ''}`} />
                  </div>
                  {/* Content Panel */}
                  <div className={`overflow-hidden transition-all duration-300 ${openAccordion === item.title ? 'max-h-40 border-t-[2px] border-black/10' : 'max-h-0'}`}>
                    <div className="p-6 text-[13px] text-gray-800 leading-relaxed font-bold" style={{ fontFamily: "Courier New, monospace" }}>
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-all">
          <div className="bg-[#FDFBF7] border-4 border-black p-8 max-w-lg w-full shadow-[12px_12px_0px_rgba(0,0,0,1)] relative animate-fade-up">
            <button 
              onClick={() => setShowSizeGuide(false)} 
              className="absolute top-4 right-4 w-8 h-8 border-2 border-black bg-[#FFF44F] flex items-center justify-center active:translate-y-[2px] active:translate-x-[2px] shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none transition-all hover:bg-[#FFD700]"
            >
              <X className="w-4 h-4 text-black" strokeWidth={3} />
            </button>
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 border-b-4 border-black pb-4 text-black" style={{ fontFamily: "Courier New, monospace" }}>Size Guide</h2>
            <div className="overflow-hidden border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-[#EAE8E3] border-b-2 border-black">
                    <th className="p-3 border-r-2 border-black font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>Size</th>
                    <th className="p-3 border-r-2 border-black font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>Chest</th>
                    <th className="p-3 font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>Length</th>
                  </tr>
                </thead>
                <tbody>
                  {['S - 38"', 'M - 40"', 'L - 42"', 'XL - 44"'].map((row, i) => (
                    <tr key={i} className="border-b-2 border-black last:border-b-0 hover:bg-[#FFF44F]/20 transition-colors">
                      <td className="p-3 border-r-2 border-black font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>{row.split(' - ')[0]}</td>
                      <td className="p-3 border-r-2 border-black text-black" style={{ fontFamily: "Courier New, monospace" }}>{row.split(' - ')[1]}</td>
                      <td className="p-3 text-black" style={{ fontFamily: "Courier New, monospace" }}>{28 + i}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: "Courier New, monospace" }}>
              Measurements are in inches. Vintage fits may vary slightly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
