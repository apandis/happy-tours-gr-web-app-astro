# Happy Tours Nuxt App

Marketing website for Happy Tours built with Nuxt 4, Vuetify, Nuxt Content, and Nuxt i18n.

## Stack

- Nuxt 4
- Vuetify
- Nuxt Content
- Nuxt i18n
- `v-phone-input`
- `nuxt-gtag`
- Azure Service Bus topic publishing from Nitro server routes
- Azure Cosmos DB persistence for inquiries

## Local Development

```bash
npm install
npm run dev
```

The app uses locale-prefixed routes such as `/en` and `/el`.

## Environment

Copy the values you need from `.env.example`.

Required for GA4:

- `NUXT_PUBLIC_GTAG_ID`
- `NUXT_PUBLIC_GTM_ID`

Required for live Service Bus publishing:

- `AZURE_SERVICE_BUS_TOPIC_NAME`
- Either `AZURE_SERVICE_BUS_CONNECTION_STRING`
- Or `AZURE_SERVICE_BUS_NAMESPACE` with Azure identity available to the server runtime

Required for Cosmos DB persistence:

- `COSMOS_DB_ENDPOINT`
- `COSMOS_DB_KEY`
- `COSMOS_DB_DATABASE_ID`
- `COSMOS_DB_CONTAINER_ID`

Optional for local preview without Azure credentials:

- `ALLOW_MOCK_SERVICE_BUS=true`
- `ALLOW_MOCK_COSMOS_DB=true`

## Contact Flow

`/api/contact` validates the submitted form payload and publishes a `contact.inquiry.created` message to Azure Service Bus.
It also stores the inquiry in Azure Cosmos DB using a flat document shape for downstream processing.

Message shape:

```json
{
  "date": "2026-04-29",
  "id": "uuid",
  "type": "contact.inquiry.created",
  "source": "happy-tours-web",
  "locale": "en",
  "submittedAt": "2026-04-29T13:00:00.000Z",
  "contact": {
    "cruiseType": "Shared Cruise",
    "email": "jane@example.com",
    "firstName": "Jane",
    "fullName": "Jane Doe",
    "groupSize": 4,
    "lastName": "Doe",
    "preferredCruise": "Blue Lagoon Sivota",
    "preferredDate": "2026-05-03",
    "phoneE164": "+306981234567",
    "specialRequests": "Interested in booking for Friday",
    "tour": "Blue Lagoon Sivota",
    "message": "Interested in booking for Friday"
  },
  "tracking": {
    "page": "/en/contact",
    "referrer": "https://example.com",
    "userAgent": "Mozilla/5.0",
    "ip": "203.0.113.10"
  }
}
```

Cosmos document shape:

```json
{
  "id": "uuid",
  "date": "2026-04-29",
  "submittedAt": "2026-04-29T13:00:00.000Z",
  "source": "happy-tours-web",
  "type": "contact.inquiry.created",
  "locale": "en",
  "page": "/en/contact",
  "firstName": "Jane",
  "lastName": "Doe",
  "fullName": "Jane Doe",
  "emailAddress": "jane@example.com",
  "phoneNumber": "+306981234567",
  "preferredService": "Blue Lagoon Sivota",
  "preferredCruise": "Blue Lagoon Sivota",
  "preferredDate": "2026-05-03",
  "groupSize": 4,
  "cruiseType": "Shared Cruise",
  "specialRequests": "Interested in booking for Friday"
}
```

## Analytics

GA4 is wired through `nuxt-gtag`.
When a GTM container ID is configured, tracked UI events are pushed to `dataLayer` for Google Tag Manager to consume.

Tracked UI events currently include:

- `home_primary_cta_click`
- `home_secondary_cta_click`
- `tour_card_click`
- `tour_detail_cta_click`
- `whatsapp_cta_click`
- `email_cta_click`
- `contact_form_submit`
- `contact_form_success`
- `contact_form_error`
- `locale_switch`
- `gallery_image_open`

## Build

```bash
npm run build
```

Nuxt outputs:

- Public assets: `.output/public`
- Server bundle: `.output/server`

The GitHub Actions workflow is configured to deploy those folders to Azure Static Web Apps.
