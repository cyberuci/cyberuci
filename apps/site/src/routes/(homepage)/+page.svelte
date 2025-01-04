<script lang="ts">
	import type { PageData } from './$types';

	import Header from './sections/Header/Header.svelte';
	import Competitions from './sections/Competitions/Competitions.svelte';
	import Hackerlab from './sections/Hackerlab/Hackerlab.svelte';
	import Socials from './sections/Socials/Socials.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Cyber @ UCI</title>
</svelte:head>

<Header />
<Competitions
	subtitle={data.homepage.competitions.subtitle}
	description={data.homepage.competitions.description}
/>
<Hackerlab
	images={data.homepage.hackerlab.images}
	description={data.homepage.hackerlab.description}
/>
<Socials socials={data.socials.socials} />

<style lang="scss">
</style>
