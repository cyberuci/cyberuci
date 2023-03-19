<div class="cyber">
	<p>Cyber @ UCI&#160Cyber @ UCI&#160</p>
</div>
<footer>
	<p class="copyright">Copyright © 2022 Cyber @ UCI</p>
	<nav>
		<a href="https://discord.gg/WjbSP2B9Ck">Discord</a>
		<a href="https://instagram.com/cyberuci/">Instagram</a>
		<a href="https://uci.us18.list-manage.com/subscribe?u=0029dcacaf8ca6a3b88c61750&id=701d18798e">
			Mailing List
		</a>
	</nav>
	<nav>
		<a href="/brand">Brand</a>
		<a href="/contact">Contact</a>
		<a href="/acknowledgments">Acknowledgments</a>
	</nav>
	<nav>
		<a href="mailto:cyberclub@uci.edu">cyberclub@uci.edu</a>
	</nav>
</footer>

<style lang="scss">
	.cyber {
		overflow: hidden;
		padding: 48px 0 0 0;
		margin: 48px 0 0 0;
		background: hsla(218, 96%, 90%, 1);

		p {
			animation: scroll 15s linear infinite;
			width: max-content;
			color: #a9cafc;
			margin: 0;
			white-space: nowrap;
			text-align: center;
			font-family: 'TINY';
			font-style: normal;
			font-weight: 120;
			font-size: 20vw;
			font-feature-settings: 'ss03' on, 'ss05' on, 'ss02' on, 'ss01' on;
		}
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(-50%);
		}
	}

	footer {
		padding: 16px 24px;
		background: hsla(218, 96%, 90%, 1);
		color: #000000;
		display: grid;
		gap: 16px;
		align-items: flex-end;
		grid-template-columns: 1;
		@media (min-width: 960px) {
			grid-template-columns: repeat(5, 1fr);
		}

		.copyright {
			font-size: 0.875rem;
			margin: 0;
			grid-column: 1;
			@media (min-width: 960px) {
				grid-column: 1 / span 2;
			}
		}

		nav {
			height: 100%;
			display: flex;
			flex-direction: column;
			gap: 4px;

			a {
				color: #161f2b;
				text-decoration: none;

				&:hover {
					color: #1a1c1e;
					text-decoration: underline;
				}
			}
		}
	}
</style>
