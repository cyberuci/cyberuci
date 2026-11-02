<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { isExternalLink, type SiteNotice } from '$lib/common/notices';

	interface Props {
		notice: SiteNotice;
	}

	let { notice }: Props = $props();

	const external = $derived(notice.link ? isExternalLink(notice.link) : false);
</script>

{#if notice.link}
	<a
		href={notice.link}
		{...external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
		class="notice-banner group focus-visible:outline-white min-h-11 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-center decoration-none transition-colors focus-visible:outline-2 focus-visible:outline-offset--2"
	>
		<span class="type-body-1 font-500">{notice.message}</span>
		<ArrowRight
			size={16}
			strokeWidth={2}
			class="shrink-0 transition-transform group-hover:translate-x-1"
		/>
	</a>
{:else}
	<div
		class="notice-banner min-h-11 w-full flex items-center justify-center px-4 py-2.5 text-center"
	>
		<span class="type-body-1 font-500">{notice.message}</span>
	</div>
{/if}

<style>
	.notice-banner {
		background: #31b7fb;
		color: #0e1822;
	}

	a.notice-banner:hover {
		background: #f3f3f3;
	}
</style>
