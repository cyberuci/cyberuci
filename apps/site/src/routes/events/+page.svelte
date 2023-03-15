<script lang="ts">
	import type { PageData } from './$types';
	import Event from './Event.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Events — Cyber @ UCI</title>
</svelte:head>

{#each data.events as event}
	<Event {event} />
{/each}
