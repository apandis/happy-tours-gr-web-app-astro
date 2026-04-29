<script setup lang="ts">
import { VPhoneCountryFlagSvg } from "v-phone-input";

const props = withDefaults(
  defineProps<{
    compact?: boolean;
    initialSelection?: string;
    lockSelection?: boolean;
    messagePlaceholder?: string;
    selectionItems?: string[];
    selectionLabel?: string;
    selectionPlaceholder?: string;
    showCruiseType?: boolean;
    showSelection?: boolean;
    showWhatsAppAction?: boolean;
    title?: string;
  }>(),
  {
    compact: false,
    initialSelection: "",
    lockSelection: false,
    messagePlaceholder: "",
    selectionItems: undefined,
    selectionLabel: "",
    selectionPlaceholder: "",
    showCruiseType: true,
    showSelection: true,
    showWhatsAppAction: false,
    title: "",
  },
);

const route = useRoute();
const { locale, t } = useI18n();
const localizedPath = useLocalizedPath();
const { track } = useAnalytics();

const formRef = ref<any>(null);
const isOpeningWhatsApp = ref(false);
const isSubmitting = ref(false);
const serverError = ref("");

const form = reactive({
  cruiseType: "",
  firstName: "",
  groupSize: null as number | null,
  lastName: "",
  email: "",
  phone: "",
  preferredDate: "",
  selection: props.initialSelection,
  specialRequests: "",
});

function withoutDefaultCountryTitle(props: Record<string, unknown>) {
  const { title: _title, ...listItemProps } = props;
  return listItemProps;
}

const { data: tours } = await useAsyncData(
  `contact-form-tours-${locale.value}`,
  () =>
    queryCollection("tours")
      .where("lang", "=", locale.value)
      .order("order", "ASC")
      .all(),
);

const defaultSelectionItems = computed(() =>
  (tours.value || []).map((tour) => tour.title),
);
const selectionItems = computed(() =>
  props.selectionItems?.length
    ? props.selectionItems
    : defaultSelectionItems.value,
);

const cruiseTypeItems = computed(() => [
  t("contact.sharedCruise"),
  t("contact.privateCruise"),
]);

const requiredRule = (value: unknown) => {
  if (typeof value === "number") {
    return Number.isFinite(value) || t("contact.required");
  }

  return Boolean(String(value ?? "").trim()) || t("contact.required");
};
const emailRule = (value: unknown) =>
  /.+@.+\..+/.test(String(value ?? "")) || t("contact.emailInvalid");
const groupSizeRule = (value: unknown) => {
  const parsedValue = typeof value === "number" ? value : Number(value);
  return (
    (Number.isInteger(parsedValue) && parsedValue > 0) ||
    t("contact.groupSizeInvalid")
  );
};

watch(
  () => props.initialSelection,
  (value, previousValue) => {
    if (value && (!form.selection || form.selection === previousValue)) {
      form.selection = value;
    }
  },
  { immediate: true },
);

function createFormPayload() {
  return {
    cruiseType: props.showCruiseType ? form.cruiseType : "",
    email: form.email,
    firstName: form.firstName,
    groupSize: form.groupSize,
    lastName: form.lastName,
    locale: locale.value,
    page: route.fullPath,
    phone: form.phone,
    preferredDate: form.preferredDate,
    specialRequests: form.specialRequests,
    tour: form.selection,
  };
}

async function submitForm() {
  serverError.value = "";

  const validation = await formRef.value?.validate();
  if (!validation?.valid) {
    return;
  }

  isSubmitting.value = true;
  track("contact_form_submit", { topic: form.selection || "none" });

  try {
    await $fetch("/api/contact", {
      body: createFormPayload(),
      method: "POST",
    });

    track("contact_form_success", { topic: form.selection || "none" });
    await navigateTo(localizedPath("/thank-you"));
  } catch {
    track("contact_form_error", { topic: form.selection || "none" });
    serverError.value = t("contact.error");
    isSubmitting.value = false;
  }
}

async function openWhatsAppInquiry() {
  serverError.value = "";
  const popup = import.meta.client ? window.open("", "_blank") : null;

  if (popup) {
    popup.opener = null;
  }

  const validation = await formRef.value?.validate();
  if (!validation?.valid) {
    popup?.close();
    return;
  }

  isOpeningWhatsApp.value = true;
  track("whatsapp_form_submit", { topic: form.selection || "none" });

  try {
    const response = await $fetch<{ whatsappUrl: string }>("/api/contact/whatsapp", {
      body: createFormPayload(),
      method: "POST",
    });

    track("whatsapp_form_success", { topic: form.selection || "none" });

    if (popup) {
      popup.location.assign(response.whatsappUrl);
    } else if (import.meta.client) {
      window.location.href = response.whatsappUrl;
    }
  } catch {
    popup?.close();
    track("whatsapp_form_error", { topic: form.selection || "none" });
    serverError.value = t("contact.error");
  } finally {
    isOpeningWhatsApp.value = false;
  }
}
</script>

