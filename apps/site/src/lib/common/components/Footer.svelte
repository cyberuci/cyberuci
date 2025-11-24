<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';
	import { siDiscord, siInstagram, siGithub } from 'simple-icons';

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
			title: 'Connect',
			items: [
				{ text: 'Discord', href: 'https://discord.gg/cyberuci' },
				{ text: 'Instagram', href: 'https://www.instagram.com/cyber_at_uci/' },
				{ text: 'GitHub', href: 'https://github.com/cyberuci' }
			]
		},
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
			class="flex items-center type-label text-graydark-11 no-underline hover:text-blue-11 dark:hover:text-bluedark-11"
			{...item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
		>
			{#if item.text === 'Discord'}
				<svg class="mr-2 size-4" viewBox="0 0 24 24" fill="currentColor">
					<path d={siDiscord.path} />
				</svg>
			{:else if item.text === 'Instagram'}
				<svg class="mr-2 size-4" viewBox="0 0 24 24" fill="currentColor">
					<path d={siInstagram.path} />
				</svg>
			{:else if item.text === 'GitHub'}
				<svg class="mr-2 size-4" viewBox="0 0 24 24" fill="currentColor">
					<path d={siGithub.path} />
				</svg>
			{/if}
			{item.text}
		</a>
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
		<div
			class="grid grid-cols-1 max-w-60% w-full gap-8 md:[grid-template-columns:var(--cols)]"
			style={`--cols: repeat(${columns.length}, minmax(0, 1fr))`}
		>
			{#each columns as col (col.title)}
				{@render Column({ col })}
			{/each}
		</div>
	</div>
	<p class="text-xs type-label">© 2025 Cyber @ UCI. All rights reserved.</p>
</footer>
