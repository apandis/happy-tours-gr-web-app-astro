import type { ServiceBusReceiver } from "@azure/service-bus";

import {
  createContactInquiryDocument,
  type ContactInquiryEvent,
} from "../utils/contact-inquiry";
import { sendContactInquiryEmail } from "../utils/communication-email";
import { saveContactInquiryDocument } from "../utils/cosmos-db";
import { createServiceBusClient } from "../utils/service-bus";

type SubscriberState = {
  close: () => Promise<void>;
};

type GlobalSubscriberState = typeof globalThis & {
  __happyToursServiceBusSubscribers?: SubscriberState;
};

function isContactInquiryEvent(value: unknown): value is ContactInquiryEvent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ContactInquiryEvent>;
  return (
    typeof candidate.id === "string" &&
    candidate.source === "happy-tours-web" &&
    typeof candidate.type === "string" &&
    Boolean(candidate.contact)
  );
}

export default defineNitroPlugin((nitroApp) => {
  const state = globalThis as GlobalSubscriberState;

  if (state.__happyToursServiceBusSubscribers) {
    return;
  }

  const config = useRuntimeConfig();

  if (!config.enableServiceBusSubscribers) {
    return;
  }

  const topicName = config.serviceBusTopicName;
  const cosmosSubscriptionName = config.serviceBusCosmosSubscriptionName;
  const emailSubscriptionName = config.serviceBusEmailSubscriptionName;

  if (!topicName || !cosmosSubscriptionName || !emailSubscriptionName) {
    console.warn("[service-bus:subscribers] Missing topic or subscription names.");
    return;
  }

  if (cosmosSubscriptionName === emailSubscriptionName) {
    console.warn(
      "[service-bus:subscribers] Cosmos and email subscribers need separate topic subscriptions.",
    );
    return;
  }

  const client = createServiceBusClient(config);
  const receivers: ServiceBusReceiver[] = [
    client.createReceiver(topicName, cosmosSubscriptionName),
    client.createReceiver(topicName, emailSubscriptionName),
  ];

  receivers[0].subscribe({
    processMessage: async (serviceBusMessage) => {
      if (!isContactInquiryEvent(serviceBusMessage.body)) {
        console.warn("[service-bus:cosmos] Ignoring unknown message", serviceBusMessage.messageId);
        return;
      }

      await saveContactInquiryDocument(
        config,
        createContactInquiryDocument(serviceBusMessage.body),
      );
    },
    processError: async (error) => {
      console.error("[service-bus:cosmos] Subscriber error", error);
    },
  });

  receivers[1].subscribe({
    processMessage: async (serviceBusMessage) => {
      if (!isContactInquiryEvent(serviceBusMessage.body)) {
        console.warn("[service-bus:email] Ignoring unknown message", serviceBusMessage.messageId);
        return;
      }

      await sendContactInquiryEmail(config, serviceBusMessage.body);
    },
    processError: async (error) => {
      console.error("[service-bus:email] Subscriber error", error);
    },
  });

  state.__happyToursServiceBusSubscribers = {
    close: async () => {
      await Promise.all(receivers.map((receiver) => receiver.close()));
      await client.close();
      state.__happyToursServiceBusSubscribers = undefined;
    },
  };

  nitroApp.hooks.hook("close", async () => {
    await state.__happyToursServiceBusSubscribers?.close();
  });
});
