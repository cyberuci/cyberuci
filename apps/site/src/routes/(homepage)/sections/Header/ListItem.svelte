<script lang="ts">
	import type { Icon as LucideIcon } from 'lucide-svelte';

	export let Icon: typeof LucideIcon;
	export let title: string;
	export let color: string;
	export let onClick: (() => void) | undefined; // optional custom handler

	async function handleClick() {
		if (onClick) {
			onClick(); // user-provided callback
		}
	}
</script>

<li>
	<button
		type="button"
		class="group/list border-gray-400 hover:bg-gray-100 block h-30 w-full flex flex-col cursor-pointer select-none appearance-none justify-between border rounded-sm border-solid bg-transparent p-3 text-left decoration-none transition-colors dark:border-graydark-4 dark:hover:bg-graydark-5"
		on:click={handleClick}
	>
		<div class="mb-2 flex flex-shrink-0 flex-wrap justify-start">
			<Icon size="24" {color} />
		</div>
		<div class="overflow-hidden text-ellipsis break-words type-label text" style="color: {color};">
			{title}
		</div>
	</button>
</li>
