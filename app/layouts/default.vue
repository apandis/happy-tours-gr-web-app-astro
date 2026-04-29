<script setup lang="ts">
import { SITE } from "../data/site";

const runtimeConfig = useRuntimeConfig();
const { locale, t } = useI18n();
const gtmId = computed(() => runtimeConfig.public.gtmId);

const localeHead = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
});

useHead(() => ({
  ...localeHead.value,
  htmlAttrs: {
    ...localeHead.value.htmlAttrs,
    lang: locale.value,
  },
  script: [
    ...(gtmId.value
      ? [
          {
            key: "google-tag-manager",
            textContent:
              `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':` +
              `new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],` +
              `j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=` +
              `'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);` +
              `})(window,document,'script','dataLayer','${gtmId.value}');`,
          },
        ]
      : []),
    {
      key: "local-business-schema",
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: SITE.name,
        description: SITE.description[locale.value as "en" | "el"],
        url: runtimeConfig.public.siteUrl,
        telephone: SITE.phone,
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kavos",
          addressRegion: "Corfu",
          addressCountry: "GR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.coordinates.latitude,
          longitude: SITE.coordinates.longitude,
        },
        provider: {
          "@type": "LocalBusiness",
          name: SITE.name,
          telephone: SITE.phone,
          email: SITE.email,
          sameAs: [
            SITE.socials.instagram,
            SITE.socials.facebook,
            SITE.socials.googleMaps,
          ],
        },
      }),
    },
  ],
  noscript: gtmId.value
    ? [
        {
          key: "google-tag-manager-noscript",
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId.value}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          tagPosition: "bodyOpen",
        },
      ]
    : [],
  meta: [
    {
      name: "description",
      content: SITE.description[locale.value as "en" | "el"],
    },
    {
      property: "og:site_name",
      content: t("site.name"),
    },
  ],
}));
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main class="bg-background">
      <slot />
    </v-main>
    <AppFooter />
  </v-app>
</template>
