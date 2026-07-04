export const VND_REFERENCE_RATE = 25000;

export const pricingContext = {
  defaultCurrency: "USD",
  vietnameseCurrency: "VND",
  vndReferenceRate: VND_REFERENCE_RATE,
  note:
    "Product data stores USD reference pricing. Vietnamese UI displays VND reference pricing by multiplying USD by 25,000; final pricing may vary by market and purchase channel.",
};

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    style: "currency",
  }).format(value);
}

export function formatVndReference(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value * VND_REFERENCE_RATE);
}
