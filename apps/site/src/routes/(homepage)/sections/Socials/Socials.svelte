<script lang="ts">
	import { siDiscord, siInstagram, siGithub } from 'simple-icons';

	const socials = [
		{
			path: siDiscord.path,
			href: ''
		},
		{
			path: siInstagram.path,
			href: ''
		},
		{
			path: siGithub.path,
			href: ''
		}
	];
</script>

<div class="socials">
	<h2 class="heading"><span class="rainbow">//////////////</span> Socials</h2>
	<div class="list">
		{#each socials as { path, href }}
			<a class="link" {href}>
				<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
					<path d={path} />
				</svg>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	.socials {
		margin: 160px 16px 16px 16px;
	}

	.heading {
		margin: 16px 0;
		font-feature-settings:
			'dlig' on,
			'ss05' on;
		font-family: CommitMonoV142;
		font-size: 16px;
		font-weight: 400;
		line-height: 145%;

		.rainbow {
			background: linear-gradient(
				90deg,
				#f00,
				#ff8000,
				#ff0,
				#80ff00,
				#0f0,
				#00ff7f,
				#0ff,
				#0080ff,
				#4a4a95,
				#602c95,
				#a01aa0,
				#c0116a,
				#f00
			);
			background-clip: text;
			-webkit-text-fill-color: transparent;
		}
	}

	.list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 16px;
	}

	.link {
		width: 100%;
		padding: 48px;
		text-decoration: none;
		color: white;
		background-color: #1c1c1c;
		border-radius: 32px;

		@media (min-width: 600px) {
			min-width: 256px;
			flex-grow: 1;
			width: auto;
		}

		svg {
			display: block;
			margin: auto;
			width: 48px;
			height: 48px;
		}
	}
</style>
