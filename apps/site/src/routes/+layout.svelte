<script lang="ts">
	import './global.scss';

	import Header from './layout/header/Header.svelte';
	import Socials from './layout/socials/Socials.svelte';
	import Footer from './layout/footer/Footer.svelte';
</script>

<svelte:head>
	<link href="/fonts/tiny/TINY.css" rel="stylesheet" />
	<link href="/fonts/inter/inter.css" rel="stylesheet" />
</svelte:head>

<Header />
<main>
	<slot />
</main>
<!-- <Socials /> -->
<Footer />
