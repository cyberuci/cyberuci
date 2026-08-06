<script lang="ts">
	import { Eye, EyeOff, Lock } from 'lucide-svelte';
	import logoImg from './logo.png';
	import stickerPatch from './sticker2.png';
	import stickerSecure from './general_design3.png';
	import stickerLaptop from './anteater_computer_fixed.png';

	type LayerId = 'text' | 'logo' | 'patch' | 'secure' | 'laptop';

	type Coords = {
		x: number;
		y: number;
	};

	type Dimensions = {
		w: number;
		h: number;
	};

	type Layer = {
		id: LayerId;
		name: string;
		locked?: boolean;
		visible: boolean;
		coords: Coords;
		dimensions: Dimensions;
		fill: string;
		stroke: string;
		fontSize: number;
		kind: 'text' | 'image';
		src?: string;
	};

	const ACCENT = '#00b2ff';
	const STROKE = '#f90404';

	let layers = $state<Layer[]>([
		{
			id: 'text',
			name: 'Cyber@UCI',
			locked: true,
			visible: true,
			coords: { x: 300, y: 28 },
			dimensions: { w: 280, h: 40 },
			fill: ACCENT,
			stroke: STROKE,
			fontSize: 28,
			kind: 'text'
		},
		{
			id: 'logo',
			name: 'Cyber@UCI Logo',
			visible: true,
			coords: { x: 320, y: 210 },
			dimensions: { w: 140, h: 130 },
			fill: ACCENT,
			stroke: STROKE,
			fontSize: 16,
			kind: 'image',
			src: logoImg
		},
		{
			id: 'patch',
			name: 'Secure Anteater',
			visible: true,
			coords: { x: 24, y: 100 },
			dimensions: { w: 140, h: 190 },
			fill: ACCENT,
			stroke: STROKE,
			fontSize: 16,
			kind: 'image',
			src: stickerPatch
		},
		{
			id: 'secure',
			name: 'Shield Anteater',
			visible: true,
			coords: { x: 270, y: 55 },
			dimensions: { w: 220, h: 195 },
			fill: ACCENT,
			stroke: STROKE,
			fontSize: 16,
			kind: 'image',
			src: stickerSecure
		},
		{
			id: 'laptop',
			name: 'Laptop Anteater',
			visible: true,
			coords: { x: 540, y: 95 },
			dimensions: { w: 190, h: 145 },
			fill: ACCENT,
			stroke: STROKE,
			fontSize: 16,
			kind: 'image',
			src: stickerLaptop
		}
	]);

	let selectedId = $state<LayerId | null>(null);
	let dragging = $state(false);
	let dragOffset = $state({ x: 0, y: 0 });
	let canvasEl = $state<HTMLDivElement | null>(null);

	let selected = $derived(layers.find((l) => l.id === selectedId) ?? layers[1]);

	function selectLayer(id: LayerId) {
		const layer = layers.find((l) => l.id === id);
		if (!layer || !layer.visible) return;
		selectedId = id;
	}

	function toggleVisible(id: LayerId, event: MouseEvent) {
		event.stopPropagation();
		layers = layers.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l));
		if (selectedId === id && !layers.find((l) => l.id === id)?.visible) {
			const next = layers.find((l) => l.visible && l.id !== id);
			if (next) selectedId = next.id;
		}
	}

	function updateSelected(partial: Partial<Layer>) {
		layers = layers.map((l) => (l.id === selectedId ? { ...l, ...partial } : l));
	}

	function onPointerDown(id: LayerId, event: PointerEvent) {
		const layer = layers.find((l) => l.id === id);
		if (!layer || layer.locked || !layer.visible || !canvasEl) return;
		selectLayer(id);
		dragging = true;
		const rect = canvasEl.getBoundingClientRect();
		const scaleX = 780 / rect.width;
		const scaleY = 420 / rect.height;
		dragOffset = {
			x: (event.clientX - rect.left) * scaleX - layer.coords.x,
			y: (event.clientY - rect.top) * scaleY - layer.coords.y
		};
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging || !canvasEl) return;
		const layer = layers.find((l) => l.id === selectedId);
		if (!layer || layer.locked) return;
		const rect = canvasEl.getBoundingClientRect();
		const scaleX = 780 / rect.width;
		const scaleY = 420 / rect.height;
		const x = Math.round((event.clientX - rect.left) * scaleX - dragOffset.x);
		const y = Math.round((event.clientY - rect.top) * scaleY - dragOffset.y);

		updateSelected({
			coords: { x: Math.max(-40, Math.min(700, x)), y: Math.max(-20, Math.min(360, y)) }
		});
	}

	function onPointerUp() {
		dragging = false;
	}

	function hexToFilter(hex: string): string {
		// Approximate recolor for blue brand assets when fill changes
		if (hex.toLowerCase() === ACCENT.toLowerCase() || hex.toLowerCase() === '#0085ff') {
			return 'none';
		}
		return `drop-shadow(0 0 0.5px ${hex}) saturate(1.2)`;
	}
