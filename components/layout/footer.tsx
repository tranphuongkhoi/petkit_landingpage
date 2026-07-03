import { PawPrint } from "lucide-react";
import type { SiteFooterProps } from "@/types/layout";

export function SiteFooter({ body }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--border)] px-5">
      <div className="mx-auto flex max-w-6xl items-center gap-2 py-8 text-sm text-[var(--muted-foreground)]">
        <PawPrint className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
        <span>{body}</span>
      </div>
    </footer>
  );
}
