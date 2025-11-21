<script lang="ts">
	import type { Icon as LucideIcon } from 'lucide-svelte';
	import { goto } from '$app/navigation'; // for SvelteKit page navigation

	export let Icon: typeof LucideIcon;
	export let title: string;
	export let color: string;
	export let href: string | undefined; // external link
	export let page: string | undefined; // internal SvelteKit route
	export let scrollToId: string | undefined; // scroll to element id
	export let onClick: (() => void) | undefined; // optional custom handler

	async function handleClick() {
		if (onClick) {
			onClick(); // user-provided callback
		} else if (scrollToId) {
			const el = document.getElementById(scrollToId);
			if (el) el.scrollIntoView({ behavior: 'smooth' });
		} else if (page) {
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			await goto(page);
		} else if (href) {
			window.open(href, '_blank', 'noopener,noreferrer');
		}
	}
</script>

<li class="h-30 w-33 flex">
	<button
		type="button"
		class="group/list hover:bg-gray-100 block h-full h-full w-full flex flex-col flex-col cursor-pointer select-none appearance-none justify-between border border-gray-4 rounded-sm border-solid bg-transparent p-3 text-left decoration-none transition-colors dark:border-graydark-4 hover:border-gray-5 dark:hover:bg-graydark-5"
		on:click={handleClick}
	>
		<div
			class="mb-2 flex justify-start text transition-colors group-hover/list:text-blue-11 dark:group-hover/list:text-blue-11"
		>
			<Icon size="24" {color} />
		</div>
		<div class="type-label text" style="color: {color};">
			{title}
		</div>
	</button>
</li>
