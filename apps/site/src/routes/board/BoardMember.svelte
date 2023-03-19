<script lang="ts">
	import type { Person } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	export let boardMember: {
		title: string;
		terms: string[];
		person: Person;
	};

	$: ({ title, person } = boardMember);
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
		{#if pronouns}
			({pronouns[0]})
		{/if}
	</h1>
	<span> {title}</span>
	<!-- TODO: Support multiple majors -->
	{#if majors && majors.length && graduation}
		<span>{majors[0]} '{graduation - 2000}</span>
	{/if}
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: 4px;
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
		margin: 12px 0 4px 0;
		font-size: 1rem;
		font-weight: 400;
	}

	span {
		margin: 0;
		color: var(--gray11);
		font-size: 1rem;
	}
</style>
