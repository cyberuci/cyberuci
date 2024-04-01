<script lang="ts">
	import { siDiscord, siInstagram, siGithub } from 'simple-icons';

	export let socials: { platform: string; link: string }[];
</script>

<div class="socials">
	<h2 class="heading"><span class="rainbow">//////////////</span> Socials</h2>
	<div class="list">
		{#each socials as { platform, link }}
			{#if ['Discord', 'Instagram', 'GitHub'].includes(platform)}
				<a class="link" href={link}>
					<svg
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
					>
						{#if platform === 'Discord'}
							<path d={siDiscord.path} />
						{:else if platform === 'Instagram'}
							<path d={siInstagram.path} />
						{:else if platform === 'GitHub'}
							<path d={siGithub.path} />
						{/if}
					</svg>
				</a>
			{/if}
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
		font-family: CommitMono;
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

		&:focus-visible,
		&:hover {
			color: #202020;
			background-color: var(--cyber-blue-5);

			.arrow {
				transform: translateX(0);
				opacity: 1;
			}
		}

		&:focus-visible {
			outline: 2px solid var(--cyber-blue-4);
			outline-offset: 2px;
		}
	}
</style>
