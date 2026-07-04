"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { GalleryTitle, ProductDetailLabel } from "@/components/i18n/localized-product-text";
import type { ProductGalleryProps } from "@/types/product-ui";

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];
  const showPrevious = () => setActiveIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  const showNext = () => setActiveIndex((index) => (index === images.length - 1 ? 0 : index + 1));

  return (
    <section className="mt-24">
      <div className="grid gap-10 lg:grid-cols-[0.36fr_1fr] lg:items-start">
        <div>
          <p className="text-[0.68rem] font-bold uppercase text-[var(--primary)]">
            <ProductDetailLabel value="eyebrow" />
          </p>
          <h2 className="mt-5 max-w-sm text-4xl font-bold leading-tight">
            <ProductDetailLabel value="title" />
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-[var(--muted-foreground)]">
            <ProductDetailLabel value="body" />
          </p>
        </div>
        <div>
          <div className="relative overflow-hidden rounded-[1.8rem] bg-[color:rgba(236,214,177,0.58)]">
            <button
              aria-label="View larger product image"
              className="block w-full"
              type="button"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                alt={activeImage.alt}
                className="aspect-[16/10] h-full w-full object-cover"
                height={720}
                src={activeImage.src}
                width={1080}
              />
            </button>
            <CarouselButton label="Previous image" side="left" onClick={showPrevious} />
            <CarouselButton label="Next image" side="right" onClick={showNext} />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {images.map((image, index) => (
              <button
                key={image.src}
                aria-label={`Show ${image.title}`}
                className={[
                  "overflow-hidden rounded-xl border bg-[color:rgba(236,214,177,0.58)]",
                  activeIndex === index ? "border-[var(--primary)] ring-2 ring-[color:rgba(149,125,95,0.22)]" : "border-transparent",
                ].join(" ")}
                type="button"
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  alt={image.alt}
                  className="aspect-square h-full w-full object-cover"
                  height={160}
                  src={image.src}
                  width={160}
                />
              </button>
            ))}
          </div>
          <p className="mt-3 text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">
            <GalleryTitle value={activeImage.title} />
          </p>
        </div>
      </div>

      {lightboxOpen ? (
        <div className="fixed inset-0 z-[80] bg-[rgba(32,26,20,0.78)] p-4">
          <button aria-label="Close image viewer" className="absolute inset-0" type="button" onClick={() => setLightboxOpen(false)} />
          <div className="relative mx-auto flex h-full max-w-5xl items-center justify-center">
            <button
              aria-label="Close image viewer"
              className="absolute right-0 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--foreground)]"
              type="button"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              aria-label="Previous image"
              className="absolute left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--foreground)]"
              type="button"
              onClick={showPrevious}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <Image
              alt={activeImage.alt}
              className="max-h-[86vh] w-auto rounded-[1.5rem] object-contain"
              height={1080}
              src={activeImage.src}
              width={1440}
            />
            <button
              aria-label="Next image"
              className="absolute right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--foreground)]"
              type="button"
              onClick={showNext}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function CarouselButton({ label, onClick, side }: { label: string; onClick: () => void; side: "left" | "right" }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      aria-label={label}
      className={[
        "absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[var(--foreground)] shadow-lg transition hover:bg-white",
        side === "left" ? "left-4" : "right-4",
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
