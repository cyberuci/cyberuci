<script lang="ts">
	import type { z } from 'zod';
	import type { Person } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	export let person: z.infer<typeof Person>;
	export let titles: string[];

	$: ({ name, pronouns, image, majors, graduation } = person);
</script>

<article>
	<div class="image">
		{#if image}
			<img src={builder.image(image).size(512, 512).url()} alt={name} />
		{:else}
			<User color="var(--gray7)" />
		{/if}
	</div>
	<!-- TODO: Support multiple pronouns -->
	<h1>
		{name}
	</h1>
	<span>{titles.join(', ')}</span>
	{#if pronouns}
		<span>
			({pronouns[0]})
		</span>
	{/if}
</article>

<style lang="scss">
	@use '$lib/common/styles/typography' as typography;

	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		width: 100%;

		@media (min-width: 600px) {
			width: 100%;
		}
	}

	.image {
		width: 100%;
		aspect-ratio: 1;
		background-color: var(--gray2);
		border-radius: 12px;
		overflow: hidden;
		display: grid;
		place-content: center;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	h1 {
		text-align: center;
		margin: 12px 0 4px 0;
		@include typography.title;
		@include typography.l;
		font-weight: 600;
	}

	span {
		text-align: center;
		margin: 0;
		color: var(--gray11);
		font-size: 16px;
		letter-spacing: -0.011em;
		line-height: 22px;
	}
</style>
