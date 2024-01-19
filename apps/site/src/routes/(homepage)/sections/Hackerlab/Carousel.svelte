<script lang="ts">
	// TODO: replace external drag scroll dependency
	import 'scroll-snap-slider/dist/scroll-snap-slider.css';

	import { ScrollSnapSlider, ScrollSnapDraggable } from 'scroll-snap-slider';
	import { onMount } from 'svelte';

	let content: HTMLUListElement;

	onMount(() => {
		const slider = new ScrollSnapSlider({
			element: content
		}).with([new ScrollSnapDraggable(50)]);

		return () => {
			slider.destroy();
		};
	});
</script>

<ul bind:this={content} class="carousel scroll-snap-slider">
	<li class="item">
		<enhanced:img class="image" src="./image-1.jpg" alt="" />
	</li>
	<li class="item">
		<enhanced:img class="image" src="./image-1.jpg" alt="" />
	</li>
</ul>

<style lang="scss">
	.carousel {
		margin: 16px 0;
		padding: 0;
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		overscroll-behavior-x: none;
		overscroll-behavior-y: auto;
		border-radius: 48px;
		list-style-type: none;
		display: flex;
		gap: 16px;
	}

	.item {
		width: 100%;
		height: 800px;
		flex-shrink: 0;
		scroll-snap-stop: always;
		scroll-snap-align: center;
	}

	.image {
		width: 100%;
		height: 100%;
		border-radius: 48px;
		pointer-events: none;
	}
</style>
