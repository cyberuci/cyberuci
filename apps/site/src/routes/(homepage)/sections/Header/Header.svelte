<script lang="ts">
	import { goto } from '$app/navigation';
	import { client } from '$lib/sanity/sanityClient';
	import imageUrlBuilder from '@sanity/image-url';
	import ListItem from './ListItem.svelte';
	import { CalendarDays, Medal, FlaskConical, MessagesSquare } from 'lucide-svelte';

	interface Props {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		cover: { asset: any; alt?: string } | null;
	}

	let { cover }: Props = $props();

	const builder = imageUrlBuilder(client);
	const coverSrc = $derived(cover ? builder.image(cover).auto('format').url() : null);
</script>

<<<<<<< HEAD
<div class="mb-6" style="margin-top: -68px">
	<div class="relative overflow-hidden" style="height: 100svh;">
		<img src={coverSrc} class="absolute inset-0 h-full w-full object-cover" alt="" />
		<div class="absolute inset-0" style="background: rgba(0,0,0,0.72);"></div>
		<div
			class="absolute inset-0 z-10 flex flex-col justify-between pb-8"
			style="padding-top: calc(68px + 2rem);"
		>
			<h1 class="text-white type-display mb-0 mt-0 px-6 md:ml-32 md:px-0">
				Cybersecurity matters.<br />
				Be part of the solution.
			</h1>
			<ul class="grid grid-cols-2 w-full list-none gap-0.5 px-6 md:mx-auto md:w-fit md:px-0">
=======
<div class="space-x mb-6" style="margin-top: -68px;">
	<div class="relative overflow-hidden rounded-2xl">
		<img src={cover} class="block h-auto w-full" alt="" />
		<div class="absolute inset-0" style="background: rgba(0,0,0,0.72);"></div>
		<div
			class="absolute inset-0 z-10 flex flex-col justify-between px-8 pb-8"
			style="padding-top: calc(68px + 2rem);"
		>
			<h1 class="text-white type-display mb-0 mt-0">
				Cybersecurity matters.<br />
				Be part of the solution.
			</h1>
			<ul class="grid grid-cols-2 mx-auto w-fit list-none gap-0.5">
>>>>>>> 805937e (changed hackerlab section and competition section)
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
