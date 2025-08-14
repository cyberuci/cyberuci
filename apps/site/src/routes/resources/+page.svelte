<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Resources — Cyber @ UCI</title>
</svelte:head>

<h1 class="text-3xl font-bold">Resources</h1>

<ul class="mt-4 space-y-2">
	{#each data.resources as resource (resource._key)}
		<li class="p-4 rounded bg-gray-200">
			<h2 class="text-xl font-semibold">{resource.title}</h2>
			
			<p class="mt-1">{resource.description}</p>
			
			<p class="mt-1 italic text-sm">Category: {resource.category}</p>
			
			{#if resource.link}
				<a href={resource.link} target="_blank" rel="noopener noreferrer" class="text-blue-600 underline mt-2 block">
					Visit Resource
				</a>
			{/if}
			
			{#if resource.image?.asset?.url}
				<img src={resource.image.asset.url} alt={resource.image.alt} class="mt-3 rounded max-w-xs" />
			{/if}
			
			{#if resource.tags?.length}
				<p class="mt-2 text-sm">Tags: {resource.tags.join(', ')}</p>
			{/if}
		</li>
	{/each}
</ul>