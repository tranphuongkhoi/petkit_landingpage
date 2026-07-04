"use client";

import { useAppPreferences } from "@/components/providers/app-preferences";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { translateCategory, translateProductUi, translateRole, translateSpecLabel } from "@/lib/i18n/product-text";
import { formatUsd, formatVndReference } from "@/lib/pricing";

export function CategoryLabel({ value }: { value: string }) {
  const { dictionary } = useAppPreferences();
  return <>{translateCategory(dictionary, value)}</>;
}

export function RoleLabel({ value }: { value: string }) {
  const { dictionary } = useAppPreferences();
  return <>{translateRole(dictionary, value)}</>;
}

export function SpecLabel({ value }: { value: string }) {
  const { dictionary } = useAppPreferences();
  return <>{translateSpecLabel(dictionary, value)}</>;
}

export function CommonLabel({ value }: { value: keyof Dictionary["common"] }) {
  const { dictionary } = useAppPreferences();
  return <>{dictionary.common[value]}</>;
}

export function CartLabel({ value }: { value: keyof Dictionary["cart"] }) {
  const { dictionary } = useAppPreferences();
  return <>{dictionary.cart[value]}</>;
}

export function ProductLabel({ value }: { value: keyof Dictionary["product"]["ui"] }) {
  const { dictionary } = useAppPreferences();
  return <>{translateProductUi(dictionary, value)}</>;
}

export function ProductDetailLabel({ value }: { value: keyof Dictionary["productDetail"]["gallery"] }) {
  const { dictionary } = useAppPreferences();
  return <>{dictionary.productDetail.gallery[value]}</>;
}

export function GalleryTitle({ value }: { value: string }) {
  const { dictionary } = useAppPreferences();
  return <>{dictionary.productDetail.galleryTitles[value as keyof typeof dictionary.productDetail.galleryTitles] ?? value}</>;
}

export function SpecValue({ value }: { value: string }) {
  const { dictionary } = useAppPreferences();
  return <>{dictionary.productDetail.specValues[value as keyof typeof dictionary.productDetail.specValues] ?? value}</>;
}

export function ProductDescription({ fallback, productId }: { fallback: string; productId: string }) {
  const { dictionary } = useAppPreferences();
  return (
    <>
      {dictionary.productDetail.productDescriptions[
        productId as keyof typeof dictionary.productDetail.productDescriptions
      ] ?? fallback}
    </>
  );
}

export function ProductSectionText({
  fallback,
  value,
}: {
  fallback: string;
  value: keyof Dictionary["productDetail"]["sections"];
}) {
  const { dictionary } = useAppPreferences();
  return <>{dictionary.productDetail.sections[value] ?? fallback}</>;
}

export function LocalizedPrice({ value }: { value: number }) {
  const { locale } = useAppPreferences();

  if (locale === "vi") {
    return <>{formatVndReference(value)}</>;
  }

  return <>{formatUsd(value)}</>;
}
