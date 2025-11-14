<script lang="ts">
	import type { PageData } from '../../$types';

	import { MessageCircle } from 'lucide-svelte';
	import { siDiscord, siInstagram, siGithub } from 'simple-icons';

	interface Props {
		socials: NonNullable<PageData['socials']['socials']>;
	}

	let { socials }: Props = $props();
</script>

<div class="my-24 space-x">
	<div class="grid items-start gap-y-15 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<MessageCircle size={18} />
			<h2 class="type-label font-550">Socials</h2>
		</div>
		<div class="lg:col-start-5 lg:col-end-14">
			<div class="mb-6 mt-2 flex flex-col gap-6">
				{#each socials as { _key, platform, link } (_key)}
					{#if ['Discord', 'Instagram', 'GitHub'].includes(platform)}
						<div>
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								class="w-full flex items-center gap-4 text-blue-12 dark:text-bluedark-12 hover:decoration-dotted"
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
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
