/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
	_type: 'sanity.imagePaletteSwatch';
	background?: string;
	foreground?: string;
	population?: number;
	title?: string;
};

export type SanityImagePalette = {
	_type: 'sanity.imagePalette';
	darkMuted?: SanityImagePaletteSwatch;
	lightVibrant?: SanityImagePaletteSwatch;
	darkVibrant?: SanityImagePaletteSwatch;
	vibrant?: SanityImagePaletteSwatch;
	dominant?: SanityImagePaletteSwatch;
	lightMuted?: SanityImagePaletteSwatch;
	muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
	_type: 'sanity.imageDimensions';
	height?: number;
	width?: number;
	aspectRatio?: number;
};

export type SanityFileAsset = {
	_id: string;
	_type: 'sanity.fileAsset';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	originalFilename?: string;
	label?: string;
	title?: string;
	description?: string;
	altText?: string;
	sha1hash?: string;
	extension?: string;
	mimeType?: string;
	size?: number;
	assetId?: string;
	uploadId?: string;
	path?: string;
	url?: string;
	source?: SanityAssetSourceData;
};

export type Geopoint = {
	_type: 'geopoint';
	lat?: number;
	lng?: number;
	alt?: number;
};

export type Info = {
	_id: string;
	_type: 'info';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	email: string;
	socials?: Array<{
		platform: string;
		link: string;
		_key: string;
	}>;
};

export type Board = {
	_id: string;
	_type: 'board';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	year: number;
	sections: Array<{
		label: string;
		members: Array<{
			title: string;
			terms?: Array<string>;
			person: {
				_ref: string;
				_type: 'reference';
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: 'person';
			};
			_type: 'member';
			_key: string;
		}>;
		_type: 'section';
		_key: string;
	}>;
};

