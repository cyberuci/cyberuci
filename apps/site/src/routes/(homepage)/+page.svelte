<script lang="ts">
	import CTAButton from './CTAButton.svelte';
	import { ActivitySquare, CalendarDays, Medal } from 'lucide-svelte';
	import { siDiscord } from 'simple-icons';
</script>

<svelte:head>
	<title>Cyber @ UCI</title>
</svelte:head>

<div class="header">
	<h1 class="heading">
		Cybersecurity matters.<br />
		Be part of the solution.
	</h1>
	<p class="description">
		Cyber@UCI is a community dedicated to making cybersecurity accessible to everyone, regardless of
		experience.
	</p>
	<div class="cta-buttons">
		<CTAButton href="/hackerlab" icon={ActivitySquare} label="Visit HackerLab" />
		<CTAButton href="/events" icon={CalendarDays} label="Visit Events" />
		<CTAButton href="/discord" svgPath={siDiscord.path} label="Join Our Discord" />
		<CTAButton href="/competition" icon={Medal} label="Competition Teams" />
	</div>
	<enhanced:img class="background-image" src="./cover.jpg" alt="" />
</div>

<style lang="scss">
	.header {
		position: relative;
		border-radius: 48px;
		overflow: hidden;
		margin: 16px;
		padding: calc(96px + 40px) 24px;
	}

	.heading {
		font-feature-settings: 'dlig' on;
		font-family: 'BBB Strobo';
		font-stretch: 175%;
		font-size: 32px;
		font-weight: 400;
		line-height: 130%;
		margin: 0 0 32px 0;

		@media (min-width: 384px) {
			font-size: 40px;
		}

		@media (min-width: 512px) {
			font-size: 48px;
		}
	}

	.description {
		margin: 32px 0 48px 0;
		max-width: 672px;
		text-wrap: balance;
		font-feature-settings: 'ss05' on;
		font-family: CommitMonoV142;
		font-size: 16px;
		font-weight: 400;
		line-height: 150%;
	}

	.cta-buttons {
		display: grid;
		gap: 1px;
		grid-template-columns: 1fr;
		border-radius: 6px;
		overflow: hidden;

		@media (min-width: 640px) {
			width: max-content;
			grid-template-columns: 192px 192px;
		}
	}

	.background-image {
		position: absolute;
		z-index: -1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(0.13);
	}
</style>
