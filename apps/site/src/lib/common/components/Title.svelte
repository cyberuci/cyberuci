<div class="grid">
	<h1><slot /></h1>
</div>
<div class="line" />

<style lang="scss">
	@use '../styles/styles' as styles;

	.grid {
		@include styles.grid;
	}

	h1 {
		margin: 96px 0 56px 0;
		font-family: 'Inter';
		font-size: 40px;
		letter-spacing: -0.022em;
		line-height: 56px;
		font-weight: 500;
		text-align: center;

		grid-column: 1 / -1;
		@media (min-width: styles.$breakpoint-1) {
			grid-column: 2 / 5;
		}
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: var(--gray7);
	}
</style>
