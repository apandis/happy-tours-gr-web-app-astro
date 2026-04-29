<script setup lang="ts">
import { HOME_HIGHLIGHTS } from "../data/site";

const { locale, t } = useI18n();
</script>

<template>
  <section>
    <v-container class="py-8 py-md-12">
      <v-responsive max-width="720">
        <div class="text-h4 text-md-h3 font-weight-bold text-primary">{{ t("home.highlightsTitle") }}</div>
      </v-responsive>

      <v-row class="mt-6">
        <v-col
          v-for="item in HOME_HIGHLIGHTS[locale as 'en' | 'el']"
          :key="item.title"
          cols="12"
          md="4"
        >
          <v-card class="pa-5 h-100" variant="tonal">
            <div class="d-flex align-center ga-3">
              <v-icon :icon="item.icon" color="primary" size="28" />
              <div class="text-h6 font-weight-bold text-primary">{{ item.title }}</div>
            </div>
            <div class="text-body-1 text-medium-emphasis mt-3">
              {{ item.description }}
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
