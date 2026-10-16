<script lang="ts">
	import { tick } from 'svelte';
	import { resolve } from '$app/paths';
	import { CalendarPlus, ChevronDown, Download } from 'lucide-svelte';
	import { siGooglecalendar } from 'simple-icons';

	import { type CalendarEvent } from './types';
	import { openGoogleCalendar } from './eventLinks';

	interface Props {
		event: CalendarEvent;
		// icon-only trigger, for list rows where a full label would repeat down the page
		compact?: boolean;
		// which edge of the trigger the menu lines up with
		align?: 'left' | 'right';
		// trigger styling, so it can match the surrounding text
		class?: string;
	}

	let { event, compact = false, align = 'right', class: className = '' }: Props = $props();

	let open = $state(false);
	let root = $state<HTMLElement>();
	let trigger = $state<HTMLButtonElement>();
	let menu = $state<HTMLElement>();

	function menuItems() {
		return [...(menu?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])];
	}

	async function toggle() {
		open = !open;
		if (open) {
			await tick();
			menuItems()[0]?.focus();
		}
	}

	function close(refocus = false) {
		open = false;
		if (refocus) trigger?.focus();
	}

	function addToGoogle() {
		openGoogleCalendar(event);
		close();
	}

	function onMenuKeydown(e: KeyboardEvent) {
		const all = menuItems();
		const i = all.indexOf(document.activeElement as HTMLElement);

		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			const step = e.key === 'ArrowDown' ? 1 : -1;
			all[(i + step + all.length) % all.length]?.focus();
		} else if (e.key === 'Escape') {
			close(true);
		} else if (e.key === 'Tab') {
			close();
		}
	}

	function onWindowClick(e: MouseEvent) {
		if (open && !root?.contains(e.target as Node)) close();
	}
</script>

<svelte:window onclick={onWindowClick} />

<div class="relative shrink-0" bind:this={root}>
	<button
		bind:this={trigger}
		type="button"
		class="flex cursor-pointer items-center gap-2 rounded-md border-none bg-transparent transition-colors {className ||
			`type-label text-bluedark-11 hover:bg-bluedark-4 hover:text-bluedark-12 ${compact ? 'p-2' : 'px-2 py-1'}`}"
		aria-haspopup="menu"
		aria-expanded={open}
		aria-label={compact ? `Add ${event.title} to calendar` : undefined}
		title={compact ? 'Add to calendar' : undefined}
		onclick={toggle}
	>
		<CalendarPlus size={compact ? 18 : 16} />
		{#if !compact}
			Add to calendar
			<ChevronDown size={14} class="transition-transform {open ? 'rotate-180' : ''}" />
		{/if}
	</button>

	{#if open}
		<div
			bind:this={menu}
			role="menu"
			tabindex="-1"
			class="absolute top-full z-20 mt-1.5 w-68 border border-gray-5 rounded-xl border-solid background-2 p-1.5 shadow-lg dark:border-graydark-5 {align ===
			'right'
				? 'right-0'
				: 'left-0'}"
			onkeydown={onMenuKeydown}
		>
			<button
				type="button"
				role="menuitem"
				class="w-full flex cursor-pointer items-center gap-3 rounded-lg border-none bg-transparent px-2.5 py-2 text-left type-label text outline-none transition-colors focus:bg-bluedark-3 hover:bg-bluedark-3 focus:text-bluedark-12 hover:text-bluedark-12"
				onclick={addToGoogle}
			>
				<svg
					class="size-4 shrink-0 text-bluedark-11"
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
				>
					<path d={siGooglecalendar.path} />
				</svg>
				Google Calendar
			</button>
			<!-- a real link to the server-generated file, so phones hand it to their calendar app -->
			<a
				role="menuitem"
				class="w-full flex cursor-pointer items-center gap-3 rounded-lg border-none bg-transparent px-2.5 py-2 text-left type-label text decoration-none outline-none transition-colors focus:bg-bluedark-3 hover:bg-bluedark-3 focus:text-bluedark-12 hover:text-bluedark-12"
				href={resolve('/events/[id].ics', { id: event.id })}
				data-sveltekit-reload
				onclick={() => close()}
			>
				<Download size={16} class="shrink-0 text-bluedark-11" />
				<span>
					Apple, Outlook &amp; others
					<span class="block text-xs text-2">Opens an .ics file</span>
				</span>
			</a>
		</div>
	{/if}
</div>
