<script setup lang="ts">
import { SITE } from "../data/site";

const { locale, t } = useI18n();

useSeoMeta({
  title: t("seo.contactTitle"),
  description: SITE.description[locale.value as "en" | "el"],
  ogTitle: t("contact.title"),
  ogDescription: SITE.description[locale.value as "en" | "el"],
});
</script>

<template>
  <div>
    <LocalizedPageHeader :subtitle="t('contact.subtitle')" :title="t('contact.title')" />

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
        <v-row class="ga-y-8">
          <v-col cols="12" md="5">
            <v-card class="pa-6 pa-md-8 h-100">
              <div class="text-overline text-primary">{{ t("contact.infoTitle") }}</div>
              <div class="text-h4 font-weight-bold text-primary mt-2">{{ t("contact.title") }}</div>
              <div class="text-body-1 text-medium-emphasis mt-4">
                {{ t("contact.formHint") }}
              </div>

              <v-list class="bg-transparent mt-6">
                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon color="primary" icon="mdi-phone-outline" />
                  </template>
                  <v-list-item-title>{{ SITE.phone }}</v-list-item-title>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon color="primary" icon="mdi-email-outline" />
                  </template>
                  <v-list-item-title>{{ SITE.email }}</v-list-item-title>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon color="primary" icon="mdi-map-marker-outline" />
                  </template>
                  <v-list-item-title>{{ SITE.location[locale as 'en' | 'el'] }}</v-list-item-title>
                </v-list-item>
              </v-list>

              <div class="d-flex ga-3 mt-6">
                <v-btn
                  icon="mdi-instagram"
                  :href="SITE.socials.instagram"
                  rel="noreferrer"
                  target="_blank"
                  variant="text"
                />
                <v-btn
                  icon="mdi-facebook"
                  :href="SITE.socials.facebook"
                  rel="noreferrer"
                  target="_blank"
                  variant="text"
                />
                <v-btn
                  icon="mdi-map-marker-radius-outline"
                  :href="SITE.socials.googleMaps"
                  rel="noreferrer"
                  target="_blank"
                  variant="text"
                />
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="7">
            <v-card class="pa-6 pa-md-8">
              <ContactInquiryForm :title="t('contact.formTitle')" />
            </v-card>
          </v-col>
        </v-row>

        <v-card class="mt-8 overflow-hidden">
          <iframe
            class="d-block w-100"
            :src="SITE.mapEmbedUrl"
            allowfullscreen=""
            height="420"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </v-card>
      </v-container>
    </section>
  </div>
</template>
