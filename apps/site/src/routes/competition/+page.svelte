<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import PortableText from '$lib/portableText/PortableText.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Competition — Cyber @ UCI</title>
</svelte:head>

<div class="my-60 space-x">
	<Title title="Competition" />
	<PortableText value={data.competitionPage.content} />
</div>
