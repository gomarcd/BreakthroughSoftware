import { z, defineCollection } from 'astro:content';

const news = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishedDate: z.date(),
		image: z.string().optional(),
		tags: z.array(z.string()),
	}),
});

export const collections = { news };