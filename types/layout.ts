export type SiteNavItem = {
  href: string;
  label: string;
};

export type SiteHeaderProps = {
  brand: {
    href: string;
    name: string;
  };
  cartCount?: number;
  mode?: "landing" | "route";
  nav: SiteNavItem[];
  onCartOpen?: () => void;
};

export type SiteFooterProps = {
  body: string;
};
