<script lang="ts">
	import type { Person } from '$lib/sanity/types';
	import Profile from '$lib/common/components/Profile.svelte';

	type Contact = Pick<Person, '_id' | 'image' | 'name' | 'pronouns' | 'email'> & {
		titles: string[];
	};

	interface Props {
		title: string;
		description: string;
		contacts: Contact[];
	}

	let { title, description, contacts }: Props = $props();
</script>

<h2 class="mb-3 mt-18 type-heading-2">{title}</h2>
<p class="mb-8 type-body-2 text-gray-11 dark:text-graydark-11">{description}</p>
<div class="grid grid-cols-[repeat(auto-fill,_minmax(320px,1fr))] gap-1">
	{#each contacts as { _id, image, name, pronouns, email, titles } (_id)}
		<div class="flex flex-col gap-6 rounded-sm px-3 py-8 background-2">
			<div class="size-30 self-center overflow-hidden rounded-full">
				<Profile {image} {name} />
			</div>
			<div>
				<p class="mb-2 mt-2 pb-1 text-5 font-500 font-explorer">
					{name}
				</p>
				<div class="flex flex-col type-body-2 text-gray-11 dark:text-graydark-11">
					<span>{titles.join(', ')}</span>
					{#if pronouns}
						<span>
							{pronouns.join(', ')}
						</span>
					{/if}
					<a
						class="text-blue-12 dark:text-bluedark-12 hover:decoration-dashed"
						href="mailto:{email}">{email}</a
					>
				</div>
			</div>
		</div>
	{/each}
</div>
