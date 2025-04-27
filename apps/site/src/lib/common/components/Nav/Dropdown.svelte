<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
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
			class="group block h-full select-none rounded-sm p-3 decoration-none background-3"
			{href}
		>
			<div
				class="type-label group-hover:text-blue-11 text dark:group-hover:text-bluedark-11 terminal-before"
			>
				{title}
			</div>
			<p class="mb-2 mt-1.5 type-body-1 text-gray-11 dark:text-graydark-11">
				{content}
			</p>
		</NavigationMenu.Link>
	</li>
{/snippet}

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
					class="group relative h-full w-full flex flex-col justify-end overflow-hidden rounded-sm p-3 decoration-none"
				>
					<div
						class="absolute left-0 top-0 h-full w-full from-graya-2 to-graya-12 bg-gradient-to-b -z-1"
					></div>
					<enhanced:img
						class="absolute left-0 top-0 h-full w-full object-cover -z-2"
						src="./competition.jpg"
						alt="2024 CCDC team standing in front of a banner"
					/>
					<div
						class="type-label text-graydark-12 before:text-graydark-11 group-hover:text-bluedark-11 terminal-before"
					>
						Competition
					</div>
					<p class="mb-2 mt-1.5 type-body-1 text-graydark-11">
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
