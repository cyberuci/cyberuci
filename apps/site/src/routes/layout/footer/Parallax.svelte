<script lang="ts">
	import debounce from 'debounce';

	let wrapper: HTMLDivElement;
	let innerHeight: number;
	let top: number;
	$: offset = (innerHeight - top) * 0.1;

	// TODO: Only calculate when footer is in view.
	const calculateTop = debounce(() => {
		top = wrapper.getBoundingClientRect().top;
	}, 5);
</script>

<svelte:window bind:innerHeight on:resize={calculateTop} on:scroll={calculateTop} />

<div id="wrapper">
	<div id="transform" style:transform="translateY({offset}%)">
		<slot />
	</div>
	<div bind:this={wrapper} />
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
