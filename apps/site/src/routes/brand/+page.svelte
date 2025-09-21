<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import { FileDown, Frame, Palette } from 'lucide-svelte';
	import Steps from './Steps.svelte';
	import logoColor from './logo-color.svg';
	import logoMonochrome from './logo-monochrome.svg';
	import logoColorPng from './logo-color.png';
	import logoMonochromePng from './logo-monochrome.png';
</script>

<svelte:head>
	<title>Brand — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="Brand" />
	<main>
		<div class="mb-16 text">
			<Steps />
		</div>
		<div class="grid my-24 items-start gap-y-15 lg:grid-cols-16">
			<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
				<Palette size={18} />
				<h2 class="type-label font-550">Colors</h2>
			</div>
			<div class="h-sm flex flex-col gap-2 type-label lg:col-start-5 lg:col-end-15 sm:flex-row">
				<div
					class="h-full w-full flex flex-col justify-end rounded-sm bg-blue-9 p-3 text-graydark-12"
				>
					<span>Blue</span>
					<span>#2975BA</span>
				</div>
				<div
					class="h-full w-full flex flex-col justify-end rounded-sm bg-[#33B6FB] p-3 text-gray-12"
				>
					<span>Light Blue</span>
					<span>#33B6FB</span>
				</div>
			</div>
		</div>
		<div class="grid my-24 items-start gap-y-15 lg:grid-cols-16">
			<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
				<Frame size={18} />
				<h2 class="type-label font-550">Logos</h2>
			</div>
			<div class="flex flex-col gap-2 type-label lg:col-start-5 lg:col-end-15 sm:flex-row">
				<div class="w-full overflow-hidden rounded-sm background-2">
					<img class="mx-auto block w-30 p-6" alt="cyber uci logo color" src={logoColor} />
					<div class="flex">
						<a
							class="flex flex-1 items-center justify-center gap-2 p-3 decoration-none active:background-4 hover:background-3 text"
							href={logoColor}
							download="cyber_uci_logo_color.svg"
						>
							<FileDown size={18} />
							SVG
						</a>
						<a
							class="flex flex-1 items-center justify-center gap-2 p-3 decoration-none active:background-4 hover:background-3 text"
							href={logoColorPng}
							download="cyber_uci_logo_color.png"
						>
							<FileDown size={18} />
							PNG
						</a>
					</div>
				</div>
				<div class="w-full overflow-hidden rounded-sm background-2">
					<img class="mx-auto block w-30 p-6" alt="cyber uci logo color" src={logoMonochrome} />
					<div class="flex">
						<a
							class="flex flex-1 items-center justify-center gap-2 p-3 decoration-none active:background-4 hover:background-3 text"
							href={logoMonochrome}
							download="cyber_uci_logo_monochrome.svg"
						>
							<FileDown size={18} />
							SVG
						</a>
						<a
							class="flex flex-1 items-center justify-center gap-2 p-3 decoration-none active:background-4 hover:background-3 text"
							href={logoMonochromePng}
							download="cyber_uci_logo_monochrome.png"
						>
							<FileDown size={18} />
							PNG
						</a>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
