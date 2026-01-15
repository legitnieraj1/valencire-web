import Link from "next/link";
import styles from "./about.module.css";

export const metadata = {
    title: "About VALENCIRÉ®",
};

export default function AboutPage() {
    return (
        <div className={styles.container}>
            {/* ================= HEADER ================= */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>+ Contact Us</div>

                <div className={styles.logo}>
                    <img src="/LOGO BRO.png" alt="VALENCIRÉ" />
                </div>

                <div className={styles.headerRight}>
                    <span>Account</span>
                    <span>Search</span>
                    <span>Menu</span>
                </div>
            </header>

            {/* ================= MAIN ================= */}
            <main className={styles.main}>
                <section className={styles.about}>
                    <h1>ABOUT VALENCIRÉ</h1>

                    <p>
                        Founded with a vision to redefine modern luxury, VALENCIRÉ® stands at the
                        intersection of strength, elegance, and restraint. The House creates
                        essential silhouettes engineered for presence — not excess.
                    </p>

                    <p>
                        Each piece reflects a commitment to precision, fit, and craftsmanship,
                        designed to elevate form while remaining timeless. VALENCIRÉ® is built for
                        those who move with intent and wear confidence without announcement.
                    </p>

                    <p>
                        Rooted in discipline and refined through design, the brand continues to
                        shape a new language of luxury — one defined by control, clarity, and quiet
                        power.
                    </p>
                </section>

                <div className={styles.spacer}></div>

                <section className={styles.help}>
                    <h2>MAY WE HELP YOU?</h2>

                    <p>
                        Discover everything you need to know about the VALENCIRÉ universe with a
                        dedicated brand advisor.
                    </p>

                    <Link href="#" className={styles.helpLink}>
                        Contact VALENCIRÉ Client Services
                    </Link>
                </section>
            </main>

            {/* ================= FOOTER ================= */}
            <footer className={styles.footer}>
                © 2025 VALENCIRÉ® — AIN’T FOR AVERAGE
            </footer>
        </div>
    );
}
