<script setup lang="ts">
import { LEGAL_COPY, SITE } from "../data/site";

const { locale, t } = useI18n();

useSeoMeta({
  title: t("legal.privacyTitle"),
  description: SITE.description[locale.value as "en" | "el"],
});
</script>

<template>
  <div>
    <LocalizedPageHeader :title="t('legal.privacyTitle')" />

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
        <v-responsive class="mx-auto" max-width="900">
          <v-card class="pa-6 pa-md-8">
          <div class="text-body-2 text-medium-emphasis mb-6">{{ t("legal.lastUpdated") }}</div>

          <p
            v-for="paragraph in LEGAL_COPY[locale as 'en' | 'el'].privacy"
            :key="paragraph"
            class="text-body-1 text-medium-emphasis mb-4"
          >
            {{ paragraph }}
          </p>

          <v-divider class="my-6" />

          <div class="text-body-1">
            <div>{{ SITE.email }}</div>
            <div>{{ SITE.phone }}</div>
          </div>
          </v-card>
        </v-responsive>
      </v-container>
    </section>
  </div>
</template>
