<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Title from '$lib/common/components/Title.svelte';
	import { BadgeQuestionMark, Bookmark, Heart, MessageCircle, Repeat2, Send } from 'lucide-svelte';
	import logoImg from '../social-media/logo.png';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const INSTAGRAM_URL = 'https://www.instagram.com/cyberuci/';
	const iconClass = 'cursor-pointer text-[#fff] transition-colors hover:text-bluedark-11';
	const BEHOLD_FEED_ID = '49y74sfuqWSsixCwCkMH';

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
				class="type-label text-bluedark-11 font-600 decoration-none visited:text-bluedark-11 hover:underline"
				href={INSTAGRAM_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				Follow
			</a>
		</div>

		<div class="px-4">
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
				<Heart size={24} class={iconClass} aria-label="Like" />
				<MessageCircle size={24} class={iconClass} aria-label="Comment" />
				<Repeat2 size={24} class={iconClass} aria-label="Repost" />
				<Send size={24} class={iconClass} aria-label="Share" />
			</div>
			<Bookmark size={24} class={iconClass} aria-label="Save" />
		</div>

		<p class="m-0 px-4 pb-4 pt-3 type-body-1 text-graydark-12">
			<span class="font-700">cyberuci</span>
			Please follow our social media for frequent, cyber-related updates!
		</p>
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
