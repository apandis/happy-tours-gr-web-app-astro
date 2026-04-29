<script setup lang="ts">
import { FAQS, SITE } from "../data/site";

const { locale, t } = useI18n();

useSeoMeta({
  title: t("seo.faqTitle"),
  description: SITE.description[locale.value as "en" | "el"],
  ogTitle: t("faq.title"),
  ogDescription: SITE.description[locale.value as "en" | "el"],
});
</script>

<template>
  <div>
    <LocalizedPageHeader :subtitle="t('faq.subtitle')" :title="t('faq.title')" />

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
        <v-responsive class="mx-auto" max-width="800">
          <v-expansion-panels variant="popout">
            <v-expansion-panel
              v-for="faq in FAQS[locale as 'en' | 'el']"
              :key="faq.question"
            >
              <v-expansion-panel-title class="text-primary font-weight-bold">
                {{ faq.question }}
              </v-expansion-panel-title>
              <v-expansion-panel-text class="text-body-1 text-medium-emphasis">
                {{ faq.answer }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-responsive>
      </v-container>
    </section>
  </div>
</template>
