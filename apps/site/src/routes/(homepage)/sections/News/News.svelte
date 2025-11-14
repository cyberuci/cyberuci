<script lang="ts">
	import type { PageData } from '../../$types';

	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { ArrowUpRight } from 'lucide-svelte';
	import { resolve } from '$app/paths';

	const builder = imageUrlBuilder(client);

	interface Props {
		article: NonNullable<NonNullable<PageData['homepage']['highlightNews']>['article']>;
	}

	const { article }: Props = $props();
</script>

<div class="relative mb-60 h-3xl max-h-[70svh] min-h-lg text-graydark-12">
	<div class="sm:bt-30 space-x h-full flex flex-col justify-end gap-4 pb-15">
		<h1 class="m-0 max-w-[40ch] text-balance type-heading-2">
			{article.title}
		</h1>
		<div class="flex gap-6">
			<span class="type-label">
				{article.date}
			</span>
			<a
				href={resolve('/news/[slug]', {
					slug: article.slug.current
				})}
				class="flex items-end gap-1 type-label text-graydark-12 decoration-none hover:text-bluedark-12 hover:decoration-underline"
			>
				Full Story <ArrowUpRight class="mb-.5" size={16} />
			</a>
		</div>
	</div>
	<div class="gradient absolute inset-0 h-full w-full object-cover -z-1"></div>
	<img
		alt="The cover of the featured news article."
		class="absolute inset-0 h-full w-full object-cover -z-2"
		src={builder.image(article.cover).auto('format').url()}
	/>
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
