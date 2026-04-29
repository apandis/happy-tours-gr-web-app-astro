<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
const localizedPath = useLocalizedPath();

const drawer = shallowRef(false);

const links = computed(() => [
  { label: t("nav.home"), to: localizedPath("/") },
  { label: t("nav.tours"), to: localizedPath("/tours") },
  { label: t("nav.transfers"), to: localizedPath("/transfers") },
  { label: t("nav.about"), to: localizedPath("/about") },
  { label: t("nav.gallery"), to: localizedPath("/gallery") },
  { label: t("nav.faq"), to: localizedPath("/faq") },
  { label: t("nav.contact"), to: localizedPath("/contact") },
]);

function isActiveLink(path: string) {
  return (
    route.path === path ||
    (path !== `/${locale.value}` && route.path.startsWith(path))
  );
}
</script>

<template>
  <v-app-bar class="px-md-6 px-2" height="92">
    <NuxtLink
      class="text-decoration-none text-primary"
      :to="localizedPath('/')"
    >
      <v-responsive max-width="136">
        <BrandLogoIcon class="d-block w-100" />
      </v-responsive>
    </NuxtLink>

    <v-spacer />

    <div class="d-none d-md-flex align-center ga-2">
      <v-btn
        v-for="link in links"
        :key="link.to"
        :active="isActiveLink(link.to)"
        class="text-none"
        color="primary"
        :to="link.to"
        variant="text"
      >
        {{ link.label }}
      </v-btn>

      <AppLanguageSwitcher />
    </div>

    <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    color="surface"
    location="right"
    temporary
  >
    <div class="d-flex flex-column align-center justify-center h-100 text-center px-6">
      <v-btn
        v-for="link in links"
        :key="link.to"
        :active="isActiveLink(link.to)"
        class="text-none"
        color="primary"
        :to="link.to"
        variant="text"
        @click="drawer = false"
      >
        {{ link.label }}
      </v-btn>

      <div class="mt-6 d-flex justify-center">
        <AppLanguageSwitcher />
      </div>
    </div>
  </v-navigation-drawer>
</template>
