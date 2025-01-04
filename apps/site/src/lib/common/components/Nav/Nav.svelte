<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import Logo from '../Logo.svelte';
	import { NavigationMenu } from 'bits-ui';

	type ListItemProps = {
		title: string;
		href: string;
		content?: string;
	};
</script>

{#snippet ListItem({ title, content, href }: ListItemProps)}
	<li>
		<NavigationMenu.Link
			class="block h-full select-none rounded-sm p-3 decoration-none background-3"
			{href}
		>
			<div class="type-label text terminal-before">{title}</div>
			<p class="mb-2 mt-1.5 text-sm text-gray-11 font-mono dark:text-graydark-11">
				{content}
			</p>
		</NavigationMenu.Link>
	</li>
{/snippet}

<nav class="w-full flex items-center justify-between px-default-x py-3">
	<a href="/" class="flex items-center gap-2 py-2 decoration-none text">
		<div class="h-7 text-0"><Logo /></div>
		<span class="type-label hover:text-blue-11 dark:hover:text-bluedark-11">CyberUCI</span>
	</a>

	<NavigationMenu.Root
		class="relative z-10 max-w-max flex flex-1 items-center justify-center"
		delayDuration={0}
	>
		<NavigationMenu.List
			class="group m-0 flex flex-1 list-none items-baseline justify-center gap-3 p-0"
		>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger
					class="group flex items-center gap-1 border-none bg-transparent py-2 type-label hover:text-blue-11 text dark:hover:text-bluedark-11 terminal-before"
				>
					About
					<ChevronDown
						class="size-3 transition duration-200 group-data-[state=open]:rotate-180"
						aria-hidden="true"
					/>
				</NavigationMenu.Trigger>
				<NavigationMenu.Content class="absolute left-0 top-0 z-50">
					<ul class="grid grid-cols-[.75fr_1fr] grid-rows-3 m-0 w-xl list-none gap-3 p-3">
						<li class="row-span-3">
							<NavigationMenu.Link
								href="/competition"
								class="relative h-full w-full flex flex-col justify-end overflow-hidden rounded-sm p-3 decoration-none"
							>
								<div
									class="absolute left-0 top-0 h-full w-full from-graya-2 to-graya-12 bg-gradient-to-b -z-1"
								></div>
								<enhanced:img
									class="absolute left-0 top-0 h-full w-full object-cover -z-2"
									src="./competition.jpg"
									alt="2024 CCDC team standing in front of a banner"
								/>
								<div class="type-label text-graydark-12 before:text-graydark-11 terminal-before">
									Competition
								</div>
								<p class="mb-2 mt-1.5 text-sm text-graydark-11 font-mono">
									Cyber's competition teams and history.
								</p>
							</NavigationMenu.Link>
						</li>

						{@render ListItem({
							href: '/board',
							title: 'Board'
						})}
						{@render ListItem({
							href: '/subteams',
							title: 'Subteams',
							content: 'Subteams and org structure.'
						})}
						{@render ListItem({
							href: '/brand',
							title: 'Brand',
							content: 'Brand assets and guidelines.'
						})}
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>

			<NavigationMenu.Item>
				<NavigationMenu.Link
					class="py-2 type-label decoration-none before:text-gray-11 hover:text-blue-11 text before:content-['~_$_'] dark:before:text-graydark-11 dark:hover:text-bluedark-11"
					href="/contact"
				>
					Contact
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>

		<div class="absolute right-0 top-full">
			<NavigationMenu.Viewport
				class="h-[var(--bits-navigation-menu-viewport-height)] w-[var(--bits-navigation-menu-viewport-width)] overflow-hidden border border border-gray-6 rounded-sm border-solid dark:border-graydark-6 background-2"
			/>
		</div>
	</NavigationMenu.Root>
</nav>
