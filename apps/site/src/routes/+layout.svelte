<script lang="ts">
	import 'uno.css';
	import 'temporal-polyfill/global';
	import type { Snippet } from 'svelte';
	import Nav from '$lib/common/components/Nav/Nav.svelte';
	import Footer from '$lib/common/components/Footer.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=TASA+Explorer:wght@400..800&
		family=Pixelify+Sans:wght@400..700&
		family=Readex+Pro:wght@160..700&
		family=Google+Sans+Code:ital,wght,MONO@0,300..800,1;1,300..800,1&
		display=swap"
		rel="stylesheet"
	/>

	<!-- <meta name="theme-color" content="#FCFCFC" media="(prefers-color-scheme: light)" /> -->
	<meta name="theme-color" content="#111111" />
</svelte:head>

<header class="relative z-50 w-full">
	<Nav />
</header>
<main class="relative z-0">
	{@render children?.()}
</main>

<Footer />
<div class="gradient pointer-events-none h-md w-full -mt-70"></div>

<style>
	:global(*) {
		@apply box-border;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		@apply background text m-0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
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
