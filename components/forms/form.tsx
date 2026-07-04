"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  readStoredArray,
  type StoredCartItem,
} from "@/lib/cart-storage";
import { useAppPreferences } from "@/components/providers/app-preferences";
import { productCatalog } from "@/lib/product-catalog";
import { STORAGE_KEYS } from "@/lib/constants";

type UpdateInterestFormField = {
  label: string;
  name: string;
  placeholder: string;
  type: string;
};

type UpdateInterestFormProps = {
  body?: string;
  cartItems: StoredCartItem[];
  disclaimer?: string;
  fields?: UpdateInterestFormField[];
  heading?: string;
  pageLabel: string;
  submitLabel?: string;
  variant?: "panel" | "compact";
};

export function UpdateInterestForm({
  body,
  cartItems,
  disclaimer,
  fields,
  heading,
  pageLabel,
  submitLabel,
  variant = "panel",
}: UpdateInterestFormProps) {
  const { dictionary } = useAppPreferences();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "validationError" | "submitError">("idle");
  const [contactDraft, setContactDraft] = useState({ email: "", name: "" });
  const resolvedFields = fields ?? [
    { label: dictionary.form.name, name: "name", placeholder: dictionary.form.namePlaceholder, type: "text" },
    { label: dictionary.form.email, name: "email", placeholder: dictionary.form.emailPlaceholder, type: "email" },
  ];
  const resolvedBody = body ?? dictionary.form.body;
  const resolvedDisclaimer = disclaimer ?? dictionary.form.disclaimer;
  const resolvedHeading = heading ?? dictionary.form.heading;
  const resolvedSubmitLabel = submitLabel ?? dictionary.form.submit;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEYS.contactDraft);
      if (stored) setContactDraft(JSON.parse(stored) as { email: string; name: string });
    } catch {
      setContactDraft({ email: "", name: "" });
    }
  }, []);

  const updateContactDraft = (fieldName: string, value: string) => {
    if (fieldName !== "name" && fieldName !== "email") return;

    setContactDraft((draft) => {
      const nextDraft = { ...draft, [fieldName]: value };
      window.localStorage.setItem(STORAGE_KEYS.contactDraft, JSON.stringify(nextDraft));
      return nextDraft;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!name || !email) {
      setStatus("validationError");
      return;
    }

    setStatus("submitting");

    const savedProductIds = readStoredArray<string>(STORAGE_KEYS.wishlist, []);
    const savedProducts = savedProductIds
      .map((id) => productCatalog.find((product) => product.id === id))
      .filter((product): product is (typeof productCatalog)[number] => Boolean(product));
    const cartSummary = cartItems.map((item) => `${item.name} x${item.quantity}`).join(", ");
    const savedSummary = savedProducts.map((product) => product.name).join(", ");
    const interestSummary = [
      cartSummary ? `Cart: ${cartSummary}` : "",
      savedSummary ? `Saved: ${savedSummary}` : "",
    ].filter(Boolean);
    const productName = interestSummary.length > 0 ? interestSummary.join("; ") : "Pura Max 2";
    const productId =
      [...cartItems.map((item) => item.id), ...savedProducts.map((product) => product.id)].filter(Boolean).join(",") ||
      "puramax-2";
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = maxScroll > 0 ? Math.round((window.scrollY / maxScroll) * 100) : 0;

    try {
      const response = await fetch("/api/events", {
        body: JSON.stringify({
          email,
          eventType: "lead_submit",
          metadata: {
            action: "notify_me",
            cartItems: cartItems.reduce((total, item) => total + item.quantity, 0),
            cartProducts: cartSummary,
            location: variant === "compact" ? "cart_drawer_update_form" : "landing_updates_form",
            savedProducts: savedSummary,
          },
          name,
          page: pageLabel,
          productId,
          productName,
          scrollDepth,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) throw new Error("Lead submit failed");

      setStatus("success");
    } catch (error) {
      console.error("Lead submit failed", error);
      setStatus("submitError");
    }
  };

  return (
    <div className={variant === "panel" ? "mx-auto max-w-3xl rounded-[2rem] bg-[var(--card)] p-8 text-center sm:p-12" : ""}>
      <div className={variant === "compact" ? "text-left" : ""}>
        <h2 className={variant === "compact" ? "text-xl font-bold" : "text-3xl font-bold leading-tight sm:text-4xl"}>
          {resolvedHeading}
        </h2>
        <p className={variant === "compact" ? "mt-2 text-sm leading-6 text-[var(--muted-foreground)]" : "mx-auto mt-3 max-w-md leading-7 text-[var(--muted-foreground)]"}>
          {resolvedBody}
        </p>
      </div>
      <form className={variant === "compact" ? "mt-4 grid gap-3" : "mx-auto mt-8 flex max-w-md flex-col gap-3 text-left"} onSubmit={handleSubmit}>
        {resolvedFields.map((field) => (
          <label key={field.name}>
            <span className="sr-only">{field.label}</span>
            <input
              className="w-full rounded-xl border border-[color:rgba(32,26,20,0.2)] bg-[var(--background)] px-4 py-3 text-base font-normal outline-none transition focus:border-[var(--primary)]"
              name={field.name}
              onChange={(event) => updateContactDraft(field.name, event.currentTarget.value)}
              placeholder={field.placeholder}
              type={field.type}
              value={field.name === "name" || field.name === "email" ? contactDraft[field.name] : undefined}
            />
          </label>
        ))}
        <button
          className="w-full rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? dictionary.form.submitting : resolvedSubmitLabel}
        </button>
      </form>
      {status === "success" ? (
        <p className="mx-auto mt-4 max-w-md text-sm font-bold text-[var(--primary)]">
          {dictionary.form.success}
        </p>
      ) : null}
      {status === "validationError" ? (
        <p className="mx-auto mt-4 max-w-md text-sm font-bold text-[var(--primary)]">
          {dictionary.form.validationError}
        </p>
      ) : null}
      {status === "submitError" ? (
        <p className="mx-auto mt-4 max-w-md text-sm font-bold text-[var(--primary)]">
          {dictionary.form.submitError}
        </p>
      ) : null}
      <p className={variant === "compact" ? "mt-3 text-xs leading-5 text-[var(--muted-foreground)]" : "mx-auto mt-5 max-w-md text-sm leading-6 text-[var(--muted-foreground)]"}>
        {resolvedDisclaimer}
      </p>
    </div>
  );
}