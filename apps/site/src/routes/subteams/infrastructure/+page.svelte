<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import { browser } from '$app/environment';
</script>

<svelte:head>
	<script
		type="module"
		src="https://unpkg.com/@splinetool/viewer@1.12.98/build/spline-viewer.js"
	></script>
</svelte:head>

<div class="my-40 space-x">
	<Title title="Subteams" />

	<div class="spline-container">
		{#if browser}
			<spline-viewer url="https://prod.spline.design/lHDnJG47k8GgwOOQ/scene.splinecode"
			></spline-viewer>
		{:else}
			<div class="loading-placeholder">Loading 3D Scene...</div>
		{/if}
	</div>
</div>

<style>
	.spline-container,
	.loading-placeholder {
		width: 100%;
		height: 650px;
	}
	.loading-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #111;
		color: #fff;
	}
	spline-viewer {
		width: 100%;
		height: 100%;
	}
</style>
