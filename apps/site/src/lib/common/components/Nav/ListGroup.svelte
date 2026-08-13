<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		name: string;
		open: boolean;
		onOpen: () => void;
		onClose: () => void;
		align?: 'center' | 'end';
		children: Snippet;
	}

	const { name, open, onOpen, onClose, align = 'center', children }: Props = $props();

	function canHover() {
		return typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
	}

	function toggle() {
		if (open) onClose();
		else onOpen();
	}

	function onPointerEnter() {
		if (canHover()) onOpen();
	}
</script>

<li class="relative list-none">
	<button
		type="button"
		class="nav-trigger group flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 py-2 type-label terminal-before text hover:text-blue-11 dark:hover:text-bluedark-11"
		class:text-blue-11={open}
		class:dark:text-bluedark-11={open}
		aria-expanded={open}
		aria-haspopup="true"
		onclick={toggle}
		onpointerenter={onPointerEnter}
	>
		{name}
		<ChevronDown
			class="size-3 transition duration-200 {open ? 'rotate-180' : ''}"
			aria-hidden="true"
		/>
	</button>

	{#if open}
		<!-- pt-2 keeps visual spacing while remaining a continuous hover target -->
		<div class="absolute top-full z-50 pt-2 {align === 'end' ? 'right-0' : 'left-0'}">
			<div
				class="nav-viewport overflow-hidden border border-gray-4 rounded-md border-solid background-2 dark:border-graydark-4"
				role="menu"
			>
				<ul class="m-0 flex list-none gap-2 p-2">
					{@render children()}
				</ul>
			</div>
		</div>
	{/if}
</li>

<style>
	.nav-trigger {
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
	}

	.nav-viewport {
		animation: navin 0.2s ease-out;
	}

	@keyframes navin {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
