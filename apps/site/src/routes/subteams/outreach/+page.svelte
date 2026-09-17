<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import ScanLog from './ScanLog.svelte';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import { ScanSearch, BadgeQuestionMark } from 'lucide-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const builder = imageUrlBuilder(client);
	const { title, intro, whatWeDo, scanLog, focusAreas } = data.outreach;
</script>

<svelte:head>
	<title>{title} — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title {title} />

	<p class="mb-16 max-w-prose type-body-1 text-2">
		{intro}
	</p>

	<ScanLog header={scanLog.header} command={scanLog.command} entries={scanLog.entries} />

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<BadgeQuestionMark size={18} />
			<h2 class="m-0 type-label font-550">WHAT WE DO</h2>
		</div>
		<div
			class="flex flex-col gap-6 lg:col-start-5 lg:col-end-17 md:flex-row md:items-stretch md:gap-10"
		>
			<div class="flex-1 type-body-1 text-2 lg:mr-6 md:mr-4 space-y-4">
				<p class="m-0">{whatWeDo.body}</p>
			</div>
			<div class="relative mx-auto w-full flex-shrink-0 md:mx-0 lg:w-90 md:w-72">
				<div class="slider-box">
					<div class="slider-inner">
						{#each Object.entries(whatWeDo.images) as [key, image] (key)}
							<figure class="slide">
								<div class="slide-frame">
									<img
										class="rounded-lg"
										src={builder.image(image).width(1500).height(900).dpr(2).url()}
										alt={image.alt}
									/>
								</div>
								<figcaption class="bg-black my-2 text-center type-body-1">{image.alt}</figcaption>
							</figure>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<ScanSearch size={18} />
			<h2 class="m-0 type-label font-550 uppercase">{focusAreas.heading}</h2>
		</div>
		<ul class="m-0 list-none p-0 lg:col-start-5 lg:col-end-17">
			{#each focusAreas.areas as { _key, tag, title: areaTitle, description } (_key)}
				<li
					class="grid grid-cols-1 items-baseline gap-2 border-0 border-b border-gray-7 border-solid py-6 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6 last:border-b-0 dark:border-graydark-7 first:pt-0 last:pb-0"
				>
					<span class="m-0 type-label text-blue-11 dark:text-bluedark-11">[{tag}]</span>
					<div>
						<p class="m-0 type-body-1 font-600">{areaTitle}</p>
						<p class="mb-0 mt-1 type-body-1 text-2">{description}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.slider-box {
		width: 100%;
		overflow: hidden; /* Hides the other images */
		position: relative;
	}

	/* The long film strip container carrying all images */
	.slider-inner {
		display: flex;
		width: 400%; /* 100% * 4 images */
		height: 100%;
		animation: slideAnimation 16s infinite ease-in-out;
	}

	/* Individual slide item */
	.slide {
		width: 25%; /* 100% divided by 4 images */
		height: 100%;
		position: relative;
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	.slide-frame {
		position: relative;
		width: 100%;
	}

	.slide img {
		width: 100%;
		height: auto;
		object-fit: cover;
		display: block;
	}

	@media (min-width: 768px) {
		.slider-box {
			position: absolute;
			inset: 0;
		}

		.slide-frame {
			flex: 1;
			min-height: 0;
		}

		.slide img {
			position: absolute;
			inset: 0;
			height: 100%;
		}

		.slide figcaption {
			margin-bottom: 0;
			flex-shrink: 0;
		}
	}

	@keyframes slideAnimation {
		0%,
		20% {
			transform: translateX(0%);
		}
		25%,
		45% {
			transform: translateX(-25%);
		}
		50%,
		70% {
			transform: translateX(-50%);
		}
		75%,
		95% {
			transform: translateX(-75%);
		}
		100% {
			transform: translateX(0%);
		}
	}
</style>
