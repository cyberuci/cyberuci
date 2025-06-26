<script lang="ts">
	import type { PageData } from './$types';

	import Header from './sections/Header/Header.svelte';
	import Competitions from './sections/Competitions/Competitions.svelte';
	import Hackerlab from './sections/Hackerlab/Hackerlab.svelte';
	import Socials from './sections/Socials/Socials.svelte';
	import News from './sections/News/News.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Cyber @ UCI</title>
</svelte:head>

{#if data.homepage.highlightNews && data.homepage.highlightNews.enable}
	<News news={data.homepage.highlightNews} />
{:else}
	<Header />
{/if}
<Competitions description={data.homepage.competitions.description} />
<Hackerlab section={data.homepage.hackerlab} />
<Socials socials={data.socials.socials} />
