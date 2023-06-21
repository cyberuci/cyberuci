<script lang="ts">
	export let href: string;
</script>

<a class="link" {href}>
	<div class="dot" />
	<span class="text"><slot /></span>
</a>

<style lang="scss">
	@keyframes flash {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		40% {
			opacity: 0;
		}
		60% {
			opacity: 1;
		}
		80% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.link {
		text-decoration: none;
		position: relative;
		display: flex;
		align-items: center;
		padding: 6px 8px 6px 20px;
		border-radius: 4px;
		margin-left: -20px;

		&:hover {
			background: var(--cyber-blue-2);

			.dot {
				animation: 450ms forwards flash;
			}
		}
	}

	.dot {
		pointer-events: none;
		position: absolute;
		left: 6px;
		margin-top: 1px;
		width: 8px;
		height: 8px;
		border-radius: 1000px;
		opacity: 0;
		background: var(--cyber-blue-4);
	}

	.text {
		color: #fff;
	}
</style>
