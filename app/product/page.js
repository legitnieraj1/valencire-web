"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./product.module.css";

const productsData = [
    {
        id: 1,
        name: "AMETHYST NOIR™",
        category: "Compression",
        price: 1800,
        images: { front: "/FRONT 1.png", back: "/BACK 1.png" }, // Added / for public
        description:
            "Engineered compression fit meets uncompromising luxury. Advanced moisture-wicking technology with a tailored silhouette designed for those who demand excellence.",
        features: [
            {
                icon: "layers",
                title: "4-Way Stretch",
                desc: "Advanced compression fabric engineered for unrestricted movement and superior muscle support.",
            },
            {
                icon: "droplet",
                title: "Moisture Control",
                desc: "Proprietary wicking technology pulls sweat away from skin, keeping you dry.",
            },
            {
                icon: "shield",
                title: "Anti-Odor Tech",
                desc: "Embedded antimicrobial treatment prevents odor-causing bacteria.",
            },
            {
                icon: "award",
                title: "Premium Cotton",
                desc: "Blended with finest Egyptian cotton for unparalleled softness.",
            },
            {
                icon: "activity",
                title: "Muscle Recovery",
                desc: "Graduated compression promotes blood circulation and reduces fatigue.",
            },
            {
                icon: "scissors",
                title: "Precision Cut",
                desc: "Laser-cut seamless construction eliminates chafing points.",
            },
        ],
        specs: {
            Fabric: "65% Cotton / 30% Polyester / 5% Elastane",
            Weight: "180 GSM",
            Fit: "Athletic Compression",
            Compression: "Medium (15-20 mmHg)",
            Care: "Machine Wash Cold",
            Origin: "Made in India",
            Warranty: "Lifetime Quality",
            Collection: "Blood Noir Series",
        },
        bgGradient:
            "linear-gradient(135deg, #22002e 0%, #000 50%, #12001a 100%)",
        new: true,
    },
    {
        id: 2,
        name: "BLOOD NOIR™ RED",
        category: "Compression",
        price: 1800,
        images: { front: "/FRONT 3.png", back: "/BACK 2.png" },
        description:
            "Bold statement piece with superior compression technology. Combines aggressive styling with performance-driven fabric engineering for the ultimate workout experience.",
        features: [
            {
                icon: "layers",
                title: "4-Way Stretch",
                desc: "Maximum flexibility with targeted compression zones for peak performance.",
            },
            {
                icon: "droplet",
                title: "Quick-Dry",
                desc: "Advanced fabric technology dries 3x faster than traditional materials.",
            },
            {
                icon: "shield",
                title: "UV Protection",
                desc: "Built-in UPF 50+ protection shields skin from harmful rays.",
            },
            {
                icon: "award",
                title: "Luxury Blend",
                desc: "Premium cotton-polyester blend for durability and comfort.",
            },
            {
                icon: "zap",
                title: "Energy Return",
                desc: "Compression technology reduces muscle vibration and fatigue.",
            },
            {
                icon: "wind",
                title: "Breathable",
                desc: "Strategic ventilation zones for optimal airflow.",
            },
        ],
        specs: {
            Fabric: "60% Cotton / 35% Polyester / 5% Spandex",
            Weight: "185 GSM",
            Fit: "Performance Compression",
            Compression: "Medium-High (20-25 mmHg)",
            Care: "Machine Wash Cold / Tumble Dry Low",
            Origin: "Made in India",
            Warranty: "Lifetime Quality",
            Collection: "Blood Noir Series",
        },
        bgGradient:
            "linear-gradient(135deg, #2a0000 0%, #000 50%, #1a0000 100%)",
        new: true,
    },
    {
        id: 3,
        name: "PHANTOM PRO™",
        category: "Compression",
        price: 1950,
        images: {
            front: "/valencire blue final out .png",
            back: "/valencire blue back .png",
        },
        description:
            "Professional-grade compression with enhanced recovery properties. Engineered for athletes who push limits and demand superior performance gear.",
        features: [
            {
                icon: "target",
                title: "Targeted Support",
                desc: "Strategic compression zones for major muscle groups.",
            },
            {
                icon: "droplet",
                title: "Moisture Wicking",
                desc: "Pulls moisture away from body for dry comfort.",
            },
            {
                icon: "shield",
                title: "Anti-Microbial",
                desc: "Keeps you fresh through intense training sessions.",
            },
            {
                icon: "cpu",
                title: "Smart Fabric",
                desc: "Temperature-regulating technology adapts to your body.",
            },
            {
                icon: "battery",
                title: "Energy Boost",
                desc: "Compression enhances blood flow for better performance.",
            },
            {
                icon: "check",
                title: "Seamless Design",
                desc: "Flatlock seams prevent irritation during movement.",
            },
        ],
        specs: {
            Fabric: "70% Polyester / 25% Nylon / 5% Elastane",
            Weight: "195 GSM",
            Fit: "Pro Athletic Compression",
            Compression: "High (25-30 mmHg)",
            Care: "Machine Wash Cold / Air Dry",
            Origin: "Made in India",
            Warranty: "Lifetime Quality",
            Collection: "Phantom Series",
        },
        bgGradient:
            "linear-gradient(135deg, #001428 0%, #000 50%, #000814 100%)",
        new: false,
    },
];

