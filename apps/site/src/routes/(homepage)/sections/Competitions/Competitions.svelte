<script lang="ts">
	// Libraries
	import { resolve } from '$app/paths';
	import { client } from '$lib/sanity/sanityClient';
	import { Medal, Info } from 'lucide-svelte';
	import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
	import imageUrlBuilder from '@sanity/image-url';

	// Internal Components and Scripts
	import SubHeading from '$lib/common/components/SectionHeading.svelte';

	const builder = imageUrlBuilder(client);

	interface Props {
		image: SanityImageSource;
		subtitle: string;
		description: string;
	}

	let { image, subtitle, description }: Props = $props();
</script>

<div class="my-12 space-x">
	<SubHeading heading="Competitions" />
	<div
		class="ring-black/5 dark:ring-white/10 mt-4 flex flex-col overflow-hidden rounded-2xl background-3 shadow-sm ring-1 transition-shadow duration-200 md:flex-row hover:shadow-md"
	>
		<div class="w-full flex-shrink-0 p-3 md:w-1/2">
			<img
				alt="Trophies"
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
				<p class="line-height-relaxed type-body-1">{description}</p>
			</div>

			<a
				href={resolve('/competition')}
				class="mt-6 flex items-center gap-2 text-blue-11 type-body-1 decoration-none transition-colors dark:text-bluedark-11 hover:text-blue-12 dark:hover:text-bluedark-12"
			>
				<Info size={16} />
				<span>Learn more</span>
			</a>
		</div>
	</div>
</div>
