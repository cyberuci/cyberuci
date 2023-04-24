<script lang="ts">
	import { onMount } from 'svelte';

	let wrapper: HTMLDivElement;
	let inView = false;
	let innerHeight: number;
	let bottom: number;
	$: offset = (innerHeight - bottom) * 0.1;

	const calculate = () => {
		if (!inView) return;
		bottom = wrapper.getBoundingClientRect().bottom;
	};

	onMount(() => {
		const intersectionObserver = new IntersectionObserver((entries) => {
			inView = entries[0].intersectionRatio > 0 ? true : false;
		});

		intersectionObserver.observe(wrapper);
	});
</script>

<svelte:window
	bind:innerHeight
	on:resize={() => window.requestAnimationFrame(calculate)}
	on:scroll={() => window.requestAnimationFrame(calculate)}
/>

<div id="wrapper" bind:this={wrapper}>
	<div id="transform" style:transform="translateY({offset}%)">
		<slot />
	</div>
</div>

<style lang="scss">
	#wrapper {
		background: var(--cyber-blue-1);
		overflow: hidden;
		margin: 48px 0 0 0;

		#transform {
			transition: transform 5ms;
		}
	}
</style>
