"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

import en from "./translations/en.json";
import fr from "./translations/fr.json";

export type Locale = "en" | "fr";

type TranslationValue = string | unknown[];

const translations: Record<Locale, Record<string, TranslationValue>> = {
  en: en as unknown as Record<string, TranslationValue>,
  fr: fr as unknown as Record<string, TranslationValue>,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  tArray: (key: string) => unknown[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const LOCALE_STORAGE_KEY = "roastmyresume_locale";

function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const lang = navigator.language?.toLowerCase() || "";
  if (lang.startsWith("fr")) return "fr";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (stored && (stored === "en" || stored === "fr")) {
      setLocaleState(stored);
    } else {
      const detected = detectBrowserLocale();
      setLocaleState(detected);
      localStorage.setItem(LOCALE_STORAGE_KEY, detected);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      document.documentElement.lang = locale;
    }
  }, [locale, isHydrated]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const dict = translations[locale];
      let value = dict[key];
      if (typeof value !== "string") {
        value = translations.en[key];
      }
      if (typeof value !== "string") return key;

      if (vars) {
        let result = value as string;
        for (const [k, v] of Object.entries(vars)) {
          result = result.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
        return result;
      }
      return value as string;
    },
    [locale]
  );

  const tArray = useCallback(
    (key: string): unknown[] => {
      const dict = translations[locale];
      const value = dict[key];
      if (Array.isArray(value)) return value;
      const enValue = translations.en[key];
      if (Array.isArray(enValue)) return enValue;
      return [];
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
