<script lang="ts">
	import type { PortableTextBlock } from '@portabletext/types';
	import { PortableText } from '@portabletext/svelte';

	import Link from './types/Link.svelte';
	import PDF from './types/PDF.svelte';

	import Strong from './marks/Strong.svelte';
	import Code from './marks/Code.svelte';

	import Paragraph from './blocks/Paragraph.svelte';
	import Quote from './blocks/Quote.svelte';
	import Heading from './blocks/Heading.svelte';

	import Bullet from './list/Bullet.svelte';
	import Number from './list/Number.svelte';

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
			link: Link,
			pdf: PDF
		},
		marks: {
			strong: Strong,
			code: Code
		},
		block: {
			normal: Paragraph,
			blockquote: Quote,
			h1: Heading,
			h2: Heading,
			h3: Heading
		},
		list: {
			bullet: Bullet,
			number: Number
		}
	}}
/>
