<script lang="ts">
	import { page } from '$app/stores';
	import logo from './logo_monochrome.svg';
	import Nav from './Nav.svelte';
	import NavCollapsible from './NavCollapsible.svelte';

	const links = [
		{ href: '/events', label: 'Events' },
		{ href: '/board', label: 'Board' }
		// { href: "/sponsors", label: "Sponsors" },
	];
</script>

<header>
	<a class="logo" href="/">
		<img src={logo} alt="monochrome Cyber logo" />
	</a>
	<div class="nav">
		<Nav {links} />
	</div>
	<a class="cta" href="https://discord.com/">Join Discord</a>
	<div class="nav-collapsible">
		<NavCollapsible {links} />
	</div>
</header>
<div class="buffer" />

<style lang="scss">
	header {
		box-sizing: border-box;
		position: absolute;
		left: 0;
		right: 0;
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		align-items: center;
		gap: 16px;
		padding: 16px 24px;

		@media (max-width: 480px) {
			justify-content: space-between;
			padding: 16px;
		}
	}

	.logo {
		line-height: 0;
		justify-self: flex-start;

		img {
			width: 40px;
			height: 40px;
		}
	}

	.nav {
		display: block;
		justify-self: center;

		@media (max-width: 480px) {
			display: none;
		}
	}

	.cta {
		position: fixed;
		justify-self: flex-end;
		padding: 12px 18px;
		border-radius: 1000px;
		color: #fff;
		background-color: var(--blue9);
		font-size: 0.875rem;
		font-weight: 400;
		text-decoration: none;

		&:hover {
			background-color: var(--blue10);
		}

		&:active {
			background-color: var(--blue11);
		}
	}

	.nav-collapsible {
		display: none;
		@media (max-width: 480px) {
			display: block;
		}
	}

	.buffer {
		height: 72px;
	}
</style>
