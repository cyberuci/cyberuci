<script lang="ts">
	import Parallax from './Parallax.svelte';
	import Marquee from './Marquee.svelte';
	import logo from './logo.svg';
	import type { Info } from '../../+layout';

	export let info: Info;
</script>

<Parallax>
	<Marquee />
	<footer>
		{#if info}
			<div class="row-one">
				<div class="logo-email">
					<img class="logo" src={logo} alt="Cyber logo" />
					<a href="mailto:{info.email}">{info.email}</a>
				</div>
				<nav>
					{#each info.socials as { platform, link }}
						<a href={link}>{platform}</a>
					{/each}
				</nav>
				<nav>
					<a href="/brand">Brand</a>
					<a href="/contact">Contact</a>
					<a href="/acknowledgments">Acknowledgments</a>
				</nav>
			</div>
		{:else}
			<p class="error">
				Failed to load footer. Visit our <a href="/contact">contact page</a> to get in touch.
			</p>
		{/if}
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

	.error {
		margin: 48px 0;
	}

	.copyright {
		margin: 0;
		font-size: 14px;
		letter-spacing: -0.006em;
	}
</style>
