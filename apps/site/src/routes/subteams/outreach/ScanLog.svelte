<script lang="ts">
	type LogEntry = { _key: string; time: string; target: string; status: string; note: string };

	interface Props {
		header: string;
		command: string;
		entries: LogEntry[];
	}

	let { header, command, entries }: Props = $props();
</script>

<div class="overflow-x-auto border border-gray-11 rounded-lg border-solid bg-[#000] p-5 sm:p-6">
	<p class="mt-0 text-sm type-label sm:text-base">{header}</p>
	<hr class="my-4 border-0 border-t border-[#3d3d3d] border-solid" />
	<div class="flex flex-col gap-3 text-base text-sm font-sans lg:gap-1.5 sm:text-base">
		<p class="m-0 pt-0"><span class="text-bluedark-11">$</span> {command}</p>

		{#each entries as { _key, time, target, status, note } (_key)}
			<div class="log-row">
				<span class="log-left text-2">[{time}] probing {target}</span>
				<span class="log-dots" aria-hidden="true"></span>
				<span class="log-right">
					<span class="text-bluedark-11">{status}</span>
					<span class="text-2">— {note}</span>
				</span>
			</div>
		{/each}

		<p class="m-0 text-2">scan complete: {entries.length}/{entries.length} reachable</p>
		<p></p>
		<p class="m-0 text-bluedark-11">$ <span aria-hidden="true" class="blink">▊</span></p>
	</div>
</div>

<style>
	.log-row {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		column-gap: 0.5rem;
		row-gap: 0.125rem;
	}

	.log-left,
	.log-right {
		flex-shrink: 0;
		white-space: nowrap;
	}

	.log-dots {
		display: block;
		flex: 1 1 auto;
		min-width: 1.5rem;
		margin-bottom: 0.25rem;
		border-bottom: 2.5px dotted #3d3d3d;
	}

	.log-right {
		flex: 1 0 100%;
	}

	@media (min-width: 1024px) {
		.log-row {
			flex-wrap: nowrap;
		}

		.log-right {
			flex: 0 0 auto;
		}
	}

	.blink {
		animation: blink 1s step-start infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
