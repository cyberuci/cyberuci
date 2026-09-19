<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';

	interface Announcement {
		enabled: boolean;
		opensAt: string;
		closesAt: string;
		link: string;
	}

	interface Props {
		announcement?: Announcement | null;
	}

	let { announcement }: Props = $props();

	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Los_Angeles',
		month: 'short',
		day: 'numeric'
	});

	const formatDate = (date: string) => dateFormatter.format(new Date(date));

	let now = new Date();
	let opensAt = $derived(announcement ? new Date(announcement.opensAt) : null);
	let closesAt = $derived(announcement ? new Date(announcement.closesAt) : null);
	let isConfigured = $derived(
		announcement?.enabled &&
			opensAt !== null &&
			closesAt !== null &&
			!Number.isNaN(opensAt.getTime()) &&
			!Number.isNaN(closesAt.getTime())
	);
	let isVisible = $derived(isConfigured && now < closesAt!);
	let isOpen = $derived(isConfigured && now >= opensAt!);
</script>

{#if announcement && isVisible}
	<a
		href={announcement.link}
		target="_blank"
		rel="noreferrer"
		class="application-banner group focus-visible:outline-white min-h-11 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-center decoration-none transition-colors focus-visible:outline-2 focus-visible:outline-offset--2"
	>
		<span class="type-body-1 font-500">
			{#if isOpen}
				Subteam applications are open until {formatDate(announcement.closesAt)}. Apply now
			{:else}
				Subteam applications open {formatDate(announcement.opensAt)}. Apply here
			{/if}
		</span>
		<ArrowRight
			size={16}
			strokeWidth={2}
			class="shrink-0 transition-transform group-hover:translate-x-1"
		/>
	</a>
{/if}

<style>
	.application-banner {
		background: #31b7fb;
		color: #0e1822;
	}

	.application-banner:hover {
		background: #f3f3f3;
	}
</style>
