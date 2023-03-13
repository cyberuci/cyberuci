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

	$: pathname = $page.url.pathname;
</script>

<header>
	<a href="/">
		<img src={logo} alt="monochrome Cyber logo" />
	</a>
	<div class="nav">
		<Nav {pathname} {links} />
	</div>
	<div class="nav-collapsible">
		<NavCollapsible {pathname} {links} />
	</div>
</header>
<div class="buffer" />

<style lang="scss">
	header {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px 24px;

		@media (max-width: 480px) {
			justify-content: space-between;
			padding: 16px;
		}
	}

	a {
		line-height: 0;
	}

	img {
		width: 40px;
		height: 40px;
	}

	.nav {
		display: block;
		@media (max-width: 480px) {
			display: none;
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
