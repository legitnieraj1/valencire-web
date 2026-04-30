import { ALL_PRODUCTS } from "@/data/products";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CollectionProductBrowser from "@/components/CollectionProductBrowser";

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

        <CollectionProductBrowser products={filteredProducts} title={title} />
      </div>
    </div>
  );
}
