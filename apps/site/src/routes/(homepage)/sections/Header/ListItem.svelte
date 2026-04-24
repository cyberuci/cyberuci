<script lang="ts">
	import type { Icon as LucideIcon } from 'lucide-svelte';

	export let Icon: typeof LucideIcon;
	export let title: string;
	export let color: string | undefined = undefined;
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
		class="btn block h-30 w-90 flex flex-col cursor-pointer select-none appearance-none items-start justify-between border rounded-md border-solid p-2 text-left"
		on:click={handleClick}
	>
		<div class="flex-shrink-0">
			<Icon size="24" color={color ?? 'currentColor'} />
		</div>
		<div class="type-label" style={color ? `color: ${color};` : undefined}>
			{title}
		</div>
	</button>
</li>

<style>
	.btn {
		background-color: rgba(255, 255, 255, 0.15);
		color: white;
		border-color: rgba(255, 255, 255, 0.3);
		transition:
			background-color 0.15s,
			color 0.15s,
			border-color 0.15s;
	}

	.btn:hover {
		background-color: white;
		color: black;
		border-color: white;
	}

	@media (prefers-color-scheme: dark) {
		.btn {
			background-color: rgba(255, 255, 255, 0.15);
			color: white;
			border-color: rgba(255, 255, 255, 0.3);
		}

		.btn:hover {
			background-color: white;
			color: black;
			border-color: white;
		}
	}
</style>
