<script lang="ts">
	import type { Resources } from './+page.svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '$lib/sanity/sanityClient';
	import { slide } from 'svelte/transition';

	const builder = imageUrlBuilder(client);

	interface typeData {
		title: string;
		allResources: Resources[];
		resourceSelected: Record<string, boolean>;
	}

	let { title, allResources, resourceSelected }: typeData = $props();

	let toggle = $state(true);
</script>

{#if allResources}
	<div>
		<button
			onclick={() => (toggle = !toggle)}
			class="mb-[0.875rem] w-full flex flex-row border-none bg-transparent p-none text-left type-body-2 color-[#fff]"
		>
			<span class="mr-2 transition-transform duration-300 {toggle ? 'rotate-180' : 'rotate-0'}">
				▼
			</span>
			{title}
		</button>

		{#if toggle}
			<div class="flex" style="flex-wrap: wrap; justify-content: space-between" transition:slide>
				{#each allResources as resource (resource._id)}
					{#if resource.category == null || resourceSelected[resource.category.toLowerCase()]}
						<div class="mb-[0.5rem] w-[49.5%] rounded-md background-2 px-4 py-4">
							{#if resource.thumbnail}
								<img
									alt="The cover of the article."
									class="my-5 w-[100%] rounded-sm lg:my-0 lg:w-3/3"
									src={builder.image(resource.thumbnail).url()}
								/>
							{:else if resource.image?.asset?.url}
								<img
									src={resource.image.asset.url}
									alt={resource.image.alt}
									class="my-2 mt-2 max-h-10 max-w-20 object-contain"
								/>
							{/if}
							<h2 class="mb-2 mt-2 type-heading-1 font-semibold">{resource.title}</h2>

							<p class="my-2 type-label font-normal uppercase">[{resource.category}]</p>
							{#if resource.notes}
								<p class="max-w-prose type-body-2">
									{resource.notes}
								</p>
							{/if}
							<p class="max-w-prose type-body-2 text-gray-11 dark:text-graydark-11">
								{resource.description}
							</p>
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
				{/each}
			</div>
		{/if}
	</div>
{/if}
