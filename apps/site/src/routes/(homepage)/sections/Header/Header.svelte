<script lang="ts">
	import { goto } from '$app/navigation';
	import placeholder from './cover.jpg';
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
		<img
			src={placeholder}
			alt="the place where the video is supposed to be"
			width="320"
			height="240"
			class="mb-2 block h-auto w-3/5 rounded-lg object-cover shadow-lg"
		/>
		<div
			class="m-0 h-full w-full flex flex-col items-center justify-end p-0 text-center md:ml-0 md:items-start md:text-left"
		>
			<!-- A bit of empty space -->
			<div class="h-50"></div>
			<p class="w-full text-center type-label text">Check out these links to explore our club!</p>
			<ul class="grid grid-cols-2 h-full w-full list-none gap-0">
				<ListItem
					Icon={FlaskConical}
					title="Visit HackerLab"
					color="rgb(209, 213, 219)"
					onClick={() => {
						document.getElementById('hacker-lab')?.scrollIntoView({
							behavior: 'smooth'
						});
					}}
				/>
				<ListItem
					Icon={CalendarDays}
					title="Visit Events"
					color="rgb(209, 213, 219)"
					onClick={async () => {
						// eslint-disable-next-line svelte/no-navigation-without-resolve
						await goto('/events');
					}}
				/>

				<ListItem
					Icon={MessagesSquare}
					title="Join Our Discord"
					color="rgb(209, 213, 219)"
					onClick={() => {
						window.open('https://discord.gg/fMzGVSRMkU', '_blank', 'noopener,noreferrer');
					}}
				/>

				<ListItem
					Icon={Medal}
					title="Competition Team"
					color="rgb(209, 213, 219)"
					onClick={async () => {
						// eslint-disable-next-line svelte/no-navigation-without-resolve
						await goto('/competition');
					}}
				/>
			</ul>
		</div>
	</div>
</div>
