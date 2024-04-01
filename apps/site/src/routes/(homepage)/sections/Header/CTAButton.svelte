<script lang="ts">
	import type { ComponentType } from 'svelte';

	import { ArrowRight } from 'lucide-svelte';

	export let href: string;
	export let icon: ComponentType | undefined = undefined;
	export let svgPath: string | undefined = undefined;
	export let label: string;
</script>

<a class="cta-button" {href}>
	{#if icon}
		<svelte:component this={icon} size={16} />
	{:else if svgPath}
		<svg
			width={16}
			height={16}
			role="img"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
		>
			<path d={svgPath} />
		</svg>
	{:else}
		<div />
	{/if}

	<span class="label">{label}</span>

	<div class="arrow">
		<ArrowRight size={16} />
	</div>
</a>

<style lang="scss">
	.cta-button {
		all: unset;
		position: relative;
		cursor: pointer;
		box-sizing: border-box;
		width: 100%;
		height: 96px;
		padding: 12px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 2px;
		color: #b4b4b4;
		background-color: rgba(255, 255, 255, 0.07);
		transition:
			color 150ms ease-out,
			background-color 150ms ease-out;

		&:focus-visible,
		&:hover {
			color: #202020;
			background-color: rgba(255, 255, 255, 0.93);

			.arrow {
				transform: translateX(0);
				opacity: 1;
			}
		}

		&:focus-visible {
			outline: 2px solid var(--cyber-blue-3);
			outline-offset: 2px;
		}
	}

	.label {
		font-feature-settings: 'ss05' on;
		font-family: CommitMono;
		font-size: 14px;
		font-weight: 400;
		line-height: 1;
	}

	.arrow {
		position: absolute;
		right: 0;
		bottom: 0;
		padding: 12px;
		line-height: 0;
		transform: translateX(-16px);
		opacity: 0;
		transition:
			transform 150ms ease-out,
			opacity 150ms ease-out;
	}
</style>
