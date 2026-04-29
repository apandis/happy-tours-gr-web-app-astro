<script setup lang="ts">
import { GALLERY, SITE } from "../data/site";

const { locale, t } = useI18n();
const { track } = useAnalytics();

const selectedImage = ref<(typeof GALLERY)["en"][number] | null>(null);
const isDialogOpen = computed({
  get: () => Boolean(selectedImage.value),
  set: (value: boolean) => {
    if (!value) {
      selectedImage.value = null;
    }
  },
});

useSeoMeta({
  title: t("seo.galleryTitle"),
  description: SITE.description[locale.value as "en" | "el"],
  ogTitle: t("gallery.title"),
  ogDescription: SITE.description[locale.value as "en" | "el"],
  ogImage: "/images/paxos-blue-caves.jpg",
});

function openImage(image: (typeof GALLERY)["en"][number]) {
  selectedImage.value = image;
  track("gallery_image_open");
}
</script>

<template>
  <div>
    <LocalizedPageHeader :subtitle="t('gallery.subtitle')" :title="t('gallery.title')" />

    <section>
      <v-container class="pt-0 pb-10 pb-md-14">
        <v-row>
          <v-col
            v-for="image in GALLERY[locale as 'en' | 'el']"
            :key="image.alt"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              class="overflow-hidden h-100"
              hover
              @click="openImage(image)"
            >
              <v-img :alt="image.alt" :src="image.src" cover height="260" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-dialog v-model="isDialogOpen" max-width="960">
      <v-card v-if="selectedImage" class="pa-2">
        <v-img :alt="selectedImage.alt" :src="selectedImage.src" cover max-height="78vh" />
      </v-card>
    </v-dialog>
  </div>
</template>
