<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	const TEXT = 'CyberUCI';
	const TYPE_DELAY_MS = 95;
	const ERASE_DELAY_MS = 55;
	const PAUSE_AFTER_TYPE_MS = 8000;
	const PAUSE_AFTER_ERASE_MS = 600;

	let displayed = $state('');
	let typingDone = $state(false);
	let glitching = $state(false);
	let cursorVisible = $state(true);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			displayed = TEXT;
			typingDone = true;
			return;
		}

		let cancelled = false;
		const timeouts = new SvelteSet<ReturnType<typeof setTimeout>>();

		function wait(ms: number) {
			return new Promise<void>((resolve) => {
				const id = setTimeout(() => {
					timeouts.delete(id);
					resolve();
				}, ms);
				timeouts.add(id);
			});
		}

		let glitchTimeout: ReturnType<typeof setTimeout> | undefined;

		function clearGlitchSchedule() {
			if (glitchTimeout !== undefined) {
				clearTimeout(glitchTimeout);
				timeouts.delete(glitchTimeout);
				glitchTimeout = undefined;
			}
			glitching = false;
		}

		function scheduleGlitch() {
			clearGlitchSchedule();
			glitchTimeout = setTimeout(
				() => {
					timeouts.delete(glitchTimeout!);
					if (cancelled || !typingDone) return;
					glitching = true;
					const burstId = setTimeout(
						() => {
							timeouts.delete(burstId);
							if (cancelled) return;
							glitching = false;
							if (typingDone) scheduleGlitch();
						},
						80 + Math.random() * 220
					);
					timeouts.add(burstId);
				},
				1800 + Math.random() * 3500
			);
			timeouts.add(glitchTimeout);
		}

		async function typeText() {
			typingDone = false;
			for (let i = 1; i <= TEXT.length; i++) {
				if (cancelled) return;
				displayed = TEXT.slice(0, i);
				await wait(TYPE_DELAY_MS);
			}
			typingDone = true;
			scheduleGlitch();
		}

		async function eraseText() {
			clearGlitchSchedule();
			typingDone = false;
			for (let i = TEXT.length - 1; i >= 0; i--) {
				if (cancelled) return;
				displayed = TEXT.slice(0, i);
				await wait(ERASE_DELAY_MS);
			}
		}

		async function runLoop() {
			while (!cancelled) {
				await typeText();
				if (cancelled) return;
				await wait(PAUSE_AFTER_TYPE_MS);
				if (cancelled) return;
				await eraseText();
				if (cancelled) return;
				await wait(PAUSE_AFTER_ERASE_MS);
			}
		}

		const cursorTimer = setInterval(() => {
			cursorVisible = !cursorVisible;
		}, 530);

		runLoop();

		return () => {
			cancelled = true;
			clearInterval(cursorTimer);
			clearGlitchSchedule();
			for (const id of timeouts) clearTimeout(id);
		};
	});
</script>

<span
	class="glitch-text type-label"
	class:typing-done={typingDone}
	class:glitching
	aria-label={TEXT}
>
	<span class="glitch-text__spacer" aria-hidden="true">{TEXT}</span>

	<span class="glitch-text__content">
		<span class="glitch-text__main">{displayed}</span>

		{#if typingDone}
			<span class="glitch-text__layer glitch-text__layer--cyan" aria-hidden="true">{displayed}</span
			>
			<span class="glitch-text__layer glitch-text__layer--magenta" aria-hidden="true"
				>{displayed}</span
			>
		{/if}

		<span class="glitch-text__cursor" class:visible={cursorVisible} aria-hidden="true">_</span>
	</span>
</span>

<style>
	.glitch-text {
		position: relative;
		display: inline-grid;
		vertical-align: middle;
	}

	.glitch-text__spacer,
	.glitch-text__content {
		grid-area: 1 / 1;
	}

	.glitch-text__spacer {
		visibility: hidden;
		pointer-events: none;
		user-select: none;
	}

	.glitch-text__content {
		position: relative;
		white-space: nowrap;
	}

	.glitch-text__main {
		color: var(--glitch-fg, #68a9ea);
		transition: color 0.2s ease;
	}

	:global(.dark) .glitch-text__main {
		--glitch-fg: #cae6ff;
	}

	.glitch-text.typing-done .glitch-text__main {
		background: linear-gradient(
			90deg,
			#68a9ea 0%,
			#91c1f2 25%,
			#acd2fa 50%,
			#c0dfff 75%,
			#68a9ea 100%
		);
		background-size: 200% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: color-shift 3.5s ease-in-out infinite;
	}

	.glitch-text__layer {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		pointer-events: none;
		user-select: none;
	}

	.glitch-text__layer--cyan {
		color: #91c1f2;
		animation: glitch-cyan 4s steps(1) infinite;
	}

	.glitch-text__layer--magenta {
		color: #ff2bd6;
		animation: glitch-magenta 3.2s steps(1) infinite;
	}

	.glitch-text.glitching .glitch-text__layer {
		animation: none;
		opacity: 0.85;
	}

	.glitch-text.glitching .glitch-text__layer--cyan {
		transform: translate(-3px, 1px);
		clip-path: inset(8% 0 72% 0);
	}

	.glitch-text.glitching .glitch-text__layer--magenta {
		transform: translate(3px, -1px);
		clip-path: inset(55% 0 18% 0);
	}

	.glitch-text.glitching .glitch-text__main {
		transform: translate(1px, 0);
		filter: brightness(1.15);
	}

	.glitch-text__cursor {
		opacity: 0;
		margin-left: 1px;
		color: #91c1f2;
	}

	:global(.dark) .glitch-text__cursor {
		color: #cae6ff;
	}

	.glitch-text__cursor.visible {
		opacity: 1;
	}

	@keyframes color-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	@keyframes glitch-cyan {
		0%,
		92%,
		100% {
			opacity: 0;
			transform: translate(0);
			clip-path: inset(0 0 0 0);
		}
		93% {
			opacity: 0.75;
			transform: translate(-2px, 0);
			clip-path: inset(12% 0 58% 0);
		}
		94% {
			opacity: 0;
		}
		96% {
			opacity: 0.6;
			transform: translate(-1px, 1px);
			clip-path: inset(68% 0 8% 0);
		}
	}

	@keyframes glitch-magenta {
		0%,
		88%,
		100% {
			opacity: 0;
			transform: translate(0);
			clip-path: inset(0 0 0 0);
		}
		89% {
			opacity: 0.7;
			transform: translate(2px, -1px);
			clip-path: inset(42% 0 32% 0);
		}
		90% {
			opacity: 0;
		}
		95% {
			opacity: 0.65;
			transform: translate(3px, 0);
			clip-path: inset(5% 0 78% 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.glitch-text.typing-done .glitch-text__main {
			animation: none;
			background: none;
			-webkit-text-fill-color: currentColor;
		}

		.glitch-text__layer {
			display: none;
		}

		.glitch-text__cursor {
			display: none;
		}
	}
</style>
