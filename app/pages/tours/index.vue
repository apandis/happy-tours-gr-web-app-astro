<script setup lang="ts">
import { SITE } from "../../data/site";

const { locale, t } = useI18n();

const { data: tours } = await useAsyncData(`tour-list-${locale.value}`, () =>
  queryCollection("tours")
    .where("lang", "=", locale.value)
    .order("order", "ASC")
    .all(),
);

useSeoMeta({
  title: t("seo.toursTitle"),
  description: SITE.description[locale.value as "en" | "el"],
  ogTitle: t("tours.title"),
  ogDescription: SITE.description[locale.value as "en" | "el"],
  ogImage: "/images/paxos-antipaxos-caves.jpg",
});
</script>

<template>
  <div>
    <LocalizedPageHeader :subtitle="t('tours.subtitle')" :title="t('tours.title')" />

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
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
  </div>
</template>
