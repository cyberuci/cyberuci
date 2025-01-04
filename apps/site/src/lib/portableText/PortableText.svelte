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
			// @ts-ignore
			link: Link
		},
		marks: {
			// @ts-ignore
			link: Link
		},
		block: {
			// @ts-ignore
			normal: Paragraph,
			// @ts-ignore
			h2: Heading,
			// @ts-ignore
			h3: Heading
		}
	}}
/>
