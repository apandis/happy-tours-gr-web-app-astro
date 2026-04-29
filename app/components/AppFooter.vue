<script setup lang="ts">
import { SITE } from "../data/site";

const { t, locale } = useI18n();
const localizedPath = useLocalizedPath();

const links = computed(() => [
  { label: t("nav.tours"), to: localizedPath("/tours") },
  { label: t("nav.transfers"), to: localizedPath("/transfers") },
  { label: t("nav.about"), to: localizedPath("/about") },
  { label: t("nav.gallery"), to: localizedPath("/gallery") },
  { label: t("nav.faq"), to: localizedPath("/faq") },
  { label: t("nav.contact"), to: localizedPath("/contact") },
]);
</script>

<template>
  <v-footer class="bg-background pt-8 pt-md-12 pb-6">
    <v-container>
      <v-row class="ga-y-8">
        <v-col cols="12" md="4">
          <v-responsive class="mb-4 text-primary" max-width="144">
            <BrandLogoIcon class="d-block w-100" />
          </v-responsive>
          <div class="text-body-1 text-medium-emphasis">{{ SITE.description[locale as "en" | "el"] }}</div>

          <div class="mt-5 text-body-2">
            <div>{{ SITE.phone }}</div>
            <div>{{ SITE.email }}</div>
            <div>{{ SITE.location[locale as "en" | "el"] }}</div>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div class="text-subtitle-1 font-weight-bold text-primary mb-3">{{ t("footer.explore") }}</div>
          <div class="d-flex flex-column align-start ga-2">
            <v-btn
              v-for="link in links"
              :key="link.to"
              class="justify-start px-0 text-none"
              :ripple="false"
              :to="link.to"
              variant="plain"
            >
              {{ link.label }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div class="text-subtitle-1 font-weight-bold text-primary mb-3">{{ t("contact.followUs") }}</div>
          <div class="d-flex ga-2 mb-4">
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
              icon="mdi-map-marker-outline"
              :href="SITE.socials.googleMaps"
              rel="noreferrer"
              target="_blank"
              variant="text"
            />
          </div>

          <div class="d-flex flex-column align-start ga-2">
            <v-btn class="justify-start px-0 text-none" :ripple="false" :to="localizedPath('/privacy-policy')" variant="plain">
              {{ t("footer.privacy") }}
            </v-btn>
            <v-btn class="justify-start px-0 text-none" :ripple="false" :to="localizedPath('/terms-and-conditions')" variant="plain">
              {{ t("footer.terms") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-6" />

      <div class="text-body-2 text-medium-emphasis">
        &copy; {{ new Date().getFullYear() }} {{ t("site.name") }}. {{ t("footer.rights") }}.
      </div>
    </v-container>
  </v-footer>
</template>
