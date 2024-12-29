<script lang="ts">
	import type { PageData } from './$types';
	import BoardMember from './BoardMember.svelte';

	export let members: PageData['board']['members'];
</script>

<div class="grid grid-cols-4 gap-x-8 gap-y-18">
	{#each members as { person, titles }, i}
		<div class="board-member" style:animation-delay="{100 * i}ms">
			<BoardMember {person} {titles} />
		</div>
	{/each}
</div>
