<script lang="ts">
	import Logo from '$lib/common/components/Logo.svelte';
	import { Dialog } from 'bits-ui';
	import { Menu, X } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { resolve } from '$app/paths';

	let isOpen = $state(false);
</script>

{#snippet link(href: string, text: string, description?: string)}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class="mx-5 my-5 block decoration-none" {href} onclick={() => (isOpen = false)}>
		<p class="m-0 type-heading-2 text">{text}</p>
		{#if description}
			<p class="m-0 mt-2.5 type-body-1 text-gray-11 dark:text-graydark-11">{description}</p>
		{/if}
	</a>
{/snippet}

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class="border-none bg-transparent p-3 text line-height-0">
		<Menu size={16} />
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay forceMount onclick={() => (isOpen = false)}>
			{#snippet child({ props, open })}
				{#if open}
					<div
						{...props}
						class="fixed inset-0 bg-graya-9"
						transition:fade={{
							easing: cubicOut
						}}
					></div>
				{/if}
			{/snippet}
		</Dialog.Overlay>
		<Dialog.Content forceMount interactOutsideBehavior="ignore">
			{#snippet child({ props, open })}
				{#if open}
					<div
						{...props}
						class="fixed left-0 top-0 w-full background-2"
						transition:fly={{
							y: '-100%',
							easing: cubicOut
						}}
					>
						<div class="flex items-center justify-between px-5 py-3">
							<a href={resolve('/')} class="h-7 text-0" onclick={() => (isOpen = false)}><Logo /></a
							>
							<Dialog.Close class="border-none bg-transparent p-3 text line-height-0">
								<X size={16} />
							</Dialog.Close>
						</div>
						<div class="pb-4">
							{@render link('/subteams', 'Subteams')}
							{@render link('/competition', 'Competition')}
							{@render link('/resources', 'Resources')}
							{@render link('/board', 'Board')}
							{@render link('/brand', 'Brand')}
							{@render link('/contact', 'Contact')}
							{@render link('/news', 'News')}
							{@render link('/sponsors', 'Sponsors')}
						</div>
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
