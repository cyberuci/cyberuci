<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import ScanLog from './ScanLog.svelte';
	import { CircleDashed } from 'lucide-svelte';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const builder = imageUrlBuilder(client);
	const { title, intro, scanLog, whatWeDo, focusAreas } = data.outreach;

	const image: { alt?: string } | undefined = whatWeDo.image;
	const imageUrl = $derived(
		image
			? builder
					.image(image as SanityImageSource)
					.width(800)
					.height(800)
					.fit('crop')
					.auto('format')
					.url()
			: null
	);
</script>

<svelte:head>
	<title>{title} — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title {title} />

	<p class="mb-16 max-w-prose type-body-2 text-2">
		{intro}
	</p>

	<ScanLog header={scanLog.header} command={scanLog.command} entries={scanLog.entries} />

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<CircleDashed size={18} />
			<h2 class="type-label font-550">{whatWeDo.heading}</h2>
		</div>
		<div class="flex flex-col gap-6 lg:col-start-5 lg:col-end-17 md:flex-row md:items-stretch">
			<div class="flex-1 type-body-2 text-2 space-y-4">
				{#each whatWeDo.body as paragraph (paragraph)}
					<p class="m-0">{paragraph}</p>
				{/each}
			</div>
			{#if imageUrl}
				<img
					class="h-56 w-full flex-shrink-0 rounded-md object-cover lg:w-80 md:h-auto md:w-72"
					src={imageUrl}
					alt={image?.alt ?? ''}
				/>
			{/if}
		</div>
	</div>

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<CircleDashed size={18} />
			<h2 class="type-label font-550">{focusAreas.heading}</h2>
		</div>
		<ul
			class="m-0 list-none p-0 lg:col-start-5 lg:col-end-15 divide-y divide-gray-4 dark:divide-graydark-4"
		>
			{#each focusAreas.areas as { _key, tag, title: areaTitle, description } (_key)}
				<li
					class="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[minmax(0,140px)_1fr] sm:gap-6 first:pt-0 last:pb-0"
				>
					<span class="type-label text-[#00b2ff]">[{tag}]</span>
					<div>
						<p class="m-0 font-600 type-body-1">{areaTitle}</p>
						<p class="mb-0 mt-1 text-2 type-body-1">{description}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
