import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function CollectionPage() {
    return (
        <main className="bg-black min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 text-center">
                    <h1 className="text-3xl md:text-5xl font-heading text-white tracking-[0.2em] mb-4">Collection 01</h1>
                    <p className="text-xs text-gray-500 tracking-[0.4em] uppercase">Genesis</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}
