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
	let reposting = $state(false);
	let saved = $state(false);
	let flying = $state(false);
	let commenting = $state(false);
	let commentText = $state('');
	let comments = $state<string[]>([]);
	let shareButton: HTMLButtonElement;
	let whatWeDoSection: HTMLDivElement;

	function toggleLike() {
		liked = !liked;
		if (liked) heartBurst++;
	}

	function repost() {
		reposting = false;
		requestAnimationFrame(() => (reposting = true));
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

		const target = whatWeDoSection;
		const icon = shareButton.querySelector('svg');
		if (!target || !icon) return;

		const startScrollY = window.scrollY;
		const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
		// Document-space landing spot, just below the bottom of the section
		const landingDocY = target.getBoundingClientRect().bottom + startScrollY + 16;
		const targetScrollY = Math.min(maxScrollY, Math.max(0, landingDocY - window.innerHeight * 0.6));

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			window.scrollTo({ top: targetScrollY, behavior: 'instant' });
			return;
		}

		flying = true;
		const start = icon.getBoundingClientRect();
		const startDocY = start.top + startScrollY;
		const scrollDistance = targetScrollY - startScrollY;
		const plane = icon.cloneNode(true) as SVGSVGElement;

		plane.setAttribute('aria-hidden', 'true');
		Object.assign(plane.style, {
			position: 'fixed',
			left: `${start.left}px`,
			top: `${start.top}px`,
			width: `${start.width}px`,
			height: `${start.height}px`,
			zIndex: '1000',
			color: BLUE,
			stroke: BLUE,
			pointerEvents: 'none'
		});
		document.body.append(plane);

		const animatePlane = (
			keyframes: Parameters<Element['animate']>[0],
			duration: number,
			easing: string
		): Promise<void> =>
			new Promise((resolve) => {
				plane.animate(keyframes, { duration, easing }).onfinish = () => resolve();
			});

		try {
			await animatePlane(
				[{ transform: 'rotate(0deg)' }, { transform: 'rotate(720deg)' }],
				900,
				'ease-in-out'
			);
			const flightDuration = Math.min(2500, Math.max(700, Math.abs(landingDocY - startDocY) * 1.2));
			await new Promise<void>((resolve) => {
				const startedAt = performance.now();
				const fly = (now: number) => {
					const progress = Math.min((now - startedAt) / flightDuration, 1);
					const easedProgress = 1 - (1 - progress) ** 3;
					window.scrollTo({
						top: startScrollY + scrollDistance * easedProgress,
						behavior: 'instant'
					});
					const docY = startDocY + (landingDocY - startDocY) * easedProgress;
					plane.style.top = `${docY - window.scrollY}px`;

					if (progress < 1) requestAnimationFrame(fly);
					else resolve();
				};
				requestAnimationFrame(fly);
			});
			await animatePlane(
				[
					{ transform: 'rotate(0deg)', opacity: 1 },
					{ transform: 'rotate(360deg)', opacity: 0 }
				],
				900,
				'ease-in-out'
			);
		} finally {
			plane.remove();
			flying = false;
		}
	}

	onMount(() => {
		if (document.querySelector('script[data-snapwidget]')) return;

		const script = document.createElement('script');
		script.src = 'https://snapwidget.com/js/snapwidget.js';
		script.dataset.snapwidget = '';
		document.head.append(script);
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
			<img src={logoImg} alt="Cyber@UCI logo" class="size-10 rounded-full object-cover" />
			<a
				class="type-label text-bluedark-11 font-600 decoration-none visited:text-bluedark-11 hover:underline"
				href={INSTAGRAM_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				socialmedia@cyberuci
			</a>
			<span class="type-label text-graydark-11" aria-hidden="true">•</span>
			<a
				class="flex items-center gap-3 px-4 py-3 type-label text-bluedark-11 font-600 decoration-none visited:text-bluedark-11 hover:underline"
				href={INSTAGRAM_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				<div>Follow</div>
				<svg class="mr-2 size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d={siInstagram.path} />
				</svg>
			</a>

			<span class="type-label text-graydark-11" aria-hidden="true">•</span>
			<a
				class="flex items-center gap-3 px-4 py-3 type-label text-bluedark-11 font-600 decoration-none visited:text-bluedark-11 hover:underline"
				href={TIKTOK_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				<div>Follow</div>
				<svg class="mr-2 size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
									size={56}
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
					<span
						class="inline-flex"
						class:swirl={reposting}
						onanimationend={() => (reposting = false)}
						role="presentation"
					>
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
			<button
				class="icon-btn"
				aria-label="Save"
				aria-pressed={saved}
				onclick={() => (saved = !saved)}
			>
				<Bookmark
					size={24}
					class={iconClass}
					color={saved ? BLUE : '#fff'}
					fill={saved ? BLUE : 'none'}
				/>
			</button>
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

	<div bind:this={whatWeDoSection} class="grid items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<BadgeQuestionMark size={18} />
			<h2 class="m-0 type-label font-550">WHAT WE DO</h2>
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

	.swirl {
		animation: swirl 0.7s ease-in-out;
	}

	@keyframes swirl {
		to {
			transform: rotate(720deg) scale(1.2);
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
