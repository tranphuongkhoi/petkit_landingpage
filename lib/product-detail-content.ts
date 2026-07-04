import { type ProductCatalogItem, productCatalog } from "@/lib/product-catalog";
import type { ProductFaqItem } from "@/types/product-ui";

export const detailRouteNav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Lineup" },
  { href: "/products/puramax-2", label: "Pura Max 2" },
  { href: "/products/puramax-2#compare", label: "Compare" },
];

export const whyItFits: Record<string, Array<{ title: string; body: string }>> = {
  "puramax-2": [
    {
      title: "Calm by design",
      body: "A 35 dB cycle helps the routine stay quiet during mornings, evenings, and compact-home use.",
    },
    {
      title: "Considered safety",
      body: "Eleven sensors help watch weight, motion, and approach before the cleaning routine continues.",
    },
    {
      title: "At home in the room",
      body: "The 200 mm low entry and enclosed shape support everyday comfort without adding a camera premium.",
    },
  ],
  "purobot-max-pro-2": [
    {
      title: "Richer visibility",
      body: "Camera-assisted monitoring helps households that want more event context around litter-box visits.",
    },
    {
      title: "Multi-cat clarity",
      body: "Identity-focused features make this the upgrade path when multiple cats share the same routine.",
    },
    {
      title: "Spacious routine",
      body: "The large interior and larger waste bin suit homes that need more automated capacity.",
    },
  ],
  "purobot-crystal-duo": [
    {
      title: "Lowest entry",
      body: "The open-top format and 180 mm entry support households that prioritize easy access.",
    },
    {
      title: "Tray workflow",
      body: "The crystal tray approach is suited for owners who prefer a disposable maintenance routine.",
    },
    {
      title: "Open profile",
      body: "The shape feels less enclosed for cats that do not prefer covered litter boxes.",
    },
  ],
  "yumshare-solo": [
    {
      title: "Scheduled meals",
      body: "Portion planning supports a steadier feeding rhythm through the day.",
    },
    {
      title: "Quiet countertop fit",
      body: "The compact body works as a companion device beside the litter-care routine.",
    },
    {
      title: "Remote check-ins",
      body: "Camera-assisted visibility helps owners follow feeding moments while away.",
    },
  ],
  "eversweet-max-2": [
    {
      title: "Cordless placement",
      body: "Battery-powered use helps the fountain move where the cat naturally drinks.",
    },
    {
      title: "Fresh water rhythm",
      body: "Filtered hydration support pairs naturally with litter care and scheduled feeding.",
    },
    {
      title: "App-connected routine",
      body: "App visibility supports a calmer daily refill and care loop.",
    },
  ],
};

export const productFaqs: Record<string, ProductFaqItem[]> = {
  "puramax-2": [
    {
      question: "Can kittens use Pura Max 2?",
      answer:
        "It is not recommended for cats under 1.5 kg. If a household has both kittens and adult cats, use the kitten-protection guidance in the official instructions.",
    },
    {
      question: "Where should Pura Max 2 be placed?",
      answer:
        "Place it on a hard, flat, stable surface. Avoid soft carpet and avoid blocking the entry path.",
    },
    {
      question: "What happens if Wi-Fi disconnects?",
      answer:
        "Preset settings can continue, but app data will not update until the device reconnects.",
    },
    {
      question: "Which litter works with it?",
      answer:
        "Use most clumping litter. Avoid crystal litter and particles longer than 12 mm, and check official guidance before trying a new litter type.",
    },
    {
      question: "How often should the waste bin be emptied?",
      answer:
        "PETKIT lab data states up to about 15 days for a one-cat household, but actual timing depends on the number of cats, usage frequency, temperature, and humidity.",
    },
    {
      question: "Does it diagnose health issues?",
      answer:
        "No. App and routine data are for daily care reference only. Pura Max 2 is not a medical or veterinary diagnostic device and does not replace advice from a veterinarian.",
    },
  ],
};

export const puraMaxGallery = [
  {
    src: "/images/puramax-2/1.webp",
    alt: "Pura Max 2 product front view",
    title: "Hero view",
  },
  {
    src: "/images/puramax-2/easy-entry.webp",
    alt: "Pura Max 2 low entry product detail",
    title: "Low entry",
  },
  {
    src: "/images/puramax-2/quiet-operation.webp",
    alt: "Pura Max 2 quiet operation visual",
    title: "35 dB routine",
  },
  {
    src: "/images/puramax-2/odor-control.webp",
    alt: "Pura Max 2 odor control system visual",
    title: "Odor control",
  },
  {
    src: "/images/puramax-2/app-tracking.webp",
    alt: "Pura Max 2 app tracking visual",
    title: "App visibility",
  },
  {
    src: "/images/puramax-2/clumping-litter.webp",
    alt: "Pura Max 2 clumping litter compatibility visual",
    title: "Litter fit",
  },
];

export function getDetailSpecs(product: ProductCatalogItem) {
  return product.specs
    .filter(
      (spec) =>
        !spec.label.toLowerCase().includes("caveat") &&
        !spec.label.toLowerCase().includes("litter") &&
        !spec.label.toLowerCase().includes("health"),
    )
    .slice(0, 7);
}

export function getDetailCaveats(product: ProductCatalogItem) {
  return product.specs.filter(
    (spec) =>
      spec.label.toLowerCase().includes("caveat") ||
      spec.label.toLowerCase().includes("litter") ||
      spec.label.toLowerCase().includes("health"),
  );
}

export function getDefaultFaqs(product: ProductCatalogItem): ProductFaqItem[] {
  return [
    {
      question: `Who is ${product.name} best for?`,
      answer: product.fit,
    },
    {
      question: "Which specs matter most before choosing?",
      answer:
        "Review the capacity, routine type, app-control expectations, and any product-specific notes listed above before comparing it with the rest of the lineup.",
    },
    {
      question: "Are availability, warranty, and pricing confirmed here?",
      answer:
        "Prices are shown as USD reference pricing for this product experience. Availability, warranty, and final checkout pricing can vary by market and purchase channel.",
    },
  ];
}

export function getComparisonProducts(productId: string) {
  const primaryLitterIds = new Set(["puramax-2", "purobot-max-pro-2"]);
  const companionIds = new Set(["purobot-crystal-duo", "yumshare-solo", "eversweet-max-2"]);
  const selectedIds = primaryLitterIds.has(productId) ? primaryLitterIds : companionIds;

  return productCatalog.filter((item) => selectedIds.has(item.id));
}

export function getSpecsHeading(product: ProductCatalogItem) {
  if (product.id === "yumshare-solo") {
    return "Built for daily feeding care.";
  }

  if (product.id === "eversweet-max-2") {
    return "Built for daily hydration care.";
  }

  return "Built for daily litter care.";
}
