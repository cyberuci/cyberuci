<script lang="ts">
	import type { SanityImageReference } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	interface Props {
		image: SanityImageReference | undefined;
		name: string;
	}

	let { image, name }: Props = $props();
</script>

<div class="grid place-content-center overflow-hidden background-2">
	{#if image}
		<img
			class="h-full w-full"
			src={builder.image(image).width(512).height(512).dpr(2).url()}
			alt={name}
		/>
	{:else}
		<User class="text-gray-9" />
	{/if}
</div>
