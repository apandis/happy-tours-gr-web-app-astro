import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const tours = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./app/content/tours" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    duration: z.string(),
    departure: z.string(),
    included: z.array(z.string()),
    highlights: z.array(z.string()),
    order: z.number().optional(),
  }),
});

export const collections = { tours };
