<script lang="ts">
	import Logo from '$lib/common/components/Logo.svelte';
	import {
		BookMarked,
		Building2,
		Calendar,
		ChevronDown,
		FileText,
		GraduationCap,
		type Icon,
		LucideBrush,
		LucideUsers,
		Menu,
		Palette,
		Trophy,
		X
	} from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly, slide } from 'svelte/transition';
	import { resolve } from '$app/paths';

	interface ListItemProps {
		Icon: typeof Icon;
		title: string;
		href: string;
	}

	let isOpen = $state(false);
	let openGroup = $state<string | null>(null);

	function closeMenu() {
		isOpen = false;
		openGroup = null;
	}

	function toggleGroup(name: string) {
		openGroup = openGroup === name ? null : name;
	}
</script>

{#snippet ListItem({ title, Icon, href }: ListItemProps)}
	<li>
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a
			class="nav-touch group/list h-full min-h-28 flex flex-col border border-gray-4 rounded-sm border-solid p-3 decoration-none transition-colors dark:border-graydark-4"
			{href}
			onclick={closeMenu}
		>
			<div class="flex-grow-1 text">
				<Icon size="24" />
			</div>
			<div class="text-left type-label terminal-before text">
				{title}
			</div>
		</a>
	</li>
{/snippet}

{#snippet Group({ name, items }: { name: string; items: ListItemProps[] })}
	<li class="list-none">
		<button
			type="button"
			class="nav-touch w-full flex cursor-pointer items-center justify-between border-none bg-transparent px-5 py-3 text"
			class:text-blue-11={openGroup === name}
			class:dark:text-bluedark-11={openGroup === name}
			aria-expanded={openGroup === name}
			onclick={() => toggleGroup(name)}
		>
			<span class="text-left type-label terminal-before">{name}</span>
			<ChevronDown
				class="size-4 shrink-0 transition duration-200 {openGroup === name ? 'rotate-180' : ''}"
				aria-hidden="true"
			/>
		</button>
		{#if openGroup === name}
			<ul
				class="grid m-0 list-none gap-2 px-5 pb-3 {items.length === 1
					? 'grid-cols-1'
					: 'grid-cols-2'}"
				transition:slide={{ duration: 180, easing: cubicOut }}
			>
				{#each items as item (item.href)}
					{@render ListItem(item)}
				{/each}
			</ul>
		{/if}
	</li>
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
		onclick={closeMenu}
	></button>

	<div
		class="fixed left-0 top-0 z-70 w-full background-2"
		role="dialog"
		aria-modal="true"
		aria-label="Site menu"
		transition:fly={{ y: '-100%', easing: cubicOut }}
	>
		<div class="flex items-center justify-between px-5 py-3">
			<a href={resolve('/')} class="h-7 text-0" onclick={closeMenu}><Logo /></a>
			<button
				type="button"
				class="nav-touch cursor-pointer border-none bg-transparent p-3 text line-height-0"
				aria-label="Close menu"
				onclick={closeMenu}
			>
				<X size={16} class="pointer-events-none" />
			</button>
		</div>
		<ul class="m-0 list-none p-0 pb-4">
			{@render Group({
				name: 'About',
				items: [
					{ href: '/board', title: 'Board', Icon: LucideUsers },
					{ href: '/alumni', title: 'Alumni', Icon: GraduationCap },
					{ href: '/timeline', title: 'Timeline', Icon: Trophy },
					{ href: '/brand', title: 'Brand', Icon: LucideBrush }
				]
			})}
			{@render Group({
				name: 'Join',
				items: [
					{ href: '/events', title: 'Events', Icon: Calendar },
					{ href: '/resources', title: 'Resources', Icon: BookMarked }
				]
			})}
			{@render Group({
				name: 'Subteams',
				items: [
					{ href: '/subteams/graphics', title: 'Graphics', Icon: Palette },
					{ href: '/subteams/outreach', title: 'Outreach', Icon: Palette }
				]
			})}
			<li class="list-none">
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a
					class="nav-touch block px-5 py-3 text-left type-label terminal-before text decoration-none"
					href="/news"
					onclick={closeMenu}
				>
					News
				</a>
			</li>
			{@render Group({
				name: 'Sponsors',
				items: [
					{ href: '/sponsors', title: 'Sponsors', Icon: Building2 },
					{ href: '/package', title: 'Package', Icon: FileText }
				]
			})}
		</ul>
	</div>
{/if}

<style>
	.nav-touch {
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
	}
</style>
