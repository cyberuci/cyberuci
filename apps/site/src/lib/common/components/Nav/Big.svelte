<script lang="ts">
	import { NavigationMenu } from 'bits-ui';
	import {
		BookMarked,
		Group,
		type Icon,
		LucideBrush,
		LucideMail,
		LucideUsers,
		Trophy
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
			class="py-2 type-label decoration-none before:text-gray-11 hover:text-blue-11 text before:content-['~_$_'] dark:before:text-graydark-11 dark:hover:text-bluedark-11 transition-colors"
			{href}
		>
			{label}
		</NavigationMenu.Link>
	</NavigationMenu.Item>
{/snippet}

{#snippet ListItem({ title, Icon, href }: ListItemProps)}
	<li class="w-38 h-35">
		<NavigationMenu.Link
			class="group/list block h-full select-none rounded-sm p-3 decoration-none border-gray-4 dark:border-graydark-4 border  border-solid hover:border-gray-5 dark:hover:border-graydark-5 hover:background-3 flex flex-col transition-colors"
			{href}
		>
			<div
				class="text flex-grow-1 group-hover/list:text-blue-11 dark:group-hover/list:text-blue-11 transition-colors"
			>
				<Icon size="24" />
			</div>
			<div class="type-label text terminal-before">
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
				class="h-[var(--bits-navigation-menu-viewport-height)] w-[var(--bits-navigation-menu-viewport-width)] data-[state=closed]:navout data-[state=open]:navin overflow-hidden border border-gray-4 rounded-md border-solid dark:border-graydark-4 background-2"
			/>
		</div>
	</NavigationMenu.List>
</NavigationMenu.Root>
