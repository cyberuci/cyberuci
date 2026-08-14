<script lang="ts">
	import type { PageProps } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import ScanLog from './ScanLog.svelte';

	const { data }: PageProps = $props();
	const page = $derived(data.outreachPage);
</script>

<svelte:head>
	<title>{page.title} — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title={page.title} />

	<p class="mb-16 max-w-prose type-body-2 text-2">
		{page.intro}
	</p>

	<ScanLog
		header={page.scanLog.header}
		command={page.scanLog.command}
		entries={page.scanLog.entries}
	/>

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<h2 class="type-label font-550">
				<span class="text-blue-11 dark:text-bluedark-11">[{page.whatWeDo.symbol ?? '?'}]</span>
				{page.whatWeDo.heading}
			</h2>
		</div>
		<div class="flex flex-col gap-6 lg:col-start-5 lg:col-end-15 md:flex-row">
			<div class="flex-1 type-body-2 text-2 space-y-4">
				{#each page.whatWeDo.body as paragraph, i (i)}
					<p class="m-0">{paragraph}</p>
				{/each}
			</div>
			{#if page.whatWeDo.image?.asset?.url}
				<img
					src={page.whatWeDo.image.asset.url}
					alt={page.whatWeDo.image.alt ?? ''}
					class="aspect-video w-full shrink-0 rounded-md object-cover md:w-48"
				/>
			{:else}
				<div
					class="aspect-video w-full flex shrink-0 items-center justify-center rounded-md background-2 type-label text-2 md:w-48"
				>
					Outreach event photo
				</div>
			{/if}
		</div>
	</div>

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<h2 class="type-label font-550">
				<span class="text-blue-11 dark:text-bluedark-11">[{page.focusAreas.symbol ?? '?'}]</span>
				{page.focusAreas.heading}
			</h2>
		</div>
		<ul class="m-0 list-none p-0 lg:col-start-5 lg:col-end-15">
			{#each page.focusAreas.areas as { _key, tag, title, description } (_key)}
				<li
					class="grid grid-cols-[minmax(0,140px)_1fr] gap-6 border-0 border-b border-gray-7 border-solid py-6 last:border-b-0 dark:border-graydark-7 first:pt-0"
				>
					<span class="type-label text-blue-11 dark:text-bluedark-11">[{tag}]</span>
					<div>
						<p class="m-0 font-600 type-body-1">{title}</p>
						<p class="mb-0 mt-1 text-2 type-body-1">{description}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
