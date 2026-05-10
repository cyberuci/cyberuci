<script lang="ts">
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';

	interface Props {
		isOpen: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		images: { asset: any; alt?: string }[] | null;
	}

	let { isOpen, images }: Props = $props();

	const builder = imageUrlBuilder(client);
	const mainSrc = $derived(images?.[0] ? builder.image(images[0]).auto('format').url() : null);
	const mainAlt = $derived(images?.[0]?.alt ?? 'HackerLab');
	const mapSrc = $derived(images?.[1] ? builder.image(images[1]).auto('format').url() : null);
	const mapAlt = $derived(images?.[1]?.alt ?? 'HackerLab location map');

	const now = new Date();
	const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
</script>

<div class="my-12 space-x" id="hacker-lab">
	<div class="flex flex-col gap-3">
		<div class="flex items-center gap-2">
			<h2 class="text-lg type-heading-2 font-550">
				<span aria-hidden="true"
					><span style="color:#FF6B6B">/</span><span style="color:#FF9F43">/</span><span
						style="color:#FECA57">/</span
					><span style="color:#1DD1A1">/</span><span style="color:#48DBFB">/</span><span
						style="color:#54A0FF">/</span
					><span style="color:#5F27CD">/</span><span style="color:#C44FE3">/</span><span
						style="color:#FF6B9D">/</span
					></span
				> HackerLab
			</h2>
		</div>

		{#if mainSrc}
			<img class="h-auto w-full rounded-2xl object-cover" src={mainSrc} alt={mainAlt} />
		{/if}

		<div class="grid grid-cols-2 gap-4">
			<div class="h-84 flex flex-col justify-between rounded-2xl bg-gray-4 p-6 dark:bg-graydark-3">
				<p class="text-white type-heading-1">Visit HackerLab</p>
				<div
					class="overflow-hidden rounded-xl bg-gray-6 dark:bg-graydark-5"
					style="border-left: 4px solid {isOpen ? '#22c55e' : '#ef4444'}"
				>
					<div class="p-4">
						<p class="text-white text-lg type-body-1 font-450">
							{isOpen ? 'HackerLab Open' : 'HackerLab Closed'}
						</p>
						<p class="mt-1 type-body-1 text-gray-11 dark:text-graydark-11">
							{isOpen ? 'Come and Visit us at ISEB 1200!' : 'We will be back soon!'}
						</p>
						<p class="mt-2 text-xs type-body-1 text-gray-9 font-medium dark:text-graydark-9">
							Today at {timeStr}
						</p>
					</div>
				</div>
			</div>
			{#if mapSrc}
				<img class="h-84 w-full rounded-2xl object-cover" src={mapSrc} alt={mapAlt} />
			{/if}
		</div>
	</div>
</div>
