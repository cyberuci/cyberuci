<script lang="ts">
	import type { PageData } from './$types';
	import BoardMember from './BoardMember.svelte';

	export let year: number;
	export let sections: PageData['boards'][0]['sections'];
</script>

<article>
	<h1>{year} - {year + 1}</h1>
	{#each sections as { label, members }}
		<div class="section">
			{#if sections.length !== 1}
				<h2>{label}</h2>
			{/if}
			<div class="board-members">
				{#each members as member}
					<BoardMember {member} />
				{/each}
			</div>
		</div>
	{/each}
</article>

<style>
	article {
		margin-bottom: 96px;
	}

	h1 {
		margin: 24px 0;
		font-size: 2rem;
		letter-spacing: -0.022rem;
		font-weight: 500;
	}

	.section {
		margin-bottom: 48px;
	}

	h2 {
		margin: 16px 0;
		font-size: 1.5rem;
		letter-spacing: -0.019rem;
		font-weight: 450;
	}

	.board-members {
		grid-column: 2 / span 3;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(192px, 1fr));
		gap: 32px 24px;
	}
</style>
