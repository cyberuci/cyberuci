<script lang="ts">
	import PortableText from '$lib/portableText/PortableText.svelte';

	import type { Resources } from './+page.svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	// import imageUrlBuilder from '@sanity/image-url';
	// import { client } from '$lib/sanity/sanityClient';
	import logoColorPng from './logo-color.png';

	// const builder = imageUrlBuilder(client);

	interface typeData {
		resource: Resources;
		resourceSelected: Record<string, boolean>;
	}

	let { resource, resourceSelected }: typeData = $props();

	// let toggle = $state(true);
	//▼
</script>

{#if resource}
	{#if resource.category == null || resourceSelected[resource.category.toLowerCase()]}
		<div class="rounded-md background-2 px-4 py-4">
			<div class="flex items-center">
				{#if !resource.externalResource}
					<img
						src={logoColorPng}
						alt="Cyber UCI logo"
						class="my-2 mr-3 mt-2 max-h-10 max-w-20 object-contain"
					/>
				{:else if resource.thumbnail?.asset?.url}
					<img
						src={resource.thumbnail.asset.url}
						alt={resource.thumbnail.alt}
						class="my-2 mr-3 mt-2 max-h-10 max-w-20 object-contain"
					/>
				{/if}

				<h2 class="mb-2 mt-2 type-heading-1 font-semibold">{resource.title}</h2>
			</div>

			<div class="flex flex-wrap">
				{#each resource.tags as tag (tag)}
					<p class="my-2 mb-0.5 mr-1 type-label font-normal uppercase">[{tag}]</p>
				{/each}
			</div>

			<PortableText value={resource.content} />
			{#if resource.link}
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					href={resource.link}
					target="_blank"
					rel="noopener noreferrer"
					class="my-2 block type-body-2 text-blue-12 decoration-underline dark:text-bluedark-12 hover:decoration-dashed"
				>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
					Visit Resource <ArrowUpRight size={12} />
				</a>
			{/if}
		</div>
	{/if}
{/if}
