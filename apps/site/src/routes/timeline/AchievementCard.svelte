<script lang="ts">
	import { slide } from 'svelte/transition';
	import { ChevronDown } from 'lucide-svelte';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	interface Props {
		title: string;
		description: string;
		placing?: string | null;
		category?: { name: string; color?: { hex: string } | null } | null;
		image?: { asset?: { _ref?: string } } | null;
	}

	let { title, description, placing, category, image }: Props = $props();
	let expanded = $state(false);

	const categoryColor = $derived(category?.color?.hex ?? '#6b7280');

	const builder = imageUrlBuilder(client);
</script>

<button
	onclick={() => (expanded = !expanded)}
	class={`max-w-full w-fit border-l-[3px] rounded-md background-2 px-3 py-0 text-left outline-none transition-colors ${description ? 'hover:background-3 cursor-pointer' : ''}`}
	style="border-color: transparent; border-left-color: {categoryColor};"
>
	<div class="flex items-center justify-between gap-3">
		<div class="min-w-0 flex flex-1 items-center gap-3">
			{#if placing?.toLowerCase().includes('1st')}
				<span
					class="inline-block shrink-0 rounded px-2 py-0.5 type-label"
					style="background: rgba(251,191,36,0.15); color: #d4a520;">🥇 {placing}</span
				>
			{:else if placing?.toLowerCase().includes('2nd')}
				<span
					class="inline-block shrink-0 rounded px-2 py-0.5 type-label"
					style="background: rgba(156,163,175,0.15); color: #9ca3af;">🥈 {placing}</span
				>
			{:else if placing?.toLowerCase().includes('3rd')}
				<span
					class="inline-block shrink-0 rounded px-2 py-0.5 type-label"
					style="background: rgba(180,100,50,0.15); color: #cd7f32;">🥉 {placing}</span
				>
			{:else if placing}
				<span
					class="inline-block shrink-0 rounded bg-blue-3 px-2 py-0.5 type-label text-blue-11 dark:bg-bluedark-3 dark:text-bluedark-11"
					>🏅 {placing}</span
				>
			{:else if !placing}
				<span
					class="inline-block shrink-0 rounded px-2 py-0.5 type-label"
					style="background: rgba(156,163,175,0.15); color: {categoryColor};">{category?.name}</span
				>
			{/if}
			<p class="type-body-2 text font-bold">{placing ? category?.name : ''} {title}</p>
		</div>
		{#if description}
			<div
				class="shrink-0 text-gray-9 transition-transform dark:text-graydark-9"
				style="transform: rotate({expanded ? 180 : 0}deg);"
			>
				<ChevronDown size={14} />
			</div>
		{/if}
	</div>

	{#if expanded && (description || image)}
		<div transition:slide={{ duration: 500 }}>
			<div class="pt-2">
				{#if image}
					<img
						class="w-full rounded-lg object-cover"
						style="max-height: 200px;"
						src={builder.image(image).width(800).url()}
						alt={title}
					/>
				{/if}
				{#if description}
					<p
						class="text-wrap type-body-2 text-gray-11 line-height-snug dark:border-graydark-4 dark:text-graydark-11"
					>
						{description}
					</p>
				{/if}
			</div>
		</div>
	{/if}
</button>
