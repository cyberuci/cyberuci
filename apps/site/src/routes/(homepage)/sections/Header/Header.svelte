<script lang="ts">
	import { goto } from '$app/navigation';
	import cover from './cover.jpg';
	import ListItem from './ListItem.svelte';
	import { CalendarDays, Medal, FlaskConical, MessagesSquare } from 'lucide-svelte';
</script>

<div class="mb-6" style="margin-top: -68px">
	<div class="relative overflow-hidden" style="height: 100svh;">
		<img src={cover} class="absolute inset-0 h-full w-full object-cover" alt="" />
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
						// eslint-disable-next-line svelte/no-navigation-without-resolve
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
						// eslint-disable-next-line svelte/no-navigation-without-resolve
						await goto('/competition');
					}}
				/>
			</ul>
		</div>
	</div>
</div>
