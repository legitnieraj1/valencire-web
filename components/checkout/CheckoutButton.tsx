"use client";

interface CheckoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function CheckoutButton({ children, className, ...props }: CheckoutButtonProps) {
    return (
        <button
            className={`w-full bg-white text-black font-heading font-bold uppercase tracking-[0.2em] py-4 px-6 hover:bg-gray-200 transition-colors duration-300 flex flex-col items-center justify-center gap-1 group ${className}`}
            {...props}
        >
            <span className="group-hover:translate-y-px transition-transform duration-300">
                {children}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-gray-500 font-normal opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
                Secure checkout powered by Razorpay
            </span>
        </button>
    );
}
