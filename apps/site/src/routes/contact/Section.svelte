<script lang="ts">
	import type { Person } from '$lib/sanity/types';
	import Profile from '$lib/common/components/Profile.svelte';

	type Contact = Pick<Person, '_id' | 'image' | 'name' | 'pronouns' | 'email'> & {
		titles: string[];
	};

	export let title: string;
	export let description: string;
	export let contacts: Contact[];
</script>

<h2>{title}</h2>
<p class="description">{description}</p>
<div class="contacts">
	{#each contacts as { _id, image, name, pronouns, email, titles } (_id)}
		<div class="card">
			<Profile {image} {name} size={96} />
			<div class="details">
				<p class="name">{name} ({pronouns?.[0]})</p>
				<p>{titles.join(', ')}</p>
				<a href="mailto:{email}">{email}</a>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	h2 {
		font-size: 30px;
		letter-spacing: -0.021em;
		line-height: 42px;
		font-weight: 500;
		margin: 0 0 12px 0;
	}

	.description {
		margin: 12px 0 32px 0;
	}

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
