<script lang="ts">
	import type { z } from 'zod';
	import type { Person } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	interface Props {
		person: z.infer<typeof Person>;
		titles: string[];
	}

	let { person, titles }: Props = $props();

	let { name, pronouns, image, majors, graduation } = $derived(person);
</script>

<article>
	<div class="relative aspect-ratio-square w-full overflow-hidden rounded-sm">
		<div class="absolute grid content-center transition-150 transition-opacity">
			{#if image}
				<img
					class="h-full w-full object-cover"
					src={builder.image(image).size(512, 512).url()}
					alt={name}
				/>
			{:else}
				<User color="var(--gray7)" />
			{/if}
		</div>
	</div>
	<h1 class="mb-2 mt-6 type-heading-1">
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
