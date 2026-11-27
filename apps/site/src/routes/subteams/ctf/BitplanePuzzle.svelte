<script lang="ts">
	import { onMount } from 'svelte';
	import { asset } from '$app/paths';
	import { bitPlane, checkFlag } from './challenge';

	const channels = [
		{ value: -1, name: 'All' },
		{ value: 0, name: 'Red' },
		{ value: 1, name: 'Green' },
		{ value: 2, name: 'Blue' }
	];

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let pixels = $state<ImageData>();
	let failed = $state(false);
	let channel = $state(-1);
	let bit = $state(7);
	let flag = $state('');
	let message = $state('');
	let solved = $state(false);
	const ready = $derived(pixels !== undefined);

	const transitionDuration = 450;

	$effect(() => {
		if (!pixels) return;
		const target =
			channel < 0
				? pixels
				: new ImageData(bitPlane(pixels.data, channel, bit), pixels.width, pixels.height);

		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			context.putImageData(target, 0, 0);
			return;
		}

		const plane = document.createElement('canvas');
		plane.width = pixels.width;
		plane.height = pixels.height;
		plane.getContext('2d')!.putImageData(target, 0, 0);

		const size = Math.max(4, Math.round(pixels.width / 120));
		const blocks = [];
		for (let y = 0; y < pixels.height; y += size) {
			for (let x = 0; x < pixels.width; x += size) {
				blocks.push({ x, y, time: 0.6 * Math.random() + 0.4 * (y / pixels.height) });
			}
		}
		blocks.sort((a, b) => a.time - b.time);

		let start: number;
		let next = 0;
		let frame = requestAnimationFrame(function step(now) {
			start ??= now;
			const progress = Math.min(1, (now - start) / transitionDuration);
			while (next < blocks.length && (blocks[next].time <= progress || progress === 1)) {
				const { x, y } = blocks[next++];
				context.drawImage(plane, x, y, size, size, x, y, size, size);
			}
			if (progress < 1) frame = requestAnimationFrame(step);
		});
		return () => cancelAnimationFrame(frame);
	});

	onMount(() => {
		context = canvas.getContext('2d', { willReadFrequently: true })!;
		const image = new Image();
		image.onload = () => {
			canvas.width = image.naturalWidth;
			canvas.height = image.naturalHeight;
			context.drawImage(image, 0, 0);
			pixels = context.getImageData(0, 0, canvas.width, canvas.height);
		};
		image.onerror = () => {
			failed = true;
		};
		image.src = asset('ctf/anteater.png');
		return () => {
			image.onload = null;
			image.onerror = null;
		};
	});

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		solved = await checkFlag(flag);
		message = solved ? 'Correct!' : 'Incorrect flag.';
	}
</script>

<div
	class="puzzle-card border border-gray-4 rounded-lg border-solid background-2 p-5 dark:border-graydark-4 sm:p-6"
>
	<h3 class="mt-0 type-heading-2">Bitplane Hunt</h3>
	<div class="puzzle-layout grid items-start gap-6">
		<div class="min-w-0">
			<div class="overflow-hidden rounded background-3" aria-busy={!ready && !failed}>
				<canvas
					bind:this={canvas}
					class="block aspect-[2000/1499] h-auto w-full"
					aria-label="Anteater puzzle image. Use the channel and bit controls to reveal hidden text."
				></canvas>
			</div>
			{#if failed}
				<p role="alert" class="type-body-1">Could not load the image. Reload to retry.</p>
			{:else if !ready}
				<p role="status" class="type-label">Loading puzzle…</p>
			{/if}
		</div>
		<div class="min-w-0">
			<fieldset disabled={!ready} class="m-0 min-w-0 border-0 p-0">
				<legend class="mb-3 type-label">Color channel</legend>
				<div class="flex flex-wrap gap-4">
					{#each channels as option (option.value)}
						<label class="flex cursor-pointer items-center gap-2 type-label"
							><input
								type="radio"
								class="size-4 accent-blue-9"
								name="channel"
								value={option.value}
								bind:group={channel}
							/>{option.name}</label
						>
					{/each}
				</div>
				<label for="bit-plane" class="mt-5 block type-label">Bit plane: {bit}</label>
				<input
					id="bit-plane"
					type="range"
					min="0"
					max="7"
					bind:value={bit}
					disabled={channel < 0}
					class="my-3 w-full accent-blue-9"
				/>
			</fieldset>
			<form onsubmit={submit} class="mt-5">
				<label for="ctf-flag" class="mb-2 block type-label">Your flag</label>
				<div class="flex flex-wrap gap-3">
					<input
						id="ctf-flag"
						bind:value={flag}
						required
						maxlength="128"
						placeholder={'p3tr{...}'}
						spellcheck="false"
						autocomplete="off"
						autocapitalize="off"
						class="min-w-0 w-full flex-[1_1_12rem] border border-gray-6 rounded border-solid background px-3 py-3 type-label text dark:border-graydark-6"
					/>
					<button
						type="submit"
						disabled={!ready || !flag.trim()}
						class="text-white cursor-pointer rounded border-none bg-blue-9 px-5 py-3 type-label transition-colors disabled:cursor-not-allowed hover:bg-blue-10 disabled:opacity-50"
						>Check flag</button
					>
				</div>
				<p
					role="status"
					aria-live="polite"
					class="min-h-7 type-body-1"
					class:text-blue-11={solved}
					class:dark:text-bluedark-11={solved}
				>
					{message}
				</p>
			</form>
		</div>
	</div>
</div>

<style>
	.puzzle-card {
		container-type: inline-size;
	}

	@container (min-width: 36rem) {
		.puzzle-layout {
			grid-template-columns: minmax(0, 1.2fr) minmax(14rem, 1fr);
		}
	}

	:where(button, input):focus-visible {
		@apply outline-2 outline-solid outline-offset-3 outline-blue-11 dark:outline-bluedark-11;
	}
</style>
