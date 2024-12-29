<script lang="ts">
	import 'uno.css';
	import './global.scss';
</script>

<svelte:head>
	<link href="/fonts/strobo/strobo.css" rel="stylesheet" />
	<link href="/fonts/commit-mono/commit-mono.css" rel="stylesheet" />
	<link href="/fonts/tasa-explorer/tasa-explorer.css" rel="stylesheet" />
	<link href="/fonts/blinker/blinker.css" rel="stylesheet" />
</svelte:head>

<slot />

<style>
	:global(body) {
		@apply background text;
	}
</style>
