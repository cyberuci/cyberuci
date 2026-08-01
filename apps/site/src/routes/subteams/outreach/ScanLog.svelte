<script lang="ts">
	type LogLine = { prefix: string; status: string; note: string };

	const lines: LogLine[] = [
		{
			prefix: '[ 0.42s]  probing  career.uci.edu ..........',
			status: 'host up',
			note: '— partnership active'
		},
		{
			prefix: '[ 0.88s]  probing  oit.uci.edu .............',
			status: 'host up',
			note: '— co-hosted [x] events'
		},
		{
			prefix: '[ 1.31s]  probing  sponsor:[sponsor] .......',
			status: 'port 443 open',
			note: '— [what do they do?]'
		},
		{
			prefix: '[ 1.77s]  probing  sponsor:nuccinc.org .....',
			status: 'port 443 open',
			note: '— partnership'
		},
		{
			prefix: '[ 2.20s]  probing  uci.clubs ...............',
			status: 'host up',
			note: '— joint workshops'
		},
		{
			prefix: '[ 2.65s]  probing  uci.faculty .............',
			status: 'host up',
			note: '— mentorship and support'
		}
	];
</script>

<div
	class="overflow-x-auto border border-[#858585] rounded-[11px] border-solid bg-[#000] p-6 sm:p-8"
>
	<p class="type-label text-2">outreach@cyberuci - scan.log</p>
	<hr class="my-4 border-0 border-t border-[#3d3d3d] border-solid" />
	<div class="whitespace-pre text-sm line-height-relaxed font-sans sm:text-base">
		<p class="m-0"><span class="text-[#00b2ff]">$</span> ./scan --range=external</p>
		<p class="m-0">&nbsp;</p>
		{#each lines as { prefix, status, note } (prefix)}
			<p class="m-0">
				<span class="text-2">{prefix} </span><span class="text-[#00b2ff]">{status}</span>
				<span class="text-2">{note}</span>
			</p>
		{/each}
		<p class="m-0 text-2">scan complete: 6/6 reachable</p>
		<p class="m-0">&nbsp;</p>
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
