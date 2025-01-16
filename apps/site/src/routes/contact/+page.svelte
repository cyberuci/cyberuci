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
	<title>Contact — Cyber @ UCI</title>
</svelte:head>

<div class="my-60 space-x">
	<Title title="Contact" />
	<main>
		{#each data.contactPage.sections as { title, description, contacts }}
			<div class="mb-24">
				<Section {title} {description} {contacts} />
			</div>
		{/each}
	</main>
</div>
