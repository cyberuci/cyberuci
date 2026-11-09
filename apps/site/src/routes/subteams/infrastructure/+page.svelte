<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import Project from './Project.svelte';
	import { browser } from '$app/environment';
	import { BadgeQuestionMark, HardDrive, Server, Users } from 'lucide-svelte';

	const rack = [
		{
			tag: 'Management',
			description:
				'Core services for the servers in the rack, including remote access used to troubleshoot and update them.'
		},
		{
			tag: 'Virtualization',
			description:
				'Practice environments for competition teams and hands-on demos during workshops.'
		},
		{
			tag: 'Storage',
			description: 'Shared storage for club services and virtual machines.'
		},
		{
			tag: 'Firewall',
			description: 'The network edge that keeps lab traffic organized.'
		}
	];

	const teams = [
		{
			tag: 'Traditional',
			title: 'Traditional Infra',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
		},
		{
			tag: 'SWE',
			title: 'SWE Infra',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
		}
	];

	const projects: { year: string; title: string; description: string; image?: string }[] = [
		{
			year: 'timespan',
			title: 'Easy VM',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			year: 'timespan',
			title: 'Place holder 2',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			year: 'timespan',
			title: 'Place holder 3',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		}
	];

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
	<title>Infrastructure — Cyber @ UCI</title>
	<script
		type="module"
		src="https://cdn.spline.design/@splinetool/viewer@2.0.79/build/spline-viewer.js"
	></script>
</svelte:head>

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
				<div class="loading-placeholder type-label">Loading 3D Scene...</div>
			{/if}
		</div>
	</div>

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<HardDrive size={18} />
			<h2 class="m-0 type-label font-550">THE RACK</h2>
		</div>
		<ul
			class="grid m-0 list-none gap-3 p-0 lg:col-start-5 lg:col-end-17 lg:grid-cols-4 sm:grid-cols-2"
		>
			{#each rack as role (role.tag)}
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
			<h2 class="m-0 type-label font-550">ABOUT US</h2>
		</div>
		<div class="type-body-1 text-2 lg:col-start-5 lg:col-end-17 space-y-4">
			<p class="m-0">
				The Infrastructure Team is responsible for maintaining, troubleshooting, and improving our
				on-premise server rack in the Cyber@UCI lab space. Some responsibilities include:
			</p>
			<ul>
				<li>Ensuring that our services are up-to-date</li>
				<li>Troubleshooting any issues that users are facing</li>
				<li>Supporting competition teams in creating mock environments</li>
				<li>Creating internal tools</li>
				<li>Improving the overall structure and user experience of our server rack</li>
			</ul>
		</div>
	</div>

	<div class="grid mb-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<Users size={18} />
			<h2 class="m-0 type-label font-550">TEAMS</h2>
		</div>
		<div class="grid grid-cols-1 gap-3 lg:col-start-5 lg:col-end-17 md:grid-cols-2">
			{#each teams as team (team.tag)}
				<article class="rounded-lg background-2 px-4 py-4">
					<span class="type-label text-blue-11 dark:text-bluedark-11">[{team.tag}]</span>
					<p class="mb-0 mt-2 type-body-1 font-600">{team.title}</p>
					<p class="mb-0 mt-1 type-body-1 text-2">{team.description}</p>
				</article>
			{/each}
		</div>
	</div>

	<div class="grid items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<Server size={18} />
			<h2 class="m-0 type-label font-550">PROJECTS</h2>
		</div>
		<div class="lg:col-start-5 lg:col-end-17">
			<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
				{#each projects as project (project.title)}
					<Project
						year={project.year}
						title={project.title}
						description={project.description}
						image={project.image}
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
