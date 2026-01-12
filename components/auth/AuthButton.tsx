"use client";

import { ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function AuthButton({ children, ...props }: AuthButtonProps) {
    return (
        <button
            className="group w-full py-4 mt-8 flex items-center justify-between border-b border-white text-white font-heading font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-300"
            {...props}
        >
            <span>{children}</span>
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
        </button>
    );
}
