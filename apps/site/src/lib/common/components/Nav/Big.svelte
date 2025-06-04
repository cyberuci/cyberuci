<script lang="ts">
	import { NavigationMenu } from 'bits-ui';

	interface ItemLinkProps {
		label: string;
		href: string;
	}
</script>

{#snippet ItemLink({ label, href }: ItemLinkProps)}
	<NavigationMenu.Item>
		<NavigationMenu.Link
			class="py-2 type-label decoration-none before:text-gray-11 hover:text-blue-11 text before:content-['~_$_'] dark:before:text-graydark-11 dark:hover:text-bluedark-11"
			{href}
		>
			{label}
		</NavigationMenu.Link>
	</NavigationMenu.Item>
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
			href: '/board',
			label: 'Board'
		})}
		{@render ItemLink({
			href: '/subteams',
			label: 'Subteams'
		})}

		<div class="absolute right-0 top-full">
			<NavigationMenu.Viewport
				class="h-[var(--bits-navigation-menu-viewport-height)] w-[var(--bits-navigation-menu-viewport-width)] data-[state=closed]:navout data-[state=open]:navin overflow-hidden border border-gray-4 rounded-sm border-solid dark:border-graydark-4 background-2"
			/>
		</div>
	</NavigationMenu.List>
</NavigationMenu.Root>
