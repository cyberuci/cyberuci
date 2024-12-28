<script lang="ts">
	import type { z } from 'zod';
	import type { Person } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	export let person: z.infer<typeof Person>;
	export let titles: string[];

	$: ({ name, pronouns, image } = person);
</script>

<article class="flex flex-col gap-2">
	<div class="grid content-center w-full overflow-hidden aspect-ratio-square bg-gray-9 rounded-xl">
		{#if image}
			<img
				class="object-cover w-full h-full"
				src={builder.image(image).size(512, 512).url()}
				alt={name}
			/>
		{:else}
			<User color="var(--gray7)" />
		{/if}
	</div>
	<h1 class="mt-6 mb-1 type-heading-1">
		{name}
	</h1>
	<!-- TODO: refactor colors -->
	<div class="flex flex-col gap-.5 type-body-2">
		<span class="color-gray-5">{titles.join(', ')}</span>
		{#if pronouns}
			<span class="color-gray-5">
				{pronouns.join(', ')}
			</span>
		{/if}
	</div>
</article>
