<script lang="ts">
	import Logo from '$lib/common/components/Logo.svelte';
	import { Menu, X } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { resolve } from '$app/paths';

	let isOpen = $state(false);
</script>

{#snippet link(href: string, text: string, description?: string)}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class="mx-5 my-5 block decoration-none" {href} onclick={() => (isOpen = false)}>
		<p class="m-0 type-heading-2 text">{text}</p>
		{#if description}
			<p class="m-0 mt-2.5 text-gray-11 type-body-1 dark:text-graydark-11">{description}</p>
		{/if}
	</a>
{/snippet}

<button
	type="button"
	class="nav-touch cursor-pointer border-none bg-transparent p-3 text line-height-0"
	aria-haspopup="dialog"
	aria-expanded={isOpen}
	aria-label="Open menu"
	onclick={() => (isOpen = true)}
>
	<Menu size={16} class="pointer-events-none" />
</button>

{#if isOpen}
	<button
		type="button"
		class="nav-touch fixed inset-0 z-60 border-none bg-graya-9 p-0"
		aria-label="Close menu"
		transition:fade={{ easing: cubicOut }}
		onclick={() => (isOpen = false)}
	></button>

	<div
		class="fixed left-0 top-0 z-70 w-full background-2"
		role="dialog"
		aria-modal="true"
		aria-label="Site menu"
		transition:fly={{ y: '-100%', easing: cubicOut }}
	>
		<div class="flex items-center justify-between px-5 py-3">
			<a href={resolve('/')} class="h-7 text-0" onclick={() => (isOpen = false)}><Logo /></a>
			<button
				type="button"
				class="nav-touch cursor-pointer border-none bg-transparent p-3 text line-height-0"
				aria-label="Close menu"
				onclick={() => (isOpen = false)}
			>
				<X size={16} class="pointer-events-none" />
			</button>
		</div>
		<div class="pb-4">
			{@render link('/subteams', 'Subteams')}
			{@render link('/events', 'Events')}
			{@render link('/competition', 'Competition')}
			{@render link('/resources', 'Resources')}
			{@render link('/board', 'Board')}
			{@render link('/alumni', 'Alumni')}
			{@render link('/brand', 'Brand')}
			{@render link('/contact', 'Contact')}
			{@render link('/news', 'News')}
			{@render link('/sponsors', 'Sponsors')}
			{@render link('/package', 'Package')}
		</div>
	</div>
{/if}

<style>
	.nav-touch {
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
	}
</style>
