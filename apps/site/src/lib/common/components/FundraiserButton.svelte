<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { HandCoins, X } from 'lucide-svelte';

	interface Props {
		title: string;
	}

	let { title }: Props = $props();

	const onFundraiserPage = $derived(page.url.pathname === '/fundraiser');
	let dismissed = $state(false);

	function dismiss() {
		dismissed = true;
	}
</script>

{#if !onFundraiserPage && !dismissed}
	<div class="fundraiser-blob fixed z-40 flex items-stretch rounded-xl">
		<a
			href={resolve('/fundraiser')}
			class="flex items-center gap-2 py-3 pl-4 pr-3 type-label decoration-none"
		>
			<span class="icon-dot"><HandCoins size={18} /></span>
			{title}
		</a>
		<button
			type="button"
			class="close flex items-center px-3"
			onclick={dismiss}
			aria-label="Dismiss fundraiser banner"
		>
			<X size={14} />
		</button>
	</div>
{/if}

<style>
	.fundraiser-blob {
		right: max(1rem, env(safe-area-inset-right));
		bottom: max(1.25rem, env(safe-area-inset-bottom));
		max-width: min(25rem, calc(100vw - 2rem));

		background: rgba(14, 24, 34, 0.85);
		border: 1px solid rgba(49, 183, 251, 0.45);
		backdrop-filter: blur(10px);
		color: #e6edf7;
		box-shadow:
			0 8px 24px rgba(0, 0, 0, 0.45),
			0 0 14px rgba(49, 183, 251, 0.25);

		transform-origin: bottom right;
		transition:
			transform 180ms ease,
			border-color 180ms ease,
			box-shadow 180ms ease;
		animation: blob-in 0.5s ease-out 1.2s backwards;
	}

	.fundraiser-blob:hover {
		transform: translateY(-2px);
		border-color: rgba(49, 183, 251, 0.9);
		box-shadow:
			0 10px 28px rgba(0, 0, 0, 0.5),
			0 0 20px rgba(49, 183, 251, 0.45);
	}

	.fundraiser-blob:focus-within {
		outline: 2px solid #f3f3f3;
		outline-offset: 3px;
	}

	.fundraiser-blob a {
		color: #e6edf7;
	}

	.icon-dot {
		color: #31b7fb;
		display: flex;
	}

	.close {
		color: #e6edf7;
		background: transparent;
		border: none;
		border-left: 1px solid rgba(255, 255, 255, 0.1);
		cursor: pointer;
		font: inherit;
		transition: color 180ms ease;
	}
	.close:hover {
		color: #fff;
	}

	@keyframes blob-in {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.fundraiser-blob {
			animation: none;
			transition: none;
		}
	}
</style>
