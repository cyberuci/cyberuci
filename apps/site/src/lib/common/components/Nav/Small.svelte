<script lang="ts">
	import Logo from '$lib/common/components/Logo.svelte';
	import { Dialog } from 'bits-ui';
	import { Menu, X } from 'lucide-svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let isOpen = $state(false);

	$inspect(isOpen);
</script>

{#snippet link(href: string, text: string, description?: string)}
	<a
		class="py-7 px-5 border-t dark:border-t-graydark-6 border-t-gray-6 border-t-solid decoration-none"
		{href}
	>
		<p class="m-0 type-heading-2 text">{text}</p>
		{#if description}
			<p class="m-0 mt-2.5 text-gray-11 dark:text-graydark-11 type-body-1">{description}</p>
		{/if}
	</a>
{/snippet}

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class="border-none bg-transparent p-3 text line-height-0">
		<Menu size={16} />
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay forceMount>
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
						class="fixed w-full left-0 top-0 background-2"
						transition:fly={{
							y: '-100%',
							easing: cubicOut
						}}
					>
						<div class="flex items-center justify-between py-3 px-5">
							<a href="/" class="h-7 text-0" onclick={() => (isOpen = false)}><Logo /></a>
							<Dialog.Close class="border-none bg-transparent p-3 text line-height-0">
								<X size={16} />
							</Dialog.Close>
						</div>
						<div class="flex flex-col">
							{@render link(
								'/competition',
								'Competition',
								"Cyber's competition teams and history."
							)}
							{@render link('/board', 'Board')}
							{@render link('/subteams', 'Subteams', 'Subteams and org structure.')}
							{@render link('/brand', 'Brand', 'Brand assets and guidelines.')}
							{@render link('/contact', 'Contact')}
						</div>
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
