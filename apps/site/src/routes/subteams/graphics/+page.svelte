<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import GraphicsEditor from './GraphicsEditor.svelte';
	import logoImg from './logo.png';
	import stickerPatch from './sticker2.png';
	import stickerSecure from './general_design3.png';
	import stickerLaptop from './anteater_computer_fixed.png';

	const assets = [
		{ name: 'Cyber@UCI Logo', src: logoImg, file: 'logo.png' },
		{ name: 'Secure Anteater', src: stickerSecure, file: 'general_design3.png' },
		{ name: 'Patch Delivery', src: stickerPatch, file: 'sticker2.png' },
		{ name: 'Laptop Anteater', src: stickerLaptop, file: 'anteater_computer_fixed.png' }
	];
</script>

<svelte:head>
	<title>Graphics — Cyber @ UCI</title>
</svelte:head>

<!-- eslint-disable svelte/no-navigation-without-resolve -->

<div class="my-40 space-x">
	<Title title="Graphics" />

	<p class="mb-16 max-w-prose type-body-2 text-2">
		Our visual identity in motion. The Graphics team designs stickers, merch, social assets, and
		brand systems that make Cyber@UCI unmistakable — on campus and online.
	</p>

	<GraphicsEditor />

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="lg:col-start-1 lg:col-end-5">
			<h2 class="type-label font-550">
				<span class="text-[#00b2ff]">[?]</span> What We Do
			</h2>
		</div>
		<div class="flex flex-col gap-6 lg:col-start-5 lg:col-end-20 md:flex-row">
			<div class="flex-1 type-body-2 text-2 space-y-4">
				<p class="m-0">
					Graphics shapes how Cyber@UCI shows up everywhere people meet us — flyers, stickers,
					social posts, merch, and event visuals. We keep the brand consistent while giving each
					campaign its own personality.
				</p>
				<p class="m-0">
					From concept sketches to final assets, the team iterates with outreach and other subteams
					so every design actually gets used — and looks like it belongs here.
				</p>
			</div>
			<div
				class="w-full flex shrink-0 items-center justify-center rounded-md background-2 px-4 text-center type-label text-2 lg:w-70 md:w-70"
			>
				T-shirt design / team photo
			</div>
		</div>
	</div>

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="lg:col-start-1 lg:col-end-5">
			<h2 class="type-label font-550">
				<span class="text-[#00b2ff]">[?]</span> Assets
			</h2>
		</div>
		<div class="grid gap-3 lg:col-start-5 lg:col-end-20 sm:grid-cols-2">
			{#each assets as asset (asset.file)}
				<a
					class="group overflow-hidden rounded-md background-2 decoration-none transition-colors hover:background-3"
					href={asset.src}
					download={asset.file}
				>
					<div class="h-40 flex items-center justify-center bg-[#0a0a0a] p-4">
						<img
							src={asset.src}
							alt={asset.name}
							class="asset-thumb max-h-full max-w-full object-contain"
						/>
					</div>
					<div class="flex items-center justify-between gap-2 px-3 py-2 type-label text">
						<span>{asset.name}</span>
						<span class="text-2 group-hover:text-[#00b2ff]">PNG</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.asset-thumb {
		mix-blend-mode: lighten;
	}
</style>
