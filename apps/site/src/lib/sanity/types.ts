import type { SanityDocument } from '@sanity/client';

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

export type Person = SanityDocument<{
	_type: 'person';
	name: string;
	slug: SanitySlug;
	pronouns: string[];
	image: SanityImageReference;
	majors: string[];
	graduation: number;
}>;

export type Board = SanityDocument<{
	_type: 'board';
	year: number;
	members: {
		title: string;
		terms: string[];
		person: SanityReference;
	}[];
}>;
