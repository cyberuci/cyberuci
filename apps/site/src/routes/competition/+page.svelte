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

<div class="my-40 space-x">
	<Title title="Competition" />
	<div class="mb-8 max-w-prose type-body-2">
		<PortableText value={data.competitionPage.content} />
	</div>
</div>
