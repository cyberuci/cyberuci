<script lang="ts">
	import type { z } from 'zod';
	import type { SanityImageReference } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';

	const builder = imageUrlBuilder(client);

	export let image: z.infer<typeof SanityImageReference>;
</script>

<div class="image">
	<img src={builder.image(image).maxWidth(1200).url()} />
	<img class="blur-2" src={builder.image(image).width(20).url()} />
	<img class="blur-1" src={builder.image(image).width(10).url()} />
</div>

<style lang="scss">
	.image {
		width: 100%;
		height: 100%;
		position: relative;
	}

	@keyframes hide {
		from {
			visibility: visible;
		}

		to {
			visibility: hidden;
		}
	}

	img {
		position: absolute;
		left: 0;
		top: 0;
		object-fit: cover;
		width: 100%;
		height: 100%;
		image-rendering: pixelated;

		&.blur-1 {
			animation: 1ms 300ms forwards hide;
		}

		&.blur-2 {
			animation: 1ms 500ms forwards hide;
		}
	}
</style>
