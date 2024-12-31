<script lang="ts">
	import 'uno.css';
	import './global.scss';
	import type { Snippet } from 'svelte';
	import Nav from '$lib/common/components/Nav.svelte';
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let showNav = $state(false);
</script>

<svelte:window
	onscroll={(e) => {
		showNav = e.currentTarget.scrollY > 0;
	}}
/>

<svelte:head>
	<link href="/fonts/strobo/strobo.css" rel="stylesheet" />
	<link href="/fonts/commit-mono/commit-mono.css" rel="stylesheet" />
	<link href="/fonts/tasa-explorer/tasa-explorer.css" rel="stylesheet" />
	<link href="/fonts/blinker/blinker.css" rel="stylesheet" />
</svelte:head>

{#if showNav}
	<div
		class="fixed top-0 w-full background"
		transition:fly={{
			opacity: 1,
			duration: 700,
			easing: expoOut,
			y: '-100%'
		}}
	>
		<Nav />
	</div>
{/if}
{@render children?.()}

<style>
	:global(body) {
		@apply background text;
	}
</style>
