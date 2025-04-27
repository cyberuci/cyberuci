<script lang="ts">
	import clsx from 'clsx';

	interface Props {
		title: string;
		size: 'large' | 'small';
	}

	const { title, size = 'large' }: Props = $props();
</script>

<div class={clsx(size == 'large' && 'mb-24 mt-60', size == 'small' && 'mb-10 mt-38')}>
	{#if size === 'large'}
		<p class="type-label">[{title.toUpperCase()}]</p>
		<h1 class="type-display">{title}</h1>
	{:else if size === 'small'}
		<p class="type-label">{title.toUpperCase()}</p>
	{/if}
</div>
