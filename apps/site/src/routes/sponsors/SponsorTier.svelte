<script lang="ts">
	import type { PageData } from './$types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';

	const builder = imageUrlBuilder(client);

	interface Props {
		sponsorTeir: NonNullable<PageData['sponsors']['gold']>;
	}

	const { sponsorTeir }: Props = $props();
</script>

<div class="flex flex-col flex-wrap items-center md:justify-center md:flex-row gap-x-16 gap-y-24">
	{#each sponsorTeir as { _id, logo, logoDark, name, since, note } (_id)}
		<div class="min-w-min max-w-60">
			<div class="h-30 max-w-60">
				<img
					class="object-contain size-full dark:hidden"
					src={builder.image(logo).width(1024).url()}
					alt={name}
				/>
				<img
					class="object-contain size-full light:hidden"
					src={builder
						.image(logoDark ? logoDark : logo)
						.width(1024)
						.url()}
					alt={name}
				/>
			</div>
			<p class="my-2 mt-8 text-center type-label">{name}</p>
			<p class="my-2 text-center type-label text-2">Since {since.substring(0, 4)}</p>
			{#if note}
				<p class="my-2 mt-6 text-center type-label text-2">{note}</p>
			{/if}
		</div>
	{/each}
</div>
