<script lang="ts">
	type LogEntry = { _key: string; time: string; target: string; status: string; note: string };

	interface Props {
		header: string;
		command: string;
		entries: LogEntry[];
	}

	let { header, command, entries }: Props = $props();
</script>

<div
	class="overflow-x-auto border border-[#858585] rounded-[11px] border-solid bg-[#000] p-4 sm:p-8"
>
	<p class="type-label text-2">{header}</p>
	<hr class="my-4 border-0 border-t border-[#3d3d3d] border-solid" />
	<div class="flex flex-col gap-3 text-sm font-sans sm:gap-1.5 sm:text-base">
		<p class="m-0"><span class="text-[#00b2ff]">$</span> {command}</p>

		{#each entries as { _key, time, target, status, note } (_key)}
			<div class="flex flex-col gap-x-2 gap-y-0.5 sm:flex-row sm:flex-wrap sm:items-baseline">
				<div class="flex flex-wrap items-baseline gap-x-2 sm:contents">
					<span class="shrink-0 text-2">[{time}]</span>
					<span class="text-2">probing {target}</span>
				</div>
				<span
					class="hidden min-w-6 flex-1 border-b border-[#3d3d3d] border-dotted sm:mb-1 sm:block"
					aria-hidden="true"
				></span>
				<span class="shrink-0">
					<span class="text-[#00b2ff]">{status}</span>
					<span class="text-2">— {note}</span>
				</span>
			</div>
		{/each}

		<p class="m-0 text-2">scan complete: {entries.length}/{entries.length} reachable</p>
		<p class="m-0 text-[#00b2ff]">$ <span aria-hidden="true" class="blink">▊</span></p>
	</div>
</div>

<style>
	.blink {
		animation: blink 1s step-start infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
