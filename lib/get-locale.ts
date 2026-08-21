import { cookies } from "next/headers";
import { Locale } from "./types";
import { LOCALE_COOKIE, DEFAULT_LOCALE } from "./i18n";

// Server-only: usar únicamente desde Server Components / Server Actions.
// Separado de lib/i18n.ts para no arrastrar next/headers a los Client
// Components que solo necesitan t()/pick().
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : DEFAULT_LOCALE;
}
