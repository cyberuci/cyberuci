<script lang="ts">
	import './global.scss';

	import Header from './layout/header/Header.svelte';
	import Socials from './layout/socials/Socials.svelte';
	import Footer from './layout/footer/Footer.svelte';
</script>

<svelte:head>
	<link
		rel="preload"
		href="/fonts/inter/Inter-roman.var.woff2?v=3.19"
		as="font"
		type="font/woff2"
		crossOrigin="anonymous"
	/>
	<link
		rel="preload"
		href="/fonts/inter/Inter-italic.var.woff2?v=3.19"
		as="font"
		type="font/woff2"
		crossOrigin="anonymous"
	/>
	<link href="/fonts/inter/inter.css" rel="stylesheet" />
	<link href="/fonts/tiny/TINY.css" rel="stylesheet" />
</svelte:head>

<Header />
<main>
	<slot />
</main>
<!-- <Socials /> -->
<Footer />
