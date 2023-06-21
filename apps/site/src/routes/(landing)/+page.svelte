<script lang="ts">
	import type { PageData } from './$types';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Image from './Image.svelte';
	import { onMount } from 'svelte';
	import Link from './Link.svelte';
	import Hexagons from './Hexagons.svelte';

	export let data: PageData;

	let key = Symbol();
	onMount(() => {
		key = Symbol();
	});
</script>

<svelte:head>
	<title>Cyber @ UCI</title>
</svelte:head>

<div class="cover">
	<div class="image">
		<Image image={data.landing.cover} />
	</div>
	<div class="gradient" />
	{#key key}
		<h1 class="title">
			{#each 'The club for all things cybersecurity. Beginner friendly workshops, competitions, and challenges, every Thursday.'.split(' ') as word, i}
				<span
					in:fly={{
						delay: 850 + 25 * i,
						duration: 500,
						y: 20,
						easing: quintOut
					}}
				>
					{word}
				</span>
			{/each}
		</h1>
	{/key}
	<div class="cta">
		<Link href="/hackerlab">Visit HackerLab</Link>
		<Link href="/events">View Events</Link>
	</div>
</div>
<Hexagons />

<style lang="scss">
	.cover {
		position: relative;
		overflow: auto;
		width: 100vw;
		height: 100vh;
	}

	.image {
		z-index: -1;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}

	@keyframes show {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.gradient {
		z-index: -1;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(rgba($color: #000, $alpha: 0.8) 5%, 50%, transparent);
		opacity: 0;
		animation: 300ms 800ms ease-in forwards show;

		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			backdrop-filter: blur(5px);
			mask-image: linear-gradient(rgba($color: #000, $alpha: 0.8) 5%, 50%, transparent);
		}
	}

	.title {
		font-family: 'Jura var', sans-serif;
		font-size: 32px;
		font-weight: 500;
		line-height: 130%;
		max-width: 30ch;
		margin: 128px var(--padding-x) 0 var(--padding-x);
		color: #fff;
		opacity: 0;
		animation: 300ms 850ms ease-in forwards show;

		span {
			display: inline-block;
			margin-right: 8px;
		}
	}

	.cta {
		margin: 24px var(--padding-x) 0 var(--padding-x);
		display: flex;
		gap: 32px;
		opacity: 0;
		animation: 300ms 1100ms ease-in forwards show;
	}
</style>
