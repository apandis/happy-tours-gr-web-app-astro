import { detectPreferredLocale } from "../../shared/i18n";

export default defineEventHandler((event) => {
  const locale = detectPreferredLocale(getHeader(event, "accept-language"));
  return sendRedirect(event, `/${locale}`, 302);
});