</script>

<div class="overflow-hidden border border-[#858585] rounded-lg border-solid bg-[#000]">
	<p class="type-label text-2 sm:px-4">graphics@cyberuci</p>
	<hr class="m-0 border-0 border-t border-[#3d3d3d] border-solid" />

	<div class="grid lg:grid-cols-[210px_1fr_210px]">
		<!-- Layers -->
		<aside class="border border-[#3d3d3d] border-solid p-3">
			<p class="mb-2 mt-1 type-label text-[#00b2ff]">[LAYERS]</p>
			<ul class="m-0 flex flex-col list-none gap-1 p-0">
				{#each layers as layer (layer.id)}
					<li
						class="w-full flex items-center gap-1 rounded-md py-0.5 transition-colors hover:bg-[#00b2ff]/20 {selectedId ===
						layer.id
							? 'bg-[#00b2ff]/20 text-[#00b2ff]'
							: 'hover:bg-white/5 text-2'}"
					>
						{#if layer.locked}
							<span class="flex shrink-0 px-1.5" aria-hidden="true"><Lock size={14} /></span>
						{:else}
							<button
								type="button"
								class="flex shrink-0 border-0 bg-transparent px-1.5 text-inherit"
								aria-label={layer.visible ? `Hide ${layer.name}` : `Show ${layer.name}`}
								onclick={(e) => toggleVisible(layer.id, e)}
							>
								{#if layer.visible}
									<Eye size={14} />
								{:else}
									<EyeOff size={14} />
								{/if}
							</button>
						{/if}
						<button
							type="button"
							class="min-w-0 flex-1 truncate border-0 bg-transparent py-0.3 text-left type-label text-inherit"
							onclick={() => selectLayer(layer.id)}
						>
							<span class={layer.visible ? '' : 'line-through opacity-40'}>{layer.name}</span>
						</button>
					</li>
				{/each}
			</ul>
		</aside>

		<!-- Canvas -->
		<div
			bind:this={canvasEl}
			class="canvas relative h-[280px] touch-none overflow-hidden lg:h-[500px] sm:h-[360px]"
			role="application"
			aria-label="Graphics canvas"
			onpointermove={onPointerMove}
			onpointerup={onPointerUp}
			onpointerleave={onPointerUp}
		>
			{#each layers as layer (layer.id)}
				{#if layer.visible}
					{#if layer.kind === 'text'}
						<div
							class="absolute select-none font-medium tracking-wide font-pixelify {selectedId ===
							layer.id
								? 'selected'
								: ''}"
							style:left="{layer.coords.x / 7.8}%"
							style:top="{layer.coords.y / 4.2}%"
							style:color={layer.fill}
							style:font-size="{Math.max(16, layer.fontSize * 0.9)}px"
							style:cursor={layer.locked ? 'default' : 'grab'}
							style:z-index={selectedId === layer.id ? 20 : 1}
							onpointerdown={(e) => onPointerDown(layer.id, e)}
							role="button"
							tabindex="0"
							aria-label={layer.name}
							onkeydown={(e) => e.key === 'Enter' && selectLayer(layer.id)}
						>
							{layer.name}
						</div>
					{:else}
						<button
							type="button"
							class="absolute border-0 bg-transparent p-0 {selectedId === layer.id
								? 'selected'
								: ''}"
							style:left="{layer.coords.x / 7.8}%"
							style:top="{layer.coords.y / 4.2}%"
							style:width="{layer.dimensions.w / 7.8}%"
							style:z-index={selectedId === layer.id ? 20 : 2}
							style:cursor={layer.locked
								? 'default'
								: dragging && selectedId === layer.id
									? 'grabbing'
									: 'grab'}
							style:filter={hexToFilter(layer.fill)}
							aria-label={layer.name}
							onpointerdown={(e) => onPointerDown(layer.id, e)}
						>
							<img
								src={layer.src}
								alt=""
								draggable="false"
								class="sticker pointer-events-none h-auto w-full object-contain"
							/>
						</button>
					{/if}
				{/if}
			{/each}
		</div>

		<!-- Design panel -->
		<aside class="border-t border-[#3d3d3d] border-solid p-4 lg:border-l lg:border-t-0 sm:p-5">
			<p class="mb-3 type-label text-[#00b2ff]">[DESIGN]</p>
			<div class="flex flex-col gap-3 type-label text-2">
				<div>
					<p class="m-0 mb-1.5 opacity-70">Position</p>
					<div class="grid grid-cols-2 gap-2">
						<label class="flex items-center gap-1 rounded-md background-3 px-2 py-1.5">
							<span>X</span>
							<input
								class="field"
								type="number"
								value={selected.coords.x}
								disabled={selected.locked}
								oninput={(e) =>
									updateSelected({
										coords: { x: Number(e.currentTarget.value), y: selected.coords.y }
									})}
							/>
						</label>
						<label class="flex items-center gap-1 rounded-md background-3 px-2 py-1.5">
							<span>Y</span>
							<input
								class="field"
								type="number"
								value={selected.coords.y}
								disabled={selected.locked}
								oninput={(e) =>
									updateSelected({
										coords: { x: selected.coords.x, y: Number(e.currentTarget.value) }
									})}
							/>
						</label>
					</div>
				</div>

				<div>
					<p class="m-0 mb-1.5 opacity-70">Dimensions</p>
					<div class="grid grid-cols-2 gap-2">
						<label class="flex items-center gap-1 rounded-md background-3 px-2 py-1.5">
							<span>W</span>
							<input
								class="field"
								type="number"
								value={selected.dimensions.w}
								disabled={selected.locked || selected.kind === 'text'}
								oninput={(e) =>
									updateSelected({
										dimensions: { w: Number(e.currentTarget.value), h: selected.dimensions.h }
									})}
							/>
						</label>
						<label class="flex items-center gap-1 rounded-md background-3 px-2 py-1.5">
							<span>H</span>
							<input
								class="field"
								type="number"
								value={selected.dimensions.h}
								disabled={selected.locked || selected.kind === 'text'}
								oninput={(e) =>
									updateSelected({
										dimensions: { w: selected.dimensions.h, h: Number(e.currentTarget.value) }
									})}
							/>
						</label>
					</div>
				</div>

				<div>
					<p class="m-0 mb-1.5 opacity-70">Fill</p>
					<label class="flex items-center gap-2 rounded-md background-3 px-2 py-1.5">
						<input
							class="h-4 w-4 cursor-pointer border-0 bg-transparent p-0"
							type="color"
							value={selected.fill}
							oninput={(e) => updateSelected({ fill: e.currentTarget.value })}
						/>
						<input
							class="field grow"
							type="text"
							value={selected.fill}
							oninput={(e) => updateSelected({ fill: e.currentTarget.value })}
						/>
					</label>
				</div>

				<div>
					<p class="m-0 mb-1.5 opacity-70">Typography</p>
					<div class="flex flex-col gap-2">
						<div class="rounded-md background-3 px-2 py-1.5">Google Sans Code</div>
						<div class="grid grid-cols-2 gap-2">
							<div class="rounded-md background-3 px-2 py-1.5">Regular</div>
							<label class="flex items-center gap-1 rounded-md background-3 px-2 py-1.5">
								<input
									class="field"
									type="number"
									value={selected.fontSize}
									disabled={selected.kind !== 'text'}
									oninput={(e) => updateSelected({ fontSize: Number(e.currentTarget.value) })}
								/>
							</label>
						</div>
					</div>
				</div>

				<div>
					<p class="m-0 mb-1.5 opacity-70">Stroke</p>
					<label class="flex items-center gap-2 rounded-md background-3 px-2 py-1.5">
						<span
							class="h-4 w-4 shrink-0 border border-[#3d3d3d] rounded-md border-solid"
							style:background={selected.stroke}
						></span>
						<input
							class="field grow"
							type="text"
							value={selected.stroke}
							oninput={(e) => updateSelected({ stroke: e.currentTarget.value })}
						/>
					</label>
				</div>
			</div>
		</aside>
	</div>
</div>

<style>
	.canvas {
		background-color: #1a1a1a;
		background-image:
			linear-gradient(45deg, #111 25%, transparent 25%),
			linear-gradient(-45deg, #111 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #111 75%),
			linear-gradient(-45deg, transparent 75%, #111 75%);
		background-size: 20px 20px;
		background-position:
			0 0,
			0 10px,
			10px -10px,
			-10px 0;
	}

	.field {
		width: 100%;
		min-width: 0;
		border: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		outline: none;
	}

	.field:disabled {
		opacity: 0.45;
	}

	.selected {
		outline: 1.5px solid #3dd68c;
		outline-offset: 4px;
		box-shadow: 0 0 0 1px rgba(61, 214, 140, 0.35);
	}

	.sticker {
		mix-blend-mode: lighten;
	}
</style>
