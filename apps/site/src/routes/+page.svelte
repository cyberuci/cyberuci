<script>
	import cover from './cover.jpg';
</script>

<h1>
	We’re Cyber @ UCI, the club for <br />all things cybersecurity. <br />
	We host weekly beginner friendly <br /> workshops, competitions, and challenges.
</h1>
<img src={cover} />

<style lang="scss">
	h1 {
		font-size: 2rem;
		font-weight: 400;
		line-height: 130%;
		max-width: 35ch;
		padding: 0 16px;
		margin: 96px auto;
		text-align: center;
	}
	img {
		width: calc(100% - 24px * 2);
		margin: 0 24px;
		height: 512px;
		object-fit: cover;
		object-position: 50% 40%;
		border-radius: 16px;
	}
</style>
