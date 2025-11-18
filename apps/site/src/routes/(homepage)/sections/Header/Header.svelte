<script lang="ts">
	import videoFile from './RandomTestVideo_1280x720.mp4';
	import ListItem from './ListItem.svelte';
	import { CalendarDays, Medal, FlaskConical, MessagesSquare } from 'lucide-svelte';
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
				<ListItem
					Icon={FlaskConical}
					title="Visit HackerLab"
					href="google.com"
					page={undefined}
					scrollToId={undefined}
					onClick={undefined}
				/>
				<ListItem
					Icon={CalendarDays}
					title="Visit Events"
					href="google.com"
					page={undefined}
					scrollToId={undefined}
					onClick={undefined}
				/>
				<ListItem
					Icon={MessagesSquare}
					title="Join Our Discord"
					href="https://discord.gg/fMzGVSRMkU"
					page={undefined}
					scrollToId={undefined}
					onClick={undefined}
				/>
				<ListItem
					Icon={Medal}
					title="Competition Team"
					href="google.com"
					page={undefined}
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

<!--
<nav class="space-x flex items-center justify-between py-3">
	<a href={resolve('/')} class="flex items-center gap-2 py-2 text decoration-none">
		<div class="h-7 text-0"><Logo /></div>
		<span class="type-label hover:text-blue-11 dark:hover:text-bluedark-11">CyberUCI</span>
	</a>
	<div class="hidden lg:block"><Big /></div>
	<div class="block lg:hidden"><Small /></div>
</nav>
-->
