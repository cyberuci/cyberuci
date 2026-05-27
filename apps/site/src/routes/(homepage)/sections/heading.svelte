<script lang="ts">
	interface Props {
		heading: string;
	}

	let { heading }: Props = $props();
</script>

<div class="flex items-center gap-2 pb-5">
	<h2 class="type-label font-550">
		<span aria-hidden="true"
			><span style="color:#FF6B6B">/</span><span style="color:#FF9F43">/</span><span
				style="color:#FECA57">/</span
			><span style="color:#1DD1A1">/</span><span style="color:#48DBFB">/</span><span
				style="color:#54A0FF">/</span
			><span style="color:#5F27CD">/</span><span style="color:#C44FE3">/</span><span
				style="color:#FF6B9D">/</span
			></span
		>
		{heading}
	</h2>
</div>
