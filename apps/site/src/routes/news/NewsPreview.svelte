<script lang="ts">
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { resolve } from '$app/paths';

	interface Props {
		title: string;
		slug: string;
		date: string;
		cover: object;
		source: string;
		externalLink: string;
	}

	const builder = imageUrlBuilder(client);

	let { title, slug, date, cover, source, externalLink }: Props = $props();

	let options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
</script>

<div class="mb-5 flex flex-col lg:flex-row">
	<a
		href={resolve('/news/[slug]', {
			slug: slug
		})}
		class="mr-5 lg:w-1/3"
	>
		<img
			alt="The cover of the article."
			class="my-5 size-full flex-shrink-0 rounded-sm lg:my-0 lg:w-3/3"
			src={builder.image(cover).width(1024).height(600).url()}
		/>
	</a>

	<div>
		<a
			href={resolve('/news/[slug]', {
				slug: slug
			})}
			class="gap-5 text decoration-none lg:flex group-hover:text-blue-12 group-hover:dark:text-bluedark-12"
		>
			<div>
				<span class="mb-3 block max-w-40ch type-heading-2 group-hover:decoration-underline"
					>{title}</span
				>
			</div>
		</a>

		{#if date}
			<span class="block type-label"
				>{new Intl.DateTimeFormat('en-US', options).format(new Date(date))}</span
			>
		{/if}

		{#if source}
			<a
				href={externalLink}
				rel="external"
				target="_blank"
				style="color: white"
				class="type-label underline underline"
			>
				{source} ⧉
			</a>
		{/if}
	</div>
</div>
