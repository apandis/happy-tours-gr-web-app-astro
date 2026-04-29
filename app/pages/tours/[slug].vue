<script setup lang="ts">
const route = useRoute();
const { locale, t } = useI18n();
const localizedPath = useLocalizedPath();

const slug = computed(() => String(route.params.slug));

const { data: tour } = await useAsyncData(`tour-${locale.value}-${slug.value}`, () =>
  queryCollection("tours")
    .where("lang", "=", locale.value)
    .where("slug", "=", slug.value)
    .first(),
);

if (!tour.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Tour not found",
  });
}

useSeoMeta({
  title: tour.value.title,
  description: tour.value.description,
  ogTitle: tour.value.title,
  ogDescription: tour.value.description,
  ogImage: tour.value.image,
  twitterCard: "summary_large_image",
});

</script>

<template>
  <div v-if="tour">
    <LocalizedPageHeader :subtitle="tour.description" :title="tour.title" />

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
        <v-row class="ga-y-8">
          <v-col cols="12" lg="8">
            <v-card class="overflow-hidden">
              <v-img :alt="tour.title" :src="tour.image" height="420" cover />
            </v-card>

            <v-row class="mt-6 ga-y-6">
              <v-col cols="12" md="6">
                <v-card class="pa-6 h-100">
                  <div class="text-overline text-primary">{{ t("tours.highlights") }}</div>
                  <v-list class="bg-transparent mt-2" lines="two">
                    <v-list-item
                      v-for="highlight in tour.highlights"
                      :key="highlight"
                      class="px-0"
                    >
                      <template #prepend>
                        <v-icon color="accent" icon="mdi-star-four-points" />
                      </template>
                      <v-list-item-title class="text-body-1">{{ highlight }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card class="pa-6 h-100">
                  <div class="text-overline text-primary">{{ t("tours.included") }}</div>
                  <v-list class="bg-transparent mt-2" lines="two">
                    <v-list-item
                      v-for="item in tour.included"
                      :key="item"
                      class="px-0"
                    >
                      <template #prepend>
                        <v-icon color="success" icon="mdi-check-circle-outline" />
                      </template>
                      <v-list-item-title class="text-body-1">{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>

            <v-card class="mt-6">
              <v-card-text class="pa-6 pa-md-8">
                <ContentRenderer :value="tour" />
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" lg="4">
            <v-card class="pa-6 pa-md-8">
              <div>
                <div class="text-h6 font-weight-bold text-primary">{{ t("tours.bookNow") }}</div>
                <div class="text-body-2 text-medium-emphasis mt-2">
                  {{ t("tours.planSubtitle") }}
                </div>
              </div>

              <v-row class="mt-2">
                <v-col cols="6">
                  <v-sheet border class="pa-4 h-100">
                    <div class="text-caption text-primary">{{ t("tours.duration") }}</div>
                    <div class="text-body-1 font-weight-medium mt-1">{{ tour.duration }}</div>
                  </v-sheet>
                </v-col>

                <v-col cols="6">
                  <v-sheet border class="pa-4 h-100">
                    <div class="text-caption text-primary">{{ t("tours.departure") }}</div>
                    <div class="text-body-1 font-weight-medium mt-1">{{ tour.departure }}</div>
                  </v-sheet>
                </v-col>
              </v-row>

              <v-divider class="my-6" />

              <ContactInquiryForm
                compact
                :initial-selection="tour.title"
                show-whats-app-action
                :title="t('contact.formTitle')"
              />
            </v-card>
          </v-col>
        </v-row>

        <div class="mt-8">
          <v-btn color="primary" :to="localizedPath('/tours')" prepend-icon="mdi-arrow-left" variant="text">
            {{ t("tours.back") }}
          </v-btn>
        </div>
      </v-container>
    </section>
  </div>
</template>
