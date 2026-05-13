<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import type { PageData } from './$types';
	import ResourceType from './ResourceType.svelte';
	import { SvelteSet } from 'svelte/reactivity';

	let { data }: { data: PageData } = $props();

	let resourceTypes = new SvelteSet<string | undefined>();
	let resourceSelected: Record<string, boolean> = $state({});

	export interface Resources {
		_id: string;
		title: string;
		description: string;
		notes: string;
		externalResource: boolean;
		category: string;
		thumbnail: string;
		link: string;
		image: {
			asset: {
				url: string;
			};
			alt: string;
		};
		tags: string[];
	}

	let internalResources: Resources[] = [];
	let externalResources: Resources[] = [];

	for (let i = 0; i < data.resources.length; ++i) {
		if (data.resources[i].externalResource) externalResources.push(data.resources[i]);
		else internalResources.push(data.resources[i]);

		if (data.resources[i].category) {
			resourceTypes.add(data.resources[i].category?.toLowerCase());
			resourceSelected[data.resources[i].category?.toLowerCase()] = true;
		}
	}

	console.log(resourceSelected);
	console.log(resourceTypes);
</script>

<svelte:head>
	<title>Resources — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="Resources" />
	<div class="flex">
		<!-- <div class="w-[30%]">
		<p class="mt-none type-body-2"><b>FILTER</b></p>

		<label class="type-body-2">
			{#each resourceTypes as resourceType (resourceType)}
				{#if resourceType}
					{console.log(resourceType + "   "+resourceSelected[resourceType])}
					<input type="checkbox" bind:checked={resourceSelected[resourceType]} />
					{resourceType}
					<br>
				{/if}
			{/each}
		</label>

	</div> -->
		<div class="w-[100%]" style="display:block">
			{#if internalResources.length > 0}
				<ResourceType title="Our Resources" allResources={internalResources} {resourceSelected} />
			{/if}
			{#if externalResources.length > 0}
				<ResourceType
					title="External Resources"
					allResources={externalResources}
					{resourceSelected}
				/>
			{/if}
		</div>
	</div>
</div>
