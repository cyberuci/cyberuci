<script lang="ts">
	import type { PageData } from './$types';
	import { client } from '$lib/sanity/sanityClient';
	import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url';
	import { Globe } from 'lucide-svelte';
	import { siInstagram } from 'simple-icons';

	// LinkedIn asked to be removed from Simple Icons. This is the previous CC0 mark.
	const linkedInPath =
		'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';

	const builder = imageUrlBuilder(client);

	interface Props {
		person: PageData['board'][0]['sections'][0]['members'][0]['person'];
		titles: string[];
		expanded: boolean;
	}

	const { person, titles, expanded }: Props = $props();
	const { name, pronouns, email, image, majors, graduation, website, linkedin, instagram } =
		$derived(person);
</script>

<article>
	{#if expanded}
		<div class="relative mb-6 aspect-ratio-square w-full overflow-hidden rounded-sm">
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
	<div class="mb-2 flex items-baseline justify-between">
		<h1 class="m-0 type-heading-2">
			{name}
		</h1>
		{#if expanded}
			<div class="flex items-baseline gap-1.5">
				{#if website}
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<a
						class="text-blue-12 line-height-none dark:text-bluedark-12 hover:text-blue-11 hover:dark:text-bluedark-11"
						href={website}
						aria-label="{name}'s Website"
						target="_blank"
						rel="noopener noreferrer"
					>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
						<Globe size={20} />
					</a>
				{/if}
				{#if linkedin}
					<a
						class="size-5 text-blue-12 line-height-none dark:text-bluedark-12 hover:text-blue-11 hover:dark:text-bluedark-11"
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
							<path d={linkedInPath}></path>
						</svg>
					</a>
				{/if}
				{#if instagram}
					<a
						class="size-5 text-blue-12 line-height-none dark:text-bluedark-12 hover:text-blue-11 hover:dark:text-bluedark-11"
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
	<div class="flex flex-col gap-.5 type-body-1 text-gray-11 dark:text-graydark-11">
		<span>{titles.join(', ')}</span>
		{#if majors}
			<span>{majors.join(', ')} {graduation}</span>
		{/if}
		{#if pronouns}
			<span>
				{pronouns.join(', ')}
			</span>
		{/if}
		{#if email}
			<span>
				<a class="text-blue-12 dark:text-bluedark-12 hover:decoration-dashed" href="mailto:{email}"
					>{email}</a
				>
			</span>
		{/if}
	</div>
</article>
