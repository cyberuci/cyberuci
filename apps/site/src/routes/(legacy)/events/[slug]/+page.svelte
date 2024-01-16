<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$lib/og';
	import PortableText from '$lib/portableText/PortableText.svelte';

	export let data: PageData;

	const { ogImageUrl, ogImageColor, title, start, end, location, description, content } =
		data.event;
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

	const ogSearchParams = new URLSearchParams({
		title,
		start,
		end,
		room: location,
		image: ogImageUrl,
		imageColor: ogImageColor
	});
</script>

<svelte:head>
	<meta property="og:site_name" content="Cyber @ UCI" />

	<title>{title} — Cyber @ UCI</title>
	<meta property="og:title" content={title} />

	<meta name="description" content={description} />
	<meta property="og:description" content={description} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:image" content={base + '/event?' + ogSearchParams.toString()} />
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
		margin: 96px auto 0 auto;
		padding: 0 16px;
		display: grid;
		grid-template-columns: 1fr;
		@media (min-width: 600px) {
			max-width: 600px - 32px;
		}
		@media (min-width: 900px) {
			grid-template-columns: repeat(5, 1fr);
			padding: 0 32px;
			max-width: 1200px;
		}
	}

	.column-1 {
		grid-row: 1;
		grid-column: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
		@media (min-width: 900px) {
			grid-row: 2;
			gap: 24px;
		}
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

	h1 {
		grid-row: 2;
		grid-column: 1;
		@media (min-width: 900px) {
			grid-row: 1;
			grid-column: 2 / span 3;
		}
		font-family: 'Inter';
		margin: 24px 0;
		font-size: 40px;
		letter-spacing: -0.022em;
		line-height: 56px;
		font-weight: 400;
	}

	.content {
		grid-row: 3;
		grid-column: 1;
		@media (min-width: 900px) {
			grid-row: 2;
		}
		@media (min-width: 900px) {
			grid-column: 2 / span 3;
		}
	}
</style>
