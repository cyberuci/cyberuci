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
	const BEHOLD_FEED_ID = '49y74sfuqWSsixCwCkMH';

	const BLUE = '#3b82f6';
	let liked = $state(false);
	let heartBurst = $state(0);
	let reposting = $state(false);
	let saved = $state(false);
	let commenting = $state(false);
	let commentText = $state('');
	let comments = $state<string[]>([]);

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

	function scrollToFooter() {
		window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
	}

	onMount(() => {
		if (!BEHOLD_FEED_ID || document.querySelector('script[data-behold-widget]')) return;

		const script = document.createElement('script');
		script.type = 'module';
		script.src = 'https://w.behold.so/widget.js';
		script.dataset.beholdWidget = '';
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
			{#if BEHOLD_FEED_ID}
				<behold-widget feed-id={BEHOLD_FEED_ID}></behold-widget>
			{:else}
				<div class="grid gap-4 sm:grid-cols-3" aria-label="Instagram feed widget placeholder">
					{#each [1, 2, 3] as post (post)}
						<div
							class="aspect-square flex items-center justify-center border border-graydark-6 rounded-lg border-dashed"
						>
							<span class="type-label text-graydark-11">POST 0{post}</span>
						</div>
					{/each}
				</div>
			{/if}
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
				<button class="icon-btn" aria-label="Share" onclick={scrollToFooter}>
					<Send size={24} class={iconClass} />
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

	<div class="grid items-start gap-y-6 lg:grid-cols-16">
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
