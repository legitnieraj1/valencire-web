"use client";

import { motion } from "framer-motion";
import CheckoutButton from "./CheckoutButton";

export default function CheckoutForm() {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Razorpay flow starts here");
        // // Razorpay order creation will be added here
        // 1. Create Order via server action
        // 2. Open Razorpay Modal
    };

    return (
        <div className="md:w-1/2 p-6 md:p-12 md:min-h-screen flex flex-col justify-center bg-[#050505]">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-md w-full mx-auto"
            >
                <div className="mb-12">
                    <h2 className="text-xl font-heading font-bold text-white uppercase tracking-[0.2em] mb-2">
                        Shipping Details
                    </h2>
                    <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">
                        Where should we send your artifacts?
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <InputGroup label="Identity">
                            <Input name="fullName" placeholder="Full Name" required />
                            <Input name="email" type="email" placeholder="Email Address" required />
                            <Input name="phone" type="tel" placeholder="Phone Number" required />
                        </InputGroup>

                        <InputGroup label="Destination">
                            <Input name="address" placeholder="Street Address" required />
                            <div className="grid grid-cols-2 gap-4">
                                <Input name="city" placeholder="City" required />
                                <Input name="state" placeholder="State" required />
                            </div>
                            <Input name="pincode" placeholder="Pincode" required />
                        </InputGroup>
                    </div>

                    <div className="pt-8">
                        <CheckoutButton type="submit">
                            Proceed to Ritual
                        </CheckoutButton>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

function InputGroup({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-white/40 text-[10px] uppercase tracking-[0.3em] pl-1 font-mono">
                {label}
            </h3>
            {children}
        </div>
    );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/20 py-3 px-1 text-sm tracking-widest focus:outline-none focus:border-white transition-colors duration-300 font-light"
            {...props}
        />
    );
}
