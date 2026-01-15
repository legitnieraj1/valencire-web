import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { Metadata } from "next";

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);
    if (!product) return { title: "Not Found" };
    return {
        title: `${product.name} | VALENCIRÉ`,
        description: product.description
    }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="bg-black min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <ProductDetails product={product} />
            </div>
        </main>
    );
}
