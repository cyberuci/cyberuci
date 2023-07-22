<script lang="ts">
	import type { PageData } from './$types';
	import './global.scss';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import Header from './layout/header/Header.svelte';
	import Footer from './layout/footer/Footer.svelte';

	inject({ mode: dev ? 'development' : 'production' });

	export let data: PageData;
</script>

<svelte:head>
	<link href="/fonts/blinker/blinker.css" rel="stylesheet" />
	<link href="/fonts/jura/jura.css" rel="stylesheet" />
	<link href="/fonts/tiny/TINY.css" rel="stylesheet" />
</svelte:head>

<Header />
<main>
	<slot />
</main>
<Footer info={data.info} />
