<script lang="ts">
	import type { PageData } from './$types';
	import '../global.scss';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	export let data: PageData;
</script>

<svelte:head>
	<link href="/fonts/strobo/strobo.css" rel="stylesheet" />
</svelte:head>

<main>
	<slot />
</main>
