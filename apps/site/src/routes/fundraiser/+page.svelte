<script lang="ts">
	import type { PageData } from './$types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import Logo from '$lib/common/components/Logo.svelte';
	import Title from '$lib/common/components/Title.svelte';

	const builder = imageUrlBuilder(client);

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const posterUrl = $derived(data.poster ? builder.image(data.poster).width(1600).url() : null);
</script>

<svelte:head>
	<title>Fundraiser — Cyber @ UCI</title>
</svelte:head>

<main class="my-40 space-x">
	<Title title="Fundraiser" />

	<div class="flex justify-center">
		{#if posterUrl}
			<div class="w-full flex flex-col md:w-8/10">
				{#if data.description}
					<p class="type-body-1">{data.description}</p>
				{/if}
				<img
					src={posterUrl}
					alt={data.poster?.alt || 'Cyber @ UCI fundraiser poster'}
					class="h-auto w-full"
				/>
			</div>
		{:else}
			<article
				class="poster relative max-w-md w-full overflow-hidden border border-blue-8 border-solid bg-blue-1 dark:border-bluedark-7 dark:bg-bluedark-2"
			>
				<div
					class="flex items-center justify-between border-b-2 border-l border-r border-t border-blue-6 border-solid px-5 py-3 dark:border-bluedark-6"
				>
					<p class="m-0 type-label terminal-before text-blue-12 dark:text-bluedark-12">cyberuci</p>
					<p class="m-0 type-label text-blue-11 dark:text-bluedark-11">FUNDRAISER</p>
				</div>

				<div class="flex flex-col items-center px-8 pb-14 pt-12 text-center">
					<div class="mb-8 h-30" aria-hidden="true">
						<Logo />
					</div>
					<div class="my-2 h-px w-16 bg-blue-8 dark:bg-bluedark-8"></div>
					<p class="m-0 max-w-xs type-body-1 text-2">No fundraisers happening. Check back again!</p>
				</div>

				<div
					class="border-b border-l border-r border-t-2 border-blue-6 border-solid px-5 py-3 dark:border-bluedark-6"
				>
					<p class="m-0 type-label text-2">Cyber @ UCI</p>
				</div>
			</article>
		{/if}
	</div>
</main>

<style>
	.poster {
		background-image:
			linear-gradient(to right, color-mix(in srgb, #2975ba 18%, transparent) 1px, transparent 1px),
			linear-gradient(to bottom, color-mix(in srgb, #2975ba 18%, transparent) 1px, transparent 1px);
		background-size: 28px 28px;
	}
</style>
