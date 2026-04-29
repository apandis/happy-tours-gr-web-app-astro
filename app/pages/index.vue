<script setup lang="ts">
import type { SupportedLocale } from "../../shared/i18n";

import { SITE, TRANSFERS_CONTENT } from "../data/site";

const { locale, t } = useI18n();
const localizedPath = useLocalizedPath();
const { track } = useAnalytics();

const { data: tours } = await useAsyncData(`home-tours-${locale.value}`, () =>
  queryCollection("tours")
    .where("lang", "=", locale.value)
    .order("order", "ASC")
    .all(),
);

const transferContent = computed(() => TRANSFERS_CONTENT[locale.value as SupportedLocale]);
const homeTransferServices = computed(() => transferContent.value.services.slice(0, 3));
const isTransferDialogOpen = ref(false);

useSeoMeta({
  title: t("seo.homeTitle"),
  description: SITE.description[locale.value as "en" | "el"],
  ogTitle: t("site.name"),
  ogDescription: SITE.description[locale.value as "en" | "el"],
  ogImage: "/images/blue-lagoon-cave-sivota.jpg",
  twitterCard: "summary_large_image",
});

function openTransferDialog() {
  isTransferDialogOpen.value = true;
  track("home_transfers_request_modal_open");
}
</script>

<template>
  <div>
    <HomeHeroSection />
    <HomeHighlights />

    <section>
      <v-container class="py-10 py-md-14">
        <div class="d-flex flex-column flex-md-row justify-space-between align-start ga-6 mb-10">
          <v-responsive max-width="672">
            <div class="text-h4 text-md-h3 font-weight-bold text-primary">{{ t("home.sectionTitle") }}</div>
            <div class="mt-4 text-body-1 text-medium-emphasis text-md-h6">{{ t("home.sectionSubtitle") }}</div>
          </v-responsive>

          <v-btn color="primary" :to="localizedPath('/about')" variant="outlined">
            {{ t("home.aboutCta") }}
          </v-btn>
        </div>

        <v-row>
          <v-col
            v-for="tour in tours || []"
            :key="tour.path"
            cols="12"
            md="6"
            lg="4"
          >
            <TourCard :tour="tour" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section>
      <v-container class="py-10 py-md-14">
        <v-sheet border class="pa-6 pa-md-10" rounded="xl">
          <v-row class="align-center ga-y-8">
            <v-col cols="12" md="5">
              <v-card class="overflow-hidden" variant="flat">
                <v-img
                  :alt="t('transfers.imageAlt')"
                  cover
                  height="340"
                  src="/images/happy-tours-kavos-transfer.jpeg"
                />
              </v-card>
            </v-col>

            <v-col cols="12" md="7">
              <v-chip color="primary" variant="tonal">
                {{ t("transfers.kicker") }}
              </v-chip>

              <div class="text-h4 text-md-h3 font-weight-bold text-primary mt-5">
                {{ t("home.transfersTitle") }}
              </div>

              <div class="text-body-1 text-medium-emphasis text-md-h6 mt-4">
                {{ t("home.transfersSubtitle") }}
              </div>

              <div class="d-flex flex-wrap ga-4 mt-6">
                <v-btn color="primary" :to="localizedPath('/transfers')" @click="track('home_transfers_cta_click')">
                  {{ t("home.transfersPrimaryCta") }}
                </v-btn>
                <v-btn color="primary" variant="outlined" @click="openTransferDialog">
                  {{ t("home.transfersSecondaryCta") }}
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-8" />

          <v-row>
            <v-col
              v-for="service in homeTransferServices"
              :key="service.title"
              cols="12"
              md="4"
            >
              <v-card class="pa-5 h-100" variant="tonal">
                <v-icon :icon="service.icon" color="primary" size="32" />
                <div class="text-h6 font-weight-bold text-primary mt-4">{{ service.title }}</div>
                <div class="text-body-1 text-medium-emphasis mt-3">{{ service.description }}</div>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
    </section>

    <v-dialog v-model="isTransferDialogOpen" max-width="960" scrollable>
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between ga-4">
          <span class="text-h5 font-weight-bold text-primary">{{ t("transfers.formTitle") }}</span>
          <v-btn
            :aria-label="t('common.close')"
            icon="mdi-close"
            variant="text"
            @click="isTransferDialogOpen = false"
          />
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-6 pa-md-8">
          <ContactInquiryForm
            :initial-selection="transferContent.inquiryOptions[0]"
            :message-placeholder="t('transfers.messagePlaceholder')"
            :selection-items="transferContent.inquiryOptions"
            :selection-label="t('transfers.requestLabel')"
            :selection-placeholder="t('transfers.requestPlaceholder')"
            :show-cruise-type="false"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
