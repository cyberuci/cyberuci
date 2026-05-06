<script lang="ts">
	import { Trophy } from 'lucide-svelte';
	import { onMount } from 'svelte';

	import Achievements from './Achievement.svelte';
	import TimelineDots from './TimelineDots.svelte';
	import AchievementItem from './AchievementItem.svelte';

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

<div class="space-x mb-10">
	<h2 class="flex items-center gap-2 type-label font-550"><Trophy size={14} />Achievements</h2>
</div>

<div class="space-x hidden sm:block" bind:this={timelineEl}>
	<div class="flex items-end">
		{#each achievements as { _key, text, year }, i (_key)}
			<Achievements {text} {year} animationSpeed={i} eventVisible={i % 2 == 0} {timelineVisible} />
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
			<Achievements {text} {year} animationSpeed={i} eventVisible={i % 2 != 0} {timelineVisible} />
		{/each}
	</div>
</div>

<ul class="space-x flex flex-col gap-3 sm:hidden">
	{#each achievements as { _key, text, year } (_key)}
		<AchievementItem {text} {year} />
	{/each}
</ul>
