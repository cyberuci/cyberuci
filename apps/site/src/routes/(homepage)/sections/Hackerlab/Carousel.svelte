<script lang="ts">
	// TODO: replace external drag scroll dependency
	import 'scroll-snap-slider/dist/scroll-snap-slider.css';

	import type { z } from 'zod';
	import { SanityImageReferenceWithAlt } from '$lib/sanity/types';

	import { ScrollSnapSlider, ScrollSnapDraggable } from 'scroll-snap-slider';
	import { onMount } from 'svelte';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';

	const builder = imageUrlBuilder(client);

	export let images: z.infer<typeof SanityImageReferenceWithAlt>[];

	let content: HTMLUListElement;

	onMount(() => {
		const slider = new ScrollSnapSlider({
			element: content
		}).with([new ScrollSnapDraggable(50)]);

		return () => {
			slider.destroy();
		};
	});
</script>

<!-- TODO: arrows and dots -->
<ul bind:this={content} class="carousel scroll-snap-slider">
	{#each images as image}
		<li class="item">
			<img class="image" src={builder.image(image).auto('format').url()} alt={image.alt} />
		</li>
	{/each}
</ul>

<style lang="scss">
	.carousel {
		margin: 16px 0;
		padding: 0;
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		overscroll-behavior-x: none;
		overscroll-behavior-y: auto;
		border-radius: 48px;
		list-style-type: none;
		display: flex;
		gap: 16px;
	}

	.item {
		width: 100%;
		aspect-ratio: 3/4;
		flex-shrink: 0;
		scroll-snap-stop: always;
		scroll-snap-align: center;

		@media (min-width: 600px) {
			aspect-ratio: initial;
			height: 600px;
		}
	}

	.image {
		width: 100%;
		height: 100%;
		border-radius: 48px;
		pointer-events: none;
		object-fit: cover;
	}
</style>
