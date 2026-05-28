<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import type { PageData } from './$types';
	import ResourceType from './ResourceType.svelte';

	import type {
		PortableTextBlock,
		PortableTextMarkDefinition,
		ArbitraryTypedObject,
		PortableTextSpan
	} from '@portabletext/types';

	let { data }: { data: PageData } = $props();

	let resourceSelected: Record<string, boolean> = $state({});

	export interface Resources {
		_id: string;
		title: string;
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
		tags: {
			title: string;
			type: string;
		}[];
	}

	for (const resource of data.resources) {
		for (const tag of resource.tags) {
			resourceSelected[tag.title.toLowerCase()] = true;
		}
	}

	function findCanvas(resource: Resources): boolean {
		return resource.title == 'Canvas';
	}

	function matchesFilter(resource: Resources): boolean {
		if (!resource.tags?.length) return true;
		return (
			resource.title != 'Canvas' &&
			resource.tags.some((tag) => resourceSelected[tag.title.toLowerCase()])
		);
	}

	const ourResources = $derived(
		data.resources.filter((r: Resources) => !r.externalResource && matchesFilter(r))
	);
	const externalResources = $derived(
		data.resources.filter((r: Resources) => r.externalResource && matchesFilter(r))
	);
	const canvas = $derived(data.resources.filter((r: Resources) => findCanvas(r)));
</script>

<svelte:head>
	<title>Resources — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="Resources" />

	{#if ourResources.length > 0}
		<section class="mb-16">
			<h2 class="mb-6 type-heading-2">Our Resources</h2>
			<div class="grid grid-cols-[repeat(auto-fill,_minmax(330px,1fr))] gap-2">
				{#each canvas as c (c._id)}
					<ResourceType resource={c} pinned={true} />
				{/each}
				{#each ourResources as resource (resource._id)}
					<ResourceType {resource} pinned={false} />
				{/each}
			</div>
		</section>
	{/if}

	{#if externalResources.length > 0}
		<section>
			<h2 class="mb-6 type-heading-2">External Resources</h2>
			<div class="grid grid-cols-[repeat(auto-fill,_minmax(330px,1fr))] gap-2">
				{#each externalResources as resource (resource._id)}
					<ResourceType {resource} pinned={false} />
				{/each}
			</div>
		</section>
	{/if}

	{#if ourResources.length === 0 && externalResources.length === 0}
		<p class="type-body-2 text-gray-11 dark:text-graydark-11">
			No resources match the selected filters.
		</p>
	{/if}
</div>
