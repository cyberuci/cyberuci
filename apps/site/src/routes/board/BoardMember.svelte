<script lang="ts">
	import type { PageData } from './$types';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { User, Globe } from 'lucide-svelte';
	import { siLinkedin, siInstagram } from 'simple-icons';

	const builder = imageUrlBuilder(client);

	interface Props {
		person: PageData['board'][0]['members'][0]['person'];
		titles: string[];
		expanded: boolean;
	}

	const { person, titles, expanded }: Props = $props();
	const { name, pronouns, image, majors, graduation, website, linkedin, instagram } =
		$derived(person);
</script>

<article>
	{#if expanded}
		<div class="relative aspect-ratio-square w-full overflow-hidden rounded-sm">
			{#if image}
				<img
					class="h-full w-full object-cover"
					src={builder.image(image).size(512, 512).url()}
					alt={name}
				/>
			{:else}
				<div class="h-full w-full bg-blue-2 dark:bg-bluedark-2"></div>
			{/if}
		</div>
	{/if}
	<div class="mb-2 mt-6 flex items-baseline justify-between">
		<h1 class="type-heading-1 m-0">
			{name}
		</h1>
		{#if expanded}
			<div class="flex items-baseline gap-1.5">
				{#if website}
					<a
						class="text-blue-12 dark:text-bluedark-12 hover:dark:text-bluedark-11 hover:text-blue-11 line-height-none"
						href={website}
						aria-label="{name}'s Website"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Globe size={20} />
					</a>
				{/if}
				{#if linkedin}
					<a
						class="text-blue-12 dark:text-bluedark-12 hover:dark:text-bluedark-11 hover:text-blue-11 line-height-none size-5"
						href="https://www.linkedin.com/in/{linkedin}"
						aria-label="{name}'s LinkedIn"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg
							fill="currentColor"
							width="20"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d={siLinkedin.path}></path>
						</svg>
					</a>
				{/if}
				{#if instagram}
					<a
						class="text-blue-12 dark:text-bluedark-12 hover:dark:text-bluedark-11 hover:text-blue-11 line-height-none size-5"
						href="https://www.instagram.com/{instagram}"
						aria-label="{name}'s Instagram"
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg
							fill="currentColor"
							width="20"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d={siInstagram.path}></path>
						</svg>
					</a>
				{/if}
			</div>
		{/if}
	</div>
	<div class="flex flex-col gap-.5 type-body-2 text-gray-11 dark:text-graydark-11">
		<span>{titles.join(', ')}</span>
		{#if majors}
			<span>{majors.join(', ')} {graduation}</span>
		{/if}
		{#if pronouns}
			<span>
				{pronouns.join(', ')}
			</span>
		{/if}
	</div>
</article>
