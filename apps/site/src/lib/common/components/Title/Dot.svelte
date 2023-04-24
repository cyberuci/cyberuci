<script lang="ts">
	export let active = 0;
</script>

<div class="dot-parent">
	<div class="dot" class:active />
</div>

<style lang="scss">
	$dot-size: 2.5px;
	$dot-size-active: 8px;

	.dot-parent {
		flex-shrink: 0;
		width: var(--row-size);

		.dot {
			background: var(--gray2);
			width: $dot-size;
			height: $dot-size;
			border-radius: 1000px;

			&.active {
				background: var(--cyber-blue-5);
				width: $dot-size-active;
				height: $dot-size-active;
			}
		}
	}
</style>
