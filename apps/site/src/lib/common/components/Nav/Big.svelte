<script lang="ts">
	import { NavigationMenu } from 'bits-ui';
	import {
		BookMarked,
		Group,
		type Icon,
		LucideBrush,
		LucideMail,
		LucideUsers,
		Trophy,
		Calendar
	} from 'lucide-svelte';
	import ListGroup from './ListGroup.svelte';

	interface ItemLinkProps {
		label: string;
		href: string;
	}

	interface ListItemProps {
		Icon: typeof Icon;
		title: string;
		href: string;
	}
</script>

{#snippet ItemLink({ label, href }: ItemLinkProps)}
	<NavigationMenu.Item>
		<NavigationMenu.Link
			class="py-2 type-label text decoration-none transition-colors before:text-gray-11 hover:text-blue-11 before:content-['~_$_'] dark:before:text-graydark-11 dark:hover:text-bluedark-11"
			{href}
		>
			{label}
		</NavigationMenu.Link>
	</NavigationMenu.Item>
{/snippet}

{#snippet ListItem({ title, Icon, href }: ListItemProps)}
	<li class="h-35 w-38">
		<NavigationMenu.Link
			class="group/list block h-full flex flex-col select-none border border-gray-4 rounded-sm border-solid p-3 decoration-none transition-colors dark:border-graydark-4 hover:border-gray-5 hover:background-3 dark:hover:border-graydark-5"
			{href}
		>
			<div
				class="flex-grow-1 text transition-colors group-hover/list:text-blue-11 dark:group-hover/list:text-blue-11"
			>
				<Icon size="24" />
			</div>
			<div class="type-label terminal-before text">
				{title}
			</div>
		</NavigationMenu.Link>
	</li>
{/snippet}

<NavigationMenu.Root
	class="relative z-10 max-w-max flex flex-1 items-center justify-center"
	delayDuration={0}
>
	<NavigationMenu.List
		class="group m-0 flex flex-1 list-none items-baseline justify-center gap-5 p-0"
	>
		<ListGroup name="Engage">
			{@render ListItem({
				href: '/subteams',
				title: 'Subteams',
				Icon: Group
			})}
			{@render ListItem({
				href: '/events',
				title: 'Events',
				Icon: Calendar
			})}
			{@render ListItem({
				href: '/competition',
				title: 'Competition',
				Icon: Trophy
			})}
			{@render ListItem({
				href: '/resources',
				title: 'Resources',
				Icon: BookMarked
			})}
		</ListGroup>

		<ListGroup name="About">
			{@render ListItem({
				href: '/board',
				title: 'Board',
				Icon: LucideUsers
			})}
			{@render ListItem({
				href: '/brand',
				title: 'Brand',
				Icon: LucideBrush
			})}
			{@render ListItem({
				href: '/contact',
				title: 'Contact',
				Icon: LucideMail
			})}
		</ListGroup>

		{@render ItemLink({
			href: '/news',
			label: 'News'
		})}
		{@render ItemLink({
			href: '/sponsors',
			label: 'Sponsors'
		})}

		<div class="absolute right-0 top-125%">
			<NavigationMenu.Viewport
				class="h-[var(--bits-navigation-menu-viewport-height)] w-[var(--bits-navigation-menu-viewport-width)] overflow-hidden border border-gray-4 rounded-md border-solid background-2 data-[state=closed]:navout data-[state=open]:navin dark:border-graydark-4"
			/>
		</div>
	</NavigationMenu.List>
</NavigationMenu.Root>
