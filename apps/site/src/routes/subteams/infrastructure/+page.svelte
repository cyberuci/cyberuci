<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import { browser } from '$app/environment';

	function handleSplineLoad(e) {
		const viewer = e.currentTarget;
		const logo = viewer?.shadowRoot?.querySelector('#logo');
		if (logo) logo.style.display = 'none';

		const splineApp = viewer?._spline;
		const pipeline = splineApp?._renderer?.pipeline;
		const texture = pipeline?.watermarkTexture;
		const image = texture?.image;
		if (pipeline && image?.naturalWidth) {
			image.width = Math.round(image.naturalWidth * 0.5);
			image.height = Math.round(image.naturalHeight * 0.5);
			pipeline.setWatermark(texture);
			splineApp._requestRenderAutoMode?.();
		}

		const spline = splineApp ?? e.detail?.app;
		if (!spline) return;

		const camera = spline.findObjectByName('personal camera');
		if (camera) {
			camera.zoom = 1.3;
		}

		const mainScene = spline.findObjectByName('Scene 1');
		if (mainScene) {
			mainScene.rotation.y = 30 * (Math.PI / 180);
		}

		// The label is authored just behind the extended shelf. Nudge its
		// visible state so the paragraph clears the server when it slides out.
		const labelShiftX = 150;
		const visit = (obj) => {
			if (!obj) return;
			if (obj.name === 'management server' && obj.states) {
				for (const state of Object.values(obj.states)) {
					if (Array.isArray(state?.position)) state.position[0] += labelShiftX;
				}
			}
			for (const child of obj.children ?? []) visit(child);
		};
		visit(spline._scene);

		spline.findObjectByName('PVE2')?.emitEvent('mouseDown');
	}
</script>

<svelte:head>
	<script
		type="module"
		src="https://cdn.spline.design/@splinetool/viewer@2.0.79/build/spline-viewer.js"
	></script>
</svelte:head>
<!-- 
<div class="my-40 space-x">
	<Title title="Infrastructure" />
</div> -->

<div class="my-40 space-x">
	<Title title="Infrastructure" />

	<div class="pd-1 overflow-hidden border border-[#858585] rounded-lg border-solid bg-[#000]">
		<p class="px-4 type-label text-2">infrastructure@cyberuci</p>
		<hr class="m-0 border-0 border-t border-[#3d3d3d] border-solid" />

		<div class="spline-container">
			{#if browser}
				<spline-viewer
					url="https://prod.spline.design/gxk0gIYwe3OIqjNM/scene.splinecode"
					on:load-complete={handleSplineLoad}
				></spline-viewer>
			{:else}
				<div class="loading-placeholder">Loading 3D Scene...</div>
			{/if}
		</div>
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
