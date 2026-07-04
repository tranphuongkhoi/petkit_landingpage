import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FloatingActions } from "@/components/floating-actions";
import {
  CategoryLabel,
  LocalizedPrice,
  ProductDescription,
  ProductLabel,
  RoleLabel,
  SpecLabel,
  SpecValue,
} from "@/components/i18n/localized-product-text";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { ProductActionBar, RecentlyViewedTracker } from "@/components/product/actions";
import { ProductCompare } from "@/components/product/compare";
import { ProductFaq } from "@/components/product/faq";
import { ProductGallery } from "@/components/product/gallery";
import { ProductSuite } from "@/components/product/suite";
import { ProductWhyItFits } from "@/components/product/why-it-fits";
import landingContent from "@/content/landing-content.json";
import {
  detailRouteNav,
  getComparisonProducts,
  getDefaultFaqs,
  getDetailCaveats,
  getDetailSpecs,
  productFaqs,
  puraMaxGallery,
  whyItFits,
} from "@/lib/product-detail-content";
import { getProductBySlug, productCatalog } from "@/lib/product-catalog";
import type { ProductDetailPageProps } from "@/types/route-props";

export function generateStaticParams() {
  return productCatalog.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found | PETKIT",
    };
  }

  return {
    title: `${product.name} | PETKIT Smart Cat Care`,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = productCatalog.filter((item) => item.id !== product.id);
  const comparisonProducts = getComparisonProducts(product.id);
  const specs = getDetailSpecs(product);
  const specsHeadingKey =
    product.id === "yumshare-solo"
      ? "specsHeadingFeeding"
      : product.id === "eversweet-max-2"
        ? "specsHeadingHydration"
        : "specsHeadingLitter";
  const caveats = getDetailCaveats(product);
  const faqs = productFaqs[product.id] ?? getDefaultFaqs(product);
  const galleryImages = product.id === "puramax-2" ? puraMaxGallery : [];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <RecentlyViewedTracker product={product} />
      <SiteHeader brand={landingContent.brand} nav={detailRouteNav} />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <Link
          className="inline-flex items-center text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)] transition hover:text-[var(--primary)]"
          href="/products"
        >
          <span className="mr-2" aria-hidden="true">
            ←
          </span>
          <ProductLabel value="lineupEyebrow" />
        </Link>

        <section className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(24rem,0.85fr)] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-[var(--border)] bg-white/55 px-3 py-1 text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">
              <RoleLabel value={product.role} />
            </span>
            <p className="mt-8 text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">
              <CategoryLabel value={product.category} />
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-tight sm:text-6xl">{product.name}</h1>
            <div className="mt-6 flex flex-wrap items-end gap-3">
              <p className="font-display text-3xl font-bold text-[var(--primary)]">
                <LocalizedPrice value={product.priceUsd} />
              </p>
              {product.regularPriceUsd ? (
                <p className="pb-1 text-base font-semibold text-[var(--muted-foreground)] line-through">
                  <LocalizedPrice value={product.regularPriceUsd} />
                </p>
              ) : null}
            </div>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--muted-foreground)]">
              <ProductDescription fallback={product.description} productId={product.id} />
            </p>
            <div className="mt-8">
              <ProductActionBar product={product} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--border)] bg-white/55 p-7 shadow-[0_30px_80px_-42px_rgba(32,26,20,0.45)]">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] bg-[color:rgba(236,214,177,0.58)]">
              {product.image ? (
                <Image
                  alt={product.image.alt}
                  className="h-full w-full object-cover"
                  height={product.image.height}
                  priority
                  src={product.image.src}
                  width={product.image.width}
                />
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-24 border-y border-[var(--border)] py-16">
          <div className="grid gap-10 lg:grid-cols-[0.36fr_1fr]">
            <div>
              <p className="text-[0.68rem] font-bold uppercase text-[var(--primary)]">
                <ProductLabel value="detailSpecsEyebrow" />
              </p>
              <h2 className="mt-5 max-w-sm font-serif text-4xl leading-tight">
                <ProductLabel value={specsHeadingKey} />
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">
                <ProductLabel value="detailSpecsBody" />
              </p>
            </div>
            <div>
              <dl className="grid border-t border-[var(--border)] md:grid-cols-2">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-[minmax(7rem,0.55fr)_1fr] gap-4 border-b border-[var(--border)] py-5 md:odd:border-r md:odd:pr-7 md:even:pl-7"
                  >
                    <dt className="text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">
                      <SpecLabel value={spec.label} />
                    </dt>
                    <dd className="text-lg font-bold leading-snug">
                      <SpecValue value={spec.value} />
                    </dd>
                  </div>
                ))}
              </dl>
              {caveats.length > 0 ? (
                <div className="mt-7 space-y-3">
                  {caveats.map((caveat) => (
                    <p key={caveat.label} className="text-sm leading-6 text-[var(--muted-foreground)]">
                      <span className="font-bold text-[var(--foreground)]">
                        <SpecLabel value={caveat.label} />:
                      </span>{" "}
                      <SpecValue value={caveat.value} />
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <ProductGallery images={galleryImages} />

        <ProductFaq
          body={<ProductLabel value="detailFaqBody" />}
          items={faqs}
          productId={product.id}
          title={<><span>{product.name}</span> <ProductLabel value="productFaq" />.</>}
        />

        <ProductWhyItFits fallbackItems={whyItFits[product.id] ?? [{ title: product.role, body: product.fit }]} productId={product.id} />

        <ProductCompare currentProductId={product.id} products={comparisonProducts} />
        <ProductSuite products={relatedProducts} />
      </div>

      <SiteFooter body={landingContent.footer.body} />
      <FloatingActions />
    </main>
  );
}
