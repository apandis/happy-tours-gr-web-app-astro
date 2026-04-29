<script setup lang="ts">
import { SITE } from "../data/site";

const { locale, t } = useI18n();
const localizedPath = useLocalizedPath();

useSeoMeta({
  title: t("seo.thankYouTitle"),
  description: SITE.description[locale.value as "en" | "el"],
});
</script>

<template>
  <section>
    <v-container class="py-10 py-md-14">
      <v-responsive class="mx-auto" max-width="720">
        <v-card class="pa-8 pa-md-12 text-center">
        <v-avatar color="success" size="72">
          <v-icon color="white" icon="mdi-check" size="40" />
        </v-avatar>

        <div class="text-h4 text-md-h3 font-weight-bold text-primary mt-6">{{ t("thankYou.title") }}</div>
        <v-responsive class="mx-auto mt-4" max-width="576">
          <div class="text-body-1 text-medium-emphasis text-md-h6">{{ t("thankYou.subtitle") }}</div>
        </v-responsive>

        <div class="d-flex justify-center flex-wrap ga-4 mt-8">
          <v-btn color="primary" :to="localizedPath('/')">{{ t("thankYou.primaryCta") }}</v-btn>
          <v-btn color="accent" :to="localizedPath('/tours')">{{ t("thankYou.secondaryCta") }}</v-btn>
        </div>
        </v-card>
      </v-responsive>
    </v-container>
  </section>
</template>
