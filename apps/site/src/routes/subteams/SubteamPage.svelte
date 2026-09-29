<script lang="ts">
	import type { Snippet } from 'svelte';
	import Title from '$lib/common/components/Title.svelte';
	import { Construction } from 'lucide-svelte';

	interface Props {
		title: string;
		intro?: string;
		comingSoon?: string;
		children?: Snippet;
	}

	let {
		title,
		intro,
		comingSoon = 'This page is under development. Check back soon!',
		children
	}: Props = $props();
</script>

<svelte:head>
	<title>{title} — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title {title} />

	{#if intro}
		<p class="mb-16 max-w-prose type-body-1 text-2">
			{intro}
		</p>
	{/if}

	{@render children?.()}

	<div
		class="max-w-prose border border-gray-4 rounded-md border-solid background-2 p-6 dark:border-graydark-4"
	>
		<div class="mb-3 flex items-center gap-2 text-blue-11 dark:text-bluedark-11">
			<Construction size={18} />
			<h2 class="m-0 type-label font-550">[COMING SOON]</h2>
		</div>
		<p class="m-0 type-body-1 text-2">{comingSoon}</p>
	</div>
</div>
