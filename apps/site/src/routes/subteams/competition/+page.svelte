<script lang="ts">
	import type { PageData } from './$types';
	import { Flag, Shield, SquareTerminal, Trophy, type Icon } from 'lucide-svelte';
	import PortableText from '$lib/portableText/PortableText.svelte';
	import SubteamPage from '../SubteamPage.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const symbols: Record<string, typeof Icon> = {
		CCDC: Shield,
		CPTC: SquareTerminal,
		CTF: Flag
	};
</script>

<SubteamPage title={data.title} comingSoon={data.comingSoon}>
	{#each data.teams as { _key, name, fullName, description } (_key)}
		{@const TeamIcon = symbols[name] ?? Trophy}
		<div class="grid mb-16 items-start gap-y-4 lg:grid-cols-16">
			<div class="lg:col-start-1 lg:col-end-5">
				<div class="flex items-center gap-2">
					<TeamIcon size={18} />
					<h2 class="m-0 type-heading-2">{name}</h2>
				</div>
				{#if fullName}
					<p class="mb-0 mt-2 type-label text-gray-11 dark:text-graydark-11">[{fullName}]</p>
				{/if}
			</div>
			<div class="team-description type-body-1 text-2 lg:col-start-5 lg:col-end-17">
				<PortableText value={description ?? []} />
			</div>
		</div>
	{/each}
</SubteamPage>

<style>
	.team-description :global(> :first-child) {
		margin-top: 0;
	}

	.team-description :global(> :last-child) {
		margin-bottom: 0;
	}
</style>
