"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./account.module.css";

export default function AccountPage() {
    const router = useRouter();
    const [view, setView] = useState("login"); // 'login' or 'register'
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Form States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    // Check Session
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                // Redirect if already logged in? 
                // Or show profile? 
                // For now, let's redirect to home as per legacy behavior
                router.push("/");
            }
        };
        checkSession();
    }, [router]);

    useEffect(() => {
        if (view === "register") {
            checkPasswordStrength();
        }
    }, [password, view]);

    const checkPasswordStrength = () => {
        if (!password) {
            setPasswordStrength("");
            return;
        }
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) setPasswordStrength("weak");
        else if (strength <= 4) setPasswordStrength("medium");
        else setPasswordStrength("strong");
    };

    const handleError = (msg) => {
        setMessage({ type: "error", text: msg });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    };

    const handleSuccess = (msg) => {
        setMessage({ type: "success", text: msg });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            handleSuccess("✓ Login successful! Redirecting...");
            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch (error) {
            handleError(error.message || "Login failed");
        } finally {
            if (!message.text.includes("Redirecting")) {
                setLoading(false);
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            handleError("Passwords do not match");
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) throw error;

            if (data.user) {
                handleSuccess("✓ Account created successfully!");

                // Auto-login logic depends on email confirmation settings
                // If session is established, redirect
                if (data.session) {
                    setTimeout(() => {
                        router.push("/");
                    }, 1500);
                } else {
                    // Email confirmation required
                    alert("Please check your email to verify your account.");
                    // Switch to login or stay here?
                }
            }
        } catch (error) {
            handleError(error.message || "Registration failed");
        } finally {
            if (!message.text.includes("Redirecting")) {
                setLoading(false);
            }
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${window.location.origin}/`,
                },
            });
            if (error) throw error;
        } catch (error) {
            handleError(`${provider} login unavailable`);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const emailInput = prompt('Enter your email address to reset your password:');
        if (!emailInput) return;

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(emailInput, {
                redirectTo: `${window.location.origin}/account/reset-password`, // Need to handle this route later if we want the full flow
            });
            if (error) throw error;
            alert('Password reset email sent! Check your inbox.');
        } catch (error) {
            handleError('Failed to send reset email: ' + error.message);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Link href="/" className={styles.backHome}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>HOME</span>
            </Link>

            <div className={styles.authContainer}>
                <div className={styles.logo} onClick={() => router.push("/")}>
                    <img src="/LOGO BRO.png" alt="VALENCIRĖ" />
                </div>

                <h1 className={styles.title}>
                    {view === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className={styles.subtitle}>
                    {view === "login"
                        ? "Sign in to your account"
                        : "Join the VALENCIRĖ family"}
                </p>

                {view === "login" ? (
                    <form onSubmit={handleLogin}>
                        <div className={styles.formGroup}>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.forgotPassword}>
                            <button
                                type="button"
                                className={styles.forgotPasswordBtn}
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={loading}
                        >
                            <span>{loading ? "Signing In..." : "Sign In"}</span>
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Password (min. 6 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                required
                            />
                            {password && (
                                <div
                                    className={`${styles.passwordStrength} ${styles[
                                        passwordStrength === "weak"
                                            ? "strengthWeak"
                                            : passwordStrength === "medium"
                                                ? "strengthMedium"
                                                : "strengthStrong"
                                        ]
                                        }`}
                                    style={{ display: "block" }}
                                >
                                    {passwordStrength === "weak" && "⚠ Weak password"}
                                    {passwordStrength === "medium" && "✓ Medium strength"}
                                    {passwordStrength === "strong" && "✓ Strong password"}
                                </div>
                            )}
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                minLength={6}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={loading}
                        >
                            <span>{loading ? "Creating Account..." : "Create Account"}</span>
                        </button>
                    </form>
                )}

                {message.text && (
                    <div className={message.type === 'error' ? styles.errorMessage : styles.successMessage}>
                        {message.text}
                    </div>
                )}

                <div className={styles.divider}>
                    <span>{view === "login" ? "or continue with" : "or sign up with"}</span>
                </div>

                <div className={styles.socialLogin}>
                    <button className={styles.socialBtn} onClick={() => handleSocialLogin("google")}>
                        <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span>Google</span>
                    </button>
                </div>

                <div className={styles.switchMode}>
                    {view === "login" ? "Don't have an account?" : "Already have an account?"}
                    <button
                        className={styles.switchBtn}
                        onClick={() => {
                            setView(view === "login" ? "register" : "login");
                            setMessage({ type: "", text: "" });
                            setEmail("");
                            setPassword("");
                            setFullName("");
                            setConfirmPassword("");
                        }}
                    >
                        {view === "login" ? "Create one" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}
