"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                {/* Desktop Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hidden md:block w-full h-full object-cover"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>

                {/* Mobile Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="block md:hidden w-full h-full object-cover"
                >
                    <source src="/videomobile.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center flex flex-col items-center max-w-5xl px-4">

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    className="text-sm md:text-xl font-body tracking-[0.4em] uppercase text-gray-300"
                >
                    We do not dress the body.
                    <br className="md:hidden" /> <span className="hidden md:inline"> — </span>
                    We arm the soul.
                </motion.p>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
}
