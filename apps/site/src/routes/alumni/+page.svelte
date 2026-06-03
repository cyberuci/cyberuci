<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';

	const alumniProfiles = [
		{
			id: 1,
			personal: {
				preferredName: 'Michelle',
				graduationTerm: 'Spring 2026',
				major: 'Business Administration (Emphasis in Information Systems)'
			},
			currentRole: { title: 'Swing Trader & Content Creator', company: null },
			cyberUCI: { role: 'Social Media Lead' },
			quote:
				"Don't pressure yourself to be great. All that does is hold you back because you are rewiring your brain to focus on what you lack and the negatives."
		},
		{
			id: 2,
			personal: {
				preferredName: 'Eric',
				graduationTerm: 'Spring 2026',
				major: 'Computer Engineering, Mathematics'
			},
			currentRole: { title: 'Software Engineer', company: 'Formal' },
			cyberUCI: { role: 'CCDC Linux Team, Co-Lead' },
			quote:
				'I wish I had participated in cybersecurity earlier — I only started going to Cyber@UCI meetings in fourth year!'
		},
		{
			id: 3,
			personal: {
				preferredName: 'Zayn Lin',
				graduationTerm: 'Fall 2023',
				major: 'Computer Science'
			},
			currentRole: { title: 'Red Team', company: 'Moveworks (ServiceNow)' },
			cyberUCI: { role: 'Captain/Lead (CCDC/CPTC)' },
			quote: 'We do not rise to the occasion, we fall to the level of our training.'
		},
		{
			id: 4,
			personal: {
				preferredName: 'Charles Wu',
				graduationTerm: 'Spring 2024',
				major: 'Computer Science'
			},
			currentRole: { title: 'Linux Systems Engineer', company: 'Cyberspatial' },
			cyberUCI: { role: 'CCDC Team Captain, Workshop Lead' },
			quote:
				"Focus on developing skills, not aiming for a certain grade. Whatever rabbit hole you go down, as long as you really deeply learn it, it won't be wasted time."
		}
	];

	const avatarClasses = ['avatar-blue', 'avatar-purple', 'avatar-teal', 'avatar-red'];

	function splitMajors(major: string): string[] {
		const parts: string[] = [];
		for (const part of major.split(',').map((s) => s.trim())) {
			const match = part.match(/^([^(]+?)\s*\(([^)]+)\)\s*$/);
			if (match) {
				parts.push(match[1].trim());
				parts.push(match[2].replace(/^emphasis in\s+/i, '').trim());
			} else {
				parts.push(part);
			}
		}
		return parts;
	}

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

	function setSort(key: SortKey) {
		if (sortKey === key) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDir = key === 'year' ? 'desc' : 'asc';
		}
	}

	function termToNumber(term: string): number {
		const [season, year] = term.split(' ');
		const seasonOrder: Record<string, number> = { Spring: 2, Winter: 1, Fall: 0 };
		return parseInt(year) * 10 + (seasonOrder[season] ?? 0);
	}

	const sorted = $derived(
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

	<div class="mt-6 flex gap-2">
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
	</div>

	<div class="alumni-grid mt-6">
		{#each sorted as alumni (alumni.id)}
			<div class="card rounded p-6">
				<!-- Avatar + name -->
				<div class="flex items-center gap-5">
					<div class="avatar {avatarClasses[(alumni.id - 1) % avatarClasses.length]}">
						{getInitials(alumni.personal.preferredName)}
					</div>
					<div>
						<p class="name type-heading-2">{alumni.personal.preferredName}</p>
						<p class="role type-body-2">
							{alumni.currentRole.title}{alumni.currentRole.company
								? ` · ${alumni.currentRole.company}`
								: ''}
						</p>
					</div>
				</div>

				<!-- Graduation + major -->
				<div class="flex flex-wrap content-start gap-2">
					<span class="chip">{alumni.personal.graduationTerm}</span>
					{#each splitMajors(alumni.personal.major) as major (major)}
						<span class="chip">{major}</span>
					{/each}
				</div>

				<!-- Cyber role -->
				<p class="cyber-role type-body-2">
					<span class="cyber-label">{alumni.cyberUCI.role}</span>
				</p>

				<!-- Quote -->
				{#if alumni.quote}
					<p class="quote type-body-2">"{alumni.quote}"</p>
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
		border: 1px solid #d0d0d0;
		background: transparent;
		color: #505050;
		font-family: 'Blinker', sans-serif;
		font-size: 0.875rem;
		cursor: pointer;
	}
	.sort-btn-active {
		background-color: #2975ba;
		border-color: #2975ba;
		color: #fff;
	}
	@media (prefers-color-scheme: dark) {
		.sort-btn {
			border-color: #444;
			color: #aaaaaa;
		}
		.sort-btn-active {
			background-color: #2975ba;
			border-color: #2975ba;
			color: #fff;
		}
	}

	.alumni-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	@media (min-width: 640px) {
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
		background-color: #f4f4f4;
		color: #202020;
		border: 1px solid;
		border-color: var(--cyber-blue-4);
	}
	@media (prefers-color-scheme: dark) {
		.card {
			background-color: #222222;
			color: #eeeeee;
			border-color: #2975ba;
		}
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
		background-color: #dbeafe;
		color: #1e40af;
	}
	.avatar-purple {
		background-color: #ede9fe;
		color: #6d28d9;
	}
	.avatar-teal {
		background-color: #ccfbf1;
		color: #0f766e;
	}
	.avatar-red {
		background-color: #fce7f3;
		color: #9d174d;
	}

	@media (prefers-color-scheme: dark) {
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
	}

	.name {
		font-size: 1rem;
	}

	.role {
		color: #8d8d8d;
	}

	.chip {
		background-color: #e8e8e8;
		color: #303030;
		border: 1px solid #c8c8c8;
		border-radius: 9999px;
		padding: 0.2rem 0.75rem;
		font-size: 0.85rem;
		font-family: 'TASAExplorer', sans-serif;
	}
	@media (prefers-color-scheme: dark) {
		.chip {
			background-color: #2a2a2a;
			color: #d0d0d0;
			border-color: #444444;
		}
	}

	.cyber-label {
		color: #2975ba;
		font-weight: 600;
		margin-right: 0.35rem;
	}
	@media (prefers-color-scheme: dark) {
		.cyber-label {
			color: #75bbff;
		}
	}

	.cyber-role {
		color: #505050;
	}
	@media (prefers-color-scheme: dark) {
		.cyber-role {
			color: #aaaaaa;
		}
	}

	.quote {
		color: #505050;
		font-style: italic;
		line-height: 1.6;
		border-left: 3px solid #2975ba;
		padding-left: 0.75rem;
	}
	@media (prefers-color-scheme: dark) {
		.quote {
			color: #aaaaaa;
			border-left-color: #75bbff;
		}
	}
</style>
