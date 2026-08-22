<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import ScanLog from './ScanLog.svelte';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const builder = imageUrlBuilder(client);
	const { title, intro, scanLog, whatWeDo, focusAreas } = data.outreach;

	type ImageField = { alt?: string };

	const image: ImageField | undefined = whatWeDo.image;
	const imageSecondary: ImageField | undefined = whatWeDo.imageSecondary;

	function urlFor(source: ImageField | undefined) {
		if (!source) return null;
		return builder
			.image(source as SanityImageSource)
			.width(800)
			.auto('format')
			.url();
	}

	const imageUrl = $derived(urlFor(image));
	const imageSecondaryUrl = $derived(urlFor(imageSecondary));
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
		<h2 class="m-0 flex items-baseline gap-2 type-body-2 font-550 lg:col-start-1 lg:col-end-5">
			<span class="text-blue-11 dark:text-bluedark-11">[{whatWeDo.symbol ?? '?'}]</span>
			{whatWeDo.heading}
		</h2>
		<div
			class="flex flex-col gap-6 lg:col-start-5 lg:col-end-17 md:flex-row md:items-stretch md:gap-10"
		>
			<div class="flex-1 type-body-2 text-2 lg:mr-8 md:mr-4 space-y-4">
				{#each whatWeDo.body as paragraph (paragraph)}
					<p class="m-0">{paragraph}</p>
				{/each}
			</div>
			{#if imageUrl || imageSecondaryUrl}
				<div class="relative mx-auto w-[88%] flex-shrink-0 md:mx-0 lg:w-100 md:w-72">
					{#if imageUrl}
						<img
							class="relative z-10 h-auto w-[88%] rotate-[-3deg] rounded-md object-contain shadow-md transition duration-300 ease-out hover:z-40 hover:scale-105 hover:shadow-lg"
							src={imageUrl}
							alt={image?.alt ?? ''}
						/>
					{/if}
					{#if imageSecondaryUrl}
						<img
							class="relative z-20 {imageUrl
								? 'ml-8 -mt-4'
								: ''} h-auto w-[88%] rotate-[4deg] rounded-md object-contain shadow-md transition duration-300 ease-out hover:z-40 hover:scale-105 hover:shadow-lg"
							src={imageSecondaryUrl}
							alt={imageSecondary?.alt ?? ''}
						/>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<h2 class="m-0 flex items-baseline gap-2 type-body-2 font-550 lg:col-start-1 lg:col-end-5">
			<span class="text-blue-11 dark:text-bluedark-11">[{focusAreas.symbol ?? '?'}]</span>
			{focusAreas.heading}
		</h2>
		<ul class="m-0 list-none p-0 lg:col-start-5 lg:col-end-17">
			{#each focusAreas.areas as { _key, tag, title: areaTitle, description } (_key)}
				<li
					class="grid grid-cols-1 items-baseline gap-2 border-0 border-b border-gray-7 border-solid py-6 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6 last:border-b-0 dark:border-graydark-7 first:pt-0 last:pb-0"
				>
					<span class="type-body-2 text-blue-11 dark:text-bluedark-11">[{tag}]</span>
					<div>
						<p class="m-0 type-body-2 font-600">{areaTitle}</p>
						<p class="mb-0 mt-1 type-body-2 text-2">{description}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
