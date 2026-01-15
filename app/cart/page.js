"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import emailjs from "@emailjs/browser";
import styles from "./cart.module.css";

// EmailJS Config
const EMAIL_SERVICE_ID = "service_r7tqr9o";
const EMAIL_TEMPLATE_ID = "template_w9rl8ib";
const EMAIL_PUBLIC_KEY = "3OqsLW-uTKYF8oWlV";

// Product Gradients
const productGradients = {
    1: "linear-gradient(135deg, #22002e 0%, #000 50%, #12001a 100%)", // Amethyst
    2: "linear-gradient(135deg, #2a0000 0%, #000 50%, #1a0000 100%)", // Blood Red
    3: "linear-gradient(135deg, #001428 0%, #000 50%, #000814 100%)", // Phantom Blue
};

export default function CartPage() {
    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [couponCode, setCouponCode] = useState("");

    // Initialize Logic
    useEffect(() => {
        // 1. Load Cart
        try {
            const stored = localStorage.getItem("valencire_cart");
            if (stored) setCart(JSON.parse(stored));
        } catch (e) {
            console.error("Cart load error", e);
        }

        // 2. Initialize EmailJS
        emailjs.init(EMAIL_PUBLIC_KEY);
    }, []);

    // Sync Cart to LocalStorage
    useEffect(() => {
        // Since we load on mount, skipping the first render empty save is tricky unless we track mounted
        // But cart starts [], if we overwrite LS with [], we might lose data if load failed?
        // Better to only save if not initial load. But simpler:
        // We already loaded in mount. If cart changes, we save.
        // However, the initial state [] might overwrite the stored data if we are not careful?
        // No, useEffect dependency [cart] runs on mount too after initial render?
        // If we set cart in mount, it triggers another effect run.
        // To be safe, we wrap save in a function that acts on user interactions, OR we assume initial load happened.
        // Actually, checking if cart is populated ?
        // But what if we genuinely delete all items? Cart is [].
        // Standard pattern: simple read on mount, write on change.
        // But to avoid overwriting on first render (cursor is []):
        // use a ref `isLoaded`.
    }, [cart]);

    // Actually, I'll use a specific `saveCart` function called by handlers,
    // AND a generic effect?
    // Let's rely on handlers for updates to be safe against hydration mismatches.
    // Legacy code writes to LS in `saveCart`.
    const saveCartToStorage = (newCart) => {
        localStorage.setItem("valencire_cart", JSON.stringify(newCart));
        setCart(newCart);
    };

    // Background Effect
    useEffect(() => {
        if (cart.length > 0) {
            const gradient =
                productGradients[cart[0].id] ||
                "linear-gradient(135deg, #1a0000 0%, #000 50%, #0a0a1a 100%)";
            document.body.style.background = gradient;
        } else {
            document.body.style.background = "#0a0a0a";
        }
        return () => {
            document.body.style.background = "#0a0a0a";
        };
    }, [cart]);

    // Derived
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const discount = discountApplied ? subtotal * 0.1 : 0;
    const total = subtotal - discount;

    // Handlers
    const changeQty = (index, delta) => {
        const newCart = [...cart];
        newCart[index].quantity += delta;
        if (newCart[index].quantity <= 0) {
            newCart.splice(index, 1);
        }
        saveCartToStorage(newCart);
    };

    const removeItem = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        saveCartToStorage(newCart);
    };

    const applyCoupon = () => {
        if (couponCode.toUpperCase() === "VALENCIRE10") {
            if (!discountApplied) {
                setDiscountApplied(true);
                alert("✓ Coupon applied! 10% discount added");
            } else {
                alert("Coupon already applied");
            }
        } else if (couponCode) {
            alert("Invalid coupon code");
        }
    };

    const checkout = async () => {
        if (cart.length === 0) return;

        if (cart.length === 0) return;

        // supabase is imported from lib, assuming it's always initialized


        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            if (confirm("You need to be logged in to checkout. Go to login page?")) {
                router.push("/account");
            }
            return;
        }

        const confirmMsg = `Order Summary:\n\nSubtotal: ₹${subtotal.toLocaleString()}\nDiscount: ₹${discount.toLocaleString()}\nShipping: FREE\nTotal: ₹${total.toLocaleString()}\n\nProceed to place order?`;

        if (confirm(confirmMsg)) {
            try {
                // 1. Insert Order
                const { data: orderData, error: orderError } = await supabase
                    .from("orders")
                    .insert([
                        {
                            user_id: session.user.id,
                            total_amount: total,
                            items: cart,
                            status: "pending",
                        },
                    ])
                    .select();

                if (orderError) throw orderError;

                // 2. Send Email
                const templateParams = {
                    order_id: orderData[0].id,
                    customer_email: session.user.email,
                    customer_name:
                        session.user.user_metadata.full_name || session.user.email,
                    order_total: total,
                    order_items: JSON.stringify(cart, null, 2),
                };

                await emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, templateParams);

                // 3. Success
                localStorage.removeItem("valencire_cart");
                setCart([]);
                alert(
                    "✓ Order placed successfully!\n\nConfirmation email sent to " +
                    session.user.email
                );
                router.push("/");
            } catch (error) {
                console.error("Checkout Error:", error);
                // Supabase error object might have message property or be a string
                const errMsg = error.message || error.text || "Unknown error";
                alert("Error placing order: " + errMsg);
            }
        }
    };

    return (
        <>
            <header className={styles.header}>
                <img
                    src="/LOGO BRO.png"
                    onClick={() => router.push("/")}
                    alt="VALENCIRĖ®"
                />
            </header>

            <section className={styles.cartPage}>
                {/* Cart Items */}
                <div className={styles.cartBox}>
                    <div className={styles.cartTitle}>Your Cart</div>

                    {cart.length === 0 ? (
                        <div className={styles.emptyCart}>
                            Your cart is empty
                            <br />
                            <Link href="/" className={styles.emptyCartLink}>
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {cart.map((item, index) => (
                                <div
                                    key={`${item.id}-${item.size}-${index}`}
                                    className={styles.cartItem}
                                >
                                    {/* Image src handling - check if it has leading slash */}
                                    <img
                                        src={item.image}
                                        className={styles.cartItemImg}
                                        alt={item.name}
                                    />
                                    <div className={styles.cartItemDetails}>
                                        <h4>{item.name}</h4>
                                        <p>Size: {item.size}</p>
                                        <div className={styles.cartItemPrice}>
                                            ₹{item.price.toLocaleString()}
                                        </div>

                                        <div className={styles.qtyControl}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => changeQty(index, -1)}
                                            >
                                                −
                                            </button>
                                            <span className={styles.qtyDisplay}>{item.quantity}</span>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => changeQty(index, 1)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div
                                            className={styles.removeItem}
                                            onClick={() => removeItem(index)}
                                        >
                                            Remove
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className={styles.summary}>
                    <h3>Order Summary</h3>

                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                    </div>

                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>FREE</span>
                    </div>

                    {discountApplied && (
                        <div
                            className={`${styles.summaryRow} ${styles.discountRow}`}
                            id="discountRow"
                        >
                            <span>Discount (10%)</span>
                            <span>-₹{discount.toLocaleString()}</span>
                        </div>
                    )}

                    <div className={styles.coupon}>
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            disabled={discountApplied}
                        />
                        <button onClick={applyCoupon} disabled={discountApplied}>
                            APPLY
                        </button>
                    </div>

                    <div className={`${styles.summaryRow} ${styles.total}`}>
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>

                    <button className={styles.buyBtn} onClick={checkout}>
                        Buy Now
                    </button>
                </div>
            </section>
        </>
    );
}
