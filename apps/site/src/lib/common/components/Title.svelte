<script lang="ts">
	import clsx from 'clsx';

	interface Props {
		title: string;
		size?: 'display' | 'normal' | 'small';
	}

	const { title, size = 'display' }: Props = $props();
</script>

<div
	class={clsx(
		size == 'display' && 'mb-24 mt-60',
		size == 'normal' && 'mb-24 mt-60',
		size == 'small' && 'mb-10 mt-38'
	)}
>
	{#if size === 'display'}
		<p class="type-label">[{title.toUpperCase()}]</p>
		<h1 class="type-display">{title}</h1>
	{:else if size === 'normal'}
		<h1 class="type-heading-2 max-w-40ch">{title}</h1>
	{:else if size === 'small'}
		<p class="type-label">{title.toUpperCase()}</p>
	{/if}
</div>
