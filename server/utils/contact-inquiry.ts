import { z } from "zod";

export const contactSchema = z.object({
  cruiseType: z.string().trim().optional().or(z.literal("")),
  email: z.string().email(),
  firstName: z.string().trim().min(2),
  groupSize: z.coerce.number().int().min(1),
  lastName: z.string().trim().min(2),
  locale: z.enum(["en", "el"]),
  page: z.string().trim().min(1),
  phone: z.string().trim().min(6),
  preferredDate: z.string().trim().min(1),
  specialRequests: z.string().trim().min(1),
  tour: z.string().trim().optional().or(z.literal("")),
});

export type ContactSubmissionPayload = z.infer<typeof contactSchema>;

export type ContactInquiryEventType =
  | "contact.inquiry.created"
  | "contact.whatsapp.started";

export type ContactInquiryChannel = "form" | "whatsapp";

export type ContactInquiryEvent = {
  date: string;
  id: string;
  type: ContactInquiryEventType;
  source: "happy-tours-web";
  locale: ContactSubmissionPayload["locale"];
  submittedAt: string;
  channel: ContactInquiryChannel;
  contact: {
    cruiseType?: string;
    email: string;
    firstName: string;
    fullName: string;
    groupSize: number;
    lastName: string;
    preferredCruise?: string;
    preferredDate: string;
    phoneE164: string;
    specialRequests: string;
    tour?: string;
    message: string;
  };
  tracking: {
    page: string;
    referrer?: string;
    userAgent?: string;
    ip?: string;
  };
  whatsapp?: {
    message: string;
    phoneNumber: string;
    url: string;
  };
};

export type ContactInquiryDocument = {
  id: string;
  date: string;
  submittedAt: string;
  source: "happy-tours-web";
  type: ContactInquiryEventType;
  channel: ContactInquiryChannel;
  locale: string;
  page: string;
  firstName: string;
  lastName: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  preferredService?: string;
  preferredCruise?: string;
  preferredDate: string;
  groupSize: number;
  cruiseType?: string;
  specialRequests: string;
  whatsappMessage?: string;
  whatsappUrl?: string;
};

export function createContactInquiryEvent(options: {
  channel: ContactInquiryChannel;
  id: string;
  ip?: string;
  payload: ContactSubmissionPayload;
  referrer?: string;
  submittedAt: Date;
  type: ContactInquiryEventType;
  userAgent?: string;
  whatsapp?: ContactInquiryEvent["whatsapp"];
}): ContactInquiryEvent {
  const fullName = `${options.payload.firstName} ${options.payload.lastName}`.trim();

  return {
    date: options.submittedAt.toISOString().slice(0, 10),
    id: options.id,
    type: options.type,
    source: "happy-tours-web",
    locale: options.payload.locale,
    submittedAt: options.submittedAt.toISOString(),
    channel: options.channel,
    contact: {
      cruiseType: options.payload.cruiseType || undefined,
      email: options.payload.email,
      firstName: options.payload.firstName,
      fullName,
      groupSize: options.payload.groupSize,
      lastName: options.payload.lastName,
      message: options.payload.specialRequests,
      phoneE164: options.payload.phone,
      preferredCruise: options.payload.tour || undefined,
      preferredDate: options.payload.preferredDate,
      specialRequests: options.payload.specialRequests,
      tour: options.payload.tour || undefined,
    },
    tracking: {
      ip: options.ip,
      page: options.payload.page,
      referrer: options.referrer,
      userAgent: options.userAgent,
    },
    whatsapp: options.whatsapp,
  };
}

export function createContactInquiryDocument(
  message: ContactInquiryEvent,
): ContactInquiryDocument {
  return {
    channel: message.channel,
    cruiseType: message.contact.cruiseType,
    date: message.date,
    emailAddress: message.contact.email,
    firstName: message.contact.firstName,
    fullName: message.contact.fullName,
    groupSize: message.contact.groupSize,
    id: message.id,
    lastName: message.contact.lastName,
    locale: message.locale,
    page: message.tracking.page,
    phoneNumber: message.contact.phoneE164,
    preferredCruise: message.contact.tour,
    preferredDate: message.contact.preferredDate,
    preferredService: message.contact.tour,
    source: message.source,
    specialRequests: message.contact.specialRequests,
    submittedAt: message.submittedAt,
    type: message.type,
    whatsappMessage: message.whatsapp?.message,
    whatsappUrl: message.whatsapp?.url,
  };
}

export function buildWhatsAppMessage(message: ContactInquiryEvent) {
  const lines = [
    "Hi Happy Tours, I would like to make an inquiry.",
    "",
    `Name: ${message.contact.fullName}`,
    `Email: ${message.contact.email}`,
    `Phone: ${message.contact.phoneE164}`,
    `Preferred date: ${message.contact.preferredDate}`,
    `Group size: ${message.contact.groupSize}`,
  ];

  if (message.contact.tour) {
    lines.push(`Interest: ${message.contact.tour}`);
  }

  if (message.contact.cruiseType) {
    lines.push(`Cruise type: ${message.contact.cruiseType}`);
  }

  lines.push("", `Message: ${message.contact.specialRequests}`);

  return lines.join("\n");
}

export function buildWhatsAppUrl(phoneNumber: string, message: string) {
  const normalizedPhone = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
