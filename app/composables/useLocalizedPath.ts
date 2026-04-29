export function useLocalizedPath() {
  const { locale } = useI18n();

  return (path = "/") => {
    if (path === "/" || path === "") {
      return `/${locale.value}`;
    }

    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `/${locale.value}${normalized}`;
  };
}
