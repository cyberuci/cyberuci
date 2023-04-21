<script lang="ts">
	import type { Person } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	export let member: {
		title: string;
		terms: string[];
		person: Person;
	};

	$: ({ title, person } = member);
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
	<span>{title}</span>
	{#if pronouns}
		<span>
			({pronouns[0]})
		</span>
	{/if}
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		width: 160px;

		@media (min-width: 600px) {
			width: 256px;
		}
	}

	.image {
		width: 90%;
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
		font-size: 20px;
		font-weight: 400;
		letter-spacing: -0.017em;
		line-height: 28px;
	}

	span {
		text-align: center;
		margin: 0;
		color: var(--gray11);
		font-size: 14px;
		letter-spacing: -0.006em;
		line-height: 20px;
	}
</style>
