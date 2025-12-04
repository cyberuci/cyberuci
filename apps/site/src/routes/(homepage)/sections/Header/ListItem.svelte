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
		class="group/list light:bg-gray-50 light:hover:bg-gray-100 light:border-gray-300 block h-30 w-full flex flex-row cursor-pointer select-none appearance-none items-end justify-start border rounded-sm border-solid p-2 text-left decoration-none transition-colors dark:border-graydark-1 dark:bg-graydark-5 dark:hover:bg-graydark-3"
		on:click={handleClick}
	>
		<div class="mr-2 flex-shrink-0">
			<Icon size="24" {color} />
		</div>
		<div class="type-label text" style="color: {color};">
			{title}
		</div>
	</button>
</li>
