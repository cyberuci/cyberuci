<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import Section from './Section.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Subteams — Cyber @ UCI</title>
</svelte:head>

<div class="mx-default-x my-60">
	<Title title="Subteams" />
	<main>
		{#each data.subteams.subteams as { name, description }}
			<div class="mb-24">
				<Section {name} {description} />
			</div>
		{/each}
	</main>
</div>
