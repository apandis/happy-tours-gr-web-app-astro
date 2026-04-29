<script setup lang="ts">
import { ABOUT_CONTENT, SITE } from "../data/site";

const { locale, t } = useI18n();
const localizedPath = useLocalizedPath();

useSeoMeta({
  title: t("seo.aboutTitle"),
  description: SITE.description[locale.value as "en" | "el"],
  ogTitle: t("about.title"),
  ogDescription: SITE.description[locale.value as "en" | "el"],
  ogImage: "/images/happy-tours-captain.png",
});
</script>

<template>
  <div>
    <LocalizedPageHeader :subtitle="t('about.subtitle')" :title="t('about.title')" />

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
        <v-row class="align-center ga-y-8">
          <v-col cols="12" md="5">
            <v-card class="overflow-hidden">
              <v-img alt="Happy Tours captain" cover height="460" src="/images/happy-tours-captain.png" />
            </v-card>
          </v-col>

          <v-col cols="12" md="7">
            <div class="text-overline text-primary">{{ t("about.storyTitle") }}</div>
            <div class="text-h4 text-md-h3 font-weight-bold text-primary mt-2">{{ t("about.title") }}</div>

            <div class="mt-5">
              <p
                v-for="paragraph in ABOUT_CONTENT[locale as 'en' | 'el'].paragraphs"
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
        <div class="text-h4 text-md-h3 font-weight-bold text-primary mb-8">{{ t("about.reasonsTitle") }}</div>

        <v-row>
          <v-col
            v-for="reason in ABOUT_CONTENT[locale as 'en' | 'el'].reasons"
            :key="reason.title"
            cols="12"
            md="4"
          >
            <v-card class="pa-6 h-100">
              <v-icon :icon="reason.icon" color="primary" size="44" />
              <div class="text-h6 font-weight-bold text-primary mt-5">{{ reason.title }}</div>
              <div class="text-body-1 text-medium-emphasis mt-3">{{ reason.description }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
        <v-card class="pa-6 pa-md-10 text-center">
          <div class="text-h4 text-md-h3 font-weight-bold text-primary">{{ t("about.ctaTitle") }}</div>
          <v-responsive class="mx-auto mt-4" max-width="672">
            <div class="text-body-1 text-medium-emphasis text-md-h6">{{ t("about.ctaBody") }}</div>
          </v-responsive>

          <div class="d-flex flex-wrap justify-center ga-4 mt-8">
            <v-btn color="accent" :to="localizedPath('/tours')">{{ t("about.primaryCta") }}</v-btn>
            <v-btn color="primary" :to="localizedPath('/contact')" variant="outlined">{{ t("about.secondaryCta") }}</v-btn>
          </div>
        </v-card>
      </v-container>
    </section>
  </div>
</template>
