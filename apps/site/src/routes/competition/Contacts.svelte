<script lang="ts">
	import type { PageData } from './$types';
	import Profile from '$lib/common/components/Profile.svelte';

	interface Props {
		contacts: PageData['leads'];
	}

	let { contacts }: Props = $props();

	const titles = new Map([
		['eb5e79ce-fe1e-480c-b623-3c8a5650986b', 'CCDC Co-Captain'],
		['07851b47-20b5-40e9-bddb-8622b273b1d5', 'CCDC Co-Captain']
	]);
</script>

<div class="contacts">
	{#each contacts as { _id, image, name, pronouns, email } (_id)}
		<div class="card">
			<Profile {image} {name} size={96} />
			<div class="details">
				<p class="name">
					{name}
					{#if pronouns}
						({pronouns[0]})
					{/if}
				</p>
				<p>{titles.get(_id)}</p>
				<a href="mailto:{email}">{email}</a>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	@use '$lib/common/styles/typography' as typography;

	.contacts {
		display: grid;
		gap: 12px;

		@media (min-width: 400px) {
			grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		}
	}

	.card {
		background-color: var(--gray2);
		box-sizing: border-box;
		border-radius: 16px;
		align-items: flex-start;
		display: flex;
		gap: 24px;
		padding: 16px;
		flex-direction: column;

		@media (min-width: 400px) {
			flex-direction: row;
			align-items: center;
			padding: 32px;
		}

		.profile {
			width: 96px;
			height: 96px;
			border-radius: 1000px;
			background: var(--gray1);
		}

		.details {
			display: flex;
			flex-direction: column;
			gap: 2px;
			font-size: 14px;
			letter-spacing: -0.006em;
			line-height: 20px;

			.name {
				font-size: 20px;
				letter-spacing: -0.017em;
				line-height: 28px;
				margin: 0 0 6px 0;
			}

			p {
				margin: 0;
			}

			a {
				color: var(--gray12);
				text-decoration: none;
				transition: color 150ms;

				&:hover {
					color: var(--cyber-blue-4);
					text-decoration: underline;
				}
			}
		}
	}
</style>
