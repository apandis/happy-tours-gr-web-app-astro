<script setup lang="ts">
const { t } = useI18n();
const localizedPath = useLocalizedPath();
const { track } = useAnalytics();
</script>

<template>
  <v-img
    cover
    gradient="to top left, rgba(var(--v-theme-primary), .94), rgba(0, 0, 0, .74)"
    min-height="clamp(560px, 72vh, 720px)"
    src="/images/blue-lagoon-cave-sivota.jpg"
  >
    <v-container class="h-100 d-flex align-center py-12 py-md-16">
      <v-row class="align-center">
        <v-col cols="12" md="8" lg="7">
          <v-chip border="thin opacity-25" color="surface" variant="flat">
            {{ t("hero.kicker") }}
          </v-chip>

          <div class="text-h3 text-sm-h2 text-md-display-small font-weight-bold text-white mt-6">
            {{ t("hero.title") }}
          </div>

          <v-responsive class="mt-6" max-width="736">
            <div class="text-body-1 text-md-h6 text-blue-lighten-5">
              {{ t("hero.subtitle") }}
            </div>
          </v-responsive>

          <div class="d-flex flex-wrap ga-4 mt-8">
            <v-btn
              color="accent"
              size="x-large"
              :to="localizedPath('/tours')"
              @click="track('home_primary_cta_click')"
            >
              {{ t("hero.primaryCta") }}
            </v-btn>

            <v-btn
              color="surface"
              size="x-large"
              :to="localizedPath('/contact')"
              variant="outlined"
              @click="track('home_secondary_cta_click')"
            >
              {{ t("hero.secondaryCta") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>
