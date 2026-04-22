import { defineCollection, z } from 'astro:content';

const logs = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		signature: z
			.object({
				signer: z.string().optional(),
				fingerprint: z.string(),
				signedAt: z.coerce.date().optional(),
				signedFile: z.string().startsWith('/'),
				signatureFile: z.string().startsWith('/'),
			})
			.optional(),
	}),
});

export const collections = { logs };
