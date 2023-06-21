<script lang="ts">
	import events from './events.jpg';
</script>

<div class="hexagons">
	<div class="one">
		<img src={events} />
	</div>
	<div class="two">
		<img src={events} />
	</div>
	<div class="three">
		<img src={events} />
	</div>
</div>

<style lang="scss">
	img {
		object-fit: cover;
		mask-image: url('hexagon.svg');
		mask-size: calc(100% - 15px);
		mask-repeat: no-repeat;
		mask-position: center;
	}

	.hexagons {
		display: grid;
		grid-template-columns: max-content max-content;
		justify-items: end;
		padding: 48px 0;
	}

	.one {
		$size: 500px;
		width: calc($size / 2);
		height: calc(cos(30deg) * $size);
		margin-left: var(--padding-x);
		display: grid;
		place-content: center;
		grid-column: 1;
		grid-row: 1;

		img {
			width: $size;
			height: $size;
		}
	}

	.two {
		$size: 500px;
		width: calc($size / 2);
		height: calc(cos(30deg) * $size);
		display: grid;
		place-content: center;
		margin-top: calc(cos(30deg) * $size * 0.5);
		margin-left: calc($size / 4);
		grid-column: 2;
		grid-row: 1 / span 2;

		img {
			width: $size;
			height: $size;
		}
	}

	.three {
		$size: 350px;
		width: calc($size / 2);
		height: calc(cos(30deg) * $size);
		margin-left: var(--padding-x);
		display: grid;
		place-content: center;

		img {
			width: $size;
			height: $size;
		}
	}
</style>
