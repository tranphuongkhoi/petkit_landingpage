import { getCompareSpecValue, PRODUCT_COMPARE_ROWS } from "@/lib/product-compare";
import type { ProductCompareProps } from "@/types/product-ui";

export function ProductCompare({ currentProductId, products }: ProductCompareProps) {
  if (products.length === 0) return null;

  return (
    <section id="compare" className="mt-24 border-y border-[var(--border)] py-16">
      <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr]">
        <div>
          <p className="text-[0.68rem] font-bold uppercase text-[var(--primary)]">Compare</p>
          <h2 className="mt-5 max-w-sm font-serif text-4xl leading-tight">Compare by daily role.</h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">
            Compare the products in the same decision set and keep the active product visually anchored.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="py-4 pr-5 text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">Spec</th>
                {products.map((product) => (
                  <th
                    key={product.id}
                    className={[
                      "px-5 py-4 align-bottom",
                      product.id === currentProductId ? "bg-white/70 text-[var(--primary)]" : "",
                    ].join(" ")}
                  >
                    <span className="block text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">
                      {product.role}
                    </span>
                    <span className="mt-1 block font-display text-base font-bold">{product.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCT_COMPARE_ROWS.map((row) => (
                <tr key={row} className="border-b border-[var(--border)] last:border-b-0">
                  <th className="py-4 pr-5 text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">
                    {row}
                  </th>
                  {products.map((product) => (
                    <td
                      key={`${product.id}-${row}`}
                      className={[
                        "px-5 py-4 text-sm font-semibold leading-6",
                        product.id === currentProductId ? "bg-white/70 text-[var(--primary)]" : "",
                      ].join(" ")}
                    >
                      {getCompareSpecValue(product, row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
