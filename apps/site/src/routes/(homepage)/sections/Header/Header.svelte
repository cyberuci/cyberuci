<script>
	import videoFile from './RandomTestVideo_1280x720.mp4';
</script>

<div class="my-6 space-x">
	<video
		width="320"
		height="240"
		autoplay
		loop
		class="mb-0 block h-auto w-4/5 rounded-lg object-cover shadow-lg"
	>
		<source src={videoFile} type="video/mp4" />
		<track kind="captions" srclang="en" label="English" default />
		Your browser does not support the video tag.
	</video>
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
