import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

interface ContactRequest {
  name: string;
  email: string;
  tour?: string;
  message: string;
}

export async function contact(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log("Processing contact form submission");

  try {
    // Parse and validate request body
    const body = (await request.json()) as ContactRequest;

    if (!body.name || !body.email || !body.message) {
      return {
        status: 400,
        jsonBody: {
          error: "Name, email, and message are required",
        },
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return {
        status: 400,
        jsonBody: { error: "Invalid email format" },
      };
    }

    // Send to Logic App (or mock in development)
    const logicAppUrl = process.env.LOGIC_APP_URL;
    const isValidUrl = logicAppUrl && !logicAppUrl.includes("prod-xx");

    const contactData = {
      name: body.name,
      email: body.email,
      tour: body.tour || "Not specified",
      message: body.message,
      timestamp: new Date().toISOString(),
    };

    if (isValidUrl) {
      // Production: Send to real Logic App
      const response = await fetch(logicAppUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error(`Logic App responded with ${response.status}`);
      }

      context.log("✅ Message sent to Logic App");
    } else {
      // Development: Mock the Logic App call
      context.log("🧪 DEVELOPMENT MODE - Logic App not configured");
      context.log("📧 Would send to Logic App:", JSON.stringify(contactData, null, 2));
    }

    return {
      status: 200,
      jsonBody: {
        success: true,
        message: "Your message has been sent successfully",
      },
    };
  } catch (error) {
    context.error("Error processing contact form:", error);

    return {
      status: 500,
      jsonBody: {
        error: "Failed to send message. Please try again later.",
      },
    };
  }
}

// Register the HTTP trigger
app.http("contact", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "contact", // Available at /api/contact
  handler: contact,
});
