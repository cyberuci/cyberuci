<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Resources — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="Resources" />
	<div class="grid grid-cols-[repeat(auto-fill,_minmax(480px,1fr))] gap-1">
		{#each data.resources as resource (resource._id)}
			<div class="px-3 py-3 rounded-sm background-2">
				<p class="my-2 font-normal uppercase type-label">{resource.category}</p>
				{#if resource.image?.asset?.url}
					<img
						src={resource.image.asset.url}
						alt={resource.image.alt}
						class="object-contain my-2 mt-8 max-w-20 max-h-10"
					/>
				{/if}
				<h2 class="mt-2 mb-6 font-semibold type-heading-1">{resource.title}</h2>
				{#if resource.notes}
					<p class="max-w-prose type-body-2">
						{resource.notes}
					</p>
				{/if}
				<p class="max-w-prose type-body-2 text-gray-11 dark:text-graydark-11">
					{resource.description}
				</p>
				{#if resource.link}
					<a
						href={resource.link}
						target="_blank"
						rel="noopener noreferrer"
						class="block my-2 type-body-2 text-blue-12 decoration-underline dark:text-bluedark-12 hover:decoration-dashed"
					>
						Visit Resource <ArrowUpRight size={12} />
					</a>
				{/if}
			</div>
		{/each}
	</div>
</div>
