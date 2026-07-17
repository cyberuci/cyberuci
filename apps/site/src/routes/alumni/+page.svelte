<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '$lib/sanity/sanityClient';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const builder = imageUrlBuilder(client);

	let { data }: Props = $props();
	let alumniProfiles = data.alumni;

	const avatarClasses = ['avatar-blue', 'avatar-purple', 'avatar-teal', 'avatar-red'];

	function getInitials(name: string): string {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
	}

	type SortKey = 'year' | 'name';
	type SortDir = 'asc' | 'desc';

	let sortKey = $state<SortKey>('year');
	let sortDir = $state<SortDir>('desc');

	function termToNumber(term: string): number {
		const [season, year] = term.split(' ');
		const seasonOrder: Record<string, number> = { Spring: 2, Winter: 1, Fall: 0 };
		return parseInt(year) * 10 + (seasonOrder[season] ?? 0);
	}

	const sortedAlumni = $derived(
		[...alumniProfiles].sort((a, b) => {
			let cmp = 0;
			if (sortKey === 'year') {
				cmp = termToNumber(a.personal.graduationTerm) - termToNumber(b.personal.graduationTerm);
			} else {
				cmp = a.personal.preferredName.localeCompare(b.personal.preferredName);
			}
			return sortDir === 'asc' ? cmp : -cmp;
		})
	);
</script>

<svelte:head>
	<title>Alumni — Cyber @ UCI</title>
</svelte:head>

<main class="my-40 space-x">
	<Title title="Alumni Highlights" />

	<div class="grid grid-cols-1 mt-6 gap-4 lg:grid-cols-3 md:grid-cols-2">
		{#each sortedAlumni as alumni, index (index)}
			<div
				class="grid row-span-4 grid-rows-subgrid items-start border-1 border-blue-10 rounded border-solid background-3 p-6"
			>
				<!-- Avatar + name -->
				<div class="flex items-center gap-5">
					{#if alumni.personal.image}
						<img
							class="h-[4rem] w-[4rem] rounded-full object-cover"
							src={builder.image(alumni.personal.image).size(512, 512).url()}
							alt={alumni.personal.preferredName}
						/>
					{:else}
						<div class="avatar {avatarClasses[index % avatarClasses.length]}">
							{getInitials(alumni.personal.preferredName)}
						</div>
					{/if}
					<div>
						<p class="m-0 text-base type-heading-2">{alumni.personal.preferredName}</p>
						<p class="m-0 type-body-2 text-gray8">
							{alumni.currentRole.title}{alumni.currentRole.company
								? ` · ${alumni.currentRole.company}`
								: ''}
						</p>
					</div>
				</div>

				<!-- Graduation + major -->
				<div class="flex flex-wrap content-start gap-2">
					<span
						class="border-1 border-gray11 rounded-full border-solid background-4 px-3 py-1 text-sm type-body-2 text-gray7"
						>{alumni.personal.graduationTerm}</span
					>
					{#each alumni.personal.majors as major (major)}
						<span
							class="border-1 border-gray11 rounded-full border-solid background-4 px-3 py-1 text-sm type-body-2 text-gray7"
							>{major}</span
						>
					{/each}
				</div>

				<!-- Cyber role -->
				<p class="m-0 type-body-2">
					<span class="text-bluedark-11 font-semibold">{alumni.cyberUCI.role}</span>
				</p>

				<!-- Quote -->
				{#if alumni.quote}
					<p
						class="m-0 border-l-3 border-bluedark-11 border-l-solid pl-3 type-body-2 text-gray8 leading-[1.6] italic"
					>
						"{alumni.quote}"
					</p>
				{:else}
					<div></div>
				{/if}
			</div>
		{/each}
	</div>
</main>

<style>
	.avatar {
		width: 4rem;
		height: 4rem;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'TASAExplorer', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		flex-shrink: 0;
	}

	.avatar-blue {
		background-color: #1e3a5f;
		color: #93c5fd;
	}
	.avatar-purple {
		background-color: #2e1a5e;
		color: #c4b5fd;
	}
	.avatar-teal {
		background-color: #134e4a;
		color: #5eead4;
	}
	.avatar-red {
		background-color: #4c1d3a;
		color: #f9a8d4;
	}
</style>
