<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import PortableText from '$lib/portableText/PortableText.svelte';
	import {
		ArrowDown,
		ArrowRight,
		Download,
		Info,
		Handshake,
		Trophy,
		Calendar,
		Layers,
		Sparkles,
		Mail
	} from 'lucide-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let timelineEl: HTMLElement | undefined;
	let timelineVisible = $state(false);

	onMount(() => {
		if (!timelineEl) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					timelineVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(timelineEl);
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Sponsor Us — Cyber @ UCI</title>
</svelte:head>

<main>
	<section class="relative space-x min-h-[calc(100svh-52px)] flex flex-col justify-center py-16">
		<p class="mb-4 type-label">{data.corporatePage.hero.label}</p>
		<h1 class="type-display mt-0">
			{data.corporatePage.hero.headline}
		</h1>
		<div class="mt-4 text-gray-11 dark:text-graydark-11">
			<PortableText value={data.corporatePage.hero.description} />
		</div>
		<div class="mt-8 flex items-center justify-between gap-6">
			<div class="flex flex-wrap gap-6">
				<a
					href="#tiers"
					class="flex items-center gap-2 type-body-2 text-blue-12 decoration-none dark:text-bluedark-12 hover:decoration-underline"
				>
					<ArrowDown size={16} />
					<span class="pb-.5">View packages</span>
				</a>
				<a
					href="#contact"
					class="flex items-center gap-2 type-body-2 text-blue-12 decoration-none dark:text-bluedark-12 hover:decoration-underline"
				>
					<ArrowRight size={16} />
					<span class="pb-.5">Get in touch</span>
				</a>
			</div>
			<a
				href={data.corporatePage.sponsorshipPackage.file.asset.url}
				download
				class="mr-8 flex items-center gap-2 type-body-2 text-gray-11 decoration-none dark:text-graydark-11 hover:decoration-underline"
			>
				<Download size={16} />
				<span class="pb-.5">Download PDF</span>
			</a>
		</div>
	</section>

	<div class="space-x py-24">
		<div class="mb-20">
			<h2 class="mb-8 flex items-center gap-2 type-label font-550"><Info size={14} />About</h2>
			<div class="grid gap-6 sm:grid-cols-2">
				{#each data.corporatePage.about as card (card._key)}
					<div class="rounded background-2 p-8">
						<h3 class="mb-4 type-heading-2">{card.title}</h3>
						<p class="type-body-1 text-gray-11 line-height-relaxed dark:text-graydark-11">
							{card.description}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="grid items-start gap-y-10 lg:grid-cols-16">
			<h2 class="flex items-center gap-2 type-label font-550 lg:col-start-1 lg:col-end-5">
				<Handshake size={14} />Why Sponsor
			</h2>
			<div class="grid gap-6 lg:col-start-5 lg:col-end-17 sm:grid-cols-2">
				{#each data.corporatePage.whySponsor as reason (reason._key)}
					<div class="rounded background-2 p-8">
						<h3 class="mb-3 type-heading-2">{reason.title}</h3>
						<p class="type-body-1 text-gray-11 line-height-relaxed dark:text-graydark-11">
							{reason.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="py-24">
		<div class="space-x mb-10">
			<h2 class="flex items-center gap-2 type-label font-550"><Trophy size={14} />Achievements</h2>
		</div>

		<div class="space-x hidden sm:block" bind:this={timelineEl}>
			<div class="flex items-end">
				{#each data.corporatePage.achievements as item, i (item._key)}
					<div
						class="flex flex-1 justify-center px-2"
						style="opacity: {timelineVisible ? 1 : 0}; transform: translateY({timelineVisible
							? 0
							: -12}px); transition: opacity 0.5s ease {i * 120}ms, transform 0.5s ease {i *
							120}ms;"
					>
						{#if i % 2 === 0}
							<div
								class="w-full border-l-2 border-blue-7 rounded border-solid background-2 p-4 dark:border-bluedark-7"
							>
								<p class="mb-1 type-label text-blue-9 dark:text-bluedark-11">{item.year}</p>
								<p class="type-body-1 text-gray-11 line-height-snug dark:text-graydark-11">
									{item.text}
								</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class="relative flex py-2">
				<div
					class="absolute left-0 top-1/2 h-px bg-gray-5 -translate-y-1/2 dark:bg-graydark-5"
					style="width: {timelineVisible ? '100%' : '0%'}; transition: width 0.8s ease 0ms;"
				></div>
				{#each data.corporatePage.achievements as _, i (_._key)}
					<div class="relative z-10 flex flex-1 justify-center">
						<svg
							width="16"
							height="10"
							viewBox="0 0 16 10"
							class="text-blue-9 dark:text-bluedark-9"
							style="opacity: {timelineVisible ? 1 : 0}; transition: opacity 0.4s ease {i * 120 +
								300}ms;"
						>
							{#if i % 2 === 0}
								<polygon points="0,0 16,0 8,10" fill="currentColor" />
							{:else}
								<polygon points="0,10 16,10 8,0" fill="currentColor" />
							{/if}
						</svg>
					</div>
				{/each}
			</div>

			<div class="flex items-start">
				{#each data.corporatePage.achievements as item, i (item._key)}
					<div
						class="flex flex-1 justify-center px-2"
						style="opacity: {timelineVisible ? 1 : 0}; transform: translateY({timelineVisible
							? 0
							: 12}px); transition: opacity 0.5s ease {i * 120}ms, transform 0.5s ease {i * 120}ms;"
					>
						{#if i % 2 !== 0}
							<div
								class="w-full border-l-2 border-blue-7 rounded border-solid background-2 p-4 dark:border-bluedark-7"
							>
								<p class="mb-1 type-label text-blue-9 dark:text-bluedark-11">{item.year}</p>
								<p class="type-body-1 text-gray-11 line-height-snug dark:text-graydark-11">
									{item.text}
								</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<ul class="space-x flex flex-col gap-3 sm:hidden">
			{#each data.corporatePage.achievements as item (item._key)}
				<li
					class="flex items-center gap-4 border-l-2 border-blue-7 rounded border-solid background-2 p-4 dark:border-bluedark-7"
				>
					<span class="w-10 shrink-0 type-label text-blue-9 dark:text-bluedark-11">{item.year}</span
					>
					<span class="type-body-1 text-gray-11 dark:text-graydark-11">{item.text}</span>
				</li>
			{/each}
		</ul>
	</div>

	<div class="space-x py-24">
		<div class="grid items-start gap-y-10 lg:grid-cols-16">
			<h2 class="flex items-center gap-2 type-label font-550 lg:col-start-1 lg:col-end-5">
				<Calendar size={14} />Club Events
			</h2>
			<div class="lg:col-start-5 lg:col-end-17">
				<div class="mb-10 mt-2 text-gray-11 dark:text-graydark-11">
					<PortableText value={data.corporatePage.clubEvents.description} />
				</div>
				<div class="grid gap-x-10 gap-y-8 sm:grid-cols-2">
					{#each data.corporatePage.clubEvents.events as event (event._key)}
						<div>
							<h3 class="mb-3 type-heading-2">{event.title}</h3>
							<p class="type-body-1 text-gray-11 line-height-relaxed dark:text-graydark-11">
								{event.description}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div id="tiers" class="py-24">
		<div class="grid space-x mb-10 items-start gap-y-4 lg:grid-cols-16">
			<h2 class="flex items-center gap-2 type-label font-550 lg:col-start-1 lg:col-end-5">
				<Layers size={14} />Sponsorship Tiers
			</h2>
			<div class="text-gray-11 lg:col-start-5 lg:col-end-17 dark:text-graydark-11">
				<PortableText value={data.corporatePage.tiersDescription} />
			</div>
		</div>
		<div class="grid space-x gap-4 lg:grid-cols-4 sm:grid-cols-2">
			{#each data.corporatePage.tiers as tier (tier._key)}
				<div class="flex flex-col overflow-hidden rounded background-2">
					<div style="height: 3px; background-color: {tier.color};"></div>
					<div class="flex flex-col p-6">
						<p class="mb-1 type-label text-gray-11 dark:text-graydark-11">
							{tier.name}
						</p>
						<p class="mb-6 type-heading-1">{tier.price}</p>
						<ul class="flex flex-col list-none gap-2 pl-0">
							{#each tier.perks as perk (perk)}
								<li
									class="flex items-start gap-2 type-body-1 text-gray-11 line-height-relaxed dark:text-graydark-11"
								>
									<span
										class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
										style="background-color: {tier.color}; opacity: 0.7;"
									></span>
									{perk}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div id="contact" class="space-x py-24">
		<div class="grid gap-20 lg:grid-cols-2">
			<div>
				<h2 class="mb-10 flex items-center gap-2 type-label font-550">
					<Sparkles size={14} />Additional Opportunities
				</h2>
				<div class="mb-8 text-gray-11 dark:text-graydark-11">
					<PortableText value={data.corporatePage.additionalOpportunitiesDescription} />
				</div>
				<div class="grid gap-4 sm:grid-cols-2">
					{#each data.corporatePage.additionalOpportunities as opp (opp._key)}
						<div>
							<h3 class="mb-2 type-heading-2">{opp.title}</h3>
							<p class="type-body-1 text-gray-11 dark:text-graydark-11">{opp.description}</p>
						</div>
					{/each}
				</div>
			</div>

			<div>
				<h2 class="mb-10 flex items-center gap-2 type-label font-550">
					<Mail size={14} />Contact Us
				</h2>
				<div class="grid gap-8 sm:grid-cols-2">
					{#each data.corporatePage.contacts as contact (contact._key)}
						<div>
							<p class="mb-2 type-label">{contact.label}</p>
							<a
								href={contact.href}
								class="type-body-2 text-blue-12 decoration-none dark:text-bluedark-12 hover:decoration-underline"
							>
								{contact.value}
							</a>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>
