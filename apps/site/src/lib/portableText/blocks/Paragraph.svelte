<script lang="ts">
	import Block from '../Block.svelte';
</script>

<Block>
	<p><slot /></p>
</Block>

<style lang="scss">
	p {
		margin: 1.5rem 0;
		font-family: Inter, sans-serif;
		font-size: 16px;
		letter-spacing: -0.011em;
		line-height: 27px;
	}
</style>
