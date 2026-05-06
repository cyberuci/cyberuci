<script lang="ts">
	import Tier from './Tier.svelte';
	import Event from './Event.svelte';

	import type { PageData } from './$types';
	import PortableText from '$lib/portableText/PortableText.svelte';
	import {
		ArrowDown,
		ArrowRight,
		Download,
		Info,
		Handshake,
		Calendar,
		Layers,
		Sparkles,
		Mail
	} from 'lucide-svelte';
	import AchievementTimeline from './timeline/AchievementTimeline.svelte';

	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';

	const builder = imageUrlBuilder(client);

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
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
		<!-- <div class="mb-8 "></div> -->
		<div class="mt-4 max-w-prose type-body-2 text-gray-11 dark:text-graydark-11">
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
				{#each data.corporatePage.about as { _key, title, description } (_key)}
					<Event {title} {description} background={true} />
				{/each}
			</div>
		</div>

		<div class="grid items-start gap-y-10 lg:grid-cols-16">
			<h2 class="flex items-center gap-2 type-label font-550 lg:col-start-1 lg:col-end-5">
				<Handshake size={14} />Why Sponsor
			</h2>
			<div class="grid gap-6 lg:col-start-5 lg:col-end-17 sm:grid-cols-2">
				{#each data.corporatePage.whySponsor as { _key, title, description } (_key)}
					<Event {title} {description} background={true} />
				{/each}
			</div>
		</div>
	</div>

	<div class="py-24">
		<AchievementTimeline achievements={data.corporatePage.achievements} />
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
					{#each data.corporatePage.clubEvents.events as { _key, title, description, image }, i (_key)}
						<img
							class="block h-auto w-full rounded-sm lg:hidden"
							src={builder.image(image).auto('format').width(1024).height(600).url()}
							alt={image.alt}
						/>
						<img
							class={`h-auto w-full rounded-sm block hidden ${i % 2 == 0 ? 'lg:block' : ''}`}
							src={builder.image(image).auto('format').width(1024).height(600).url()}
							alt={image.alt}
						/>
						<Event {title} {description} background={false} />
						<img
							class={`h-auto w-full rounded-sm hidden ${i % 2 == 1 ? 'lg:block' : ''}`}
							src={builder.image(image).auto('format').width(1024).height(600).url()}
							alt={image.alt}
						/>
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
			<!-- <div class="text-gray-11 lg:col-start-5 lg:col-end-17 dark:text-graydark-11"> -->
			<div class="type-body-2 lg:col-start-5 lg:col-end-17 dark:text-graydark-11">
				<PortableText value={data.corporatePage.tiersDescription} />
			</div>
		</div>
		<div class="grid space-x gap-4 lg:grid-cols-4 sm:grid-cols-2">
			{#each data.corporatePage.tiers as { _key, name, price, inheritedPerks, perks, color } (_key)}
				<Tier {name} {price} {inheritedPerks} {perks} {color} />
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
					{#each data.corporatePage.additionalOpportunities as { _key, title, description } (_key)}
						<Event {title} {description} background={false} />
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
