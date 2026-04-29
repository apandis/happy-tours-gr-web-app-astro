<script setup lang="ts">
import type { SupportedLocale } from "../../shared/i18n";

import { SITE, TRANSFERS_CONTENT } from "../data/site";

const runtimeConfig = useRuntimeConfig();
const { locale, t } = useI18n();
const localizedPath = useLocalizedPath();
const { track } = useAnalytics();

const pageContent = computed(() => TRANSFERS_CONTENT[locale.value as SupportedLocale]);
const canonicalUrl = computed(() => `${runtimeConfig.public.siteUrl}${localizedPath("/transfers")}`);
const seoDescription = computed(() => pageContent.value.overview[0]);

useSeoMeta({
  title: t("seo.transfersTitle"),
  description: seoDescription.value,
  ogTitle: t("transfers.title"),
  ogDescription: seoDescription.value,
  ogImage: "/images/happy-tours-kavos-transfer.jpeg",
  ogUrl: canonicalUrl.value,
  twitterCard: "summary_large_image",
});

useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: canonicalUrl.value,
    },
  ],
  script: [
    {
      key: "transfers-service-schema",
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            name: `${SITE.name} ${t("transfers.title")}`,
            description: seoDescription.value,
            serviceType: t("transfers.kicker"),
            areaServed: [
              { "@type": "Place", name: "Corfu Airport" },
              { "@type": "Place", name: "Corfu Port" },
              { "@type": "Place", name: "Lefkimmi Port" },
              { "@type": "Place", name: "South Corfu" },
              { "@type": "Place", name: "Kavos" },
            ],
            image: `${runtimeConfig.public.siteUrl}/images/happy-tours-kavos-transfer.jpeg`,
            provider: {
              "@type": "LocalBusiness",
              name: SITE.name,
              url: runtimeConfig.public.siteUrl,
              telephone: SITE.phone,
              email: SITE.email,
              areaServed: "Corfu, Greece",
            },
            availableChannel: {
              "@type": "ServiceChannel",
              servicePhone: {
                "@type": "ContactPoint",
                telephone: SITE.phone,
                contactType: "customer service",
                availableLanguage: ["en", "el"],
              },
            },
            url: canonicalUrl.value,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: t("nav.home"),
                item: `${runtimeConfig.public.siteUrl}${localizedPath("/")}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: t("nav.transfers"),
                item: canonicalUrl.value,
              },
            ],
          },
        ],
      }),
    },
  ],
}));
</script>

<template>
  <div>
    <LocalizedPageHeader :subtitle="t('transfers.subtitle')" :title="t('transfers.title')" />

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
        <v-row class="align-center ga-y-8">
          <v-col cols="12" md="6">
            <v-card class="overflow-hidden">
              <v-img
                :alt="t('transfers.imageAlt')"
                cover
                height="460"
                src="/images/happy-tours-kavos-transfer.jpeg"
              />
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-chip color="primary" variant="tonal">
              {{ t("transfers.kicker") }}
            </v-chip>

            <div class="mt-5">
              <p
                v-for="paragraph in pageContent.overview"
                :key="paragraph"
                class="text-body-1 text-medium-emphasis mb-4"
              >
                {{ paragraph }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
        <v-row class="ga-y-8">
          <v-col cols="12" lg="7">
            <div class="text-overline text-primary">{{ t("transfers.servicesTitle") }}</div>
            <div class="text-h4 text-md-h3 font-weight-bold text-primary mt-2">
              {{ t("transfers.coverageTitle") }}
            </div>
            <div class="text-body-1 text-medium-emphasis text-md-h6 mt-4">
              {{ t("transfers.servicesSubtitle") }}
            </div>

            <v-row class="mt-4">
              <v-col
                v-for="service in pageContent.services"
                :key="service.title"
                cols="12"
                md="6"
              >
                <v-card class="pa-6 h-100">
                  <v-icon :icon="service.icon" color="primary" size="40" />
                  <div class="text-h6 font-weight-bold text-primary mt-5">{{ service.title }}</div>
                  <div class="text-body-1 text-medium-emphasis mt-3">{{ service.description }}</div>
                </v-card>
              </v-col>
            </v-row>

            <v-card class="pa-6 mt-6">
              <div class="text-overline text-primary">{{ t("transfers.coverageTitle") }}</div>
              <div class="text-body-1 text-medium-emphasis mt-2">
                {{ t("transfers.coverageSubtitle") }}
              </div>

              <v-list class="bg-transparent mt-4">
                <v-list-item
                  v-for="area in pageContent.coverage"
                  :key="area"
                  class="px-0"
                >
                  <template #prepend>
                    <v-icon color="accent" icon="mdi-check-circle-outline" />
                  </template>
                  <v-list-item-title class="text-body-1">{{ area }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>

            <v-alert class="mt-6" color="accent" variant="tonal">
              <div class="text-subtitle-1 font-weight-bold mb-2">{{ t("transfers.noteTitle") }}</div>
              <div class="text-body-1">{{ pageContent.note }}</div>
            </v-alert>
          </v-col>

          <v-col cols="12" lg="5">
            <v-card class="pa-6 pa-md-8">
              <ContactInquiryForm
                :initial-selection="pageContent.inquiryOptions[0]"
                :message-placeholder="t('transfers.messagePlaceholder')"
                :selection-items="pageContent.inquiryOptions"
                :selection-label="t('transfers.requestLabel')"
                :selection-placeholder="t('transfers.requestPlaceholder')"
                :show-cruise-type="false"
                :title="t('transfers.formTitle')"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
        <v-card class="pa-6 pa-md-10 text-center">
          <div class="text-h4 text-md-h3 font-weight-bold text-primary">{{ t("transfers.ctaTitle") }}</div>
          <v-responsive class="mx-auto mt-4" max-width="720">
            <div class="text-body-1 text-medium-emphasis text-md-h6">{{ t("transfers.ctaBody") }}</div>
          </v-responsive>

          <div class="d-flex flex-wrap justify-center ga-4 mt-8">
            <v-btn color="accent" :to="localizedPath('/tours')" @click="track('transfers_tours_cta_click')">
              {{ t("transfers.primaryCta") }}
            </v-btn>
            <v-btn color="primary" :to="localizedPath('/contact')" variant="outlined" @click="track('transfers_contact_cta_click')">
              {{ t("transfers.secondaryCta") }}
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </section>
  </div>
</template>
