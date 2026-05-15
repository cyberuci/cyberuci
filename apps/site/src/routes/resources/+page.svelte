<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	import type { PageData } from './$types';
	import ResourceType from './ResourceType.svelte';
	import { SvelteSet } from 'svelte/reactivity';

	import type {
		PortableTextBlock,
		PortableTextMarkDefinition,
		ArbitraryTypedObject,
		PortableTextSpan
	} from '@portabletext/types';

	let { data }: { data: PageData } = $props();

	let resourceTypes = new SvelteSet<string | undefined>();
	let resourceSelected: Record<string, boolean> = $state({});

	export interface Resources {
		_id: string;
		title: string;
		description: string;
		content: PortableTextBlock<
			PortableTextMarkDefinition,
			ArbitraryTypedObject | PortableTextSpan,
			string,
			string
		>[];
		externalResource: boolean;
		category: string;
		link: string;
		thumbnail: {
			asset: {
				url: string;
			};
			alt: string;
			isLogo: boolean;
		};
		tags: string[];
	}

	let externalResources: Resources[] = [];

	for (let i = 0; i < data.resources.length; ++i) {
		// if (data.resources[i].externalResource)
		externalResources.push(data.resources[i]);
		// else internalResources.push(data.resources[i]);

		if (data.resources[i].category) {
			resourceTypes.add(data.resources[i].category);
			resourceSelected[data.resources[i].category?.toLowerCase()] = true;
		}
	}
</script>

<svelte:head>
	<title>Resources — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="Resources" />
	<div class="flex">
		<div class="w-[30%]">
			<p class="mt-none text-lg type-label">Filter</p>

			<label class="type-body-2">
				{#each resourceTypes as resourceType (resourceType)}
					{#if resourceType}
						<input type="checkbox" bind:checked={resourceSelected[resourceType?.toLowerCase()]} />
						{resourceType}
						<br />
					{/if}
				{/each}
			</label>
		</div>
		<div class="w-[100%]" style="display:block">
			<div class="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-2">
				{#each data.resources as resource (resource)}
					<ResourceType {resource} {resourceSelected} />
				{/each}
			</div>
		</div>
	</div>
</div>
