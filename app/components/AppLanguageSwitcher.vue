<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath();
const { locale, t } = useI18n();
const { track } = useAnalytics();

const localeOptions = [
  { code: "en", native: "English", flag: "GB" },
  { code: "el", native: "Ελληνικά", flag: "GR" },
];

const currentLocale = computed(
  () => localeOptions.find((item) => item.code === locale.value) || localeOptions[0],
);

function onLocaleClick(code: string) {
  if (code !== locale.value) {
    track("locale_switch", { to_locale: code });
  }
}
</script>

<template>
  <v-menu location="bottom end">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        append-icon="mdi-chevron-down"
        class="text-none"
        color="surface"
        variant="flat"
      >
        <span :class="`fi fi-${currentLocale.flag.toLowerCase()}`" />
        <span class="ms-2">{{ currentLocale.native }}</span>
      </v-btn>
    </template>

    <v-list bg-color="surface" border elevation="2" min-width="220">
      <v-list-subheader>{{ t("language.select") }}</v-list-subheader>

      <v-list-item
        v-for="option in localeOptions"
        :key="option.code"
        :active="option.code === locale"
        :to="switchLocalePath(option.code) || `/${option.code}`"
        @click="onLocaleClick(option.code)"
      >
        <template #prepend>
          <span :class="`fi fi-${option.flag.toLowerCase()}`" />
        </template>

        <v-list-item-title>{{ option.native }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
