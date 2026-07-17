<script lang="ts">
	import {
		BookMarked,
		Building2,
		FileText,
		Group,
		type Icon,
		LucideBrush,
		LucideUsers,
		Trophy,
		Calendar,
		GraduationCap
	} from 'lucide-svelte';
	import ListGroup from './ListGroup.svelte';
	import { onMount } from 'svelte';

	interface ListItemProps {
		Icon: typeof Icon;
		title: string;
		href: string;
	}

	let openGroup = $state<string | null>(null);
	let rootEl = $state<HTMLElement | null>(null);

	function open(name: string) {
		openGroup = name;
	}

	function close() {
		openGroup = null;
	}

	function canHover() {
		return typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
	}

	onMount(() => {
		function onPointerDown(e: PointerEvent) {
			if (!rootEl || openGroup === null) return;
			if (!rootEl.contains(e.target as Node)) close();
		}

		document.addEventListener('pointerdown', onPointerDown);
		return () => document.removeEventListener('pointerdown', onPointerDown);
	});
</script>

{#snippet ListItem({ title, Icon, href }: ListItemProps)}
	<li class="h-35 w-38">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a
			class="group/list block h-full flex flex-col select-none border border-gray-4 rounded-sm border-solid p-3 decoration-none transition-colors dark:border-graydark-4 hover:border-gray-5 hover:background-3 dark:hover:border-graydark-5"
			{href}
			onclick={close}
		>
			<div
				class="flex-grow-1 text transition-colors group-hover/list:text-blue-11 dark:group-hover/list:text-blue-11"
			>
				<Icon size="24" />
			</div>
			<div class="type-label terminal-before text">
				{title}
			</div>
		</a>
	</li>
{/snippet}

{#snippet EngageItems()}
	{@render ListItem({ href: '/subteams', title: 'Subteams', Icon: Group })}
	{@render ListItem({ href: '/events', title: 'Events', Icon: Calendar })}
	{@render ListItem({ href: '/resources', title: 'Resources', Icon: BookMarked })}
{/snippet}

{#snippet AboutItems()}
	{@render ListItem({ href: '/board', title: 'Board', Icon: LucideUsers })}
	{@render ListItem({ href: '/alumni', title: 'Alumni', Icon: GraduationCap })}
	{@render ListItem({ href: '/timeline', title: 'Timeline', Icon: Trophy })}
	{@render ListItem({ href: '/brand', title: 'Brand', Icon: LucideBrush })}
{/snippet}

{#snippet SponsorsItems()}
	{@render ListItem({ href: '/sponsors', title: 'Sponsors', Icon: Building2 })}
	{@render ListItem({ href: '/package', title: 'Package', Icon: FileText })}
{/snippet}

<nav
	bind:this={rootEl}
	class="relative z-10 max-w-max flex items-center justify-end"
	aria-label="Main"
	onpointerleave={() => {
		if (canHover()) close();
	}}
>
	<ul class="m-0 flex list-none items-baseline justify-end gap-5 p-0">
		<ListGroup
			name="About"
			open={openGroup === 'About'}
			onOpen={() => open('About')}
			onClose={close}
		/>

		<ListGroup
			name="Engage"
			open={openGroup === 'Engage'}
			onOpen={() => open('Engage')}
			onClose={close}
		/>

		<li class="list-none">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a
				class="py-2 type-label text decoration-none transition-colors before:text-gray-11 hover:text-blue-11 before:content-['~_$_'] dark:before:text-graydark-11 dark:hover:text-bluedark-11"
				href="/news"
			>
				News
			</a>
		</li>

		<ListGroup
			name="Sponsors"
			open={openGroup === 'Sponsors'}
			onOpen={() => open('Sponsors')}
			onClose={close}
		/>

		<li class="list-none">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a
				class="py-2 type-label text decoration-none transition-colors before:text-gray-11 hover:text-blue-11 before:content-['~_$_'] dark:before:text-graydark-11 dark:hover:text-bluedark-11"
				href="/contact"
			>
				Contact
			</a>
		</li>
	</ul>

	{#if openGroup}
		<!-- pt-2 keeps visual spacing while remaining a continuous hover target -->
		<div class="absolute right-0 top-full z-50 pt-2">
			<div
				class="nav-viewport overflow-hidden border border-gray-4 rounded-md border-solid background-2 dark:border-graydark-4"
				role="menu"
			>
				<ul class="m-0 flex list-none gap-2 p-2">
					{#if openGroup === 'Engage'}
						{@render EngageItems()}
					{:else if openGroup === 'About'}
						{@render AboutItems()}
					{:else if openGroup === 'Sponsors'}
						{@render SponsorsItems()}
					{/if}
				</ul>
			</div>
		</div>
	{/if}
</nav>

<style>
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
