<script lang="ts">
	import type { ComponentType } from 'svelte';

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
</a>

<style lang="scss">
	.cta-button {
		all: unset;
		cursor: pointer;
		width: 192px;
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

		&:hover {
			color: #202020;
			background-color: rgba(255, 255, 255, 0.93);
		}
	}

	.label {
		font-feature-settings: 'ss05' on;
		font-family: CommitMonoV142;
		font-size: 14px;
		font-weight: 400;
		line-height: 1;
	}
</style>
