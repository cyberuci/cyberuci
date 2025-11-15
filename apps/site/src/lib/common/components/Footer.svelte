<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';

	interface FooterItem {
		text: string;
		href: string;
	}

	interface FooterColumn {
		title: string;
		items: FooterItem[];
	}

	const columns: FooterColumn[] = [
		{
			title: 'Engage',
			items: [
				{ text: 'Subteams', href: '/subteams' },
				{ text: 'Competitions', href: '/competition' },
				{ text: 'Resources', href: '/resources' }
			]
		},
		{
			title: 'About',
			items: [
				{ text: 'News', href: '/news' },
				{ text: 'Sponsors', href: '/sponsors' },
				{ text: 'Board', href: '/board' },
				{ text: 'Brand', href: '/brand' },
				{ text: 'Contact', href: '/contact' }
			]
		}
	];
</script>

{#snippet Item({ item }: { item: FooterItem })}
	<li>
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href={item.href}
			class="type-label text-graydark-11 no-underline hover:text-blue-11 dark:hover:text-bluedark-11"
			>{item.text}</a
		>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	</li>
{/snippet}

{#snippet Column({ col }: { col: FooterColumn })}
	<div>
		<p class="text-lg type-label">{col.title}</p>
		<ul class="list-none px-0 text-sm space-y-4">
			{#each col.items as item (item.text)}
				{@render Item({ item })}
			{/each}
		</ul>
	</div>
{/snippet}

<footer class="space-x w-full space-y-8">
	<div class="justify-between md:flex">
		<div class="mb-16 mt-4 h-24 max-w-full w-48 flex">
			<a href={resolve('/')}><Logo /></a>
		</div>
		<div class="md:grid-cols- grid max-w-50% w-full gap-8 {columns.length} sm:grid-cols-1">
			{#each columns as col (col.title)}
				{@render Column({ col })}
			{/each}
		</div>
	</div>
	<p class="text-xs type-label">© 2025 Cyber @ UCI. All rights reserved.</p>
</footer>
