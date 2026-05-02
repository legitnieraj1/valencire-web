import { ALL_PRODUCTS } from "@/data/products";
import Link from "next/link";
import CollectionProductBrowser from "@/components/CollectionProductBrowser";

export default async function CollectionPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { category } = params;
  const sort = searchParams.sort;

  let filteredProducts = ALL_PRODUCTS.filter((p) => p.category === category);

  if (sort) {
    filteredProducts = filteredProducts.filter((p) => p.subcategory === sort);
  }

  const title = sort
    ? sort.replace(/-/g, " ")
    : category.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-paper pt-8 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <div
          className="flex items-center gap-2 text-xs font-light text-stone mb-12"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Link href="/" className="hover:text-ink transition-colors">home</Link>
          <span>/</span>
          <span className="text-ink lowercase">{title}</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <h1
            className="text-4xl md:text-5xl font-light text-ink tracking-[-0.02em] lowercase"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {title}
          </h1>
        </div>

        <CollectionProductBrowser products={filteredProducts} title={title} />
      </div>
    </div>
  );
}
