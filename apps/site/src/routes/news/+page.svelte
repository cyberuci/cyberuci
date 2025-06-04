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
	<title>News — Cyber @ UCI</title>
</svelte:head>

<div class="my-60 space-x">
	<Title title="News" />
	{#each data.newsPage as { title, slug, date }}
		<a
			href="/news/{slug.current}"
			class="text decoration-none hover:dark:text-bluedark-12 hover:text-blue-12 group"
		>
			<span class="block my-5 type-heading-2 max-w-40ch group-hover:decoration-underline"
				>{title}</span
			>
			<span class="block type-label">{date}</span>
		</a>
	{/each}
</div>
