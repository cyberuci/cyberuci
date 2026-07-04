<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

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

	// function setSort(key: SortKey) {
	// 	if (sortKey === key) {
	// 		sortDir = sortDir === 'asc' ? 'desc' : 'asc';
	// 	} else {
	// 		sortKey = key;
	// 		sortDir = key === 'year' ? 'desc' : 'asc';
	// 	}
	// }

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

	<!-- <div class="mt-6 flex gap-2">
		<button
			class="sort-btn {sortKey === 'year' ? 'sort-btn-active' : ''}"
			onclick={() => setSort('year')}
		>
			Year {sortKey === 'year' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
		</button>
		<button
			class="sort-btn {sortKey === 'name' ? 'sort-btn-active' : ''}"
			onclick={() => setSort('name')}
		>
			Name {sortKey === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
		</button>
	</div> -->

	<div class="alumni-grid mt-6">
		{#each sortedAlumni as alumni, index (index)}
			<div class="card rounded p-6">
				<!-- Avatar + name -->
				<div class="flex items-center gap-5">
					<div class="avatar {avatarClasses[index % avatarClasses.length]}">
						{getInitials(alumni.personal.preferredName)}
					</div>
					<div>
						<p class="name m-0 type-heading-2">{alumni.personal.preferredName}</p>
						<p class="role m-0 type-body-2">
							{alumni.currentRole.title}{alumni.currentRole.company
								? ` · ${alumni.currentRole.company}`
								: ''}
						</p>
					</div>
				</div>

				<!-- Graduation + major -->
				<div class="flex flex-wrap content-start gap-2">
					<span class="chip">{alumni.personal.graduationTerm}</span>
					{#each alumni.personal.majors as major (major)}
						<span class="chip">{major}</span>
					{/each}
				</div>

				<!-- Cyber role -->
				<p class="cyber-role m-0 type-body-2">
					<span class="cyber-label">{alumni.cyberUCI.role}</span>
				</p>

				<!-- Quote -->
				{#if alumni.quote}
					<p class="quote m-0 type-body-2">"{alumni.quote}"</p>
				{:else}
					<div></div>
				{/if}
			</div>
		{/each}
	</div>
</main>

<style>
	.sort-btn {
		padding: 0.35rem 0.9rem;
		border-radius: 9999px;
		border: 1px solid #444;
		background: transparent;
		color: #aaaaaa;
		font-family: 'Blinker', sans-serif;
		font-size: 0.875rem;
		cursor: pointer;
	}

	.sort-btn-active {
		background-color: #2975ba;
		border-color: #2975ba;
		color: #fff;
	}

	.alumni-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (min-width: 750px) {
		.alumni-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.alumni-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.card {
		display: grid;
		grid-row: span 4;
		grid-template-rows: subgrid;
		align-items: start;
		background-color: #222222;
		color: #eeeeee;
		border: 1px solid;
		border-color: #2975ba;
	}

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

	.name {
		font-size: 1rem;
	}

	.role {
		color: #8d8d8d;
	}

	.chip {
		background-color: #2a2a2a;
		color: #d0d0d0;
		border: 1px solid #444444;
		border-radius: 9999px;
		padding: 0.2rem 0.75rem;
		font-size: 0.85rem;
		font-family: 'TASA Explorer', sans-serif;
	}

	.cyber-label {
		color: #75bbff;
		font-weight: 600;
		margin-right: 0.35rem;
	}

	.cyber-role {
		color: #aaaaaa;
	}

	.quote {
		color: #aaaaaa;
		font-style: italic;
		line-height: 1.6;
		border-left: 3px solid #75bbff;
		padding-left: 0.75rem;
	}
</style>
