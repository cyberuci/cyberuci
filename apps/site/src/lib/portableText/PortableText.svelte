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

<PortableText
	onMissingComponent={false}
	{value}
	components={{
		types: {
			link: Link
		},
		marks: {
			link: Link
		},
		block: {
			normal: Paragraph,
			h2: Heading,
			h3: Heading
		}
	}}
/>
