<script lang="ts">
	import type { PageData } from './$types';
	import BoardMember from './BoardMember.svelte';

	export let members: PageData['board']['members'];
</script>

<article>
	<div class="board-members">
		{#each members as { person, titles }, i}
			<div class="section">
				<div class="board-member" style:animation-delay="{100 * i}ms">
					<BoardMember {person} {titles} />
				</div>
			</div>
		{/each}
	</div>
</article>

<style lang="scss">
	@use '$lib/common/styles/typography' as typography;

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(24px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	article {
		margin-bottom: 96px;
	}

	.board-members {
		margin-bottom: 48px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(144px, 1fr));
		gap: 48px 6px;

		@media (min-width: 1120px) {
			grid-template-columns: repeat(auto-fill, minmax(192px, 1fr));
			gap: 48px 24px;
		}

		.board-member {
			animation: slide-in 500ms cubic-bezier(0.165, 0.84, 0.44, 1) both;
		}
	}
</style>
