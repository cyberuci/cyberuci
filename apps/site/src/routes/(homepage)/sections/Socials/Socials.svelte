<script lang="ts">
	import type { PageData } from '../../$types';

	import { siDiscord, siInstagram, siGithub } from 'simple-icons';

	interface Props {
		socials: NonNullable<PageData['socials']['socials']>;
	}

	let { socials }: Props = $props();
</script>

<div class="my-24 space-x">
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-2">
			<h2 class="type-label font-550">
				<span aria-hidden="true"
					><span style="color:#FF6B6B">/</span><span style="color:#FF9F43">/</span><span
						style="color:#FECA57">/</span
					><span style="color:#1DD1A1">/</span><span style="color:#48DBFB">/</span><span
						style="color:#54A0FF">/</span
					><span style="color:#5F27CD">/</span><span style="color:#C44FE3">/</span><span
						style="color:#FF6B9D">/</span
					></span
				> Socials
			</h2>
		</div>
		<div class="w-full">
			<div class="flex flex-row gap-3">
				{#each socials as { _key, platform, link } (_key)}
					{#if ['Discord', 'Instagram', 'GitHub'].includes(platform)}
						<!-- eslint-disable svelte/no-navigation-without-resolve -->
						<a
							class="social-btn h-14 flex flex-1 items-center justify-center rounded-2xl"
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={platform}
						>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
							<svg
								class="size-6"
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
						</a>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.social-btn {
		background-color: #e0e0e0; /* gray-5 */
		color: #202020; /* gray-12 */
		transition:
			background-color 0.15s,
			color 0.15s;
	}

	.social-btn:hover {
		background-color: black;
		color: white;
	}

	@media (prefers-color-scheme: dark) {
		.social-btn {
			background-color: #222222; /* graydark-3 */
			color: #eeeeee; /* graydark-12 */
		}

		.social-btn:hover {
			background-color: white;
			color: black;
		}
	}
</style>
