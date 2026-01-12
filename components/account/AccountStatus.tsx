"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import Link from "next/link";
import { ArrowRight, LogOut } from "lucide-react";

export default function AccountStatus() {
    const { user, signOut } = useAuth();

    return (
        <div className="w-full max-w-md flex flex-col items-center space-y-12 text-center">

            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-[0.2em]">
                    You’re Logged In.
                </h1>
                <p className="text-gray-500 text-xs tracking-[0.4em] uppercase">
                    Access granted to Valenciré.
                </p>
                {user?.email && (
                    <div className="pt-2">
                        <span className="text-white/60 font-mono text-sm tracking-wider border border-white/10 px-4 py-1 rounded-full">
                            {user.email}
                        </span>
                    </div>
                )}
            </div>

            <div className="h-px w-full max-w-[100px] bg-white/20" />

            <div className="w-full space-y-4 flex flex-col items-center">
                <Link
                    href="/collection"
                    className="group w-full py-4 flex items-center justify-between border-b border-white text-white font-heading font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-300"
                >
                    <span>Continue Shopping</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                </Link>

                <button
                    onClick={signOut}
                    className="group w-full py-4 flex items-center justify-between border-b border-white/20 text-gray-400 font-heading text-sm uppercase tracking-[0.2em] hover:text-white hover:border-white transition-all duration-300"
                >
                    <span>Logout</span>
                    <LogOut className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>

        </div>
    );
}
