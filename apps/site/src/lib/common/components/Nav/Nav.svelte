<script lang="ts">
	import Logo from '../Logo.svelte';
	import Big from './Big.svelte';
	import Small from './Small.svelte';
	import GlitchTypewriter from './GlitchTypewriter.svelte';
	import { resolve } from '$app/paths';
</script>

<nav class="relative space-x w-full flex items-center justify-between py-3">
	<a href={resolve('/')} class="flex shrink-0 items-center gap-2 py-2 text decoration-none">
		<div class="h-7 text-0"><Logo /></div>
		<GlitchTypewriter />
	</a>
	<div class="hidden min-w-0 flex-1 justify-end lg:flex">
		<Big />
	</div>
	<div class="block shrink-0 lg:hidden"><Small /></div>
</nav>
