<script lang="ts">
	import { NavigationMenu } from 'bits-ui';
	import { ChevronDown, type Icon, LucideBrush, LucideMail, LucideUsers } from 'lucide-svelte';

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
	<li class="w-30 h-35">
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
		class="group m-0 flex flex-1 list-none items-baseline justify-center gap-4 p-0"
	>
		{@render ItemLink({
			href: '/news',
			label: 'News'
		})}
		{@render ItemLink({
			href: '/competition',
			label: 'Competition'
		})}
		{@render ItemLink({
			href: '/subteams',
			label: 'Subteams'
		})}

		<NavigationMenu.Item>
			<NavigationMenu.Trigger
				class="group flex items-center gap-1 border-none bg-transparent py-2 type-label hover:text-blue-11 text dark:hover:text-bluedark-11 terminal-before data-[state=open]:text-blue-11 dark:data-[state=open]:text-bluedark-11"
			>
				About
				<ChevronDown
					class="size-3 transition duration-200 group-data-[state=open]:rotate-180"
					aria-hidden="true"
				/>
			</NavigationMenu.Trigger>
			<NavigationMenu.Content class="absolute left-0 top-0 z-50">
				<ul class="flex m-0 list-none gap-2 p-2">
					{@render ListItem({
						href: '/board',
						title: 'Board',
						Icon: LucideUsers
					})}
					{@render ListItem({
						href: '/contact',
						title: 'Contact',
						Icon: LucideMail
					})}
					{@render ListItem({
						href: '/brand',
						title: 'Brand',
						Icon: LucideBrush
					})}
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>

		<div class="absolute right-0 top-125%">
			<NavigationMenu.Viewport
				class="h-[var(--bits-navigation-menu-viewport-height)] w-[var(--bits-navigation-menu-viewport-width)] data-[state=closed]:navout data-[state=open]:navin overflow-hidden border border-gray-4 rounded-md border-solid dark:border-graydark-4 background-2"
			/>
		</div>
	</NavigationMenu.List>
</NavigationMenu.Root>
