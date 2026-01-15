"use client";

import { motion } from "framer-motion";
import { InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function AuthInput({ label, ...props }: AuthInputProps) {
    return (
        <div className="w-full relative group">
            <input
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-white transition-colors duration-500 font-mono text-sm tracking-widest peer"
                placeholder={label}
                {...props}
            />
            <label
                className="absolute left-0 top-4 text-gray-500 text-xs tracking-[0.2em] uppercase transition-all duration-500 
                peer-placeholder-shown:text-base peer-placeholder-shown:top-4 
                peer-focus:-top-2 peer-focus:text-[10px] peer-focus:text-gray-400
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-gray-400 pointer-events-none"
            >
                {label}
            </label>
            <motion.div
                layoutId={`input-highlight-${label}`}
                className="absolute bottom-0 left-0 h-px bg-white w-0 group-focus-within:w-full transition-all duration-700 ease-out"
            />
        </div>
    );
}
