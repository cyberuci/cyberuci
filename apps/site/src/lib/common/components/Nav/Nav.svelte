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
			class="block p-3 decoration-none rounded-sm select-none background-3 h-full"
			{href}
		>
			<div class="type-label text terminal-before">{title}</div>
			<p class="font-mono text-gray-11 dark:text-graydark-11 text-sm mt-1.5 mb-2">
				{content}
			</p>
		</NavigationMenu.Link>
	</li>
{/snippet}

<nav class="flex items-center justify-between w-full py-3 px-default-x">
	<a href="/" class="flex items-center gap-2 text decoration-none py-2">
		<div class="h-7 text-0"><Logo /></div>
		<span class="type-label hover:text-blue-11 dark:hover:text-bluedark-11">CyberUCI</span>
	</a>

	<NavigationMenu.Root
		class="relative z-10 flex items-center justify-center flex-1 max-w-max"
		delayDuration={0}
	>
		<NavigationMenu.List
			class="flex items-baseline justify-center flex-1 list-none group m-0 p-0 gap-3"
		>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger
					class="group py-2 hover:text-blue-11 dark:hover:text-bluedark-11 type-label terminal-before text bg-transparent border-none flex items-center gap-1"
				>
					About
					<ChevronDown
						class="group-data-[state=open]:rotate-180 size-3 transition duration-200"
						aria-hidden="true"
					/>
				</NavigationMenu.Trigger>
				<NavigationMenu.Content class="left-0 top-0 z-50 absolute">
					<ul class="grid gap-3 p-3 w-xl grid-cols-[.75fr_1fr] grid-rows-3 list-none m-0">
						<li class="row-span-3">
							<NavigationMenu.Link
								href="/competition"
								class="rounded-sm relative flex flex-col justify-end w-full h-full decoration-none overflow-hidden p-3"
							>
								<div
									class="absolute top-0 left-0 w-full h-full -z-1 bg-gradient-to-b from-graya-2 to-graya-12"
								></div>
								<enhanced:img
									class="object-cover absolute top-0 left-0 w-full h-full -z-2"
									src="./competition.jpg"
									alt="2024 CCDC team standing in front of a banner"
								/>
								<div class="type-label terminal-before before:text-graydark-11 text-graydark-12">
									Competition
								</div>
								<p class="font-mono text-graydark-11 text-sm mt-1.5 mb-2">
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
					class="py-2 hover:text-blue-11 dark:hover:text-bluedark-11 type-label before:content-['~_$_'] before:text-gray-11 dark:before:text-graydark-11 decoration-none text"
					href="/contact"
				>
					Contact
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>

		<div class="absolute right-0 top-full">
			<NavigationMenu.Viewport
				class="w-[var(--bits-navigation-menu-viewport-width)] h-[var(--bits-navigation-menu-viewport-height)]  overflow-hidden rounded-sm border background-2 border border-solid border-gray-6 dark:border-graydark-6"
			/>
		</div>
	</NavigationMenu.Root>
</nav>
