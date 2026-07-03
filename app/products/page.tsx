import Image from "next/image";
import Link from "next/link";
import { FloatingActions } from "@/components/floating-actions";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { StoredProductStatus } from "@/components/product/actions";
import landingContent from "@/content/landing-content.json";
import {
  ecosystemProducts,
  getPublicCardSpecs,
  listingProducts,
  litterBoxProducts,
  productListingNav,
} from "@/lib/product-listing-content";
import { productsPageMetadata } from "@/lib/site-metadata";
import { formatProductPrice, type ProductCatalogItem } from "@/lib/product-catalog";

export const metadata = productsPageMetadata;

export default function ProductsPage() {
  const [featured, ...otherLitterBoxes] = litterBoxProducts;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader brand={landingContent.brand} nav={productListingNav} />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[0.68rem] font-bold uppercase text-[var(--primary)]">The lineup</p>
            <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-tight sm:text-6xl">
              A quiet ecosystem of thoughtful companion care.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-[var(--muted-foreground)]">
              Considered devices that sit gently in the room and take the routine work off your day.
            </p>
          </div>
          <div className="hidden lg:block">
            <StoredProductStatus products={listingProducts} />
          </div>
        </section>

        <section id="litter-boxes" className="mt-20">
          <SectionLabel number="01" title="Litter boxes" />
          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div className="grid gap-7">
              <FeaturedProductCard product={featured} />
              <div className="grid gap-7 md:grid-cols-2">
                {otherLitterBoxes.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="ecosystem" className="mt-24">
          <SectionLabel number="02" title="Smart care add-ons" />
          <div className="mt-8 grid gap-7 md:grid-cols-2 lg:max-w-[calc(100%-19rem)]">
            {ecosystemProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>

      <SiteFooter body={landingContent.footer.body} />
      <FloatingActions />
    </main>
  );
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-[var(--border)] pb-3">
      <span className="text-[0.68rem] font-bold text-[var(--primary)]">{number}</span>
      <h2 className="font-display text-lg font-bold">{title}</h2>
    </div>
  );
}

function FeaturedProductCard({ product }: { product: ProductCatalogItem }) {
  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-white/55 shadow-sm md:grid md:grid-cols-[1fr_0.85fr]">
      <ProductImagePanel product={product} className="min-h-[22rem]" imageClassName="max-w-none object-cover" />
      <div className="flex flex-col justify-center p-8 md:p-10">
        <span className="w-fit rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">
          {product.role}
        </span>
        <p className="mt-6 text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">
          {product.category}
        </p>
        <h3 className="mt-2 font-serif text-4xl leading-tight">{product.name}</h3>
        <ProductPrice product={product} />
        <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">{product.description}</p>
        <SpecRows specs={getPublicCardSpecs(product).slice(0, 4)} />
        <ProductLink product={product} filled />
      </div>
    </article>
  );
}

function ProductCard({ product }: { product: ProductCatalogItem }) {
  return (
    <article className="flex min-h-[34rem] flex-col rounded-[1.35rem] border border-[var(--border)] bg-white/50 p-5 shadow-sm">
      <ProductImagePanel product={product} className="min-h-[15rem] rounded-2xl" imageClassName="max-w-[16rem] object-contain" />
      <div className="flex flex-1 flex-col pt-5">
        <span className="w-fit rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-[0.65rem] font-bold uppercase text-[var(--muted-foreground)]">
          {product.role}
        </span>
        <p className="mt-4 text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">{product.category}</p>
        <h3 className="mt-1 font-serif text-2xl leading-tight">{product.name}</h3>
        <ProductPrice product={product} />
        <p className="mt-4 min-h-24 flex-1 text-sm leading-6 text-[var(--muted-foreground)]">{product.description}</p>
        <SpecRows specs={getPublicCardSpecs(product).slice(0, 3)} />
        <ProductLink product={product} />
      </div>
    </article>
  );
}

function ProductImagePanel({
  className,
  imageClassName,
  product,
}: {
  className: string;
  imageClassName: string;
  product: ProductCatalogItem;
}) {
  return (
    <div className={`flex items-center justify-center overflow-hidden bg-[color:rgba(236,214,177,0.58)] p-6 ${className}`}>
      {product.image ? (
        <Image
          alt={product.image.alt}
          className={`h-full w-full rounded-2xl ${imageClassName}`}
          height={product.image.height}
          src={product.image.src}
          width={product.image.width}
        />
      ) : null}
    </div>
  );
}

function SpecRows({ specs }: { specs: ProductCatalogItem["specs"] }) {
  return (
    <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-[var(--border)] pt-5">
      {specs.map((spec) => (
        <div key={spec.label}>
          <dt className="text-[0.65rem] font-bold uppercase text-[var(--muted-foreground)]">{spec.label}</dt>
          <dd className="mt-1 text-sm font-bold">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProductLink({ filled, product }: { filled?: boolean; product: ProductCatalogItem }) {
  return (
    <Link
      className={[
        "mt-7 inline-flex w-fit items-center text-[0.72rem] font-bold uppercase",
        filled
          ? "rounded-full bg-[var(--foreground)] px-5 py-3 text-white"
          : "border-b border-[var(--foreground)] pb-1 text-[var(--foreground)]",
      ].join(" ")}
      href={`/products/${product.slug}`}
    >
      View details
      <span className="ml-2" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

function ProductPrice({ product }: { product: ProductCatalogItem }) {
  return (
    <p className="mt-3 font-display text-xl font-bold text-[var(--primary)]">
      {formatProductPrice(product)}
      {product.regularPriceUsd ? (
        <span className="ml-2 text-sm font-semibold text-[var(--muted-foreground)] line-through">
          {formatProductPrice({ ...product, priceUsd: product.regularPriceUsd })}
        </span>
      ) : null}
    </p>
  );
}
