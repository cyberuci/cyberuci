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
			<div class="rounded-sm background-2 px-3 py-3">
				<p class="my-2 type-label font-normal uppercase">{resource.category}</p>
				{#if resource.image?.asset?.url}
					<img
						src={resource.image.asset.url}
						alt={resource.image.alt}
						class="my-2 mt-8 max-h-10 max-w-20 object-contain"
					/>
				{/if}
				<h2 class="mb-6 mt-2 type-heading-1 font-semibold">{resource.title}</h2>
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
		{/each}
	</div>
</div>
