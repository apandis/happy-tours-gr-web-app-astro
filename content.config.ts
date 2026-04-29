import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    tours: defineCollection({
      type: "page",
      source: "tours/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        duration: z.string(),
        departure: z.string(),
        included: z.array(z.string()),
        highlights: z.array(z.string()),
        order: z.number().optional(),
        lang: z.enum(["en", "el"]),
        slug: z.string(),
      }),
    }),
  },
});
