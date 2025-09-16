<script lang="ts">
	import type { PageProps } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import SponsorTier from './SponsorTier.svelte';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Sponsors — Cyber @ UCI</title>
</svelte:head>

<main class="my-60 space-x">
	<Title title="Sponsors" />
	{#if data.sponsors.gold}
		<Title title="Gold Tier" size="small" />
		<SponsorTier sponsorTeir={data.sponsors.gold} />
	{/if}
	{#if data.sponsors.silver}
		<Title title="Silver Tier" size="small" />
		<SponsorTier sponsorTeir={data.sponsors.silver} />
	{/if}
	{#if data.sponsors.special}
		<Title title="Special Thanks" size="small" />
		<SponsorTier sponsorTeir={data.sponsors.special} />
	{/if}
</main>
