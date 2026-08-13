<script lang="ts">
	type LogLine = { time: string; target: string; status: string; note: string };

	const lines: LogLine[] = [
		{ time: '0.42s', target: 'career.uci.edu', status: 'host up', note: '— partnership active' },
		{ time: '0.88s', target: 'oit.uci.edu', status: 'host up', note: '— co-hosted [x] events' },
		{
			time: '1.31s',
			target: 'sponsor:[sponsor]',
			status: 'port 443 open',
			note: '— [what do they do?]'
		},
		{
			time: '1.77s',
			target: 'sponsor:nuccinc.org',
			status: 'port 443 open',
			note: '— partnership'
		},
		{ time: '2.20s', target: 'uci.clubs', status: 'host up', note: '— joint workshops' },
		{ time: '2.65s', target: 'uci.faculty', status: 'host up', note: '— mentorship and support' }
	];

	const LINE_WIDTH = 24;

	// fill to EOL
	const rows = lines.map(({ time, target, status, note }) => {
		const dots = '.'.repeat(Math.max(3, LINE_WIDTH - target.length));
		return {
			prefix: `[ ${time}]  probing  ${target} ${dots} `,
			status,
			note: ` ${note}`
		};
	});
</script>

<div
	class="bg-black overflow-x-auto border border-graydark-8 rounded-[11px] border-solid px-6 py-4 sm:px-8 sm:py-5"
>
	<p class="type-label text-2">outreach@cyberuci - scan.log</p>
	<hr class="my-4 border-0 border-t border-graydark-6 border-solid" />
	<div class="whitespace-pre text-sm line-height-relaxed font-sans sm:text-base">
		<p class="m-0"><span class="text-bluedark-11">$</span> ./scan --range=external</p>
		<p class="m-0">&nbsp;</p>
		{#each rows as { prefix, status, note } (prefix)}
			<p class="m-0">
				<span class="text-2">{prefix}</span><span class="text-bluedark-11">{status}</span><span
					class="text-2">{note}</span
				>
			</p>
		{/each}
		<p class="m-0 text-2">scan complete: 6/6 reachable</p>
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
