<script lang="ts">
	import {
		ArrowRight,
		BookMarked,
		Building2,
		FileText,
		type Icon,
		Newspaper,
		LucideUsers,
		Palette,
		Trophy,
		Globe,
		Heart,
		HardDrive,
		Calendar,
		GraduationCap,
		Users,
		SquareTerminal
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
			<div class="truncate type-label terminal-before text" {title}>
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
{/snippet}

{#snippet AchievementsItems()}
	{@render ListItem({ href: '/news', title: 'News', Icon: Newspaper })}
	{@render ListItem({ href: '/timeline', title: 'Timeline', Icon: Trophy })}
{/snippet}

{#snippet SubteamsItems()}
	<div class="grid grid-cols-[1fr_1fr_1fr] gap-2">
		{@render ListItem({ href: '/subteams/graphics', title: 'Graphics', Icon: Palette })}
		{@render ListItem({ href: '/subteams/outreach', title: 'Outreach', Icon: Users })}
		{@render ListItem({ href: '/subteams/web', title: 'Web', Icon: Globe })}
		{@render ListItem({ href: '/subteams/social-media', title: 'Social Media', Icon: Heart })}
		{@render ListItem({
			href: '/subteams/infrastructure',
			title: 'Infrastructure',
			Icon: HardDrive
		})}
		{@render ListItem({
			href: '/subteams/competition',
			title: 'Competition Teams',
			Icon: SquareTerminal
		})}
	</div>
{/snippet}

{#snippet SubteamsFooter()}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a
		class="group/all flex items-center justify-between gap-3 px-3 py-2.5 type-label text decoration-none transition-colors hover:background-3 hover:text-blue-11 dark:hover:text-blue-11"
		href="/subteams"
		onclick={close}
	>
		<span class="block">
			All subteams<br />
			<span class="text-gray-9">[More pages coming soon]</span></span
		>
		<ArrowRight size={14} class="transition-transform group-hover/all:translate-x-0.5" />
	</a>
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
			{#snippet footer()}
				{@render SubteamsFooter()}
			{/snippet}
		</ListGroup>

		<ListGroup
			name="Achievements"
			open={openGroup === 'Achievements'}
			onOpen={() => open('Achievements')}
			onClose={close}
		>
			{@render AchievementsItems()}
		</ListGroup>

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
