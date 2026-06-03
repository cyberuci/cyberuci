<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	interface Props {
		title: string;
		description: string;
		placing?: string | null;
	}

	let { title, description, placing }: Props = $props();
	let expanded = $state(false);
</script>

<button
	onclick={() => (expanded = !expanded)}
	class="w-fit cursor-pointer border-0 rounded-xl background-2 px-4 py-3 text-left outline-none transition-colors hover:background-3"
>
	<div class="flex items-center justify-between gap-3">
		<div class="min-w-0 flex flex-1 items-center gap-3">
			{#if placing?.toLowerCase().includes('1st')}
				<span
					class="inline-block shrink-0 rounded px-2 py-0.5 type-label"
					style="background: rgba(251,191,36,0.15); color: #d4a520;">{placing}</span
				>
			{:else if placing?.toLowerCase().includes('2nd')}
				<span
					class="inline-block shrink-0 rounded px-2 py-0.5 type-label"
					style="background: rgba(156,163,175,0.15); color: #9ca3af;">{placing}</span
				>
			{:else if placing?.toLowerCase().includes('3rd')}
				<span
					class="inline-block shrink-0 rounded px-2 py-0.5 type-label"
					style="background: rgba(180,100,50,0.15); color: #cd7f32;">{placing}</span
				>
			{:else if placing}
				<span
					class="inline-block shrink-0 rounded bg-blue-3 px-2 py-0.5 type-label text-blue-11 dark:bg-bluedark-3 dark:text-bluedark-11"
					>{placing}</span
				>
			{/if}
			<p class="type-body-2 text font-medium">{title}</p>
		</div>
		<div
			class="shrink-0 text-gray-9 transition-transform dark:text-graydark-9"
			style="transform: rotate({expanded ? 180 : 0}deg);"
		>
			<ChevronDown size={14} />
		</div>
	</div>

	{#if expanded && description}
		<p
			class="mt-2 border-t border-gray-4 pt-2 type-body-1 text-gray-11 line-height-snug dark:border-graydark-4 dark:text-graydark-11"
		>
			{description}
		</p>
	{/if}
</button>
