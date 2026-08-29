<script lang="ts">
	import { Eye, EyeOff } from 'lucide-svelte';
	import logoImg from './logo.png';
	import stickerPatch from './sticker2.png';
	import stickerSecure from './general_design3.png';
	import stickerLaptop from './anteater_computer_fixed.png';

	type LayerId = 'text' | 'logo' | 'patch' | 'secure' | 'laptop';
	type FontFamily = 'pixelify' | 'explorer' | 'sans';
	type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

	type Coords = {
		x: number;
		y: number;
	};

	type Dimensions = {
		w: number;
		h: number;
	};

	const CANVAS_W = 780;
	const CANVAS_H = 420;
	const MIN_SIZE = 32;
	const RESIZE_HANDLES: ResizeHandle[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
	const HANDLE_CURSOR: Record<ResizeHandle, string> = {
		n: 'ns-resize',
		s: 'ns-resize',
		e: 'ew-resize',
		w: 'ew-resize',
		ne: 'nesw-resize',
		nw: 'nwse-resize',
		se: 'nwse-resize',
		sw: 'nesw-resize'
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
		fontFamily?: FontFamily;
		kind: 'text' | 'image';
		src?: string;
	};

	const FONTS: { id: FontFamily; label: string; stack: string }[] = [
		{ id: 'pixelify', label: 'Pixelify Sans', stack: "'Pixelify Sans', sans-serif" },
		{ id: 'explorer', label: 'TASA Explorer', stack: "'TASA Explorer', sans-serif" },
		{ id: 'sans', label: 'Google Sans Code', stack: "'Google Sans Code', sans-serif" }
	];

	const ACCENT = '#00b2ff';
	const STROKE = '#f90404';

	let layers = $state<Layer[]>([
		{
			id: 'text',
			name: 'Cyber@UCI',
			visible: true,
			coords: { x: 300, y: 28 },
			dimensions: { w: 280, h: 40 },
			fill: ACCENT,
			stroke: STROKE,
			fontSize: 28,
			fontFamily: 'pixelify',
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

	let selectedId = $state<LayerId | null>('logo');
	let dragging = $state(false);
	let resizing = $state(false);
	let resizeHandle = $state<ResizeHandle | null>(null);
	let dragOffset = $state({ x: 0, y: 0 });
	let resizeStart = $state({ x: 0, y: 0, w: 0, h: 0 });
	let canvasEl = $state<HTMLDivElement | null>(null);

	let selected = $derived(layers.find((l) => l.id === selectedId) ?? layers[1]);

	function pointerToCanvas(event: PointerEvent) {
		if (!canvasEl) return { x: 0, y: 0 };
		const rect = canvasEl.getBoundingClientRect();
		return {
			x: (event.clientX - rect.left) * (CANVAS_W / rect.width),
			y: (event.clientY - rect.top) * (CANVAS_H / rect.height)
		};
	}

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

	function capturePointer(event: PointerEvent) {
		try {
			(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		} catch {
			// Pointer capture can fail for synthetic or already-released pointers.
		}
	}

	function bindGesture() {
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('pointerup', onPointerUp);
		window.addEventListener('pointercancel', onPointerUp);
	}

	function unbindGesture() {
		window.removeEventListener('pointermove', onPointerMove);
		window.removeEventListener('pointerup', onPointerUp);
		window.removeEventListener('pointercancel', onPointerUp);
	}

	function onPointerDown(id: LayerId, event: PointerEvent) {
		const layer = layers.find((l) => l.id === id);
		if (!layer || layer.locked || !layer.visible || !canvasEl) return;
		selectLayer(id);
		dragging = true;
		const pt = pointerToCanvas(event);
		dragOffset = {
			x: pt.x - layer.coords.x,
			y: pt.y - layer.coords.y
		};
		capturePointer(event);
		bindGesture();
	}

	function onResizePointerDown(id: LayerId, handle: ResizeHandle, event: PointerEvent) {
		event.stopPropagation();
		event.preventDefault();
		const layer = layers.find((l) => l.id === id);
		if (!layer || layer.locked || layer.kind !== 'image' || !canvasEl) return;
		selectLayer(id);
		dragging = false;
		resizing = true;
		resizeHandle = handle;
		resizeStart = {
			x: layer.coords.x,
			y: layer.coords.y,
			w: layer.dimensions.w,
			h: layer.dimensions.h
		};
		capturePointer(event);
		bindGesture();
	}

	function applyResize(handle: ResizeHandle, pt: Coords) {
		const { x: sx, y: sy, w: sw, h: sh } = resizeStart;
		const aspect = sw / Math.max(1, sh);
		const right = sx + sw;
		const bottom = sy + sh;
		let x = sx;
		let y = sy;
		let w = sw;
		let h = sh;
		const isCorner = handle.length === 2;

		if (isCorner) {
			let nextW = sw;
			let nextH = sh;
			if (handle.includes('e')) nextW = pt.x - sx;
			if (handle.includes('w')) nextW = right - pt.x;
			if (handle.includes('s')) nextH = pt.y - sy;
			if (handle.includes('n')) nextH = bottom - pt.y;
			const scale = Math.abs(nextW / sw - 1) >= Math.abs(nextH / sh - 1) ? nextW / sw : nextH / sh;
			w = Math.max(MIN_SIZE, sw * scale);
			h = w / aspect;
			if (handle.includes('w')) x = right - w;
			if (handle.includes('n')) y = bottom - h;
		} else if (handle === 'e') {
			w = Math.max(MIN_SIZE, pt.x - sx);
			h = w / aspect;
			y = sy + (sh - h) / 2;
		} else if (handle === 'w') {
			w = Math.max(MIN_SIZE, right - pt.x);
			h = w / aspect;
			x = right - w;
			y = sy + (sh - h) / 2;
		} else if (handle === 's') {
			h = Math.max(MIN_SIZE, pt.y - sy);
			w = h * aspect;
			x = sx + (sw - w) / 2;
		} else {
			h = Math.max(MIN_SIZE, bottom - pt.y);
			w = h * aspect;
			y = bottom - h;
			x = sx + (sw - w) / 2;
		}

		updateSelected({
			coords: { x: Math.round(x), y: Math.round(y) },
			dimensions: { w: Math.round(w), h: Math.round(h) }
		});
	}

	function onPointerMove(event: PointerEvent) {
		if (!canvasEl) return;
		const layer = layers.find((l) => l.id === selectedId);
		if (!layer || layer.locked) return;
		const pt = pointerToCanvas(event);

		if (resizing && resizeHandle && layer.kind === 'image') {
			applyResize(resizeHandle, pt);
			return;
		}

		if (!dragging) return;
		const x = Math.round(pt.x - dragOffset.x);
		const y = Math.round(pt.y - dragOffset.y);

		updateSelected({
			coords: { x: Math.max(-40, Math.min(700, x)), y: Math.max(-20, Math.min(360, y)) }
		});
	}

	function onPointerUp() {
		dragging = false;
		resizing = false;
		resizeHandle = null;
		unbindGesture();
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
		>
			{#each layers as layer (layer.id)}
				{#if layer.visible}
					{#if layer.kind === 'text'}
						<div
							class="absolute select-none font-medium tracking-wide {selectedId === layer.id
								? 'selected'
								: ''}"
							style:left="{layer.coords.x / 7.8}%"
							style:top="{layer.coords.y / 4.2}%"
							style:color={layer.fill}
							style:font-family={FONTS.find((f) => f.id === (layer.fontFamily ?? 'pixelify'))
								?.stack}
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
						<div
							class="absolute {selectedId === layer.id ? 'selected' : ''}"
							style:left="{layer.coords.x / 7.8}%"
							style:top="{layer.coords.y / 4.2}%"
							style:width="{layer.dimensions.w / 7.8}%"
							style:height="{layer.dimensions.h / 4.2}%"
							style:z-index={selectedId === layer.id ? 20 : 2}
							style:cursor={layer.locked
								? 'default'
								: resizing && selectedId === layer.id
									? HANDLE_CURSOR[resizeHandle ?? 'se']
									: dragging && selectedId === layer.id
										? 'grabbing'
										: 'grab'}
							style:filter={hexToFilter(layer.fill)}
							role="button"
							tabindex="0"
							aria-label={layer.name}
							onpointerdown={(e) => onPointerDown(layer.id, e)}
							onkeydown={(e) => e.key === 'Enter' && selectLayer(layer.id)}
						>
							<img
								src={layer.src}
								alt=""
								draggable="false"
								class="sticker pointer-events-none h-full w-full object-contain"
							/>
							{#if selectedId === layer.id && !layer.locked}
								{#each RESIZE_HANDLES as handle (handle)}
									<span
										class="resize-handle handle- {handle}"
										style:cursor={HANDLE_CURSOR[handle]}
										role="slider"
										aria-label="Resize {layer.name} from {handle}"
										aria-valuemin={MIN_SIZE}
										aria-valuemax={CANVAS_W}
										aria-valuenow={layer.dimensions.w}
										tabindex="0"
										onpointerdown={(e) => onResizePointerDown(layer.id, handle, e)}
									></span>
								{/each}
							{/if}
						</div>
					{/if}
				{/if}
			{/each}
		</div>

		<aside class="border border-[#3d3d3d] border-solid p-3">
			<p class="mb-2 mt-1 type-label text-[#00b2ff]">[DESIGN]</p>
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
										dimensions: { w: selected.dimensions.w, h: Number(e.currentTarget.value) }
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
						<label class="block rounded-md background-3 px-2 py-1.5">
							<select
								class="field font-select"
								value={selected.fontFamily ?? 'pixelify'}
								disabled={selected.kind !== 'text'}
								aria-label="Font family"
								onchange={(e) =>
									updateSelected({
										fontFamily: e.currentTarget.value as FontFamily
									})}
							>
								{#each FONTS as font (font.id)}
									<option value={font.id}>{font.label}</option>
								{/each}
							</select>
						</label>
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

	.font-select {
		cursor: pointer;
		appearance: auto;
	}

	.font-select option {
		background: #1a1a1a;
		color: #d4d4d4;
	}

	.selected {
		@apply outline-1.5 outline-solid outline-offset-4 outline-bluedark-11;
		box-shadow: 0 0 0 1px rgb(117 187 255 / 0.35);
	}

	.resize-handle {
		@apply border-1.5 border-solid border-bluedark-11;
		position: absolute;
		z-index: 3;
		width: 9px;
		height: 9px;
		border-radius: 1px;
		background: #111;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.45);
	}

	.resize-handle::after {
		content: '';
		position: absolute;
		inset: -8px;
	}

	.handle-n {
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.handle-s {
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 50%);
	}

	.handle-e {
		top: 50%;
		right: 0;
		transform: translate(50%, -50%);
	}

	.handle-w {
		top: 50%;
		left: 0;
		transform: translate(-50%, -50%);
	}

	.handle-ne {
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}

	.handle-nw {
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);
	}

	.handle-se {
		right: 0;
		bottom: 0;
		transform: translate(50%, 50%);
	}

	.handle-sw {
		bottom: 0;
		left: 0;
		transform: translate(-50%, 50%);
	}

	.sticker {
		mix-blend-mode: lighten;
	}
</style>
