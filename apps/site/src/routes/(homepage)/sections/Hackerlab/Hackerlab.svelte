<script lang="ts">
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
	import { Clock, ExternalLink, FlaskConical, MapPin } from 'lucide-svelte';
	import Heading from '../heading.svelte';

	const googleMapsUrl =
		'https://www.google.com/maps/search/?api=1&query=Interdisciplinary+Science+and+Engineering+Building+UC+Irvine';

	const builder = imageUrlBuilder(client);

	interface Props {
		hackerlab: {
			description: string;
			images: SanityImageSource;
			location: {
				_type: 'image';
				alt: 'Hackerlab Location';
				asset: [object];
			};
		};
	}

	let { hackerlab }: Props = $props();

	const location = $derived(hackerlab.location as SanityImageSource | undefined);
	const mapSrc = $derived(
		location
			? builder.image(location).width(1920).height(1200).fit('crop').auto('format').url()
			: null
	);
	const mapAlt = $derived(hackerlab.location?.alt ?? 'Map showing HackerLab on the UCI campus');
</script>

<div class="my-12 space-x" id="hacker-lab">
	<Heading heading="Hackerlab" />
	<div
		class="card ring-black/5 dark:ring-white/10 mt-4 flex flex-col overflow-hidden rounded-2xl shadow-sm ring-1 transition-shadow duration-200 md:flex-row hover:shadow-md"
	>
		{#if mapSrc}
			<div class="block w-full flex-shrink-0 p-3 lg:hidden md:hidden md:w-1/2">
				<a
					class="map-link group relative block h-full min-h-48"
					href={googleMapsUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Open HackerLab location in Google Maps"
				>
					<img
						class="h-full min-h-48 w-full rounded-xl object-cover object-[50%_42%] transition-transform duration-300 group-hover:scale-[1.02]"
						src={mapSrc}
						alt={mapAlt}
					/>
				</a>
			</div>
		{/if}

		<div class="flex flex-1 flex-col justify-between p-6">
			<div>
				<div class="mb-6">
					<FlaskConical size={20} class="meta-icon" />
				</div>
				<p class="mb-2 type-heading-2">Visit HackerLab</p>
				<p class="type-body-1 line-height-relaxed">{hackerlab.description}</p>

				<ul class="m-0 mt-4 flex flex-col list-none gap-3 p-0 type-body-1">
					<li class="flex items-start gap-2">
						<MapPin size={16} class="meta-icon mt-0.5 shrink-0" />
						<span
							><b>1550 Interdisciplinary Science & Engineering Building (ISEB), UC Irvine</b></span
						>
					</li>
					<li class="flex items-start gap-2">
						<Clock size={16} class="meta-icon mt-0.5 shrink-0" />
						<span>Open hours vary — check Discord for the latest schedule.</span>
					</li>
				</ul>
			</div>

			<a
				class="directions-btn mt-6 w-fit inline-flex items-center gap-2 rounded-full px-4 py-2 type-label decoration-none transition-colors"
				href={googleMapsUrl}
				target="_blank"
				rel="noopener noreferrer"
			>
				<ExternalLink size={14} />
				<span>Get directions</span>
			</a>
		</div>

		{#if mapSrc}
			<div class="hidden w-full flex-shrink-0 p-3 lg:block md:block md:w-1/2">
				<a
					class="map-link group relative block h-full min-h-48"
					href={googleMapsUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Open HackerLab location in Google Maps"
				>
					<img
						class="h-full min-h-48 w-full rounded-xl object-cover object-[50%_42%] transition-transform duration-300 group-hover:scale-[1.02]"
						src={mapSrc}
						alt={mapAlt}
					/>
				</a>
			</div>
		{/if}
	</div>
</div>

<style>
	.card {
		background-color: #e1f1ff; /* blue-3 */
		color: #1b3d5d; /* blue-12 */
	}

	.directions-btn {
		color: #f7fbff;
		background-color: #2975ba;

		&:hover {
			background-color: #1b3d5d;
		}
	}

	.map-link {
		background-color: #d2eaff; /* blue-4 */
	}

	.map-hint {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		z-index: 1;
		padding: 0.35rem 0.65rem;
		border-radius: 999px;
		color: #3c4043;
		background: rgb(255 255 255 / 0.94);
		box-shadow: 0 1px 6px rgb(60 64 67 / 0.18);
	}

	@media (prefers-color-scheme: dark) {
		.card {
			background-color: #0b2945; /* bluedark-3 */
			color: #cae6ff; /* bluedark-12 */
		}

		.directions-btn {
			color: #0b2945;
			background-color: #75bbff;

			&:hover {
				background-color: #cae6ff;
			}
		}

		.map-link {
			background-color: #122a42; /* bluedark-4 */
		}
	}
</style>
