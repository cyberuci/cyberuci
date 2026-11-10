<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import Project from './Project.svelte';
	import { browser } from '$app/env';
	import { BadgeQuestionMark, HardDrive, Server, Users } from 'lucide-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	function handleSplineLoad(e: { currentTarget: unknown; detail?: { app?: unknown } }) {
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
		const visit = (obj: unknown) => {
			if (!obj) return;
			if (obj.name === 'management server' && obj.states) {
				for (const state of Object.values(obj.states) as { position?: number[] }[]) {
					if (state.position) state.position[0] += labelShiftX;
				}
			}
			for (const child of obj.children ?? []) visit(child);
		};
		visit(spline._scene);

		spline.findObjectByName('PVE2')?.emitEvent('mouseDown');
	}
</script>

<svelte:head>
	<title>{data.title} — Cyber @ UCI</title>
	<script
		type="module"
		src="https://cdn.spline.design/@splinetool/viewer@2.0.79/build/spline-viewer.js"
	></script>
</svelte:head>

<div class="my-40 space-x">
	<Title title={data.title} />

	<div class="pd-1 overflow-hidden border border-[#858585] rounded-lg border-solid bg-[#000]">
		<p class="px-4 type-label text-2">{data.terminalLabel}</p>
		<hr class="m-0 border-0 border-t border-[#3d3d3d] border-solid" />

		<div class="spline-container">
			{#if browser}
				<spline-viewer url={data.splineUrl} on:load-complete={handleSplineLoad}></spline-viewer>
			{:else}
				<div class="loading-placeholder type-label">Loading 3D Scene...</div>
			{/if}
		</div>
	</div>

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<HardDrive size={18} />
			<h2 class="m-0 type-label font-550">{data.rackHeading}</h2>
		</div>
		<ul
			class="grid m-0 list-none gap-3 p-0 lg:col-start-5 lg:col-end-17 lg:grid-cols-4 sm:grid-cols-2"
		>
			{#each data.rack as role (role._key)}
				<li class="rounded-lg background-2 px-4 py-4">
					<p class="m-0 type-label text-blue-11 dark:text-bluedark-11">[{role.tag}]</p>
					<p class="mb-0 mt-2 type-body-1 text-2">{role.description}</p>
				</li>
			{/each}
		</ul>
	</div>

	<div class="grid mb-24 mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<BadgeQuestionMark size={18} />
			<h2 class="m-0 type-label font-550">{data.aboutHeading}</h2>
		</div>
		<div class="type-body-1 text-2 lg:col-start-5 lg:col-end-17 space-y-4">
			<p class="m-0">{data.aboutIntro}</p>
			<ul>
				{#each data.responsibilities as responsibility (responsibility)}
					<li>{responsibility}</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="grid mb-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<Users size={18} />
			<h2 class="m-0 type-label font-550">{data.teamsHeading}</h2>
		</div>
		<div class="grid grid-cols-1 gap-3 lg:col-start-5 lg:col-end-17 md:grid-cols-2">
			{#each data.teams as team (team._key)}
				<article class="rounded-lg background-2 px-4 py-4">
					<b><span class="type-label text-blue-11 dark:text-bluedark-11">{team.title}</span></b>
					<p class="mb-0 mt-1 type-body-1 text-2">{team.description}</p>
				</article>
			{/each}
		</div>
	</div>

	<div class="grid items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<Server size={18} />
			<h2 class="m-0 type-label font-550">{data.projectsHeading}</h2>
		</div>
		<div class="lg:col-start-5 lg:col-end-17">
			<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
				{#each data.projects as project (project._key)}
					<Project
						year={project.year}
						title={project.title}
						description={project.description}
						image={project.image}
						alt={project.alt}
					/>
				{/each}
			</div>
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
