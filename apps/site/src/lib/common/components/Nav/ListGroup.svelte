<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	interface Props {
		name: string;
		open: boolean;
		onOpen: () => void;
		onClose: () => void;
	}

	const { name, open, onOpen, onClose }: Props = $props();

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

<li class="list-none">
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
</li>

<style>
	.nav-trigger {
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
	}
</style>
