<script lang="ts">
	interface Props {
		heading: string;
	}

	let { heading }: Props = $props();
</script>

<div class="flex items-center gap-2 pb-5">
	<h2 class="type-label font-550">
		<span aria-hidden="true"
			><span class="text-[#FF6B6B]">/</span><span class="text-[#FF9F43]">/</span><span
				class="text-[#FECA57]">/</span
			><span class="text-[#1DD1A1]">/</span><span class="text-[#48DBFB]">/</span><span
				class="text-[#54A0FF]">/</span
			><span class="text-[#5F27CD]">/</span><span class="text-[#C44FE3]">/</span><span
				class="text-[#FF6B9D]">/</span
			></span
		>
		{heading}
	</h2>
</div>
