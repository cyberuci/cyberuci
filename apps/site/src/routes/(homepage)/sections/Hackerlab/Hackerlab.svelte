<script lang="ts">
	import Carousel from './Carousel.svelte';
</script>

<div class="hackerlab">
	<h2 class="heading"><span class="rainbow">//////////////</span> Hackerlab</h2>
	<Carousel />
</div>

<style lang="scss">
	.hackerlab {
		margin: 160px 16px 16px 16px;
	}

	.heading {
		margin: 0;
		font-feature-settings:
			'dlig' on,
			'ss05' on;
		font-family: CommitMonoV142;
		font-size: 16px;
		font-weight: 400;
		line-height: 145%;

		.rainbow {
			background: linear-gradient(
				90deg,
				#f00,
				#ff8000,
				#ff0,
				#80ff00,
				#0f0,
				#00ff7f,
				#0ff,
				#0080ff,
				#4a4a95,
				#602c95,
				#a01aa0,
				#c0116a,
				#f00
			);
			background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}
</style>
