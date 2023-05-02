<script lang="ts">
	import './global.scss';

	import Header from './layout/header/Header.svelte';
	import Footer from './layout/footer/Footer.svelte';
</script>

<svelte:head>
	<script src="https://cdn.usefathom.com/script.js" data-site="OYOSQPKX" defer></script>
	<link href="/fonts/blinker/blinker.css" rel="stylesheet" />
	<link href="/fonts/jura/jura.css" rel="stylesheet" />
	<link href="/fonts/tiny/TINY.css" rel="stylesheet" />
</svelte:head>

<Header />
<main>
	<slot />
</main>
<Footer />
