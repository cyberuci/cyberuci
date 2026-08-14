<script lang="ts">
	type Entry = { time: string; target: string; status: string; note: string };

	interface Props {
		header: string;
		command: string;
		entries: Entry[];
	}

	const { header, command, entries }: Props = $props();

	const LINE_WIDTH = 24;

	// fill to EOL
	const rows = $derived(
		entries.map(({ time, target, status, note }) => {
			const dots = '.'.repeat(Math.max(3, LINE_WIDTH - target.length));
			return {
				prefix: `[ ${time}]  probing  ${target} ${dots} `,
				status,
				note: ` — ${note}`
			};
		})
	);
</script>

<div
	class="bg-black overflow-x-auto border border-graydark-8 rounded-[11px] border-solid px-6 py-4 sm:px-8 sm:py-5"
>
	<p class="type-label text-2">{header}</p>
	<hr class="my-4 border-0 border-t border-graydark-6 border-solid" />
	<div class="whitespace-pre text-sm line-height-relaxed font-sans sm:text-base">
		<p class="m-0"><span class="text-bluedark-11">$</span> {command}</p>
		<p class="m-0">&nbsp;</p>
		{#each rows as { prefix, status, note } (prefix)}
			<p class="m-0">
				<span class="text-2">{prefix}</span><span class="text-bluedark-11">{status}</span><span
					class="text-2">{note}</span
				>
			</p>
		{/each}
		<p class="m-0 text-2">scan complete: {entries.length}/{entries.length} reachable</p>
		<p class="m-0 text-bluedark-11">$ <span aria-hidden="true" class="blink">▊</span></p>
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
