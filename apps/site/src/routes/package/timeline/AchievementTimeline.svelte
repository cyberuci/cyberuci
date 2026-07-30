<script lang="ts">
	import { onMount } from 'svelte';

	import AchievementBig from './AchievementBig.svelte';
	import AchievementSmall from './AchievementSmall.svelte';
	import TimelineDots from './TimelineDots.svelte';

	interface EachAchievement {
		_key: string;
		text: string;
		year: string;
	}

	interface Props {
		achievements: EachAchievement[];
	}

	let { achievements }: Props = $props();

	let timelineEl: HTMLElement | undefined;
	let timelineVisible = $state(false);

	// kick off the fade/slide once the timeline scrolls into view
	onMount(() => {
		if (!timelineEl) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					timelineVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(timelineEl);
		return () => observer.disconnect();
	});
</script>

<!-- Desktop: zigzag layout (even years above the line, odd below) -->
<div class="hidden sm:block" bind:this={timelineEl}>
	<div class="flex items-end">
		{#each achievements as { _key, text, year }, i (_key)}
			<AchievementBig
				{text}
				{year}
				animationSpeed={i}
				eventVisible={i % 2 == 0}
				{timelineVisible}
			/>
		{/each}
	</div>

	<div class="relative flex py-2">
		<div
			class="absolute left-0 top-1/2 h-px bg-gray-5 -translate-y-1/2 dark:bg-graydark-5"
			style="width: {timelineVisible ? '100%' : '0%'}; transition: width 0.8s ease 0ms;"
		></div>
		{#each achievements as { _key }, i (_key)}
			<TimelineDots index={i} {timelineVisible} />
		{/each}
	</div>

	<div class="flex items-start">
		{#each achievements as { _key, text, year }, i (_key)}
			<AchievementBig
				{text}
				{year}
				animationSpeed={i}
				eventVisible={i % 2 != 0}
				{timelineVisible}
			/>
		{/each}
	</div>
</div>

<!-- Mobile: just a stacked list -->
<ul class="flex flex-col gap-3 sm:hidden">
	{#each achievements as { _key, text, year } (_key)}
		<AchievementSmall {text} {year} />
	{/each}
</ul>
