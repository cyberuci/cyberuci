<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import ScanLog from './ScanLog.svelte';
	import { CircleDashed } from 'lucide-svelte';

	const focusAreas = [
		{ tag: '[SPONSOR]', title: 'Company Partnerships', description: '[text]' },
		{ tag: '[CAMPUS]', title: 'Campus partnerships', description: '[text]' },
		{ tag: '[NETWORK]', title: 'Inter-collegiate ties', description: '[text]' },
		{ tag: '[BRAND]', title: 'Cross-team coordination', description: '[text]' }
	];
</script>

<svelte:head>
	<title>Outreach — Cyber @ UCI</title>
</svelte:head>

<div class="my-40 space-x">
	<Title title="Outreach" />

	<p class="mb-16 max-w-prose type-body-2 text-2">
		The team responsible for every relationship Cyber@UCI has outside its own walls: sponsors,
		partner clubs, campus departments, and the wider community.
	</p>

	<ScanLog />

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<CircleDashed size={18} />
			<h2 class="type-label font-550">What We Do</h2>
		</div>
		<div class="flex flex-col gap-6 lg:col-start-5 lg:col-end-15 md:flex-row">
			<div class="flex-1 type-body-2 text-2 space-y-4">
				<p class="m-0">
					Our outreach subteam supports and facilitates the club's external relationships, whether
					if its with other clubs, campus organizations & staff, clubs from other colleges and
					universities, or companies. They work closely with our marketing subteams to support our
					club's branding and visibility, alongside developing sponsorship material for our outreach
					efforts.
				</p>
				<p class="m-0">
					Every "host" in the log above is a relationship someone on the team is actively
					maintaining, not a one-time email, but an ongoing line of contact.
				</p>
			</div>
			<div
				class="aspect-video w-full flex shrink-0 items-center justify-center rounded-md background-2 type-label text-2 md:w-48"
			>
				Outreach event photo
			</div>
		</div>
	</div>

	<div class="grid mt-24 items-start gap-y-6 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<CircleDashed size={18} />
			<h2 class="type-label font-550">Focus Areas</h2>
		</div>
		<ul class="m-0 list-none p-0 lg:col-start-5 lg:col-end-15">
			{#each focusAreas as { tag, title, description } (title)}
				<li
					class="grid grid-cols-[minmax(0,140px)_1fr] gap-6 border-0 border-b border-gray-7 border-solid py-6 last:border-b-0 dark:border-graydark-7 first:pt-0"
				>
					<span class="type-label text-blue-11 dark:text-bluedark-11">{tag}</span>
					<div>
						<p class="m-0 font-600 type-body-1">{title}</p>
						<p class="mb-0 mt-1 text-2 type-body-1">{description}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
