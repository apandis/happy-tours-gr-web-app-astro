import {
  contactSchema,
  createContactInquiryEvent,
} from "../utils/contact-inquiry";
import { publishContactInquiry } from "../utils/service-bus";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid contact form submission.",
      data: result.error.flatten(),
    });
  }

  const payload = result.data;
  const runtimeConfig = useRuntimeConfig(event);
  const submittedAt = new Date();

  const message = createContactInquiryEvent({
    channel: "form",
    id: crypto.randomUUID(),
    type: "contact.inquiry.created",
    payload,
    submittedAt,
    ip: getHeader(event, "x-forwarded-for") || getRequestIP(event) || undefined,
    referrer: getHeader(event, "referer") || undefined,
    userAgent: getHeader(event, "user-agent") || undefined,
  });

  await publishContactInquiry(runtimeConfig, message);

  return {
    ok: true,
    id: message.id,
  };
});
