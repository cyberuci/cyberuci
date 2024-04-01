<script lang="ts">
	import '../global.scss';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<link href="/fonts/strobo/strobo.css" rel="stylesheet" />
	<link href="/fonts/commit-mono/commit-mono.css" rel="stylesheet" />
	<link href="/fonts/tasa-explorer/tasa-explorer.css" rel="stylesheet" />
</svelte:head>

<main>
	<slot />
</main>
