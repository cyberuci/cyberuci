<script lang="ts">
	import type { PageProps } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import { siDiscord, siInstagram, siGithub } from 'simple-icons';

	const { data }: PageProps = $props();
</script>

<main class="my-40 space-x">
	<Title title="Cyber @ UCI" />
	<div class="grid gap-1 pb-1 lg:grid-cols-2">
		<div class="rounded-sm background-2 px-3 py-3">
			<p class="my-2 type-label font-normal uppercase">Weds Oct 1st | 6:30 – 7:30 PM | ISEB 1010</p>
			<h2 class="mb-6 mt-8 type-heading-1 font-semibold">Introductory Meeting</h2>
			<p class="max-w-prose type-body-2">Learn more about Cyber @ UCI and our various teams.</p>
		</div>
		<div class="rounded-sm background-2 px-3 py-3">
			<p class="my-2 type-label font-normal uppercase">Thurs Oct 2nd | 6:00 – 7:00 PM | DBH 6011</p>
			<h2 class="mb-6 mt-8 type-heading-1 font-semibold">Intern Panel</h2>
			<p class="max-w-prose type-body-2">
				Discover opportunities for cybersecurity internships and how to prepare!
			</p>
		</div>
	</div>
	<div class="grid gap-1 lg:grid-cols-3">
		{#each data.socials as { _key, platform, link } (_key)}
			{#if ['Discord', 'Instagram', 'GitHub'].includes(platform)}
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					class="w-full flex items-center gap-4 rounded-sm bg-blue-1 px-3 py-12 text-blue-12 lg:justify-center dark:bg-bluedark-1 lg:px-8 dark:text-bluedark-12 hover:decoration-dotted"
					href={link}
				>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
					<svg
						class="size-8"
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
					>
						{#if platform === 'Discord'}
							<path d={siDiscord.path} />
						{:else if platform === 'Instagram'}
							<path d={siInstagram.path} />
						{:else if platform === 'GitHub'}
							<path d={siGithub.path} />
						{/if}
					</svg>
					<span class="type-heading-1">{platform}</span>
				</a>
			{/if}
		{/each}
	</div>
</main>
