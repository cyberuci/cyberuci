<script lang="ts">
	import Logo from '../Logo.svelte';
	import Big from './Big.svelte';
	import Small from './Small.svelte';
</script>

<nav class="flex items-center justify-between py-3 space-x">
	<a href="/" class="flex items-center gap-2 py-2 decoration-none text">
		<div class="h-7 text-0"><Logo /></div>
		<span class="type-label hover:text-blue-11 dark:hover:text-bluedark-11">CyberUCI</span>
	</a>
	<div class="hidden sm:block"><Big /></div>
	<div class="block sm:hidden"><Small /></div>
</nav>
