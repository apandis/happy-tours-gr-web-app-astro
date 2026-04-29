<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <v-sheet color="transparent">
    <v-container class="py-10 py-md-14">
      <v-responsive max-width="880">
        <h1 class="text-h4 text-md-h3 font-weight-bold text-primary mb-0">{{ title }}</h1>
        <p v-if="subtitle" class="mt-4 mb-0 text-body-1 text-medium-emphasis text-md-h6">
          {{ subtitle }}
        </p>
      </v-responsive>
    </v-container>
  </v-sheet>
</template>
