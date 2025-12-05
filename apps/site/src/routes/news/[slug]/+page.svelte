<script lang="ts">
	import type { PageData } from './$types';
	import PortableText from '$lib/portableText/PortableText.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { resolve } from '$app/paths';
	import NewsPreview from '../NewsPreview.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
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
	<h1 class="type-heading-2">{data.newsStoryPage.title}</h1>

	<span class="mb-24 block max-w-40ch type-label">
		{#if data.externalNewsLink}
			<a
				href={data.externalNewsLink.link}
				rel="external"
				target="_blank"
				class="text-white underline"
			>
				{data.externalNewsLink.source} ⧉
			</a>
			<br />
		{/if}

		{#if data.newsStoryPage.date}
			{new Intl.DateTimeFormat('en-US', options).format(new Date(data.newsStoryPage.date))}
		{/if}
	</span>

	<PortableText value={data.newsStoryPage.content} />

	<h1 class="mt-24 max-w-40ch type-heading-2">Read More:</h1>

	<div class="flex flex-col lg:flex-row lg:space-x-4">
		{#each data.recentArticles as { _id, title, slug, date, cover }, i (_id)}
			<div class="mb-5 flex flex-col lg:flex-col">
				<NewsPreview
					{title}
					slug={slug.current}
					{date}
					{cover}
					source={data.recentExternalLink[i].source}
					externalLink={data.recentExternalLink[i].link}
					relativeSize="s"
				/>
			</div>
		{/each}
	</div>
</div>
