<script lang="ts">
	interface Props {
		text: string;
		year: string;
		animationSpeed: number;
		eventVisible: boolean;
		timelineVisible: boolean;
	}

	let { text, year, animationSpeed, eventVisible, timelineVisible }: Props = $props();
</script>

<!-- animationSpeed staggers each card so they don't all pop in at once -->
<div
	class="flex flex-1 justify-center px-2"
	style="opacity: {timelineVisible ? 1 : 0}; transform: translateY({timelineVisible
		? 0
		: 12}px); transition: opacity 0.5s ease {animationSpeed *
		120}ms, transform 0.5s ease {animationSpeed * 120}ms;"
>
	{#if eventVisible}
		<div
			class="w-full border-2 border-blue-7 rounded-lg border-solid background-2 p-4 dark:border-bluedark-7"
		>
			<p class="mb-1 type-label text-blue-9 dark:text-bluedark-11">{year}</p>
			<p class="text-gray-11 line-height-snug type-body-1 dark:text-graydark-11">
				{text}
			</p>
		</div>
	{/if}
</div>
