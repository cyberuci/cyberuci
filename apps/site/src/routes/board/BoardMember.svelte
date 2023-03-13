<script lang="ts">
	import type { Person } from '$lib/sanity/types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';

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
			<img src={builder.image(image).url()} alt={name} />
		{/if}
	</div>
	<!-- TODO: Support multiple pronouns -->
	<h1>{name} ({pronouns[0]})</h1>
	<span> {title}</span>
	<!-- TODO: Support multiple majors -->
	<span>{majors[0]} '{graduation - 2000}</span>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
	}

	.image {
		width: 100%;
		aspect-ratio: 1;
		background-color: var(--gray2);
		border-radius: 16px;
		overflow: hidden;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	h1 {
		margin-bottom: 6px;
		font-size: 1rem;
		font-weight: 400;
	}

	span {
		margin-bottom: 2px;
		color: var(--gray11);
		font-size: 1rem;
	}
</style>
