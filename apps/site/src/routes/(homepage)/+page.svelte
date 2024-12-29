<script lang="ts">
	import type { PageData } from './$types';

	import Header from './sections/Header/Header.svelte';
	import Events from './sections/Events/Events.svelte';
	import Competitions from './sections/Competitions/Competitions.svelte';
	import Hackerlab from './sections/Hackerlab/Hackerlab.svelte';
	import Socials from './sections/Socials/Socials.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Cyber @ UCI</title>
</svelte:head>

<Header />
<Events events={data.events} />
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
