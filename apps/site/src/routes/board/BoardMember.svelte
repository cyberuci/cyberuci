<script lang="ts">
	import type { z } from 'zod';
	import type { Person } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	export let person: z.infer<typeof Person>;
	export let titles: string[];

	$: ({ name, pronouns, image, majors, graduation } = person);
</script>

<article>
	<div class="grid content-center w-full overflow-hidden aspect-ratio-square rounded-sm">
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
	<h1 class="mt-6 mb-2 type-heading-1">
		{name}
	</h1>
	<div class="flex flex-col gap-.5 type-body-2 text-gray-11 dark:text-graydark-11">
		<span>{titles.join(', ')}</span>
		{#if majors}
			<span>{majors.join(', ')} {graduation}</span>
		{/if}
		{#if pronouns}
			<span>
				{pronouns.join(', ')}
			</span>
		{/if}
	</div>
</article>
