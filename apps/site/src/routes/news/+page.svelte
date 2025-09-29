<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';

	interface Props {
		data: PageData;
	}

	const builder = imageUrlBuilder(client);

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>News — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="News" />
	{#each data.newsPage as { title, slug, date, cover }}
		<div class="group flex gap-5 my-10">
			<img
				alt="The cover of the article."
				class="w-1/2 rounded-sm"
				src={builder.image(cover).width(1024).height(600).url()}
				/>
			<a
				href="/news/{slug.current}"
				class="text decoration-none hover:dark:text-bluedark-12 hover:text-blue-12 group"
			>
				<span class="block type-heading-2 max-w-40ch group-hover:decoration-underline"
					>{title}</span
				>
				<span class="block type-label">{date}</span>
			</a>
		</div>
	{/each}
</div>
