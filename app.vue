<script setup lang="ts">
const { t } = useI18n();

useHead({
  titleTemplate: (title) => {
    const siteName = t("site.name");
    return title ? `${title} | ${siteName}` : siteName;
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
