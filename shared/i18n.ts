export const supportedLocales = ["en", "el"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export function isSupportedLocale(value: string | undefined): value is SupportedLocale {
  return Boolean(value && supportedLocales.includes(value as SupportedLocale));
}

export function detectPreferredLocale(acceptLanguage?: string | null): SupportedLocale {
  if (!acceptLanguage) {
    return "en";
  }

  const rankedLanguages = acceptLanguage
    .split(",")
    .map((entry) => {
      const [locale, quality = "q=1"] = entry.trim().split(";");
      return {
        locale: locale.split("-")[0],
        quality: Number.parseFloat(quality.split("=")[1] || "1"),
      };
    })
    .sort((a, b) => b.quality - a.quality);

  const preferred = rankedLanguages.find(({ locale }) => isSupportedLocale(locale));
  return preferred?.locale as SupportedLocale || "en";
}
