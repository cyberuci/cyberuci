<script lang="ts">
	import type { PageData } from '../../$types';

	import { Cpu } from 'lucide-svelte';

	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';

	const builder = imageUrlBuilder(client);

	interface Props {
		section: PageData['homepage']['hackerlab'];
	}

	let { section }: Props = $props();
</script>

<div class="my-24 space-x">
	<div class="grid items-start gap-y-15 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<Cpu size={18} />
			<h2 class="type-label font-550">HackerLab</h2>
		</div>
		<div class="lg:col-start-5 lg:col-end-14">
			<p class="mb-6 mt-2 max-w-prose line-height-relaxed type-heading-1">
				{section.description}
			</p>
		</div>
		<div class="lg:col-start-4 lg:row-start-2 lg:col-end-15">
			<!-- <enhanced:img class="w-full h-auto rounded-sm" src="./hivestorm-2.jpeg" alt="" /> -->
			{#each section.images as image}
				<img
					class="h-auto w-full rounded-sm"
					src={builder.image(image).auto('format').url()}
					alt={image.alt}
				/>
			{/each}
		</div>
	</div>
</div>
