import { DefaultAzureCredential } from "@azure/identity";
import { ServiceBusClient } from "@azure/service-bus";

import type { ContactInquiryEvent } from "./contact-inquiry";

type ServiceBusRuntimeConfig = {
  allowMockServiceBus?: boolean;
  serviceBusConnectionString?: string;
  serviceBusNamespace?: string;
  serviceBusTopicName?: string;
};

export function createServiceBusClient(config: ServiceBusRuntimeConfig) {
  if (config.serviceBusConnectionString) {
    return new ServiceBusClient(config.serviceBusConnectionString);
  }

  if (config.serviceBusNamespace) {
    return new ServiceBusClient(
      config.serviceBusNamespace,
      new DefaultAzureCredential(),
    );
  }

  throw new Error(
    "Configure either AZURE_SERVICE_BUS_CONNECTION_STRING or AZURE_SERVICE_BUS_NAMESPACE.",
  );
}

export async function publishContactInquiry(
  config: ServiceBusRuntimeConfig,
  message: ContactInquiryEvent,
) {
  const topicName = config.serviceBusTopicName;

  if (!topicName) {
    if (import.meta.dev || config.allowMockServiceBus) {
      console.info("[service-bus:mock] Missing topic name", message);
      return { mocked: true };
    }

    throw new Error("AZURE_SERVICE_BUS_TOPIC_NAME is not configured.");
  }

  if (!config.serviceBusConnectionString && !config.serviceBusNamespace) {
    if (import.meta.dev || config.allowMockServiceBus) {
      console.info("[service-bus:mock] Missing Service Bus credentials", message);
      return { mocked: true };
    }

    throw new Error(
      "Configure either AZURE_SERVICE_BUS_CONNECTION_STRING or AZURE_SERVICE_BUS_NAMESPACE.",
    );
  }

  const client = createServiceBusClient(config);

  const sender = client.createSender(topicName);

  try {
    await sender.sendMessages({
      body: message,
      contentType: "application/json",
      subject: message.type,
      messageId: message.id,
      applicationProperties: {
        channel: message.channel,
        cruiseType: message.contact.cruiseType || "",
        groupSize: message.contact.groupSize,
        locale: message.locale,
        preferredDate: message.contact.preferredDate,
        source: message.source,
        tour: message.contact.tour || "",
        type: message.type,
      },
    });

    return { mocked: false };
  } finally {
    await sender.close();
    await client.close();
  }
}
