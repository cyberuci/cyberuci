<script lang="ts">
	import { Image } from 'lucide-svelte';

	interface Props {
		year: string;
		title: string;
		description: string;
		image?: string;
		alt?: string;
	}

	let { year, title, description, image, alt }: Props = $props();
</script>

<article class="overflow-hidden rounded-lg background-2">
	<div class="aspect-video flex items-center justify-center bg-[#0a0a0a]">
		{#if image}
			<img src={image} alt={alt || title} class="h-full w-full object-cover" />
		{:else}
			<div class="flex flex-col items-center gap-2 text-gray-9 dark:text-graydark-9">
				<Image size={18} />
				<span class="type-label">Coming Soon!</span>
			</div>
		{/if}
	</div>
	<div class="px-3 py-3">
		<span class="type-label text-blue-11 dark:text-bluedark-11">[{year}]</span>
		<p class="mb-0 mt-2 type-body-1 font-600">{title}</p>
		<p class="mb-0 mt-1 type-body-1 text-2">{description}</p>
	</div>
</article>
