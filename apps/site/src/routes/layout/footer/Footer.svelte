<script lang="ts">
	import Parallax from './Parallax.svelte';
	import Marquee from './Marquee.svelte';
	import logo from './logo.svg';
</script>

<Parallax>
	<Marquee />
	<footer>
		<div class="row-one">
			<div class="logo-email">
				<img class="logo" src={logo} alt="Cyber logo" />
				<a href="mailto:cyberclub@uci.edu">cyberclub@uci.edu</a>
			</div>
			<nav>
				<a href="https://discord.gg/WjbSP2B9Ck">Discord</a>
				<a href="https://instagram.com/cyberuci">Instagram</a>
				<a href="https://github.com/cyberuci">GitHub</a>
				<a
					href="https://uci.us18.list-manage.com/subscribe?u=0029dcacaf8ca6a3b88c61750&id=701d18798e"
				>
					Mailing List
				</a>
			</nav>
			<nav>
				<a href="/brand">Brand</a>
				<a href="/contact">Contact</a>
				<a href="/acknowledgments">Acknowledgments</a>
			</nav>
		</div>
		<p class="copyright">Copyright © 2023 Cyber @ UCI</p>
	</footer>
</Parallax>

<style lang="scss">
	@use '$lib/common/styles/styles' as styles;

	footer {
		width: 100%;
		max-width: styles.$max-width;
		margin: 0 auto;
		padding: 16px styles.$padding-x 64px styles.$padding-x;
		color: var(--gray11);
	}

	.row-one {
		margin-bottom: 32px;
		display: grid;
		gap: 16px;
		align-items: flex-start;
		grid-template-columns: 1;

		@media (min-width: 960px) {
			grid-template-columns: repeat(4, 1fr);
		}

		.logo-email {
			display: flex;
			align-items: center;
			gap: 8px;

			@media (min-width: 960px) {
				grid-column: span 2;
			}

			.logo {
				width: 22px;
				height: 22px;
			}
		}
	}

	nav {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	a {
		color: var(--gray11);
		text-decoration: none;

		&:hover {
			color: var(--gray12);
			text-decoration: underline;
		}
	}

	.copyright {
		margin: 0;
		font-size: 14px;
		letter-spacing: -0.006em;
	}
</style>
