<script lang="ts">
	import type { PageData } from './$types';
	import PortableText from '$lib/portableText/PortableText.svelte';

	export let data: PageData;

	$: ({ title, start, end, location, content } = data.event);
	$: startLocaleString = new Date(start).toLocaleString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
	$: endLocaleString = new Date(end).toLocaleString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
</script>

<svelte:head>
	<title>{title} — Cyber @ UCI</title>
</svelte:head>

<h1>{title}</h1>
<span>{startLocaleString} - {endLocaleString}</span>
<span>{location}</span>
<PortableText value={content} />
