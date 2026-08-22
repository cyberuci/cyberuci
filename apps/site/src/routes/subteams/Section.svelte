<script lang="ts">
	interface Props {
		name: string;
		description: string | null;
		href?: string;
	}

	let { name, description, href }: Props = $props();
</script>

<h2 class="mb-3 mt-18 type-heading-2">
	{#if href}
		<a class="text-inherit no-underline hover:underline hover:decoration-dashed" {href}>{name}</a>
	{:else}
		{name}
	{/if}
</h2>
{#if description}
	<p class="mb-8 max-w-prose type-body-2 text-gray-11 dark:text-graydark-11">{description}</p>
{/if}