const icons = {
    layers:
        '<path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    award:
        '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',
    activity:
        '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>',
    scissors:
        '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>',
    maximize:
        '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>',
    feather:
        '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>',
    wind: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>',
    "trending-up":
        '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
    target:
        '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>',
    battery:
        '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line>',
    check: '<polyline points="20 6 9 17 4 12"></polyline>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
};

function ProductContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const productId = searchParams.get("product") || "1";

    const [product, setProduct] = useState(productsData[0]);
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // 0 = back, 1 = front (based on switch logic)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [stickyVisible, setStickyVisible] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: "" });
    const [cartCount, setCartCount] = useState(0);

    // Refs for Touch Interaction
    const imageCardRef = useRef(null);
    const touchStartRef = useRef(0);
    const lastScaleRef = useRef(1);
    const initialDistanceRef = useRef(0);

    // Load Product
    useEffect(() => {
        const found = productsData.find((p) => p.id == productId);
        if (found) setProduct(found);
        setCurrentImageIndex(0); // Reset image to back
        window.scrollTo(0, 0);
    }, [productId]);

    // Load Cart Count
    const updateCartCount = () => {
        try {
            const cart = JSON.parse(localStorage.getItem("valencire_cart")) || [];
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(count);
        } catch (e) {
            // ignore
        }
    };

    useEffect(() => {
        updateCartCount();
    }, []); // On mount

    // Body BG
    useEffect(() => {
        document.body.style.background = product.bgGradient;
        return () => {
            document.body.style.background = "#0a0a0a"; // default
        };
    }, [product]);

    // Sticky Bar Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setStickyVisible(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        const cta = document.querySelector(`.${styles.ctaButtons}`);
        if (cta) observer.observe(cta);

        return () => observer.disconnect();
    }, [product]);

    // Mobile Image Interaction
    useEffect(() => {
        const card = imageCardRef.current;
        if (!card || window.innerWidth > 768) return;

        // We use ref+addEventListener to control passive/non-passive options if needed
        // But React handles standard events. However, for scale preventsDefault, we need ref.

        let scale = 1;

        const handleTouchStart = (e) => {
            if (e.touches.length === 1) {
                touchStartRef.current = e.touches[0].clientX;
            } else if (e.touches.length === 2) {
                initialDistanceRef.current = getDistance(e.touches[0], e.touches[1]);
                lastScaleRef.current = scale;
            }
        };

        const handleTouchMove = (e) => {
            if (e.touches.length === 1) {
                // Swipe move
            } else if (e.touches.length === 2) {
                if (e.cancelable) e.preventDefault(); // Prevent scroll
                const dist = getDistance(e.touches[0], e.touches[1]);
                scale = lastScaleRef.current * (dist / initialDistanceRef.current);
                scale = Math.min(Math.max(1, scale), 3);

                // Apply scale to active image
                const imgBack = card.querySelector(`.${styles.imgBack}`);
                const imgFront = card.querySelector(`.${styles.imgFront}`);
                // Logic: if currentImageIndex is 0 (back shown), scale back.
                // Wait, legacy logic: "activeImg = currentImageIndex === 0 ? imgBack : imgFront"
                const activeImg = currentImageIndex === 0 ? imgBack : imgFront;
                if (activeImg) activeImg.style.transform = `scale(${scale})`;
            }
        };

        const handleTouchEnd = (e) => {
            if (e.touches.length === 0) {
                // Swipe detection
                if (scale === 1 && touchStartRef.current) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const diff = touchStartRef.current - touchEndX;
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) switchToImage(1); // Left -> Front
                        else switchToImage(0); // Right -> Back
                    }
                }

                if (scale > 1) {
                    setTimeout(() => {
                        scale = 1;
                        lastScaleRef.current = 1;
                        const imgBack = card.querySelector(`.${styles.imgBack}`);
                        const imgFront = card.querySelector(`.${styles.imgFront}`);
                        if (imgBack) imgBack.style.transform = "scale(1)";
                        if (imgFront) imgFront.style.transform = "scale(1)";
                    }, 300);
                }
            }
            // Reset ref
            // touchStartRef.current = 0; // Dont reset immediately if used in Touchend
        };

        function getDistance(t1, t2) {
            const dx = t1.clientX - t2.clientX;
            const dy = t1.clientY - t2.clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }

        card.addEventListener("touchstart", handleTouchStart, { passive: true });
        card.addEventListener("touchmove", handleTouchMove, { passive: false });
        card.addEventListener("touchend", handleTouchEnd);

        return () => {
            card.removeEventListener("touchstart", handleTouchStart);
            card.removeEventListener("touchmove", handleTouchMove);
            card.removeEventListener("touchend", handleTouchEnd);
        };
    }, [currentImageIndex]); // Re-bind if index changes? No, DOM elements persist.

    const switchToImage = (index) => {
        setCurrentImageIndex(index);
    };

    const showNotification = (msg) => {
        setNotification({ show: true, message: msg });
        setTimeout(() => setNotification({ show: false, message: "" }), 3500);
    };

    const addToCart = () => {
        const item = {
            id: product.id,
            name: product.name,
            size: selectedSize,
            quantity: quantity,
            price: product.price,
            image: product.images.back,
            total: product.price * quantity,
        };

        const cart = JSON.parse(localStorage.getItem("valencire_cart")) || [];
        cart.push(item);
        localStorage.setItem("valencire_cart", JSON.stringify(cart));
        updateCartCount();

        showNotification(`Added ${quantity}x ${product.name} (Size ${selectedSize})`);

        // Trigger animation simply by relying on state if needed, or imperative class add
        const cartIcons = document.querySelectorAll(`.${styles.cartIconWrapper}`);
        cartIcons.forEach(el => {
            el.classList.add(styles.shake);
            setTimeout(() => el.classList.remove(styles.shake), 600);
        });
    };

    const buyNow = () => {
        addToCart();
        setTimeout(() => {
            router.push('/cart');
        }, 500);
    };

    return (
        <div className={styles.productPageWrapper}>
            {/* Header */}
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>
                    <img src="/LOGO BRO.png" alt="VALENCIRĖ®" />
                </Link>
                <div className={styles.navLinks}>
                    <div className={styles.navLink} onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}>Features</div>
                    <div className={styles.navLink} onClick={() => document.getElementById("specs").scrollIntoView({ behavior: "smooth" })}>Details</div>
                    <div className={styles.cartIconWrapper} onClick={() => router.push('/cart')}>
                        <svg className={styles.cartIcon} viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7z"></path><path d="M9 7V5a3 3 0 0 1 6 0v2"></path></svg>
                        <div className={`${styles.cartCount} ${cartCount > 0 ? styles.active : ''}`}>{cartCount}</div>
                    </div>
                </div>
                {/* Mobile Header Right */}
                <div className={styles.mobileHeaderRight}>
                    <div className={styles.cartIconWrapper} onClick={() => router.push('/cart')}>
                        <svg className={styles.cartIcon} viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7z"></path><path d="M9 7V5a3 3 0 0 1 6 0v2"></path></svg>
                        <div className={`${styles.cartCount} ${cartCount > 0 ? styles.active : ''}`}>{cartCount}</div>
                    </div>
                    <div className={`${styles.mobileMenuBtn} ${mobileMenuOpen ? styles.active : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <span></span><span></span><span></span>
                    </div>
                </div>
                {/* Mobile Menu Overlay */}
                <div className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.active : ''}`}>
                    <div className={styles.mobileNavLink} onClick={() => { setMobileMenuOpen(false); document.getElementById("features").scrollIntoView({ behavior: "smooth" }); }}>Features</div>
                    <div className={styles.mobileNavLink} onClick={() => { setMobileMenuOpen(false); document.getElementById("specs").scrollIntoView({ behavior: "smooth" }); }}>Details</div>
                    <div className={styles.mobileNavLink} onClick={() => router.push('/cart')}>Cart ({cartCount})</div>
                </div>
            </header>

            {/* Product Selector */}
            <div className={styles.productSelector}>
                {productsData.map((p, i) => (
                    <button
                        key={p.id}
                        className={`${styles.productPill} ${p.id === product.id ? styles.active : ''}`}
                        onClick={() => router.push(`/product?product=${p.id}`)} // Use router to change URL and trigger effect
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBg} style={{ background: product.bgGradient }}></div>
                <div className={styles.heroContentWrapper}>
                    <div className={styles.heroText}>
                        <div className={styles.eyebrow}>{product.new ? 'NEW ARRIVAL' : product.category.toUpperCase()}</div>
                        <h1 className={styles.heroTitle}>{product.name}</h1>
                        <p className={styles.heroDesc}>{product.description}</p>
                        <div className={styles.heroPrice}>₹{product.price.toLocaleString()}</div>

                        <div className={styles.sizePriceSection}>
                            <div className={styles.sectionLabel}>SELECT SIZE</div>
                            <div className={styles.sizeSelector}>
                                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                    <button
                                        key={size}
                                        className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <div className={styles.qtySelector}>
                                <span className={styles.qtyLabel}>Quantity</span>
                                <div className={styles.qtyControls}>
                                    <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                                    <span className={styles.qtyDisplay}>{quantity}</span>
                                    <button className={styles.qtyBtn} onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ctaButtons}>
                            <button className={styles.btnPrimary} onClick={addToCart}>
                                ADD TO CART – ₹{(product.price * quantity).toLocaleString()}
                            </button>
                            <button className={styles.btnSecondary} onClick={buyNow}>BUY NOW</button>
                        </div>
                    </div>

                    <div className={`${styles.productImages} ${styles.single}`}>
                        <div className={styles.imageHoverCard} id="imageCard" ref={imageCardRef}>
                            {/* Back Image (Logic: 0=Back, 1=Front) */}
                            <img
                                src={product.images.back}
                                className={styles.imgBack}
                                alt="Back View"
                                style={{
                                    opacity: currentImageIndex === 0 ? 1 : 0,
                                    transform: currentImageIndex === 0 ? 'scale(1)' : 'scale(1.08)' // Match CSS logic
                                }}
                            />
                            <img
                                src={product.images.front}
                                className={styles.imgFront}
                                alt="Front View"
                                style={{
                                    opacity: currentImageIndex === 1 ? 1 : 0,
                                    transform: currentImageIndex === 1 ? 'scale(1)' : 'scale(1.05)'
                                }}
                            />
                            <div className={styles.imageLabel}>HOVER TO VIEW FRONT</div>
                            <div className={styles.carouselDots}>
                                <div className={`${styles.carouselDot} ${currentImageIndex === 0 ? styles.active : ''}`} onClick={() => switchToImage(0)}></div>
                                <div className={`${styles.carouselDot} ${currentImageIndex === 1 ? styles.active : ''}`} onClick={() => switchToImage(1)}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className={styles.features} id="features">
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionLabel}>CRAFTED FOR PERFECTION</div>
                    <h2 className={styles.sectionTitle}>PREMIUM ENGINEERING</h2>
                    <p className={styles.sectionDesc}>Every detail meticulously designed. Every thread purposefully placed.</p>
                </div>
                <div className={styles.featuresGrid}>
                    {product.features.map((feature, i) => (
                        <div key={i} className={styles.featureCard}>
                            <div className={styles.featureIcon} dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24">${icons[feature.icon] || icons.award}</svg>` }}></div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Specs */}
            <section className={styles.techSpecs} id="specs">
                <div className={styles.specsContainer}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionLabel}>PRODUCT DETAILS</div>
                        <h2 className={styles.sectionTitle}>SPECIFICATIONS</h2>
                    </div>
                    <div className={styles.specsGrid}>
                        {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className={styles.specItem}>
                                <span className={styles.specLabel}>{key}</span>
                                <span className={styles.specValue}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related */}
            <section className={styles.relatedProducts}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionLabel}>EXPLORE MORE</div>
                    <h2 className={styles.sectionTitle}>YOU MAY ALSO LIKE</h2>
                </div>
                <div className={styles.relatedGrid}>
                    {productsData.filter(p => p.id !== product.id).map(p => (
                        <div key={p.id} className={styles.relatedCard} onClick={() => router.push(`/product?product=${p.id}`)}>
                            <div className={styles.relatedImage}>
                                <img src={p.images.front} alt={p.name} />
                            </div>
                            <div className={styles.relatedInfo}>
                                <h3>{p.name}</h3>
                                <p>₹{p.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer (Simplified matching legacy footer) */}
            <div className={styles.footer}>
                <div className={styles.footerLinks}>
                    <div className={styles.footerLink}>Shipping & Returns</div>
                    <div className={styles.footerLink}>Size Guide</div>
                    <div className={styles.footerLink}>Care Instructions</div>
                    <div className={styles.footerLink}>Contact Us</div>
                </div>
                <div className={styles.copyright}>© 2025 VALENCIRĖ® – AIN'T FOR AVERAGE</div>
            </div>

            {/* Sticky Bar */}
            <div className={`${styles.stickyActionBar} ${stickyVisible ? styles.visible : ''}`} id="stickyActionBar">
                <div className={styles.stickyInfo}>
                    <div className={styles.stickyPrice}>₹{(product.price * quantity).toLocaleString()}</div>
                    <div className={styles.stickySize}>Size: {selectedSize}</div>
                </div>
                <button className={styles.stickyBtn} onClick={addToCart}>ADD TO CART</button>
            </div>

            {/* Notification */}
            <div
                className={`${styles.cartNotification} ${notification.show ? styles.show : ""}`}
            >
                {notification.message}
            </div>

        </div>
    );
}

export default function ProductPage() {
    return (
        <Suspense fallback={<div style={{ height: '100vh', background: '#000' }}></div>}>
            <ProductContent />
        </Suspense>
    );
}
