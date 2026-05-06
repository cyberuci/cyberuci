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

<div
	class="flex flex-1 justify-center px-2"
	style="opacity: {timelineVisible ? 1 : 0}; transform: translateY({timelineVisible
		? 0
		: 12}px); transition: opacity 0.5s ease {animationSpeed *
		120}ms, transform 0.5s ease {animationSpeed * 120}ms;"
>
	{#if eventVisible}
		<div
			class="w-full border-l-2 border-blue-7 rounded border-solid background-2 p-4 dark:border-bluedark-7"
		>
			<p class="mb-1 type-label text-blue-9 dark:text-bluedark-11">{year}</p>
			<p class="type-body-1 text-gray-11 line-height-snug dark:text-graydark-11">
				{text}
			</p>
		</div>
	{/if}
</div>
