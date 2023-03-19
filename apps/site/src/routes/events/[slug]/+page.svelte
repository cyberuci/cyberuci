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

<main>
	<div class="column-1">
		<a href="/events">Back</a>
		<div class="time">
			<p>{startLocaleString}</p>
			<p>{endLocaleString}</p>
		</div>
		<span>{location}</span>
	</div>

	<h1>{title}</h1>
	<div class="content">
		{#if content}
			<PortableText value={content} />
		{/if}
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 16px;
		margin: 0 48px;
	}

	.column-1 {
		grid-column: 1;
		grid-row: 2;
		display: flex;
		flex-direction: column;
		gap: 24px;
		color: var(--gray11);

		.time p {
			margin: 6px 0;
		}

		a {
			line-height: 27px;
		}

		span {
			line-height: 27px;
		}
	}

	.content {
		grid-column: 2 / span 3;
		grid-row: 2;
	}

	h1 {
		grid-column: 2 / span 3;
		grid-row: 1;
		font-family: 'Inter';
		margin: 96px 0 24px 0;
		font-size: 40px;
		letter-spacing: -0.022em;
		line-height: 56px;
		font-weight: 400;
	}

	main {
		grid-column: 2 / span 3;
	}
</style>
