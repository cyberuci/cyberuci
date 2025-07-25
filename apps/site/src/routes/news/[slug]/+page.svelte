<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import PortableText from '$lib/portableText/PortableText.svelte';
	import { ArrowLeft } from 'lucide-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>{data.newsStoryPage.title} — Cyber @ UCI</title>
</svelte:head>

<div class="my-60 space-x">
	<a
		href="/news"
		class="flex items-end gap-1 type-label text decoration-none hover:dark:text-bluedark-12 hover:text-blue-12"
		><ArrowLeft class="mb-.5" size={16} /> All News</a
	>
	<h1 class="mb-24 type-heading-2 max-w-40ch">{data.newsStoryPage.title}</h1>
	<PortableText value={data.newsStoryPage.content} />
</div>
