import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-white/10 py-16 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

                <div className="space-y-6">
                    <h3 className="text-2xl font-heading tracking-[0.2em]">VALENCIRÉ</h3>
                    <p className="text-xs text-gray-500 tracking-widest uppercase max-w-xs">
                        We do not dress the body. We arm the soul.
                    </p>
                </div>

                <div className="flex flex-col gap-4 text-xs tracking-[0.2em] font-light text-gray-400">
                    <Link href="/collection" className="hover:text-white transition-colors">Collection</Link>
                    <Link href="/philosophy" className="hover:text-white transition-colors">Philosophy</Link>
                    <Link href="/sizing" className="hover:text-white transition-colors">Sizing</Link>
                </div>

                <div className="flex flex-col gap-4 text-xs tracking-[0.2em] font-light text-gray-400">
                    <Link href="https://instagram.com" target="_blank" className="hover:text-white transition-colors">Instagram</Link>
                    <Link href="https://twitter.com" target="_blank" className="hover:text-white transition-colors">Twitter/X</Link>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 tracking-widest uppercase">
                <p>&copy; {new Date().getFullYear()} VALENCIRÉ. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="/terms" className="hover:text-gray-400">Terms</Link>
                    <Link href="/privacy" className="hover:text-gray-400">Privacy</Link>
                </div>
            </div>
        </footer>
    )
}
