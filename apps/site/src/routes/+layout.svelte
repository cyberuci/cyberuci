<script lang="ts">
	import 'uno.css';
	import './global.scss';
	import type { Snippet } from 'svelte';
	import Nav from '$lib/common/components/Nav/Nav.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<link href="/fonts/strobo/strobo.css" rel="stylesheet" />
	<link href="/fonts/commit-mono/commit-mono.css" rel="stylesheet" />
	<link href="/fonts/tasa-explorer/tasa-explorer.css" rel="stylesheet" />
	<link href="/fonts/blinker/blinker.css" rel="stylesheet" />
</svelte:head>

<Nav />
{@render children?.()}

<style>
	:global(*) {
		@apply box-border;
	}

	:global(body) {
		@apply background text;
	}
</style>
