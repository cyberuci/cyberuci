<script lang="ts">
	import debounce from 'debounce';

	let wrapper: HTMLDivElement;
	let innerHeight: number;
	let top: number;
	$: offset = (innerHeight - top) * 0.1;

	// TODO: Only calculate when footer is in view.
	const calculateTop = debounce(() => {
		top = wrapper.getBoundingClientRect().top;
	}, 5);
</script>

<svelte:window bind:innerHeight on:resize={calculateTop} on:scroll={calculateTop} />

<div id="wrapper">
	<div id="transform" style:transform="translateY({offset}%)">
		<div class="cyber">
			<p>Cyber @ UCI&#160Cyber @ UCI&#160</p>
		</div>
		<footer>
			<p class="copyright">Copyright © 2023 Cyber @ UCI</p>
			<nav>
				<a href="https://discord.gg/WjbSP2B9Ck">Discord</a>
				<a href="https://instagram.com/cyberuci/">Instagram</a>
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
			<nav>
				<a href="mailto:cyberclub@uci.edu">cyberclub@uci.edu</a>
			</nav>
		</footer>
	</div>
	<div bind:this={wrapper} />
</div>

<style lang="scss">
	#wrapper {
		background: hsla(218, 96%, 90%, 1);
		overflow: hidden;
		margin: 48px 0 0 0;

		#transform {
			transition: transform 5ms;
		}
	}

	.cyber {
		overflow: hidden;
		padding: 48px 0 0 0;

		p {
			@keyframes scroll {
				from {
					transform: translateX(0);
				}

				to {
					transform: translateX(-50%);
				}
			}

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

	footer {
		padding: 16px 24px 64px 24px;
		color: #000000;
		display: grid;
		gap: 16px;
		align-items: flex-end;
		grid-template-columns: 1;
		@media (min-width: 960px) {
			grid-template-columns: repeat(5, 1fr);
		}

		.copyright {
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
