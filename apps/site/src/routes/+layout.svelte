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
<div class="gradient h-md w-full"></div>

<style>
	:global(*) {
		@apply box-border;
	}

	:global(body) {
		@apply background text;
	}

	.gradient {
		background: linear-gradient(
			to bottom,
			hsla(209, 64%, 45%, 0) 0%,
			hsla(209, 64%, 45%, 0) 14.3%,
			hsla(209, 64%, 45%, 0.002) 27.4%,
			hsla(209, 64%, 45%, 0.008) 39.2%,
			hsla(209, 64%, 45%, 0.019) 49.8%,
			hsla(209, 64%, 45%, 0.037) 59.3%,
			hsla(209, 64%, 45%, 0.064) 67.6%,
			hsla(209, 64%, 45%, 0.102) 74.9%,
			hsla(209, 64%, 45%, 0.152) 81.1%,
			hsla(209, 64%, 45%, 0.216) 86.4%,
			hsla(209, 64%, 45%, 0.296) 90.7%,
			hsla(209, 64%, 45%, 0.394) 94.2%,
			hsla(209, 64%, 45%, 0.512) 96.8%,
			hsla(209, 64%, 45%, 0.651) 98.6%,
			hsla(209, 64%, 45%, 0.813) 99.7%,
			hsl(209, 64%, 45%) 100%
		);
	}
</style>
