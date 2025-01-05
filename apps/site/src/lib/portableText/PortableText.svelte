<script lang="ts">
	import type { PortableTextBlock } from '@portabletext/types';
	import { PortableText } from '@portabletext/svelte';

	import Link from './marks/Link.svelte';

	import Paragraph from './blocks/Paragraph.svelte';
	import Heading from './blocks/Heading.svelte';

	interface Props {
		value: PortableTextBlock[];
	}

	let { value }: Props = $props();
</script>

<!-- these type errors are from svelte 5 incompatibility (i think?) -->
<PortableText
	onMissingComponent={false}
	{value}
	components={{
		types: {
			// @ts-expect-error svelte 5 incompatibility
			link: Link
		},
		marks: {
			// @ts-expect-error svelte 5 incompatibility
			link: Link
		},
		block: {
			// @ts-expect-error svelte 5 incompatibility
			normal: Paragraph,
			// @ts-expect-error svelte 5 incompatibility
			h2: Heading,
			// @ts-expect-error svelte 5 incompatibility
			h3: Heading
		}
	}}
/>
