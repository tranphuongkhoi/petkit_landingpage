export function getRouteHref(href: string) {
  if (href === "#top" || href === "/#top") return "/";
  if (href === "#product") return "/products";
  if (href.startsWith("#")) return "/products";
  return href;
}

export function scrollToSection(target: string) {
  const id = target.replace(/^#/, "");
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
