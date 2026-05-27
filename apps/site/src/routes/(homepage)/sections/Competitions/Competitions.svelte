<script lang="ts">
	import { resolve } from '$app/paths';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { Medal, Info } from 'lucide-svelte';
	import Heading from '../heading.svelte';
	import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

	const builder = imageUrlBuilder(client);

	interface Props {
		image: SanityImageSource;
		subtitle: string;
		description: string;
	}

	let { image, subtitle, description }: Props = $props();
</script>

<div class="my-12 space-x">
	<Heading heading="Competitions" />
	<div
		class="card ring-black/5 dark:ring-white/10 flex flex-col overflow-hidden rounded-2xl shadow-sm ring-1 transition-shadow duration-200 md:flex-row hover:shadow-md"
	>
		<div class="w-full flex-shrink-0 p-3 md:w-1/2">
			<img
				alt="Competition team"
				class="h-full min-h-48 w-full rounded-xl object-cover"
				src={builder.image(image).width(1200).auto('format').url()}
			/>
		</div>
		<div class="flex flex-1 flex-col justify-between p-6 lg:p-8">
			<div>
				<div class="mb-6">
					<Medal size={20} />
				</div>
				<p class="mb-2 type-heading-2">Competitions</p>
				<h2 class="mb-4 type-heading-2 text-blue-11 dark:text-bluedark-11">{subtitle}</h2>
				<p class="type-body-1 line-height-relaxed">{description}</p>
			</div>
			<a
				href={resolve('/competition')}
				class="mt-6 flex items-center gap-2 type-body-1 text-blue-11 decoration-none transition-colors dark:text-bluedark-11 hover:text-blue-12 dark:hover:text-bluedark-12"
			>
				<Info size={16} />
				<span>Learn more</span>
			</a>
		</div>
	</div>
</div>

<style>
	.card {
		background-color: #e8e8e8; /* gray-4 */
		color: #202020; /* gray-12 */
	}

	@media (prefers-color-scheme: dark) {
		.card {
			background-color: #222222; /* graydark-3 */
			color: #eeeeee; /* graydark-12 */
		}
	}
</style>
