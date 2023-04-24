<script lang="ts">
	import type { PageData } from './$types';
	import BoardMember from './BoardMember.svelte';

	export let sections: PageData['board']['sections'];
</script>

<article>
	{#each sections as { label, members }}
		<div class="section">
			<div class="details">
				{#if sections.length !== 1}
					<h2>{label}</h2>
				{/if}
			</div>
			<div class="board-members">
				{#each members as member, i}
					<div class="board-member" style:animation-delay="{100 * i}ms">
						<BoardMember {member} />
					</div>
				{/each}
			</div>
		</div>
	{/each}
</article>

<style lang="scss">
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
	.section {
		margin-bottom: 48px;
		display: grid;

		@media (min-width: 1120px) {
			grid-template-columns: 1fr 4fr;
		}

		.details {
			animation: slide-in 500ms cubic-bezier(0.165, 0.84, 0.44, 1);

			h2 {
				margin: 8px 0 32px 0;
				font-size: 1.5rem;
				letter-spacing: -0.019rem;
				font-weight: 450;
			}
		}

		.board-members {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(144px, 1fr));
			gap: 48px 6px;

			@media (min-width: 1120px) {
				grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
				gap: 48px 24px;
			}

			.board-member {
				animation: slide-in 500ms cubic-bezier(0.165, 0.84, 0.44, 1) both;
			}
		}
	}
</style>
