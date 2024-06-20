<script lang="ts">
	export let links: {
		href: string;
		label: string;
	}[];
</script>

<nav>
	{#each links as { href, label }}
		<a {href}>{label}</a>
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
		align-items: baseline;
		position: relative;
		padding: 2px;
		border-radius: 1000px;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background-color: var(--gray2);
			border-radius: 1000px;
			opacity: 0.65;
			z-index: -1;
		}

		& a {
			padding: 12px;
			border-radius: 1000px;
			color: var(--gray12);
			font-size: 0.875rem;
			font-weight: 400;
			text-decoration: none;
			gap: 2px;

			&::before {
				content: '~ $ ';
				color: var(--gray11);
			}

			&:hover {
				background-color: var(--gray4);
			}

			&:active {
				background-color: var(--gray5);
			}
		}
	}
</style>
