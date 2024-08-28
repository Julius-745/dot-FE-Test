import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  id: "Indonesia",
};

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  { locales }
);
