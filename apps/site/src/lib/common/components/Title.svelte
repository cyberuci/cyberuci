<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<div class="mb-24 mt-60">
	<p class="type-label">[{title.toUpperCase()}]</p>
	<h1 class="type-display">{title}</h1>
</div>
