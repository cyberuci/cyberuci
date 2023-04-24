<script lang="ts">
	import { onMount } from 'svelte';
	import Row from './Row.svelte';
	import { characters } from 'tiny-font';

	export let title: string;

	const rowCountLeading = 15;
	const rowCountFollowing = 4;
	const rowSize = 10;

	const isValidCharacter = (character: string): character is keyof typeof characters =>
		Object.keys(characters).includes(character);

	const titleCharacters: number[][] = [...title].reduce(
		(current, character) =>
			isValidCharacter(character)
				? [
						[...current[0], ...characters[character][0], 0],
						[...current[1], ...characters[character][1], 0],
						[...current[2], ...characters[character][2], 0],
						[...current[3], ...characters[character][3], 0],
						[...current[4], ...characters[character][4], 0]
				  ]
				: current,
		new Array(5).fill([])
	);

	let weight = 1;
	let gap = 200;
	let steps = 5;

	let animatedTitleCharacters = titleCharacters;

	onMount(() => {
		let timeout = setInterval(() => {
			animatedTitleCharacters = titleCharacters.map((row) =>
				row.map((active) => Math.round(active * (1 - weight) + Math.random() * weight))
			);
			weight -= 1 / steps;

			if (weight <= 0) clearInterval(timeout);
		}, gap);

		return () => {
			return clearInterval(timeout);
		};
	});
</script>

<div class="background">
	<div
		class="dots"
		style:--row-count={rowCountLeading + 5 + rowCountFollowing}
		style:--row-size="{rowSize}px"
	>
		{#each new Array(rowCountLeading - 1) as _}
			<Row {rowSize} />
		{/each}
		<div class="title-parent">
			<span class="title">[{title.toUpperCase()}]</span>
			<Row {rowSize} />
		</div>
		{#each animatedTitleCharacters as mask}
			<Row {rowSize} {mask} />
		{/each}
		{#each new Array(rowCountFollowing) as _}
			<Row {rowSize} />
		{/each}
	</div>
	<!-- <h1><slot /></h1> -->
</div>

<!-- <div class="line" /> -->
<style lang="scss">
	@use '$lib/common/styles/styles' as styles;

	.background {
		background: var(--gray1);
		width: 100%;
		overflow: hidden;
	}

	.dots {
		display: grid;
		grid-template-rows: repeat(var(--row-count), var(--row-size));
		max-width: 1024px;
		width: 100%;
		margin: 0 auto;
		padding: 0 styles.$padding-x;
	}

	.title-parent {
		position: relative;

		.title {
			position: absolute;
			bottom: 16px;
			color: var(--cyber-blue-4);
			font-size: 12px;
		}
	}
</style>
