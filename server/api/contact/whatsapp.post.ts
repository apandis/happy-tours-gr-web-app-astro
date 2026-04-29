import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  contactSchema,
  createContactInquiryEvent,
} from "../../utils/contact-inquiry";
import { publishContactInquiry } from "../../utils/service-bus";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid WhatsApp inquiry.",
      data: result.error.flatten(),
    });
  }

  const payload = result.data;
  const runtimeConfig = useRuntimeConfig(event);
  const submittedAt = new Date();
  const id = crypto.randomUUID();

  const baseMessage = createContactInquiryEvent({
    channel: "whatsapp",
    id,
    type: "contact.whatsapp.started",
    payload,
    submittedAt,
    ip: getHeader(event, "x-forwarded-for") || getRequestIP(event) || undefined,
    referrer: getHeader(event, "referer") || undefined,
    userAgent: getHeader(event, "user-agent") || undefined,
  });
  const whatsAppMessage = buildWhatsAppMessage(baseMessage);
  const whatsAppPhoneNumber = runtimeConfig.whatsappBusinessPhoneNumber;
  const whatsAppUrl = buildWhatsAppUrl(whatsAppPhoneNumber, whatsAppMessage);

  const message = createContactInquiryEvent({
    channel: "whatsapp",
    id,
    type: "contact.whatsapp.started",
    payload,
    submittedAt,
    ip: getHeader(event, "x-forwarded-for") || getRequestIP(event) || undefined,
    referrer: getHeader(event, "referer") || undefined,
    userAgent: getHeader(event, "user-agent") || undefined,
    whatsapp: {
      message: whatsAppMessage,
      phoneNumber: whatsAppPhoneNumber,
      url: whatsAppUrl,
    },
  });

  await publishContactInquiry(runtimeConfig, message);

  return {
    ok: true,
    id: message.id,
    whatsappUrl: whatsAppUrl,
  };
});