export type Person = {
	_id: string;
	_type: 'person';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	name: string;
	slug: Slug;
	pronouns?: Array<string>;
	email?: string;
	discord?: string;
	website?: string;
	linkedin?: string;
	instagram?: string;
	image?: {
		asset?: {
			_ref: string;
			_type: 'reference';
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		_type: 'image';
	};
	majors?: Array<string>;
	graduation: number;
};

export type Slug = {
	_type: 'slug';
	current: string;
	source?: string;
};

export type ContactPage = {
	_id: string;
	_type: 'contactPage';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	sections?: Array<{
		title: string;
		description: string;
		contacts?: Array<{
			_ref: string;
			_type: 'reference';
			_weak?: boolean;
			_key: string;
			[internalGroqTypeReferenceTo]?: 'person';
		}>;
		_type: 'section';
		_key: string;
	}>;
};

export type SubteamsPage = {
	_id: string;
	_type: 'subteamsPage';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	subteams?: Array<{
		name?: string;
		description?: string;
		_type: 'subteam';
		_key: string;
	}>;
};

export type Achievements = {
	_type: 'achievements';
	years?: Array<{
		year?: number;
		achievements?: Array<{
			title?: string;
			placing?: string;
			_type: 'achievement';
			_key: string;
		}>;
		_type: 'year';
		_key: string;
	}>;
};

export type CompetitionPage = {
	_id: string;
	_type: 'competitionPage';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	content?: Array<
		| {
				children?: Array<{
					marks?: Array<string>;
					text?: string;
					_type: 'span';
					_key: string;
				}>;
				style?: 'normal' | 'h2' | 'h3';
				listItem?: never;
				markDefs?: Array<{
					href?: string;
					_type: 'link';
					_key: string;
				}>;
				level?: number;
				_type: 'block';
				_key: string;
		  }
		| ({
				_key: string;
		  } & Achievements)
	>;
};

export type HomePage = {
	_id: string;
	_type: 'homePage';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	competitions: {
		subtitle: string;
		description: string;
	};
	hackerlab: {
		images: Array<{
			asset?: {
				_ref: string;
				_type: 'reference';
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
			};
			hotspot?: SanityImageHotspot;
			crop?: SanityImageCrop;
			alt: string;
			_type: 'image';
			_key: string;
		}>;
		description: string;
	};
};

export type SanityImageCrop = {
	_type: 'sanity.imageCrop';
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
};

export type SanityImageHotspot = {
	_type: 'sanity.imageHotspot';
	x?: number;
	y?: number;
	height?: number;
	width?: number;
};

export type SanityImageAsset = {
	_id: string;
	_type: 'sanity.imageAsset';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	originalFilename?: string;
	label?: string;
	title?: string;
	description?: string;
	altText?: string;
	sha1hash?: string;
	extension?: string;
	mimeType?: string;
	size?: number;
	assetId?: string;
	uploadId?: string;
	path?: string;
	url?: string;
	metadata?: SanityImageMetadata;
	source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
	_type: 'sanity.assetSourceData';
	name?: string;
	id?: string;
	url?: string;
};

export type SanityImageMetadata = {
	_type: 'sanity.imageMetadata';
	location?: Geopoint;
	dimensions?: SanityImageDimensions;
	palette?: SanityImagePalette;
	lqip?: string;
	blurHash?: string;
	hasAlpha?: boolean;
	isOpaque?: boolean;
};

export type AllSanitySchemaTypes =
	| SanityImagePaletteSwatch
	| SanityImagePalette
	| SanityImageDimensions
	| SanityFileAsset
	| Geopoint
	| Info
	| Board
	| Person
	| Slug
	| ContactPage
	| SubteamsPage
	| Achievements
	| CompetitionPage
	| HomePage
	| SanityImageCrop
	| SanityImageHotspot
	| SanityImageAsset
	| SanityAssetSourceData
	| SanityImageMetadata;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./src/routes/(homepage)/+page.server.ts
// Variable: homePageQuery
// Query: *[_type == 'homePage' && _id == "homePage"][0] {			competitions {				subtitle,				description,			},			hackerlab {				description,				images,			}		}
export type HomePageQueryResult = {
	competitions: {
		subtitle: string;
		description: string;
	};
	hackerlab: {
		description: string;
		images: Array<{
			asset?: {
				_ref: string;
				_type: 'reference';
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
			};
			hotspot?: SanityImageHotspot;
			crop?: SanityImageCrop;
			alt: string;
			_type: 'image';
			_key: string;
		}>;
	};
} | null;
// Variable: socialsQuery
// Query: *[_type == 'info' && _id == "info"][0] {			socials		}
export type SocialsQueryResult = {
	socials: Array<{
		platform: string;
		link: string;
		_key: string;
	}> | null;
} | null;

// Source: ./src/routes/board/+page.server.ts
// Variable: boardPageQuery
// Query: {			"year": *[_type == "board"] | order(year desc)[0].year,			"members": *[_type == "board"] | order(year desc)[0].sections[].members[].person-> {				"person": @,				"titles": *[_type == "board"] | order(year desc)[0].sections[].members[person._ref match ^._id].title			}		}
export type BoardPageQueryResult = {
	year: number | null;
	members: Array<{
		person: {
			_id: string;
			_type: 'person';
			_createdAt: string;
			_updatedAt: string;
			_rev: string;
			name: string;
			slug: Slug;
			pronouns?: Array<string>;
			email?: string;
			discord?: string;
			website?: string;
			linkedin?: string;
			instagram?: string;
			image?: {
				asset?: {
					_ref: string;
					_type: 'reference';
					_weak?: boolean;
					[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
				};
				hotspot?: SanityImageHotspot;
				crop?: SanityImageCrop;
				_type: 'image';
			};
			majors?: Array<string>;
			graduation: number;
		};
		titles: Array<string> | null;
	}> | null;
};

// Source: ./src/routes/competition/+page.server.ts
// Variable: competitionPageQuery
// Query: *[_type == "competitionPage"][0] {			content		}
export type CompetitionPageQueryResult = {
	content: Array<
		| ({
				_key: string;
		  } & Achievements)
		| {
				children?: Array<{
					marks?: Array<string>;
					text?: string;
					_type: 'span';
					_key: string;
				}>;
				style?: 'h2' | 'h3' | 'normal';
				listItem?: never;
				markDefs?: Array<{
					href?: string;
					_type: 'link';
					_key: string;
				}>;
				level?: number;
				_type: 'block';
				_key: string;
		  }
	> | null;
} | null;

// Source: ./src/routes/contact/+page.server.ts
// Variable: contactPageQuery
// Query: *[_type == "contactPage"][0] {			sections[] {				_key,				title,				description,				contacts[]-> {					_id,					image,					name,					pronouns,					email,					"titles": *[_type == "board"] | order(year desc)[0].sections[].members[person._ref match ^._id].title				}			}		}
export type ContactPageQueryResult = {
	sections: Array<{
		_key: string;
		title: string;
		description: string;
		contacts: Array<{
			_id: string;
			image: {
				asset?: {
					_ref: string;
					_type: 'reference';
					_weak?: boolean;
					[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
				};
				hotspot?: SanityImageHotspot;
				crop?: SanityImageCrop;
				_type: 'image';
			} | null;
			name: string;
			pronouns: Array<string> | null;
			email: string | null;
			titles: Array<string> | null;
		}> | null;
	}> | null;
} | null;

// Source: ./src/routes/subteams/+page.server.ts
// Variable: subteamPageQuery
// Query: *[_type == "subteamsPage"][0] {			subteams[] {				name,				description			}		}
export type SubteamPageQueryResult = {
	subteams: Array<{
		name: string | null;
		description: string | null;
	}> | null;
} | null;

// Query TypeMap
import '@sanity/client';
declare module '@sanity/client' {
	interface SanityQueries {
		'\n\t\t*[_type == \'homePage\' && _id == "homePage"][0] {\n\t\t\tcompetitions {\n\t\t\t\tsubtitle,\n\t\t\t\tdescription,\n\t\t\t},\n\t\t\thackerlab {\n\t\t\t\tdescription,\n\t\t\t\timages,\n\t\t\t}\n\t\t}\n  ': HomePageQueryResult;
		'\n\t\t*[_type == \'info\' && _id == "info"][0] {\n\t\t\tsocials\n\t\t}\n\t': SocialsQueryResult;
		'\n\t\t{\n\t\t\t"year": *[_type == "board"] | order(year desc)[0].year,\n\t\t\t"members": *[_type == "board"] | order(year desc)[0].sections[].members[].person-> {\n\t\t\t\t"person": @,\n\t\t\t\t"titles": *[_type == "board"] | order(year desc)[0].sections[].members[person._ref match ^._id].title\n\t\t\t}\n\t\t}\n  ': BoardPageQueryResult;
		'\n    *[_type == "competitionPage"][0] {\n\t\t\tcontent\n\t\t}\n  ': CompetitionPageQueryResult;
		'\n    *[_type == "contactPage"][0] {\n\t\t\tsections[] {\n\t\t\t\t_key,\n\t\t\t\ttitle,\n\t\t\t\tdescription,\n\t\t\t\tcontacts[]-> {\n\t\t\t\t\t_id,\n\t\t\t\t\timage,\n\t\t\t\t\tname,\n\t\t\t\t\tpronouns,\n\t\t\t\t\temail,\n\t\t\t\t\t"titles": *[_type == "board"] | order(year desc)[0].sections[].members[person._ref match ^._id].title\n\t\t\t\t}\n\t\t\t}\n\t\t}\n  ': ContactPageQueryResult;
		'\n    *[_type == "subteamsPage"][0] {\n\t\t\tsubteams[] {\n\t\t\t\tname,\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n  ': SubteamPageQueryResult;
	}
}
