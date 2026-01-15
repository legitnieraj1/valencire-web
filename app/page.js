"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// Product Data
const products = [
  {
    id: 1,
    name: "AMETHYST NOIR™",
    price: 1800,
    category: "compression",
    images: { back: "/BACK 1.png", front: "/FRONT 1.png" },
    desc: "Premium compression fit with moisture-wicking technology",
    new: true,
  },
  {
    id: 2,
    name: "blood noir™",
    price: 1800,
    category: "compression",
    images: { back: "/BACK 2.png", front: "/FRONT 3.png" },
    desc: "Engineered for performance and style",
    new: true,
  },
  {
    id: 3,
    name: "PHANTOM PRO™",
    price: 1800,
    category: "oversized",
    images: {
      back: "/valencire blue back .png",
      front: "/valencire blue final out .png",
    },
    desc: "Premium compression fit with moisture-wicking technology",
    new: false,
  },
];

export default function Home() {
  const router = useRouter();

  // State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [transitionActive, setTransitionActive] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "" });

  // Load Cart & Scroll Listener
  useEffect(() => {
    // Load Cart
    try {
      const stored = localStorage.getItem("valencire_cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }

    // Scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);

    // Loader Timeout
    setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save Cart
  useEffect(() => {
    localStorage.setItem("valencire_cart", JSON.stringify(cart));
  }, [cart]);

  // Actions
  const showNotification = (msg) => {
    setNotification({ show: true, message: msg });
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };

  const addToCart = (product, size) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.id === product.id && p.size === size
      );
      if (existing) {
        return prev.map((p) =>
          p.id === product.id && p.size === size
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          size,
          image: product.images.back,
          quantity: 1,
        },
      ];
    });
    showNotification("Added to cart");
    setIsCartOpen(true);
  };

  const updateQuantity = (id, size, change) => {
    setCart((prev) => {
      return prev.map(item => {
        if (item.id === id && item.size === size) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null; // Logic to remove if <= 0 handled carefully below or we filter
        }
        return item;
      }).filter(Boolean); // Remove nulls
    });
  };

  const removeItem = (id, size) => {
    setCart((prev) => prev.filter((p) => !(p.id === id && p.size === size)));
    showNotification("Item removed");
  };

  const navigateTo = (url) => {
    setTransitionActive(true);
    // Re-show loader for transition effect
    setIsLoading(true);
    setTimeout(() => {
      router.push(url);
    }, 600);
  };

  // Derived Data
  const filteredProducts =
    currentFilter === "all"
      ? products
      : products.filter(
        (p) =>
          p.category === currentFilter || (currentFilter === "new" && p.new)
      );

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Page Loader */}
      <div
        className={`${styles.pageLoader} ${!isLoading ? styles.fadeOut : ""}`}
      >
        <img
          src="/LOGO BRO.png"
          alt="VALENCIRĖ"
          className={styles.loaderLogo}
        />
        <div className={styles.loaderBarContainer}>
          <div className={styles.loaderBar}></div>
        </div>
        <div className={styles.loaderText}>Loading Experience</div>
      </div>

      {/* Transition Overlay */}
      <div
        className={`${styles.transitionOverlay} ${transitionActive ? styles.active : ""
          }`}
      ></div>

      {/* Notification */}
      <div
        className={`${styles.notification} ${notification.show ? styles.show : ""
          }`}
      >
        {notification.message}
      </div>

      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.headerLeft}>
          <div
            className={styles.navLink}
            onClick={() =>
              document.getElementById("shop").scrollIntoView({ behavior: "smooth" })
            }
          >
            Collection
          </div>
        </div>

        <div className={styles.logo}>
          <img src="/LOGO BRO.png" alt="VALENCIRĖ" />
        </div>

        <div className={styles.headerRight}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            onClick={() => navigateTo("/account")}
            style={{ cursor: "pointer" }}
          >
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4 20c2-4 14-4 16 0"></path>
          </svg>

          <div
            className={styles.iconWrapper}
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M6 7h12l-1 13H7z"></path>
              <path d="M9 7V5a3 3 0 0 1 6 0v2"></path>
            </svg>
            <div
              className={`${styles.cartCount} ${cartTotalItems > 0 ? styles.active : ""
                }`}
            >
              {cartTotalItems}
            </div>
          </div>

          <span
            className={styles.navLink}
            onClick={() => setIsMenuOpen(true)}
          >
            MENU
          </span>
        </div>
      </header>

      <section className={styles.hero}>
        <video
          className={styles.heroVideoDesktop}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <video
          className={styles.heroVideoMobile}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videomobile.mp4" type="video/mp4" />
        </video>

        <div className={styles.heroContent}>
          <div className={styles.heroTitle}>VALENCIRĖ</div>
          <div className={styles.heroSubtitle}>ESTABLISHED 2025</div>
          <button
            className={styles.shopBtn}
            onClick={() =>
              document.getElementById("shop").scrollIntoView({ behavior: "smooth" })
            }
          >
            UPGRADE YOUR INVENTORY
          </button>
        </div>
      </section>

      <div className={styles.filterBar}>
        {["all", "compression", "oversized", "new"].map((f) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${currentFilter === f ? styles.active : ""
              }`}
            onClick={() => {
              setCurrentFilter(f);
              document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
            }}
          >
            {f === "new" ? "New Arrivals" : f}
          </button>
        ))}
      </div>

      <section className={styles.shop} id="shop">
        <h2 className={styles.sectionTitle}>COLLECTION</h2>

        <div className={styles.products}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              styles={styles}
              onAddToCart={addToCart}
              onView={() => navigateTo(`/product?product=${product.id}`)}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className={styles.newsletter}>
        <h2>EXCLUSIVE ACCESS</h2>
        <p>
          Join our community for early access to limited editions, exclusive
          drops, and member-only benefits.
        </p>
        <form
          className={styles.newsletterForm}
          onSubmit={(e) => {
            e.preventDefault();
            showNotification("Thank you for subscribing!");
            e.target.reset();
          }}
        >
          <input type="email" placeholder="YOUR EMAIL ADDRESS" required />
          <button type="submit">SUBSCRIBE</button>
        </form>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h4>VALENCIRĖ®</h4>
            <a onClick={() => navigateTo("/about")}>About Us</a>
            <a href="#">Craftsmanship</a>
            <a href="#">Journal</a>
            <a href="#">Careers</a>
          </div>
          <div className={styles.footerCol}>
            <h4>SHOP</h4>
            <a href="#">Compression Collection</a>
            <a href="#">Oversized Collection</a>
            <a href="#">Limited Editions</a>
            <a href="#">New Arrivals</a>
          </div>
          <div className={styles.footerCol}>
            <h4>SUPPORT</h4>
            <a href="#">Contact Us</a>
            <a href="#">Shipping Information</a>
            <a href="#">Returns & Exchanges</a>
            <a href="#">Size Guide</a>
          </div>
          <div className={styles.footerCol}>
            <h4>FOLLOW</h4>
            <a href="#">Instagram</a>
            <a href="#">X (Twitter)</a>
            <a href="#">YouTube</a>
            <a href="#">TikTok</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          © 2025 VALENCIRĖ® – CRAFTED FOR THE EXTRAORDINARY
        </div>
      </footer>

      {/* Cart Panel */}
      <div
        className={`${styles.cartPanel} ${isCartOpen ? styles.active : ""}`}
      >
        <div className={styles.cartHeader}>
          <h2>YOUR CART</h2>
          <span
            className={styles.closeBtn}
            onClick={() => setIsCartOpen(false)}
          >
            ✕
          </span>
        </div>

        <div className={styles.cartItems}>
          {cart.length === 0 ? (
            <div className={styles.cartEmpty}>Your cart is empty</div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className={styles.cartItem}>
                <img
                  src={item.image}
                  className={styles.cartItemImg}
                  alt={item.name}
                />
                <div className={styles.cartItemDetails}>
                  <div className={styles.cartItemTitle}>{item.name}</div>
                  <div className={styles.cartItemMeta}>Size: {item.size}</div>
                  <div className={styles.cartItemPrice}>
                    ₹{item.price.toLocaleString()}
                  </div>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.size, -1)}
                    >
                      −
                    </button>
                    <span className={styles.qtyDisplay}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.size, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div
                    className={styles.removeItem}
                    onClick={() => removeItem(item.id, item.size)}
                  >
                    Remove
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.cartSummary} style={{ display: "block" }}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toLocaleString()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>₹{cartSubtotal.toLocaleString()}</span>
            </div>
            <button
              className={styles.checkoutBtn}
              onClick={() => {
                showNotification("Proceeding to checkout...");
                setTimeout(() => navigateTo("/cart"), 500);
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>

      {/* Menu Panel */}
      <div
        className={`${styles.menuPanel} ${isMenuOpen ? styles.active : ""}`}
      >
        <div className={styles.cartHeader}>
          <h2>MENU</h2>
          <span
            className={styles.closeBtn}
            onClick={() => setIsMenuOpen(false)}
          >
            ✕
          </span>
        </div>
        <div
          className={styles.menuItem}
          onClick={() => {
            setIsMenuOpen(false);
            document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
          }}
        >
          Collection
        </div>
        <div
          className={styles.menuItem}
          onClick={() => {
            setIsMenuOpen(false);
            navigateTo("/about");
          }}
        >
          About Us
        </div>
        <div className={styles.menuItem}>Craftsmanship</div>
        <div className={styles.menuItem}>Size Guide</div>
        <div className={styles.menuItem}>Contact</div>
        <div className={styles.menuItem}>Shipping Information</div>
      </div>
    </>
  );
}

function ProductCard({ product, styles, onAddToCart, onView, index }) {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className={styles.imageWrap} onClick={onView}>
        <img
          src={product.images.back}
          className={styles.back} // Note: original HTML used class 'back' but standard img src was back.
          // Wait, original logic:
          // <img src="${product.images.back}" class="back">
          // <img src="${product.images.front}" class="front">
          // It had TWO images.
          alt={product.name}
        />
        {/* We need the second image for hover effect */}
        <div className={styles.front}>
          <img src={product.images.front} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {product.new && <div className={styles.badge}>NEW</div>}
      </div>
      <div className={styles.cardInfo}>
        <h3
          className={styles.cardTitle}
          onClick={onView}
          style={{ cursor: "pointer" }}
        >
          {product.name}
        </h3>
        <p className={styles.cardPrice}>₹{product.price.toLocaleString()}</p>
        <p className={styles.cardDesc}>{product.desc}</p>
        <div className={styles.sizeSelector}>
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ""
                }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <button
          className={styles.cardBtn}
          onClick={() => onAddToCart(product, selectedSize)}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
