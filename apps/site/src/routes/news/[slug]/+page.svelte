<script lang="ts">
	import type { PageData } from './$types';
	import PortableText from '$lib/portableText/PortableText.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { resolve } from '$app/paths';
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '$lib/sanity/sanityClient';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const builder = imageUrlBuilder(client);
</script>

<svelte:head>
	<title>{data.newsStoryPage.title} — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<a
		href={resolve('/news')}
		class="flex items-end gap-1 type-label text decoration-none hover:text-blue-12 hover:dark:text-bluedark-12"
		><ArrowLeft class="mb-.5" size={16} /> All News</a
	>
	<h1 class="mb-24 max-w-40ch type-heading-2">{data.newsStoryPage.title}</h1>
	<PortableText value={data.newsStoryPage.content} />

	<h1 class="mt-24 max-w-40ch type-heading-2">Read More:</h1>
	{#each data.newsPage as { _id, title, slug, date, cover } (_id)}
		{#if title != data.newsStoryPage.title}
			<a
				href={resolve('/news/[slug]', {
					slug: slug.current
				})}
				class="my-8 block w-full gap-5 text decoration-none lg:flex group-hover:text-blue-12 group-hover:dark:text-bluedark-12"
			>
				<img
					alt="The cover of the article."
					class="my-5 size-full flex-shrink-0 rounded-sm lg:my-0 lg:w-1/3"
					style="border-radius: 10px"
					src={builder.image(cover).width(1024).height(600).url()}
				/>
				<div>
					<span class="mb-3 block max-w-40ch type-heading-2 group-hover:decoration-underline"
						>{title}</span
					>
					<span class="block type-label">{date}</span>
				</div>
			</a>
		{/if}
	{/each}
</div>
