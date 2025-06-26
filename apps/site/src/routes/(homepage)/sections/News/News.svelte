<script lang="ts">
	import type { PageData } from '../../$types';

	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { ArrowUpRight } from 'lucide-svelte';

	const builder = imageUrlBuilder(client);

	interface Props {
		news: NonNullable<PageData['homepage']['highlightNews']>;
	}

	const { news }: Props = $props();
</script>

<div class="min-h-lg h-3xl max-h-[70svh] relative mb-60 text-graydark-12">
	<div class="flex flex-col justify-end h-full gap-4 pb-15 space-x sm:bt-30">
		<h1 class="m-0 type-heading-2 max-w-[40ch] text-balance">
			{news.article?.title}
		</h1>
		<div class="flex gap-6">
			<span class="type-label">
				{news.article?.date}
			</span>
			<a
				href="/news/{news.article?.slug.current}"
				class="flex items-end gap-1 text-graydark-12 type-label decoration-none hover:text-bluedark-12 hover:decoration-underline"
			>
				Full Story <ArrowUpRight class="mb-.5" size={16} />
			</a>
		</div>
	</div>
	<div class="absolute inset-0 object-cover w-full h-full -z-1 gradient"></div>
	{#if news.article}
		<img
			class="absolute inset-0 object-cover w-full h-full -z-2"
			src={builder.image(news.article.cover).auto('format').url()}
		/>
	{/if}
</div>

<style lang="scss">
	.gradient {
		background: linear-gradient(
			to bottom,
			hsla(0, 0%, 0%, 0) 0%,
			hsla(0, 0%, 0%, 0.011) 16.6%,
			hsla(0, 0%, 0%, 0.034) 30.1%,
			hsla(0, 0%, 0%, 0.066) 40.6%,
			hsla(0, 0%, 0%, 0.107) 48.8%,
			hsla(0, 0%, 0%, 0.154) 55%,
			hsla(0, 0%, 0%, 0.206) 59.7%,
			hsla(0, 0%, 0%, 0.26) 63.2%,
			hsla(0, 0%, 0%, 0.315) 65.9%,
			hsla(0, 0%, 0%, 0.37) 68.4%,
			hsla(0, 0%, 0%, 0.422) 71%,
			hsla(0, 0%, 0%, 0.469) 74.1%,
			hsla(0, 0%, 0%, 0.511) 78.1%,
			hsla(0, 0%, 0%, 0.544) 83.5%,
			hsla(0, 0%, 0%, 0.568) 90.6%,
			hsla(0, 0%, 0%, 0.58) 100%
		);
	}
</style>
