import type { SanityDocument as SanityDocumentType } from '@sanity/client';
import { z } from 'zod';

export const SanityDocument = z.object({
	_id: z.string(),
	_createdAt: z.string().datetime(),
	_updatedAt: z.string().datetime(),
	_rev: z.string()
});

export const SanityReference = z.object({
	_type: z.literal('reference'),
	_ref: z.string()
});

export const SanityImageCrop = z.object({
	_type: z.literal('sanity.imageCrop'),
	top: z.number(),
	bottom: z.number(),
	left: z.number(),
	right: z.number()
});
export const SanityImageHotspot = z.object({
	_type: z.literal('sanity.imageHotspot'),
	x: z.number(),
	y: z.number(),
	height: z.number(),
	width: z.number()
});
export const SanityImageReference = z.object({
	_type: z.literal('image'),
	asset: SanityReference,
	crop: SanityImageCrop.optional(),
	hotspot: SanityImageHotspot.optional()
});
export const SanityImageReferenceWithAlt = z.object({
	_type: z.literal('image'),
	asset: SanityReference,
	crop: SanityImageCrop.optional(),
	hotspot: SanityImageHotspot.optional(),
	alt: z.string()
});

export type SanityReference = {
	_ref: string;
	_type: 'reference';
};
export type SanityImageReference = {
	_type: 'image';
	asset: SanityReference;
};

export const SanitySlug = z.object({
	_type: z.literal('slug'),
	current: z.string()
});
export type SanitySlug = {
	_type: 'slug';
	current: string;
};

export const Person = SanityDocument.merge(
	z.object({
		_type: z.literal('person'),
		name: z.string(),
		slug: SanitySlug,
		pronouns: z.array(z.string()).optional(),
		email: z.string().optional(),
		discord: z.string().optional(),
		image: SanityImageReference.optional(),
		majors: z.array(z.string()).optional(),
		graduation: z.number()
	})
);
export type Person = SanityDocumentType<{
	_type: 'person';
	name: string;
	slug: SanitySlug;
	pronouns: string[] | undefined;
	email: string | undefined;
	discord: string | undefined;
	image: SanityImageReference | undefined;
	majors: string[] | undefined;
	graduation: number;
}>;

export type Board = SanityDocumentType<{
	_type: 'board';
	year: number;
	members: {
		title: string;
		terms: string[];
		person: SanityReference;
	}[];
}>;
