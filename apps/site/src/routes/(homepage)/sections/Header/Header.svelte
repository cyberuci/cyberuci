<script lang="ts">
	// Libraries
	import { goto } from '$app/navigation';
	import { ArrowRight, CalendarDays, Medal, FlaskConical, MessagesSquare } from 'lucide-svelte';
	import { client } from '$lib/sanity/sanityClient';
	import {
		createImageUrlBuilder as imageUrlBuilder,
		type SanityImageSource
	} from '@sanity/image-url';

	// Internal Components and Scripts
	import ListItem from './ListItem.svelte';

	const builder = imageUrlBuilder(client);

	interface Announcement {
		enabled: boolean;
		opensAt: string;
		closesAt: string;
		link: string;
	}

	interface Props {
		data: SanityImageSource;
		announcement?: Announcement | null;
	}

	let { data, announcement }: Props = $props();

	let now = new Date();
	let opensAt = $derived(announcement ? new Date(announcement.opensAt) : null);
	let closesAt = $derived(announcement ? new Date(announcement.closesAt) : null);
	let webTeamApplyLink = $derived(
		announcement?.enabled &&
			announcement.link &&
			opensAt !== null &&
			closesAt !== null &&
			!Number.isNaN(opensAt.getTime()) &&
			!Number.isNaN(closesAt.getTime()) &&
			now < closesAt
			? announcement.link
			: null
	);
</script>

<div class="relative z-0 mb-6" style="margin-top: -68px">
	<div class="relative overflow-hidden" style="height: 100svh;">
		<img
			alt="Cyber@UCI club members collaborating in the HackerLab."
			class="absolute inset-0 h-full w-full object-cover object-center"
			src={builder.image(data).url()}
		/>

		<div
			class="absolute inset-0"
			style="background: linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.4) 100%);"
		></div>

		<div
			class="absolute inset-0 z-1 flex flex-col justify-between pb-8"
			style="padding-top: calc(68px + 2rem);"
		>
			<div class="space-x w-full">
				<h1 class="text-white type-display mb-0 mt-0">
					Cybersecurity matters.<br />
					Be part of the solution.
				</h1>
				{#if webTeamApplyLink}
					<a
						href={webTeamApplyLink}
						target="_blank"
						rel="noreferrer"
						class="web-team-link group mt-4 inline-flex items-center gap-2 type-body-1 decoration-none"
					>
						Like the website? Join the Web team
						<ArrowRight
							size={16}
							strokeWidth={2}
							class="shrink-0 transition-transform group-hover:translate-x-1"
						/>
					</a>
				{/if}
			</div>
			<div class="space-x w-full">
				<ul class="grid grid-cols-2 mx-auto w-full list-none gap-0.5 p-0 lg:w-3/5">
					<ListItem
						Icon={FlaskConical}
						title="Visit HackerLab"
						onClick={() => {
							document.getElementById('hacker-lab')?.scrollIntoView({
								behavior: 'smooth'
							});
						}}
					/>
					<ListItem
						Icon={CalendarDays}
						title="Visit Events"
						onClick={async () => {
							await goto('/events');
						}}
					/>
					<ListItem
						Icon={MessagesSquare}
						title="Join Our Discord"
						onClick={() => {
							window.open('https://discord.gg/fMzGVSRMkU', '_blank', 'noopener,noreferrer');
						}}
					/>
					<ListItem
						Icon={Medal}
						title="Achievements"
						onClick={async () => {
							await goto('/timeline');
						}}
					/>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.web-team-link {
		color: #31b7fb;
	}

	.web-team-link:hover {
		color: #f3f3f3;
	}

	.web-team-link:focus-visible {
		outline: 2px solid #f3f3f3;
		outline-offset: 4px;
	}
</style>
