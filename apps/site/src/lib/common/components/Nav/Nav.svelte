<script lang="ts">
	import Logo from '../Logo.svelte';
	import Big from './Big.svelte';
	import Small from './Small.svelte';
	import { resolve } from '$app/paths';
</script>

<nav class="space-x flex items-center justify-between py-3">
	<a href={resolve('/')} class="flex items-center gap-2 py-2 text decoration-none">
		<div class="h-7 text-0"><Logo /></div>
		<span class="type-label hover:text-blue-11 dark:hover:text-bluedark-11">CyberUCI</span>
	</a>
	<div class="hidden lg:block"><Big /></div>
	<div class="block lg:hidden"><Small /></div>
</nav>
