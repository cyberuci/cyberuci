<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Title from '$lib/common/components/Title.svelte';
	import { BadgeQuestionMark, Bookmark, Heart, MessageCircle, Repeat2, Send } from 'lucide-svelte';
	import logoImg from '../social-media/logo.png';
	import { siInstagram, siTiktok } from 'simple-icons';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const INSTAGRAM_URL = 'https://www.instagram.com/cyberuci/';
	const TIKTOK_URL = 'https://www.tiktok.com/@cyberuci';
	const iconClass = 'cursor-pointer text-[#fff] transition-colors hover:text-bluedark-11';
	const BLUE = '#3b82f6';
	let liked = $state(false);
	let heartBurst = $state(0);
	let repostIcon = $state<HTMLSpanElement>();
	let logoEl = $state<HTMLImageElement>();
	let instagramIcon = $state<SVGSVGElement>();
	let tiktokIcon = $state<SVGSVGElement>();
	let saved = $state(false);
	let flying = $state(false);
	let commenting = $state(false);
	let commentText = $state('');
	let comments = $state<string[]>([]);
	let shareButton: HTMLButtonElement;
	let nameLink: HTMLAnchorElement;
	let instagramLink: HTMLAnchorElement;
	let tiktokLink: HTMLAnchorElement;
	let whatWeDoHeader: HTMLHeadingElement;
	let likeStreak = $state(0);
	let bookmarkHint = $state('');
	let bookmarkHintCount = $state(0);
	let likeStreakTimer: ReturnType<typeof setTimeout> | undefined;
	let bookmarkHintTimer: ReturnType<typeof setTimeout> | undefined;
	const burstHeartSize = $derived(Math.min(56 * (1 + (likeStreak - 1) * 0.35), 160));

	function toggleLike() {
		likeStreak++;
		clearTimeout(likeStreakTimer);
		likeStreakTimer = setTimeout(() => (likeStreak = 0), 500);

		// Rapid clicks keep the heart liked instead of flickering on and off
		liked = likeStreak > 1 ? true : !liked;
		if (liked) heartBurst++;
	}

	function toggleSaved() {
		clearTimeout(bookmarkHintTimer);
		saved = !saved;
		if (!saved) {
			bookmarkHint = '';
			return;
		}

		const shortcut = /Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘+D' : 'Ctrl+D';
		bookmarkHint = `Press ${shortcut}`;
		bookmarkHintCount++;
		bookmarkHintTimer = setTimeout(() => (bookmarkHint = ''), 2200);
	}

	function repost() {
		repostIcon?.animate(
			[{ transform: 'rotate(0deg) scale(1)' }, { transform: 'rotate(1080deg) scale(1.2)' }],
			{ duration: 1500, easing: 'ease-in-out' }
		);
		for (const el of [logoEl, instagramIcon, tiktokIcon]) {
			el?.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(1080deg)' }], {
				duration: 1500,
				easing: 'ease-in-out'
			});
		}
	}

	function submitComment(e: SubmitEvent) {
		e.preventDefault();
		const text = commentText.trim();
		if (!text) return;
		comments.push(text);
		commentText = '';
	}

	async function flyToWhatWeDo() {
		if (flying) return;

		const icon = shareButton.querySelector('svg');
		if (!whatWeDoHeader || !icon) return;

		type Point = { x: number; y: number };
		type Stop = { point: () => Point; end: 'spin' | 'hover' | 'exit' };

		const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
		const centerOf = (el: Element): Point => {
			const r = el.getBoundingClientRect();
			return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY };
		};
		const footer = document.querySelector('footer');
		const hoverAbove = (el: Element): Point => {
			const p = centerOf(el);
			return { x: p.x, y: p.y - el.getBoundingClientRect().height / 2 - 16 };
		};
		const stops: Stop[] = [
			{ point: () => hoverAbove(nameLink), end: 'spin' },
			{ point: () => hoverAbove(instagramLink), end: 'spin' },
			{ point: () => hoverAbove(tiktokLink), end: 'spin' },
			...(footer
				? [
						{
							point: () => {
								const r = footer.getBoundingClientRect();
								return { x: r.left + r.width / 2 + window.scrollX, y: r.top + window.scrollY - 32 };
							},
							end: 'hover' as const
						}
					]
				: []),
			{ point: () => centerOf(whatWeDoHeader), end: 'exit' }
		];

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			const top = centerOf(whatWeDoHeader).y - window.innerHeight * 0.45;
			window.scrollTo({ top: Math.min(maxScroll(), Math.max(0, top)), behavior: 'instant' });
			return;
		}

		flying = true;
		const start = icon.getBoundingClientRect();
		const size = start.width;
		const plane = icon.cloneNode(true) as SVGSVGElement;
		let pos: Point = {
			x: start.left + size / 2 + window.scrollX,
			y: start.top + size / 2 + window.scrollY
		};
		let angle = 0;

		plane.setAttribute('aria-hidden', 'true');
		Object.assign(plane.style, {
			position: 'fixed',
			width: `${size}px`,
			height: `${size}px`,
			zIndex: '1000',
			color: BLUE,
			stroke: BLUE,
			pointerEvents: 'none'
		});
		document.body.append(plane);

		const place = (offsetY = 0) => {
			plane.style.left = `${pos.x - window.scrollX - size / 2}px`;
			plane.style.top = `${pos.y - window.scrollY - size / 2 + offsetY}px`;
		};
		const easeInOut = (p: number) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);
		const tween = (duration: number, ease: (p: number) => number, frame: (t: number) => void) =>
			new Promise<void>((resolve) => {
				const startedAt = performance.now();
				const step = (now: number) => {
					const p = Math.min((now - startedAt) / duration, 1);
					frame(ease(p));
					if (p < 1) requestAnimationFrame(step);
					else resolve();
				};
				requestAnimationFrame(step);
			});
		const rotateTo = (target: number, duration: number, fade = false) => {
			const from = angle;
			return tween(duration, easeInOut, (t) => {
				angle = from + (target - from) * t;
				plane.style.transform = `rotate(${angle}deg)`;
				if (fade) plane.style.opacity = `${1 - t}`;
			});
		};

		try {
			place();
			await rotateTo(angle + 720, 900);

			for (const stop of stops) {
				const to = stop.point();
				const from = pos;
				// The icon points up-right at 0deg, so offset by 45deg to face the direction of travel
				const heading = (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI + 45;
				const delta = ((((heading - angle) % 360) + 540) % 360) - 180;
				await rotateTo(angle + delta, 300);

				const fromScroll = window.scrollY;
				const toScroll = Math.min(maxScroll(), Math.max(0, to.y - window.innerHeight * 0.45));
				const duration = Math.min(
					1800,
					Math.max(700, Math.hypot(to.x - from.x, to.y - from.y) * 0.8)
				);
				await tween(duration, easeInOut, (t) => {
					window.scrollTo({ top: fromScroll + (toScroll - fromScroll) * t, behavior: 'instant' });
					pos = { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
					place();
				});

				if (stop.end === 'spin') await rotateTo(angle + 360, 600);
				else if (stop.end === 'hover')
					await tween(
						1100,
						(p) => p,
						(t) => place(-Math.sin(t * Math.PI * 2) * 8)
					);
				else await rotateTo(angle + 360, 900, true);
			}
		} finally {
			plane.remove();
			flying = false;
		}
	}

	onMount(() => {
		const cleanup = () => {
			clearTimeout(likeStreakTimer);
			clearTimeout(bookmarkHintTimer);
		};
		if (document.querySelector('script[data-snapwidget]')) return cleanup;

		const script = document.createElement('script');
		script.src = 'https://snapwidget.com/js/snapwidget.js';
		script.dataset.snapwidget = '';
		document.head.append(script);
		return cleanup;
	});
</script>

<svelte:head>
	<title>{data.title} — Cyber @ UCI</title>
</svelte:head>

<!-- eslint-disable svelte/no-navigation-without-resolve -->

<div class="my-40 space-x">
	<Title title={data.title} />

	<div class="mb-24 overflow-hidden border border-[#fff] rounded-xl border-solid bg-[#000]">
		<div class="flex items-center gap-3 px-4 py-3">
			<img
				src={logoImg}
				alt="Cyber@UCI logo"
				class="size-10 rounded-full object-cover"
				bind:this={logoEl}
			/>
			<a
				bind:this={nameLink}
				class="type-label text-bluedark-11 font-600 decoration-none visited:text-bluedark-11 hover:underline"
				href={INSTAGRAM_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				socialmedia@cyberuci
			</a>
			<span class="type-label text-graydark-11" aria-hidden="true">•</span>
			<a
				bind:this={instagramLink}
				class="flex items-center gap-3 px-4 py-3 type-label text-bluedark-11 font-600 decoration-none visited:text-bluedark-11 hover:underline"
				href={INSTAGRAM_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				<div>Follow</div>
				<svg
					class="mr-2 size-4"
					bind:this={instagramIcon}
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d={siInstagram.path} />
				</svg>
			</a>

			<span class="type-label text-graydark-11" aria-hidden="true">•</span>
			<a
				bind:this={tiktokLink}
				class="flex items-center gap-3 px-4 py-3 type-label text-bluedark-11 font-600 decoration-none visited:text-bluedark-11 hover:underline"
				href={TIKTOK_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				<div>Follow</div>
				<svg
					class="mr-2 size-4"
					bind:this={tiktokIcon}
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d={siTiktok.path} />
				</svg>
			</a>
		</div>

		<div class="relative px-4">
			{#if liked}
				{#key heartBurst}
					<div class="heart-overlay" aria-hidden="true">
						{#each Array(3), i (i)}
							<div class="heart-cell">
								<Heart
									size={burstHeartSize}
									color={BLUE}
									fill={BLUE}
									class="heart-pop"
									style="animation-delay: {i * 60}ms"
								/>
							</div>
						{/each}
					</div>
				{/key}
			{/if}
			<iframe
				src="https://snapwidget.com/embed/1132106"
				class="snapwidget-widget"
				frameborder="0"
				scrolling="no"
				style="border:none; overflow:hidden;  width:100%; "
				title="Posts from Instagram"
			></iframe>
		</div>

		<div class="flex items-center justify-between px-4 pt-4">
			<div class="flex items-center gap-4">
				<button class="icon-btn" aria-label="Like" aria-pressed={liked} onclick={toggleLike}>
					<Heart
						size={24}
						class={iconClass}
						color={liked ? BLUE : '#fff'}
						fill={liked ? BLUE : 'none'}
					/>
				</button>
				<button
					class="icon-btn"
					aria-label="Comment"
					aria-expanded={commenting}
					onclick={() => (commenting = !commenting)}
				>
					<MessageCircle size={24} class={iconClass} />
				</button>
				<button class="icon-btn" aria-label="Repost" onclick={repost}>
					<span class="inline-flex" bind:this={repostIcon}>
						<Repeat2 size={24} class={iconClass} />
					</span>
				</button>
				<button
					bind:this={shareButton}
					class="icon-btn"
					aria-label="Send to What We Do section"
					disabled={flying}
					onclick={flyToWhatWeDo}
				>
					<Send size={24} class={flying ? 'opacity-0' : iconClass} />
				</button>
			</div>
			<div class="relative">
				{#if bookmarkHint}
					{#key bookmarkHintCount}
						<div class="bookmark-hint font-pixelify" role="status">{bookmarkHint}</div>
					{/key}
				{/if}
				<button class="icon-btn" aria-label="Save" aria-pressed={saved} onclick={toggleSaved}>
					<Bookmark
						size={24}
						class={iconClass}
						color={saved ? BLUE : '#fff'}
						fill={saved ? BLUE : 'none'}
					/>
				</button>
			</div>
		</div>

		<p class="m-0 px-4 pt-3 type-body-1 text-graydark-12">
			<span class="font-700">cyberuci</span>
			Please follow our social media for frequent, cyber-related updates!
		</p>

		{#each comments as comment, i (i)}
			<p class="m-0 px-4 pt-2 type-body-1 text-graydark-12">
				<span class="font-700">panteater</span>
				{comment}
			</p>
		{/each}

		{#if commenting}
			<form class="flex gap-2 px-4 pt-3" onsubmit={submitComment}>
				<!-- svelte-ignore a11y_autofocus -->
				<input
					class="comment-input"
					type="text"
					placeholder="Add a comment as panteater…"
					maxlength="200"
					autofocus
					bind:value={commentText}
				/>
				<button class="post-btn" type="submit" disabled={!commentText.trim()}>Post</button>
			</form>
		{/if}

		<div class="pb-4"></div>
	</div>

	<div class="grid items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<BadgeQuestionMark size={18} />
			<h2 bind:this={whatWeDoHeader} class="m-0 type-label font-550">WHAT WE DO</h2>
		</div>
		<div class="max-w-prose type-body-2 text-2 lg:col-start-5 lg:col-end-17 space-y-4">
			<p class="m-0">{data.intro}</p>
			<p class="m-0">
				We turn club events, competitions, and projects into short-form videos, reels, and posts
				that show what Cyber@UCI is about. Working alongside Graphics and Outreach, we keep our
				Instagram and TikTok active and make cybersecurity approachable to new members.
			</p>
		</div>
	</div>
</div>

<style>
	.icon-btn {
		display: inline-flex;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
	}

	.comment-input {
		flex: 1;
		padding: 0.5rem 0.75rem;
		border: 1px solid #444;
		border-radius: 0.5rem;
		background: #111;
		color: #fff;
	}

	.post-btn {
		border: none;
		background: none;
		color: #3b82f6;
		font-weight: 600;
		cursor: pointer;
	}

	.post-btn:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.bookmark-hint {
		position: absolute;
		right: 0;
		bottom: calc(100% + 0.25rem);
		color: #3b82f6;
		font-size: 1.25rem;
		white-space: nowrap;
		pointer-events: none;
		opacity: 0;
		animation: hint-float 2.2s ease-out forwards;
	}

	@keyframes hint-float {
		0% {
			opacity: 0;
			transform: translateY(12px);
		}
		20% {
			opacity: 1;
			transform: translateY(0);
		}
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translateY(-24px);
		}
	}

	.heart-overlay {
		position: absolute;
		inset: 0 1rem;
		z-index: 10;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr;
		pointer-events: none;
	}

	.heart-cell {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.heart-pop) {
		opacity: 0;
		animation: heart-pop 1.2s ease-out forwards;
		filter: drop-shadow(0 0 8px #3b82f6);
	}

	@keyframes heart-pop {
		0% {
			opacity: 0;
			transform: scale(0);
		}
		25% {
			opacity: 1;
			transform: scale(1.3);
		}
		40% {
			transform: scale(1);
		}
		80% {
			opacity: 1;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(1.1) translateY(-20px);
		}
	}
</style>
