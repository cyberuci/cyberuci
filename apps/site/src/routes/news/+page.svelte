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
		<a
			href="/news/{slug.current}"
			class="block lg:flex gap-5 my-8 w-full text decoration-none group-hover:dark:text-bluedark-12 group-hover:text-blue-12"
		>
			<img
				alt="The cover of the article."
				class="lg:w-1/3 size-full my-5 lg:my-0 rounded-sm flex-shrink-0"
				src={builder.image(cover).width(1024).height(600).url()}
			/>
			<div>
				<span class="block type-heading-2 mb-3 max-w-40ch group-hover:decoration-underline"
					>{title}</span
				>
				<span class="block type-label">{date}</span>
			</div>
		</a>
	{/each}
</div>
