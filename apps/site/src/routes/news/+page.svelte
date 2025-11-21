<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { resolve } from '$app/paths';

	interface Props {
		data: PageData;
	}

	const builder = imageUrlBuilder(client);

	let { data }: Props = $props();

	let options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
</script>

<svelte:head>
	<title>News — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="News" />
	{#each data.newsPage as { _id, title, slug, date, cover }, i (_id)}
		<div class="mb-5 flex flex-col lg:flex-row">
			<a
				href={resolve('/news/[slug]', {
					slug: slug.current
				})}
				class="mr-5 lg:w-1/3"
			>
				<img
					alt="The cover of the article."
					class="my-5 size-full flex-shrink-0 rounded-sm lg:my-0 lg:w-3/3"
					src={builder.image(cover).width(1024).height(600).url()}
				/>
			</a>

			<div>
				<a
					href={resolve('/news/[slug]', {
						slug: slug.current
					})}
					class="gap-5 text decoration-none lg:flex group-hover:text-blue-12 group-hover:dark:text-bluedark-12"
				>
					<div>
						<span class="mb-3 block max-w-40ch type-heading-2 group-hover:decoration-underline"
							>{title}</span
						>
					</div>
				</a>

				{#if date}
					<span class="block type-label"
						>{new Intl.DateTimeFormat('en-US', options).format(new Date(date))}</span
					>
				{/if}

				{#if i < data.externalNewsLink.length && data.externalNewsLink[i].source}
					<a
						href={data.externalNewsLink[i].link}
						rel="external"
						target="_blank"
						style="color: white"
						class="type-label underline underline"
					>
						{data.externalNewsLink[i].source} ⧉
					</a>
				{/if}
			</div>
		</div>
	{/each}
</div>
