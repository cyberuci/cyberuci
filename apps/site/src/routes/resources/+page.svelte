<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Resources — Cyber @ UCI</title>
</svelte:head>

<h1 class="text-3xl font-bold">Resources</h1>

<ul class="mt-4 space-y-2">
	{#each data.resources as resource (resource._id)}
		<li class="p-4 rounded bg-gray-2">
			<h2 class="text-xl font-semibold">{resource.title}</h2>
			<!-- Render other fields as needed -->
		</li>
	{/each}
</ul>