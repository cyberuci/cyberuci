<script lang="ts">
	import type { MarkComponentProps } from '@portabletext/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		portableText: MarkComponentProps<{
			href: string;
		}>;
	}

	let { children, portableText }: Props = $props();
</script>

<a
	href={portableText.value.href}
	class="text-blue-12 decoration-underline dark:text-bluedark-12 hover:decoration-dashed"
>
	{@render children?.()}
</a>
