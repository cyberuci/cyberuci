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

	{#each data.newsPage as { _id, title, date, cover }, i (_id)}
		<div class="mb-5 flex flex-col lg:flex-row">
			<NewsPreview
				{title}
				{date}
				{cover}
				source={data.externalNewsLink[i].source}
				externalLink={data.externalNewsLink[i].link}
				relativeSize="l"
			/>
		</div>
	{/each}
</div>
