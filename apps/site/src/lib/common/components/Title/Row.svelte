<script lang="ts">
	import Dot from './Dot.svelte';

	export let rowSize: number;
	export let mask: number[] = [];
</script>

<div class="row-parent" style:--row-size="{rowSize}px">
	<div class="row pre">
		{#each new Array(50) as _}
			<Dot />
		{/each}
	</div>
	<div class="row main">
		{#each mask as active}
			<Dot {active} />
		{/each}
		{#each new Array(150) as _}
			<Dot />
		{/each}
	</div>
</div>

<style lang="scss">
	.row-parent {
		position: relative;

		.row {
			height: 100%;
			width: 100vw;
			overflow: visible;
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

		.pre {
			position: absolute;
			transform: translateX(calc(-50 * var(--row-size)));
		}
	}
</style>
