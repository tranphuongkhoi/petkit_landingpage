import Image from "next/image";
import Link from "next/link";
import { formatProductPrice } from "@/lib/product-catalog";
import type { ProductSuiteProps } from "@/types/product-ui";

export function ProductSuite({ products }: ProductSuiteProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-24 border-t border-[var(--border)] pt-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-4xl leading-tight">Complete the suite</h2>
        <Link
          className="text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)] transition hover:text-[var(--primary)]"
          href="/products"
        >
          Back to lineup
        </Link>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            className="group block overflow-hidden rounded-[1.35rem] bg-white/45 transition hover:-translate-y-0.5 hover:shadow-xl"
            href={`/products/${item.slug}`}
          >
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[color:rgba(236,214,177,0.58)] p-4">
              {item.image ? (
                <Image
                  alt={item.image.alt}
                  className="h-full w-full rounded-xl object-contain transition duration-500 group-hover:scale-[1.03]"
                  height={item.image.height}
                  src={item.image.src}
                  width={item.image.width}
                />
              ) : null}
            </div>
            <div className="p-5">
              <p className="text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">{item.role}</p>
              <h3 className="mt-1 min-h-10 text-base font-bold leading-tight">{item.name}</h3>
              <p className="mt-3 font-display text-lg font-bold text-[var(--primary)]">{formatProductPrice(item)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
