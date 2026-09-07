<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import GraphicsEditor from './GraphicsEditor.svelte';
	import logoImg from './logo.png';
	import stickerPatch from './sticker2.png';
	import stickerSecure from './general_design3.png';
	import stickerLaptop from './anteater_computer_fixed.png';

	import { Palette, Frame, FileBox, BadgeQuestionMark } from 'lucide-svelte';
	import Steps from './Steps.svelte';

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
		brand systems that make Cyber@UCI unmistakable, on campus and online.
	</p>

	<GraphicsEditor />

	<div class="grid mb-15 mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<BadgeQuestionMark size={18} />
			<h2 class="type-label font-550">WHAT WE DO</h2>
		</div>
		<div class="flex flex-col gap-6 lg:col-start-5 lg:col-end-17 md:flex-row">
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

	<div class="grid items-start gap-y-15 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<Frame size={18} />
			<h2 class="type-label font-550">LOGO</h2>
		</div>
		<div
			class="aspect-square h-48 w-full flex flex-col gap-2 type-label lg:col-start-5 lg:col-end-17 sm:flex-row"
		>
			<div class="mb-16 w-full text">
				<Steps />
			</div>
		</div>
	</div>

	<div class="grid my-24 items-start gap-y-15 pt-15 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<Palette size={18} />
			<h2 class="type-label font-550">COLORS</h2>
		</div>
		<div
			class="aspect-square h-48 w-full flex flex-col gap-2 type-label lg:col-start-5 lg:col-end-17 sm:flex-row"
		>
			<div
				class="h-full w-full flex flex-col justify-end rounded-md bg-[#33488e] p-3 text-graydark-12"
			>
				<span>Deep Blue</span>
				<span>#33488e</span>
			</div>
			<div
				class="h-full w-full flex flex-col justify-end rounded-md bg-blue-9 p-3 text-graydark-12"
			>
				<span>Blue</span>
				<span>#2975ba</span>
			</div>
			<div class="h-full w-full flex flex-col justify-end rounded-md bg-[#31b7fb] p-3 text-gray-12">
				<span>Light Blue</span>
				<span>#31b7fb</span>
			</div>
			<div class="h-full w-full flex flex-col justify-end rounded-md bg-[#f3f3f3] p-3 text-gray-12">
				<span>Gray</span>
				<span>#f3f3f3</span>
			</div>
		</div>
	</div>

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<FileBox size={18} />
			<h2 class="type-label font-550">ASSETS</h2>
		</div>
		<div class="grid gap-3 lg:col-start-5 lg:col-end-17 sm:grid-cols-2">
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
