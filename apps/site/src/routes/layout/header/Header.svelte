<script lang="ts">
	import logo from './logo_monochrome.svg';
	import Nav from './Nav.svelte';
	import NavCollapsible from './NavCollapsible.svelte';

	const links = [
		{ href: '/events', label: 'Events' },
		{ href: '/board', label: 'Board' },
		{ href: '/competition', label: 'Competition' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<header>
	<a class="logo" href="/">
		<img src={logo} alt="monochrome Cyber logo" />
	</a>
	<div class="nav">
		<Nav {links} />
	</div>
	<a class="cta" href="https://discord.gg/Bt5dWnArAW">Join Discord</a>
	<div class="nav-collapsible">
		<NavCollapsible {links} />
	</div>
</header>

<style lang="scss">
	header {
		z-index: 1000;
		position: fixed;
		box-sizing: border-box;
		top: 0;
		left: 0;
		right: 0;
		display: flex;

		@media (min-width: 480px) {
			display: grid;
			grid-template-columns: 1fr 3fr 1fr;
		}

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
		display: none;
		right: 16px;

		@media (min-width: 480px) {
			display: block;
		}

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
</style>
