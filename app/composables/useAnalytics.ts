type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

export function useAnalytics() {
  const route = useRoute();
  const { locale } = useI18n();
  const { gtag } = useGtag();
  const runtimeConfig = useRuntimeConfig();

  function track(eventName: string, params: AnalyticsParams = {}) {
    const eventPayload = {
      locale: locale.value,
      page_path: route.fullPath,
      ...params,
    };

    if (import.meta.client && runtimeConfig.public.gtmId) {
      const windowWithDataLayer = window as Window & {
        dataLayer?: Array<Record<string, string | number | boolean | null | undefined>>;
      };

      windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
      windowWithDataLayer.dataLayer.push({
        event: eventName,
        ...eventPayload,
      });
      return;
    }

    gtag("event", eventName, eventPayload);
  }

  return { track };
}
