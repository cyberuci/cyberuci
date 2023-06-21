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

export const SanityImageReference = z.object({
	_type: z.literal('image'),
	asset: SanityReference
});

export type SanityReference = {
	_ref: string;
	_type: 'reference';
};
export type SanityImageReference = {
	_type: 'image';
	asset: SanityReference;
};
export type SanitySlug = {
	_type: 'slug';
	current: string;
};

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
