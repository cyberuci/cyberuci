<script lang="ts">
	import type { PageData } from './$types';
	import PortableText from '$lib/portableText/PortableText.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { resolve } from '$app/paths';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
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
</div>
