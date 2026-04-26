import { ALL_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function CollectionPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { category } = params;
  const sort = searchParams.sort;

  // Filter products by category
  let filteredProducts = ALL_PRODUCTS.filter((p) => p.category === category);

  // If there's a sort parameter, filter further by subcategory
  if (sort) {
    filteredProducts = filteredProducts.filter((p) => p.subcategory === sort);
  }

  // Formatting title
  const title = sort 
    ? sort.replace(/-/g, " ") 
    : category.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 font-ui">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-12">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black capitalize">{title}</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold text-black tracking-tight capitalize">
            {title}
          </h1>
          <p className="text-sm text-gray-500 mt-4 max-w-xl">
            Explore our curated selection of {title.toLowerCase()}. Crafted with precision and the finest materials for the modern wardrobe.
          </p>
        </div>

        {/* Filter/Sort Bar */}
        <div className="flex justify-between items-center py-4 border-y border-gray-100 mb-12">
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-black">
            <button className="hover:text-gray-500 transition-colors">Filter +</button>
            <span className="text-gray-400">{filteredProducts.length} Results</span>
          </div>
          <select className="text-[11px] font-bold uppercase tracking-widest text-black bg-transparent outline-none cursor-pointer">
            <option>Sort By: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} prod={prod} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border border-gray-50 bg-gray-50/50 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-400 mb-4">No products found.</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              We couldn't find any products matching "{title}". Please try selecting a different category or fit.
            </p>
            <Link href="/" className="mt-8 inline-block px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
