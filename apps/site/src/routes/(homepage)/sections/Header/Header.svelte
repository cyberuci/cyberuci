<script lang="ts">
	import { goto } from '$app/navigation';
	import ListItem from './ListItem.svelte';
	import { CalendarDays, Medal, FlaskConical, MessagesSquare } from 'lucide-svelte';

	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

	const builder = imageUrlBuilder(client);

	interface Props {
		data: SanityImageSource;
	}

	let { data }: Props = $props();
</script>

<div class="relative z-0 mb-6" style="margin-top: -68px">
	<div class="relative overflow-hidden" style="height: 100svh;">
		<img
			alt="Cyber@UCI club members collaborating in the HackerLab."
			class="absolute inset-0 h-full w-full object-cover object-center"
			src={builder.image(data).url()}
		/>

		<div
			class="absolute inset-0"
			style="background: linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.4) 100%);"
		></div>

		<div
			class="absolute inset-0 z-1 flex flex-col justify-between pb-8"
			style="padding-top: calc(68px + 2rem);"
		>
			<div class="space-x w-full">
				<h1 class="text-white type-display mb-0 mt-0">
					Cybersecurity matters.<br />
					Be part of the solution.
				</h1>
			</div>
			<div class="space-x w-full">
				<ul class="grid grid-cols-2 mx-auto w-full list-none gap-0.5 p-0 lg:w-3/5">
					<ListItem
						Icon={FlaskConical}
						title="Visit HackerLab"
						onClick={() => {
							document.getElementById('hacker-lab')?.scrollIntoView({
								behavior: 'smooth'
							});
						}}
					/>
					<ListItem
						Icon={CalendarDays}
						title="Visit Events"
						onClick={async () => {
							await goto('/events');
						}}
					/>
					<ListItem
						Icon={MessagesSquare}
						title="Join Our Discord"
						onClick={() => {
							window.open('https://discord.gg/fMzGVSRMkU', '_blank', 'noopener,noreferrer');
						}}
					/>
					<ListItem
						Icon={Medal}
						title="Competition Team"
						onClick={async () => {
							await goto('/competition');
						}}
					/>
				</ul>
			</div>
		</div>
	</div>
</div>
