<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import NewsPreview from './NewsPreview.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>News — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="News" />
	{#each data.newsPage as { _id, title, slug, date, cover }, i (_id)}
		<NewsPreview
			{title}
			slug={slug.current}
			{date}
			{cover}
			source={data.externalNewsLink[i].source}
			externalLink={data.externalNewsLink[i].link}
		/>
	{/each}
</div>
