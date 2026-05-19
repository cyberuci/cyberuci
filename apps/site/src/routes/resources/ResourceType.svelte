<script lang="ts">
	import PortableText from '$lib/portableText/PortableText.svelte';

	import type { Resources } from './+page.svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	import logoColorPng from '../brand/logo-color.png';
	import { Pin } from 'lucide-svelte';

	interface typeData {
		resource: Resources;
		pinned: boolean;
	}

	let { resource, pinned }: typeData = $props();

	let colors: Record<string, string> = {
		General: '#006e6a',
		CCDC: '#00399c',
		CTF: '#006e30',
		CPTC: '#c40300',
		Pinned: '#f78400'
	};

	let category = pinned ? 'Pinned' : resource.category;
</script>

{#if resource}
	<div class="flex">
		<div
			class="w-1/110 rounded-l-md lg:w-1.5/100 md:w-1/100"
			style="background-color: {colors[category]};"
			title={category}
		></div>

		<div
			class="h-full w-109/110 flex flex-col rounded-md background-2 px-4 py-4 lg:w-98.5/100 md:w-99/100"
		>
			<div class={`flex items-center ${pinned ? 'justify-between' : ''}`}>
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

				{#if pinned}
					<Pin />
				{/if}
			</div>

			<div class="flex flex-wrap">
				{#each resource.tags as tag (tag)}
					<p class="my-2 mb-0.5 mr-1 type-label font-normal uppercase">[{tag.title}]</p>
				{/each}
			</div>

			<div class="flex-1">
				<PortableText value={resource.content} />
			</div>
			{#if resource.link}
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					href={resource.link}
					target="_blank"
					rel="noopener noreferrer"
					class="mt-auto block pt-2 type-body-2 text-blue-12 decoration-underline dark:text-bluedark-12 hover:decoration-dashed"
				>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
					Visit Resource <ArrowUpRight size={12} />
				</a>
			{/if}
		</div>
	</div>
{/if}