<template>
  <div>
    <div
      v-if="title"
      :class="
        compact
          ? 'text-h6 font-weight-bold text-primary mb-4'
          : 'text-h5 font-weight-bold text-primary mb-6'
      "
    >
      {{ title }}
    </div>

    <v-form ref="formRef" @submit.prevent="submitForm">
      <v-row :density="compact ? 'comfortable' : 'default'">
        <v-col cols="12" :md="compact ? 12 : 6">
          <v-text-field
            v-model="form.firstName"
            :label="t('contact.firstName')"
            :rules="[requiredRule]"
          />
        </v-col>

        <v-col cols="12" :md="compact ? 12 : 6">
          <v-text-field
            v-model="form.lastName"
            :label="t('contact.lastName')"
            :rules="[requiredRule]"
          />
        </v-col>

        <v-col cols="12" :md="compact ? 12 : 6">
          <v-text-field
            v-model="form.email"
            :label="t('contact.email')"
            :rules="[requiredRule, emailRule]"
          />
        </v-col>

        <v-col cols="12" :md="compact ? 12 : 6">
          <v-phone-input
            v-model="form.phone"
            color="primary"
            :country-aria-label="t('contact.phoneCountryFor')"
            :country-label="t('contact.phoneCode')"
            :country-locale="locale"
            default-country="GR"
            density="comfortable"
            :invalid-message="t('contact.phoneInvalid')"
            :label="t('contact.phone')"
            :placeholder="t('contact.phonePlaceholder')"
            :prefer-countries="['GR', 'GB', 'DE', 'IT', 'FR', 'ES', 'US']"
            :rules="[requiredRule]"
            variant="outlined"
          >
            <template #country-display="{ country, decorative }">
              <span v-if="!decorative">+{{ country.dialCode }}</span>
            </template>

            <template #country-input:item="{ props: countryItemProps, item }">
              <v-list-item v-bind="withoutDefaultCountryTitle(countryItemProps)">
                <template #prepend>
                  <VPhoneCountryFlagSvg :country="item" decorative />
                </template>

                <v-list-item-title>{{ item.name }}</v-list-item-title>

                <template #append>
                  <span class="text-body-2 text-medium-emphasis">
                    +{{ item.dialCode }}
                  </span>
                </template>
              </v-list-item>
            </template>
          </v-phone-input>
        </v-col>

        <v-col cols="12" :md="compact ? 12 : 6">
          <v-text-field
            v-model="form.preferredDate"
            :label="t('contact.preferredDate')"
            :rules="[requiredRule]"
            type="date"
          />
        </v-col>

        <v-col cols="12" :md="compact ? 12 : 6">
          <v-text-field
            v-model.number="form.groupSize"
            :label="t('contact.groupSize')"
            :rules="[requiredRule, groupSizeRule]"
            min="1"
            type="number"
          />
        </v-col>

        <v-col
          v-if="showSelection"
          cols="12"
          :md="compact ? 12 : showCruiseType ? 6 : 12"
        >
          <v-select
            v-model="form.selection"
            :disabled="lockSelection"
            :items="selectionItems"
            :label="selectionLabel || t('contact.tour')"
            :placeholder="selectionPlaceholder || t('contact.tourPlaceholder')"
            :rules="[requiredRule]"
            clearable
          />
        </v-col>

        <v-col v-if="showCruiseType" cols="12" :md="compact ? 12 : 6">
          <v-select
            v-model="form.cruiseType"
            :items="cruiseTypeItems"
            :label="t('contact.cruiseType')"
            :placeholder="t('contact.cruiseTypePlaceholder')"
            :rules="[requiredRule]"
          />
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="form.specialRequests"
            :label="t('contact.specialRequests')"
            :placeholder="messagePlaceholder || t('contact.messagePlaceholder')"
            :rules="[requiredRule]"
            :rows="compact ? 4 : 6"
          />
        </v-col>
      </v-row>

      <v-alert v-if="serverError" class="mb-4" color="error" variant="tonal">
        {{ serverError }}
      </v-alert>

      <div
        :class="
          compact
            ? 'd-flex flex-column ga-4 mt-4'
            : 'd-flex align-center justify-space-between flex-wrap ga-4 mt-2'
        "
      >
        <div class="text-body-2 text-medium-emphasis">
          {{ t("contact.formHint") }}
        </div>

        <v-btn
          color="primary"
          :loading="isSubmitting"
          :block="compact"
          type="submit"
        >
          {{ isSubmitting ? t("contact.sending") : t("contact.submit") }}
        </v-btn>

        <v-btn
          v-if="showWhatsAppAction"
          color="whatsapp"
          :loading="isOpeningWhatsApp"
          :block="compact"
          prepend-icon="mdi-whatsapp"
          type="button"
          @click="openWhatsAppInquiry"
        >
          {{ t("contact.whatsapp") }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
