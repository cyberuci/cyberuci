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

<div class="my-40 space-x">
	<Title title="Subteams" />
	<main>
		{#each data.subteams.subteams as { _key, name, link, description } (_key)}
			<div class="mb-24">
				<Section {name} {description} href={link} />
			</div>
		{/each}
	</main>
</div>
