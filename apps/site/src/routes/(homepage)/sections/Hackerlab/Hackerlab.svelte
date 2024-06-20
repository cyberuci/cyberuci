<script lang="ts">
	import type { z } from 'zod';
	import { SanityImageReferenceWithAlt } from '$lib/sanity/types';

	import Carousel from './Carousel.svelte';
	import Map from './Map.svelte';

	export let images: z.infer<typeof SanityImageReferenceWithAlt>[];
	export let description: string;
</script>

<div id="hackerlab" class="hackerlab">
	<h2 class="heading"><span class="rainbow">//////////////</span> Hackerlab</h2>
	<Carousel {images} />
	<div class="info-parent">
		<div class="info">
			<h3>Visit HackerLab</h3>
			<p class="description">{description}</p>
		</div>
		<div class="map">
			<Map />
		</div>
	</div>
</div>

<style lang="scss">
	@use '$lib/colors/variables.scss' as colors;

	.hackerlab {
		margin: 160px 16px 16px 16px;
	}

	.heading {
		margin: 0;
		font-feature-settings:
			'dlig' on,
			'ss05' on;
		font-family: CommitMono;
		font-size: 16px;
		font-weight: 400;
		line-height: 145%;

		.rainbow {
			background: linear-gradient(
				90deg,
				#f00,
				#ff8000,
				#ff0,
				#80ff00,
				#0f0,
				#00ff7f,
				#0ff,
				#0080ff,
				#4a4a95,
				#602c95,
				#a01aa0,
				#c0116a,
				#f00
			);
			background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}

	.info-parent {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;

		@media (min-width: 900px) {
			grid-template-columns: 1fr 1fr;
		}

		.info {
			border-radius: 32px;
			color: colors.$md-sys-color-on-surface;
			background-color: colors.$md-sys-color-surface-container;
			padding: 40px 24px;

			h3 {
				margin: 0;
				font-feature-settings: 'dlig' on;
				font-family: TASAExplorer;
				font-size: 32px;
				font-weight: 500;
				line-height: 130%;
			}

			.description {
				margin: 32px 0 48px 0;
				max-width: 672px;
				text-wrap: balance;
				font-feature-settings: 'ss05' on;
				font-family: CommitMono;
				font-size: 16px;
				font-weight: 400;
				line-height: 150%;
			}
		}

		.map {
			position: relative;
			min-height: 384px;
			border-radius: 32px;
			overflow: hidden;
		}
	}
</style>
