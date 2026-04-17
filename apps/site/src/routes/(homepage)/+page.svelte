<script lang="ts">
	import type { PageData } from './$types';

	import Header from './sections/Header/Header.svelte';
	import Competitions from './sections/Competitions/Competitions.svelte';
	import Hackerlab from './sections/Hackerlab/Hackerlab.svelte';
	import Socials from './sections/Socials/Socials.svelte';
	import News from './sections/News/News.svelte';
	import Events from './sections/Events/Events.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Cyber @ UCI</title>
</svelte:head>

{#if data.homepage.highlightNews?.enable && data.homepage.highlightNews.article}
	<News article={data.homepage.highlightNews.article} />
{:else}
	<Header />
{/if}
<Events />
<Competitions description={data.homepage.competitions.description} />
<Hackerlab />
{#if data.socials.socials}
	<Socials socials={data.socials.socials} />
{/if}
