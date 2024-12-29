<script lang="ts">
	import type { SanityImageReference } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	interface Props {
		image: SanityImageReference | undefined;
		name: string;
		size: number;
	}

	let { image, name, size }: Props = $props();
</script>

<div class="profile" style:width="{size}px" style:height="{size}px">
	{#if image}
		<img src={builder.image(image).width(96).height(96).dpr(2).url()} alt={name} />
	{:else}
		<User color="var(--gray7)" />
	{/if}
</div>

<style lang="scss">
	.profile {
		overflow: hidden;
		display: grid;
		place-content: center;
		border-radius: 1000px;
		background: var(--gray1);

		img {
			width: 100%;
			height: auto;
		}
	}
</style>
