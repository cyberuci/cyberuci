<script lang="ts">
	import videoFile from './RandomTestVideo_1280x720.mp4';
	import ListItem from './ListItem.svelte';
	import { CalendarDays, Medal, FlaskConical, MessagesSquare } from 'lucide-svelte';
	let hackerLabOpen = true;
</script>

<div class="my-6 space-x flex flex-col">
	<div class="flex flex-row gap-x-6">
		<video
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
		</video>
		<div>
			Check out these links to explore our club!
			<ul class="list-none">
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

	<h1 class="type-display mt-10 sm:mt-10">
		Cybersecurity matters.<br />
		Be part of the solution.
	</h1>
	<p class="description">
		Cyber@UCI is a community dedicated to making cybersecurity accessible to everyone, regardless of
		experience.
	</p>
</div>
<enhanced:img class="h-2xl w-full object-cover" src="./cover.jpg" alt="" />
