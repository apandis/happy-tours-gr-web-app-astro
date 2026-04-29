import { EmailClient } from "@azure/communication-email";

import type { ContactInquiryEvent } from "./contact-inquiry";

type EmailRuntimeConfig = {
  allowMockEmail?: boolean;
  azureCommunicationEmailConnectionString?: string;
  contactNotificationEmailTo?: string;
  azureCommunicationEmailSenderAddress?: string;
};

function parseRecipients(value?: string) {
  return (value || "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean)
    .map((address) => ({ address }));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatPlainText(message: ContactInquiryEvent) {
  return [
    `New ${message.channel === "whatsapp" ? "WhatsApp" : "form"} inquiry from ${message.contact.fullName}`,
    "",
    `Name: ${message.contact.fullName}`,
    `Email: ${message.contact.email}`,
    `Phone: ${message.contact.phoneE164}`,
    `Preferred date: ${message.contact.preferredDate}`,
    `Group size: ${message.contact.groupSize}`,
    `Interest: ${message.contact.tour || "Not provided"}`,
    `Cruise type: ${message.contact.cruiseType || "Not provided"}`,
    `Page: ${message.tracking.page}`,
    "",
    "Message:",
    message.contact.specialRequests,
    "",
    message.whatsapp?.url ? `WhatsApp URL: ${message.whatsapp.url}` : "",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function formatHtml(message: ContactInquiryEvent) {
  const rows = [
    ["Channel", message.channel === "whatsapp" ? "WhatsApp" : "Form"],
    ["Name", message.contact.fullName],
    ["Email", message.contact.email],
    ["Phone", message.contact.phoneE164],
    ["Preferred date", message.contact.preferredDate],
    ["Group size", String(message.contact.groupSize)],
    ["Interest", message.contact.tour || "Not provided"],
    ["Cruise type", message.contact.cruiseType || "Not provided"],
    ["Page", message.tracking.page],
  ];

  return `
    <h2>New ${message.channel === "whatsapp" ? "WhatsApp" : "form"} inquiry</h2>
    <table cellpadding="8" cellspacing="0" border="0">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3>Message</h3>
    <p>${escapeHtml(message.contact.specialRequests).replace(/\n/g, "<br>")}</p>
    ${
      message.whatsapp?.url
        ? `<p><a href="${escapeHtml(message.whatsapp.url)}">Open WhatsApp conversation</a></p>`
        : ""
    }
  `;
}

export async function sendContactInquiryEmail(
  config: EmailRuntimeConfig,
  message: ContactInquiryEvent,
) {
  const connectionString = config.azureCommunicationEmailConnectionString;
  const senderAddress = config.azureCommunicationEmailSenderAddress;
  const recipients = parseRecipients(config.contactNotificationEmailTo);

  if (!connectionString || !senderAddress || !recipients.length) {
    if (import.meta.dev || config.allowMockEmail) {
      console.info("[communication-email:mock] Missing ACS email configuration", {
        hasConnectionString: Boolean(connectionString),
        hasSenderAddress: Boolean(senderAddress),
        recipientCount: recipients.length,
      });
      return { skipped: true };
    }

    throw new Error(
      "Configure AZURE_COMMUNICATION_EMAIL_CONNECTION_STRING, AZURE_COMMUNICATION_EMAIL_SENDER_ADDRESS, and CONTACT_NOTIFICATION_EMAIL_TO.",
    );
  }

  const emailClient = new EmailClient(connectionString);
  const subject =
    message.channel === "whatsapp"
      ? `WhatsApp inquiry: ${message.contact.fullName}`
      : `New inquiry: ${message.contact.fullName}`;

  const poller = await emailClient.beginSend({
    senderAddress,
    content: {
      subject,
      plainText: formatPlainText(message),
      html: formatHtml(message),
    },
    recipients: {
      to: recipients,
    },
    replyTo: [
      {
        address: message.contact.email,
        displayName: message.contact.fullName,
      },
    ],
  });

  await poller.pollUntilDone();

  return { skipped: false };
}
