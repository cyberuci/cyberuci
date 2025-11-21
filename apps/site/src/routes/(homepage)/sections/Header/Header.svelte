<script lang="ts">
	import placeholder from './cover.jpg';
	import ListItem from './ListItem.svelte';
	import { CalendarDays, Medal, FlaskConical, MessagesSquare } from 'lucide-svelte';
	let hackerLabOpen = true;
</script>

<div class="my-6 space-x flex flex-col">
	<div class="flex flex-col items-center md:flex-row md:items-start md:gap-x-6">
		<img
			src={placeholder}
			alt="the place where the video is supposed to be"
			width="320"
			height="240"
			class="mb-2 block h-auto w-4/5 rounded-lg object-cover shadow-lg"
		/>
		<!-- <video
			width="320"
			height="240"
			autoplay
			playsinline
			muted
			loop
			class="mb-0 block h-auto w-4/5 rounded-lg object-cover shadow-lg"
		>
			<source src={videoFile} type="video/mp4" />
			<track kind="captions" srclang="en" label="English" default />
			Your browser does not support the video tag.
		</video> -->
		<div class="flex flex-col items-center text-center md:ml-4 md:items-start md:text-left">
			<p class="text-center type-label text">Check out these links to explore our club!</p>

			<ul class="flex flex-wrap list-none justify-center md:justify-start">
				<!--Use the tenary to change color and text when we figure out how to know when the hacker lab
				is open or not-->
				<ListItem
					Icon={FlaskConical}
					title={hackerLabOpen ? 'HackerLab Open!' : 'HackerLab Closed'}
					color={hackerLabOpen ? 'green' : 'red'}
					href={undefined}
					page={undefined}
					scrollToId="hacker-lab"
					onClick={undefined}
				/>

				<ListItem
					Icon={CalendarDays}
					title="Visit Events"
					color="white"
					href="google.com"
					page={undefined}
					scrollToId={undefined}
					onClick={undefined}
				/>
				<ListItem
					Icon={MessagesSquare}
					title="Join Our Discord"
					color="white"
					href="https://discord.gg/fMzGVSRMkU"
					page={undefined}
					scrollToId={undefined}
					onClick={undefined}
				/>
				<ListItem
					Icon={Medal}
					title="Competition Team"
					color="white"
					href={undefined}
					page="/competition"
					scrollToId={undefined}
					onClick={undefined}
				/>
			</ul>
		</div>
	</div>

	<h1 class="type-display mt-0 sm:mt-0">
		Cybersecurity matters.<br />
		Be part of the solution.
	</h1>
	<!-- <p class="description">
		Cyber@UCI is a community dedicated to making cybersecurity accessible to everyone, regardless of
		experience.
	</p> -->
</div>
<enhanced:img class="h-2xl w-full object-cover" src="./cover.jpg" alt="" />
