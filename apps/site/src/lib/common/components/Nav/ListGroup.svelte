<script lang="ts">
	import type { Snippet } from 'svelte';
	import { NavigationMenu } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';

	interface Props {
		name: string;
		children: Snippet;
	}

	const { name, children }: Props = $props();
</script>

<NavigationMenu.Item>
	<NavigationMenu.Trigger
		class="group flex items-center gap-1 border-none bg-transparent p-0 py-2 type-label terminal-before text data-[state=open]:text-blue-11 hover:text-blue-11 dark:data-[state=open]:text-bluedark-11 dark:hover:text-bluedark-11"
	>
		{name}
		<ChevronDown
			class="size-3 transition duration-200 group-data-[state=open]:rotate-180"
			aria-hidden="true"
		/>
	</NavigationMenu.Trigger>
	<NavigationMenu.Content class="absolute left-0 top-0 z-50">
		<ul class="m-0 flex list-none gap-2 p-2">
			{@render children()}
		</ul>
	</NavigationMenu.Content>
</NavigationMenu.Item>
