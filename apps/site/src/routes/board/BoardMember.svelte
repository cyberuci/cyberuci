<script lang="ts">
	import type { z } from 'zod';
	import type { Person } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	interface Props {
		person: z.infer<typeof Person> & { ascii?: string; asciiInvert?: string };
		titles: string[];
	}

	let { person, titles }: Props = $props();

	let { name, pronouns, image, majors, graduation, ascii, asciiInvert } = $derived(person);
</script>

<article>
	<div class="relative w-full overflow-hidden rounded-sm aspect-ratio-square group">
		<div
			class="absolute grid overflow-hidden transition-opacity opacity-100 place-content-center transition-150 group-hover:opacity-0"
		>
			<!-- font-size breakpoints are manually calculated -->
			<!-- calc((100vw - <page margins> * 2 + <gap> * (<num columns> - 1)) / <num columns> * <multiplier>) -->
			<!-- if done correctly, multiplier should remain constant across breakpoints -->
			<!-- https://bugs.webkit.org/show_activity.cgi?id=225695 -->
			<p
				class="m-0 text-[calc((100vw_-_7.5rem)*0.0185)] sm:text-[calc((100vw_-_9rem)/2*0.0185)] lg:text-[calc((100vw_-_10.5rem)/3*0.0185)] font-mono line-height-none text-blue-9"
			>
				<span class="hidden dark:inline">{ascii}</span>
				<span class="inline dark:hidden">{asciiInvert}</span>
			</p>
		</div>
		<div
			class="absolute grid content-center transition-opacity opacity-0 group-hover:opacity-100 transition-150"
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
