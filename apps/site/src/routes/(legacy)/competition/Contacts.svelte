<script lang="ts">
	import type { PageData } from './$types';
	import Profile from '$lib/common/components/Profile.svelte';

	export let contacts: PageData['leads'];

	const titles = new Map([
		['9bc2103e-a025-4ecf-8217-8264320f7cc6', 'CCDC Co-Captain'],
		['0087e2ca-fa5f-4dd5-bc03-12b0d882f5e6', 'CCDC Co-Captain'],
		['b7426047-ee66-489a-b056-95564f95846c', 'CPTC Captain'],
		['aa74ff34-626f-42ea-9bc7-9501eadcc821', 'NCL Lead']
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
