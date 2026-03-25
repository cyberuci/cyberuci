<script lang="ts">
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

	interface Props {
		title: string;
		date: string;
		cover: SanityImageSource;
		source: string;
		externalLink: string;
		relativeSize: string;
	}

	const builder = imageUrlBuilder(client);

	let { title, date, cover, source, externalLink, relativeSize }: Props = $props();

	let options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
</script>

<a
	href={externalLink}
	class={`mr-5 ${relativeSize === 's' ? 'lg:w-3/3 mb-5' : 'lg:w-1/3'}`}
	rel="external"
	target="_blank"
>
	<img
		alt="The cover of the article."
		class="my-5 size-full flex-shrink-0 rounded-sm lg:my-0 lg:w-3/3"
		src={builder.image(cover).width(1024).height(600).url()}
	/>
</a>

<div>
	<a
		href={externalLink}
		class="gap-5 text decoration-none lg:flex group-hover:text-blue-12 group-hover:dark:text-bluedark-12"
		rel="external"
		target="_blank"
	>
		<div class="line-clamp-3 mb-3">
			<span
				class={`block max-w-40ch type-heading-2 group-hover:decoration-underline ${relativeSize === 's' ? 'text-2xl' : ''}`}
				>{title}</span
			>
		</div>
	</a>

	{#if date}
		<span class="block type-label">
			{new Intl.DateTimeFormat('en-US', options).format(new Date(date))}
		</span>
	{/if}
	{#if source}
		<span class="mt-1 block type-label">
			{source} ⧉
		</span>
	{/if}
</div>
