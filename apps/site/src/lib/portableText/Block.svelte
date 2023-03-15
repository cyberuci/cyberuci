<script lang="ts">
	export let padding = true;
	export let multiplier = 1;

	const width = 60;
</script>

<!-- Using parent div instead of padding to ensure content remains 60ch wide. -->
<div class:padding>
	<div class="content" style:max-width={width * multiplier + 'ch'}>
		<slot />
	</div>
</div>

<style lang="scss">
	.padding {
		margin: 0 16px;
	}

	.content {
		margin: 0 auto;
		font-size: 16px;
		letter-spacing: -0.011em;
	}
</style>
