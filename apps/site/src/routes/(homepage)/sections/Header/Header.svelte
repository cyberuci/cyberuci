<script lang="ts">
	import { goto } from '$app/navigation';
	import ListItem from './ListItem.svelte';
	import { CalendarDays, Medal, FlaskConical, MessagesSquare } from 'lucide-svelte';
	//let hackerLabOpen = true;
</script>

<div class="my-6 space-x flex flex-col px-3">
	<h1 class="type-display mt-0 sm:mt-0">
		Cybersecurity matters.<br />
		Be part of the solution.
	</h1>
	<div class="flex flex-col items-center md:flex-row md:items-start md:gap-x-0">
		<div
			class="m-0 h-full w-full flex flex-col items-center justify-end p-0 text-center md:ml-0 md:items-start md:text-left"
		>
			<div class="h-50"></div>
			<ul class="grid grid-cols-2 mx-auto w-fit list-none gap-0.5">
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
