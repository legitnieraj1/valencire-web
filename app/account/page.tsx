"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AccountStatus from "@/components/account/AccountStatus";
import { motion } from "framer-motion";

export default function AccountPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/auth/login");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white tracking-widest uppercase text-xs">
                Verifying Access...
            </div>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-6 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 w-full flex justify-center"
            >
                <AccountStatus />
            </motion.div>
        </main>
    );
}
