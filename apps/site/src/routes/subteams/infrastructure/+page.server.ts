import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import type {
	SanityImageCrop,
	SanityImageHotspot,
	SanityImageSource
} from '@sanity/image-url/lib/types/types';
import { defineQuery } from 'groq';

const builder = imageUrlBuilder(client);

const infrastructurePageQuery = defineQuery(`
	*[_type == "infrastructurePage" && _id == "infrastructurePage"][0] {
		title,
		terminalLabel,
		splineUrl,
		rackHeading,
		rack[] {
			_key,
			tag,
			description
		},
		aboutHeading,
		aboutIntro,
		responsibilities,
		teamsHeading,
		teams[] {
			_key,
			tag,
			title,
			description
		},
		projectsHeading,
		projects[] {
			_key,
			year,
			title,
			description,
			image {
				alt,
				crop,
				hotspot,
				asset,
				"url": asset->url,
				"mimeType": asset->mimeType
			}
		}
	}
`);

interface SanityImage {
	alt?: string | null;
	crop?: SanityImageCrop | null;
	hotspot?: SanityImageHotspot | null;
	asset?: { _ref?: string } | null;
	url?: string | null;
	mimeType?: string | null;
}

interface SanityProject {
	_key: string;
	year?: string | null;
	title?: string | null;
	description?: string | null;
	image?: SanityImage | null;
}

interface FetchedPage {
	title?: string | null;
	terminalLabel?: string | null;
	splineUrl?: string | null;
	rackHeading?: string | null;
	rack?: { _key: string; tag?: string | null; description?: string | null }[] | null;
	aboutHeading?: string | null;
	aboutIntro?: string | null;
	responsibilities?: (string | null)[] | null;
	teamsHeading?: string | null;
	teams?:
		| {
				_key: string;
				tag?: string | null;
				title?: string | null;
				description?: string | null;
		  }[]
		| null;
	projectsHeading?: string | null;
	projects?: SanityProject[] | null;
}

interface PageContent {
	title: string;
	terminalLabel: string;
	splineUrl: string;
	rackHeading: string;
	rack: { _key: string; tag: string; description: string }[];
	aboutHeading: string;
	aboutIntro: string;
	responsibilities: string[];
	teamsHeading: string;
	teams: { _key: string; tag: string; title: string; description: string }[];
	projectsHeading: string;
	projects: {
		_key: string;
		year: string;
		title: string;
		description: string;
		image?: string;
		alt?: string;
	}[];
}

const teamDescription =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const projectDescription =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const defaults = {
	title: 'Infrastructure',
	terminalLabel: 'infrastructure@cyberuci',
	splineUrl: 'https://prod.spline.design/gxk0gIYwe3OIqjNM/scene.splinecode',
	rackHeading: 'THE RACK',
	rack: [
		{
			_key: 'management',
			tag: 'Management',
			description:
				'Core services for the servers in the rack, including remote access used to troubleshoot and update them.'
		},
		{
			_key: 'virtualization',
			tag: 'Virtualization',
			description:
				'Practice environments for competition teams and hands-on demos during workshops.'
		},
		{
			_key: 'storage',
			tag: 'Storage',
			description: 'Shared storage for club services and virtual machines.'
		},
		{
			_key: 'firewall',
			tag: 'Firewall',
			description: 'The network edge that keeps lab traffic organized.'
		}
	],
	aboutHeading: 'ABOUT US',
	aboutIntro:
		'The Infrastructure Team is responsible for maintaining, troubleshooting, and improving our on-premise server rack in the Cyber@UCI lab space. Some responsibilities include:',
	responsibilities: [
		'Ensuring that our services are up-to-date',
		'Troubleshooting any issues that users are facing',
		'Supporting competition teams in creating mock environments',
		'Creating internal tools',
		'Improving the overall structure and user experience of our server rack'
	],
	teamsHeading: 'TEAMS',
	teams: [
		{
			_key: 'traditional',
			tag: 'Traditional',
			title: 'Traditional Infra',
			description: teamDescription
		},
		{
			_key: 'swe',
			tag: 'SWE',
			title: 'SWE Infra',
			description: teamDescription
		}
	],
	projectsHeading: 'PROJECTS',
	projects: [
		{
			_key: 'easy-vm',
			year: 'timespan',
			title: 'Easy VM',
			description: projectDescription,
			image: undefined,
			alt: undefined
		},
		{
			_key: 'placeholder-2',
			year: 'timespan',
			title: 'Place holder 2',
			description: projectDescription,
			image: undefined,
			alt: undefined
		},
		{
			_key: 'placeholder-3',
			year: 'timespan',
			title: 'Place holder 3',
			description: projectDescription,
			image: undefined,
			alt: undefined
		}
	]
};

function filled<T>(items: T[] | null | undefined): T[] | undefined {
	return items && items.length > 0 ? items : undefined;
}

function text(value: string | null | undefined, fallback: string) {
	const trimmed = value?.trim();
	return trimmed ? trimmed : fallback;
}

function lines(items: (string | null)[] | null | undefined) {
	const list = items?.flatMap((item) => {
		const value = item?.trim();
		return value ? [value] : [];
	});
	return list && list.length > 0 ? list : undefined;
}

/** GIFs stay animated only when the original file is used. Image CDN resizes flatten them. */
function projectImageUrl(image: SanityImage | null | undefined) {
	const url = image?.url || undefined;
	const ref = image?.asset?._ref;
	if (!url && !ref) return undefined;

	const isGif = image?.mimeType === 'image/gif' || url?.toLowerCase().includes('.gif') === true;
	if (isGif && url) return url;

	if (!ref) return url;
	const source: SanityImageSource = {
		asset: { _ref: ref },
		crop: image?.crop ?? undefined,
		hotspot: image?.hotspot ?? undefined
	};
	if (isGif) return builder.image(source).url();
	return builder.image(source).width(1280).height(720).fit('crop').auto('format').url();
}

export const load: PageServerLoad = async () => {
	const page = (await client.fetch(infrastructurePageQuery)) as FetchedPage | null;

	const projects = filled(
		page?.projects?.map((project) => ({
			_key: project._key,
			year: text(project.year, ''),
			title: text(project.title, ''),
			description: text(project.description, ''),
			image: projectImageUrl(project.image),
			alt: project.image?.alt?.trim() || undefined
		}))
	);

	const content: PageContent = {
		title: text(page?.title, defaults.title),
		terminalLabel: text(page?.terminalLabel, defaults.terminalLabel),
		splineUrl: text(page?.splineUrl, defaults.splineUrl),
		rackHeading: text(page?.rackHeading, defaults.rackHeading),
		rack:
			filled(page?.rack)?.map((role) => ({
				_key: role._key,
				tag: text(role.tag, ''),
				description: text(role.description, '')
			})) ?? defaults.rack,
		aboutHeading: text(page?.aboutHeading, defaults.aboutHeading),
		aboutIntro: text(page?.aboutIntro, defaults.aboutIntro),
		responsibilities: lines(page?.responsibilities) ?? defaults.responsibilities,
		teamsHeading: text(page?.teamsHeading, defaults.teamsHeading),
		teams:
			filled(page?.teams)?.map((team) => ({
				_key: team._key,
				tag: text(team.tag, ''),
				title: text(team.title, ''),
				description: text(team.description, '')
			})) ?? defaults.teams,
		projectsHeading: text(page?.projectsHeading, defaults.projectsHeading),
		projects: projects ?? defaults.projects
	};

	return content;
};
