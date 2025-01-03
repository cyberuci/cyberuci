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

<Title title="Contact" />
<main>
	{#each data.contactPage.sections as { title, description, contacts }}
		<div class="section">
			<Section {title} {description} {contacts} />
		</div>
	{/each}
</main>

<style lang="scss">
	@use '$lib/common/styles/styles' as styles;

	main {
		max-width: styles.$max-width;
		margin: 0 auto;
		padding: 72px styles.$padding-x;
	}

	.section {
		margin-bottom: 96px;
	}
</style>
