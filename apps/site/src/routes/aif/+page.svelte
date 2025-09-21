<script lang="ts">
	import type { PageProps } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import { siDiscord, siInstagram, siGithub } from 'simple-icons';

	const { data }: PageProps = $props();
</script>

<main class="my-40 space-x">
	<Title title="Cyber @ UCI" />
	<div class="grid lg:grid-cols-2 gap-1 pb-1">
		<div class="px-3 py-3 rounded-sm background-2">
			<p class="my-2 font-normal uppercase type-label">Weds Oct 1st | 6:30 – 7:30 PM | ISEB 1010</p>
			<h2 class="mt-8 mb-6 font-semibold type-heading-1">Introductory Meeting</h2>
			<p class="max-w-prose type-body-2">Learn more about Cyber @ UCI and our various teams.</p>
		</div>
		<div class="px-3 py-3 rounded-sm background-2">
			<p class="my-2 font-normal uppercase type-label">Thurs Oct 2nd | 6:00 – 7:00 PM | DBH 6011</p>
			<h2 class="mt-8 mb-6 font-semibold type-heading-1">Intern Panel</h2>
			<p class="max-w-prose type-body-2">
				Discover opportunities for cybersecurity internships and how to prepare!
			</p>
		</div>
	</div>
	<div class="grid lg:grid-cols-3 gap-1">
		{#each data.socials as { platform, link }}
			{#if ['Discord', 'Instagram', 'GitHub'].includes(platform)}
				<a
					class="px-3 lg:px-8 py-12 rounded-sm bg-blue-1 dark:bg-bluedark-1 w-full flex items-center gap-4 text-blue-12 dark:text-bluedark-12 hover:decoration-dotted lg:justify-center"
					href={link}
				>
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
