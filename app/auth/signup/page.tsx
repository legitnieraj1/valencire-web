"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Check for session immediately (if email confirmation disabled) or show check email message
            // Ideally redirect to a "Verify User" page or Login
            // For now we assume auto-login or redirect home
            router.push("/");
            router.refresh();
        }
    };

    return (
        <AuthContainer>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-[0.2em]">
                    Initiation
                </h1>
                <p className="text-gray-500 text-xs tracking-[0.4em] uppercase">
                    This is not for everyone.
                </p>
            </div>

            <form className="w-full space-y-8" onSubmit={handleSignup}>
                {error && (
                    <div className="text-red-500 text-xs text-center tracking-widest font-mono uppercase bg-red-500/10 py-2 border border-red-500/20">
                        {error}
                    </div>
                )}
                <div className="space-y-6">
                    <AuthInput
                        label="Name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                    />
                    <AuthInput
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                    <AuthInput
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                    />
                    <AuthInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                    />
                </div>

                <div className="space-y-4">
                    <AuthButton type="submit" disabled={loading}>
                        {loading ? "Initiating..." : "Initiate Access"}
                    </AuthButton>

                    <GoogleAuthButton />
                </div>
            </form>

            <Link
                href="/auth/login"
                className="text-xs text-gray-500 hover:text-white transition-colors tracking-[0.2em] border-b border-transparent hover:border-white pb-1"
            >
                Already initiated? Enter.
            </Link>
        </AuthContainer>
    );
}
