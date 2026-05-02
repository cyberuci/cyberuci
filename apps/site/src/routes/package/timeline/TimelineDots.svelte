<script lang="ts">
	interface Props {
		index: number;
		timelineVisible: boolean;
	}

	let { index, timelineVisible }: Props = $props();

	let animationSpeed = index * 120 + 300;
</script>

<div class="relative z-10 flex flex-1 justify-center">
	<svg
		width="16"
		height="10"
		viewBox="0 0 16 10"
		class="text-blue-9 dark:text-bluedark-9"
		style="opacity: {timelineVisible ? 1 : 0}; transition: opacity 0.4s ease {animationSpeed}ms;"
	>
		{#if index % 2 === 0}
			<polygon points="0,0 16,0 8,10" fill="currentColor" />
		{:else}
			<polygon points="0,10 16,10 8,0" fill="currentColor" />
		{/if}
	</svg>
</div>
