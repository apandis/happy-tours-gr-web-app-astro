<script setup lang="ts">
const props = defineProps<{
  tour: {
    title: string;
    description: string;
    image: string;
    duration: string;
    departure: string;
    highlights: string[];
    slug: string;
  };
}>();

const { locale, t } = useI18n();
const { track } = useAnalytics();

const detailPath = computed(() => `/${locale.value}/tours/${props.tour.slug}`);
</script>

<template>
  <v-card class="overflow-hidden h-100">
    <NuxtLink :to="detailPath" class="text-decoration-none" @click="track('tour_card_click', { tour_slug: tour.slug })">
      <v-img :alt="tour.title" :src="tour.image" height="230" cover />
    </NuxtLink>

    <v-card-text class="pa-6">
      <div class="text-h5 font-weight-bold text-primary">{{ tour.title }}</div>

      <div class="d-flex flex-wrap ga-2 mt-4">
        <v-chip prepend-icon="mdi-clock-outline" size="small" variant="tonal">
          {{ tour.duration }}
        </v-chip>

        <v-chip prepend-icon="mdi-clock-start" size="small" variant="tonal">
          {{ t("tours.departure") }}: {{ tour.departure }}
        </v-chip>
      </div>

      <div class="text-body-1 text-medium-emphasis mt-4">
        {{ tour.description }}
      </div>

      <v-list class="bg-transparent py-0 mt-4" density="compact">
        <v-list-item
          v-for="highlight in tour.highlights.slice(0, 2)"
          :key="highlight"
          class="px-0"
        >
          <template #prepend>
            <v-icon color="primary" icon="mdi-check-circle-outline" size="small" />
          </template>
          <v-list-item-title class="text-body-2 text-medium-emphasis">
            {{ highlight }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions class="px-6 pb-6 pt-0">
      <v-btn block color="primary" :to="detailPath" @click="track('tour_detail_cta_click', { tour_slug: tour.slug })">
        {{ t("tours.viewDetails") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
