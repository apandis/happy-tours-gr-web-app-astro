import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    "vuetify-nuxt-module",
    "@nuxt/content",
    "@nuxtjs/i18n",
    "nuxt-gtag",
  ],
  css: [
    "@mdi/font/css/materialdesignicons.css",
  ],
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
  build: {
    transpile: ["vuetify", "v-phone-input"],
  },
  runtimeConfig: {
    allowMockCosmosDb: process.env.ALLOW_MOCK_COSMOS_DB === "true",
    allowMockEmail: process.env.ALLOW_MOCK_EMAIL === "true",
    allowMockServiceBus: process.env.ALLOW_MOCK_SERVICE_BUS === "true",
    azureCommunicationEmailConnectionString: process.env.AZURE_COMMUNICATION_EMAIL_CONNECTION_STRING,
    azureCommunicationEmailSenderAddress: process.env.AZURE_COMMUNICATION_EMAIL_SENDER_ADDRESS,
    contactNotificationEmailTo: process.env.CONTACT_NOTIFICATION_EMAIL_TO,
    cosmosDbContainerId: process.env.COSMOS_DB_CONTAINER_ID,
    cosmosDbDatabaseId: process.env.COSMOS_DB_DATABASE_ID,
    cosmosDbEndpoint: process.env.COSMOS_DB_ENDPOINT,
    cosmosDbKey: process.env.COSMOS_DB_KEY,
    enableServiceBusSubscribers: process.env.ENABLE_SERVICE_BUS_SUBSCRIBERS === "true",
    serviceBusCosmosSubscriptionName:
      process.env.AZURE_SERVICE_BUS_COSMOS_SUBSCRIPTION_NAME || "contact-inquiries-cosmos",
    serviceBusConnectionString: process.env.AZURE_SERVICE_BUS_CONNECTION_STRING,
    serviceBusEmailSubscriptionName:
      process.env.AZURE_SERVICE_BUS_EMAIL_SUBSCRIPTION_NAME || "contact-inquiries-email",
    serviceBusNamespace: process.env.AZURE_SERVICE_BUS_NAMESPACE,
    serviceBusTopicName: process.env.AZURE_SERVICE_BUS_TOPIC_NAME || "contact-inquiries",
    whatsappBusinessPhoneNumber: process.env.WHATSAPP_BUSINESS_PHONE_NUMBER || "306981712060",
    public: {
      gtmId: process.env.NUXT_PUBLIC_GTM_ID || "GTM-TB98SDXR",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://www.happytours.gr",
    },
  },
  gtag: {
    enabled: process.env.NODE_ENV === "production",
    id: process.env.NUXT_PUBLIC_GTAG_ID,
  },
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://www.happytours.gr",
    defaultLocale: "en",
    strategy: "prefix",
    detectBrowserLanguage: {
      alwaysRedirect: true,
      fallbackLocale: "en",
      redirectOn: "root",
      useCookie: true,
    },
    locales: [
      { code: "en", language: "en-GB", name: "English", file: "en.json" },
      { code: "el", language: "el-GR", name: "Greek", file: "el.json" },
    ],
    lazy: true,
    langDir: "locales",
    vueI18n: "./i18n.config.ts",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { name: "theme-color", content: "#0f3557" },
      ],
    },
  },
  compatibilityDate: "2026-04-29",
  vuetify: {
    moduleOptions: {
      styles: true,
    },
    vuetifyOptions: {
      defaults: {
        VCard: {
          border: true,
          color: "surface",
          flat: true,
        },
        VTextField: {
          color: "primary",
          density: "comfortable",
          variant: "outlined",
        },
        VTextarea: {
          color: "primary",
          density: "comfortable",
          variant: "outlined",
        },
        VSelect: {
          color: "primary",
          density: "comfortable",
          variant: "outlined",
        },
      },
      theme: {
        defaultTheme: "happyTours",
        themes: {
          happyTours: {
            dark: false,
            colors: {
              primary: "#0f3557",
              secondary: "#245b86",
              accent: "#e6a43a",
              whatsapp: "#25d366",
              success: "#2f855a",
              background: "#f6f7f4",
              surface: "#ffffff",
              "surface-variant": "#e6edf4",
              error: "#b42318",
              info: "#245b86",
            },
          },
        },
      },
    },
  },
});
