<script lang="ts">
	import {
		BookMarked,
		Building2,
		FileText,
		type Icon,
		LucideBrush,
		LucideUsers,
		Palette,
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

{#snippet JoinItems()}
	{@render ListItem({ href: '/events', title: 'Events', Icon: Calendar })}
	{@render ListItem({ href: '/resources', title: 'Resources', Icon: BookMarked })}
{/snippet}

{#snippet AboutItems()}
	{@render ListItem({ href: '/board', title: 'Board', Icon: LucideUsers })}
	{@render ListItem({ href: '/alumni', title: 'Alumni', Icon: GraduationCap })}
	{@render ListItem({ href: '/timeline', title: 'Timeline', Icon: Trophy })}
	{@render ListItem({ href: '/brand', title: 'Brand', Icon: LucideBrush })}
{/snippet}

{#snippet SubteamsItems()}
	{@render ListItem({ href: '/subteams/graphics', title: 'Graphics', Icon: Palette })}
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
	<ul class="m-0 flex list-none items-center justify-end gap-4 whitespace-nowrap p-0 lg:gap-5">
		<ListGroup
			name="About"
			open={openGroup === 'About'}
			onOpen={() => open('About')}
			onClose={close}
		>
			{@render AboutItems()}
		</ListGroup>

		<ListGroup name="Join" open={openGroup === 'Join'} onOpen={() => open('Join')} onClose={close}>
			{@render JoinItems()}
		</ListGroup>

		<ListGroup
			name="Subteams"
			open={openGroup === 'Subteams'}
			onOpen={() => open('Subteams')}
			onClose={close}
		>
			{@render SubteamsItems()}
		</ListGroup>

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
			align="end"
		>
			{@render SponsorsItems()}
		</ListGroup>
	</ul>
</nav>
