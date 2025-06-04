<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import PortableText from '$lib/portableText/PortableText.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>{data.newsStoryPage.title} — Cyber @ UCI</title>
</svelte:head>

<div class="my-60 space-x">
	<Title size="normal" title={data.newsStoryPage.title} />
	<PortableText value={data.newsStoryPage.content} />
</div>
