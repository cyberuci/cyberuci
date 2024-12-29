<script lang="ts">
	import 'uno.css';
	import './global.scss';
</script>

<svelte:head>
	<link href="/fonts/blinker/blinker.css" rel="stylesheet" />
	<link href="/fonts/jura/jura.css" rel="stylesheet" />
	<link href="/fonts/tiny/TINY.css" rel="stylesheet" />
</svelte:head>

<slot />

<style>
	:global(body) {
		@apply background text;
	}
</style>
