<script lang="ts">
	import type { z } from 'zod';
	import type { Person } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	interface Props {
		person: z.infer<typeof Person> & { ascii?: string };
		titles: string[];
	}

	let { person, titles }: Props = $props();

	let { name, pronouns, image, majors, graduation, ascii } = $derived(person);
</script>

<article>
	<div class="relative w-full aspect-ratio-square rounded-sm overflow-hidden group">
		<div
			class="absolute grid place-content-center overflow-hidden transition-opacity transition-150 opacity-100 group-hover:opacity-0"
		>
			<p
				class="m-0 text-[1.55vw] sm:text-[0.81vw] lg:text-[0.55vw] font-mono line-height-none text-blue-9"
			>
				{ascii}
			</p>
		</div>
		<div
			class="absolute grid content-center opacity-0 group-hover:opacity-100 transition-opacity transition-150"
		>
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
