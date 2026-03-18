import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sidebar: z.object({
      label: z.string().optional(),
      order: z.number(),
    }),
    category: z.enum(['getting-started', 'concept', 'commands', 'faq']),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { docs };
