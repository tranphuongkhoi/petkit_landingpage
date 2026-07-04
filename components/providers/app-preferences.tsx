"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Dictionary, type Locale } from "@/lib/i18n/dictionaries";
import { STORAGE_KEYS } from "@/lib/constants";

type Theme = "light" | "dark";

type AppPreferencesContextValue = {
  dictionary: Dictionary;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
  theme: Theme;
  toggleTheme: () => void;
};

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(STORAGE_KEYS.locale);
    const storedTheme = window.localStorage.getItem(STORAGE_KEYS.theme);

    if (storedLocale === "en" || storedLocale === "vi") setLocaleState(storedLocale);
    if (storedTheme === "light" || storedTheme === "dark") setThemeState(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEYS.locale, locale);
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [locale, theme]);

  const value = useMemo<AppPreferencesContextValue>(
    () => ({
      dictionary: dictionaries[locale],
      locale,
      setLocale: setLocaleState,
      setTheme: setThemeState,
      theme,
      toggleTheme: () => setThemeState((current) => (current === "dark" ? "light" : "dark")),
    }),
    [locale, theme],
  );

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);

  if (!context) {
    throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  }

  return context;
}