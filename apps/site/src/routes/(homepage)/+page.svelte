<script lang="ts">
	import type { PageData } from './$types';

	import Header from './sections/Header/Header.svelte';
	import Competitions from './sections/Competitions/Competitions.svelte';
	import Hackerlab from './sections/Hackerlab/Hackerlab.svelte';
	import Socials from './sections/Socials/Socials.svelte';
	import Events from './sections/Events/Events.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Cyber @ UCI</title>
</svelte:head>

<Header cover={data.homepage.Header ?? null} />
<Events events={data.events} />
<Competitions
	image={data.homepage.competitions.image}
	subtitle={data.homepage.competitions.subtitle}
	description={data.homepage.competitions.description}
/>
<Hackerlab
	isOpen={data.homepage.hackerlab?.isOpen ?? false}
	images={data.homepage.hackerlab?.images ?? null}
/>
{#if data.socials.socials}
	<Socials socials={data.socials.socials} />
{/if}
