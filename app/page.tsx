import Hero from "@/components/Hero";
import SignatureDrop from "@/components/SignatureDrop";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <SignatureDrop />

      {/* Brand Philosophy Section */}
      <section className="py-32 md:py-48 px-6 flex justify-center items-center bg-black relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl text-center space-y-12 relative z-10">
          <p className="text-sm md:text-base text-gray-400 uppercase tracking-[0.4em]">
            The Philosophy
          </p>
          <h2 className="text-3xl md:text-5xl font-heading leading-snug text-white/90">
            "In a world where every voice screams to be heard, true power lies in
            silence. We craft armor for the quiet conquerors."
          </h2>
          <div className="flex justify-center">
            <Link
              href="/collection"
              className="inline-block border border-white/20 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              View Collection
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
