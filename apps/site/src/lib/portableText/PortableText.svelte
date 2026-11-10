<script lang="ts">
	import { PortableText, type InputValue } from '@portabletext/svelte';

	import Link from './marks/Link.svelte';

	import Achievements from './blocks/Achievements.svelte';
	import Paragraph from './blocks/Paragraph.svelte';
	import Heading from './blocks/Heading.svelte';

	interface Props {
		value: InputValue | null;
	}

	let { value }: Props = $props();
</script>

<PortableText
	onMissingComponent={false}
	value={value ?? []}
	components={{
		types: {
			link: Link,
			achievements: Achievements
		},
		marks: {
			link: Link
		},
		block: {
			normal: Paragraph,
			blockquote: undefined,
			h1: undefined,
			h2: Heading,
			h3: Heading,
			h4: undefined,
			h5: undefined,
			h6: undefined
		}
	}}
/>
