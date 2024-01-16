<script lang="ts">
	import { Calendar, Map } from 'lucide-svelte';
	import { siGooglecalendar } from 'simple-icons';
</script>

<div class="events">
	<div class="current">
		<Calendar size={16} />
		<h2>
			Tomorrow, 6 - 7PM,<br />
			<span class="title">Hands-on Intro to Ethical Hacking</span>
		</h2>
		<p class="description">
			Learn about the crucial role of ethics in cybersecurity and gain practical skills to protect
			and strengthen digital defenses while adhering to the highest moral standards. Join us to
			become part of the solution in a world where responsible hacking is an essential line of
			defense against cyber threats.
		</p>
		<div class="info">
			<div class="location">
				<Map size={16} />
				<span>CyberLab, ISEB</span>
			</div>
			<div class="google-calendar">
				<div class="icon">
					<svg
						width={(22 / 24) * 16}
						height={(22 / 24) * 16}
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
					>
						<path d={siGooglecalendar.path} />
					</svg>
				</div>
				<span>Add to Google Calendar</span>
			</div>
			<div class="download">
				<Calendar size={16} />
				<span>Download ICS</span>
			</div>
		</div>
	</div>
	<div class="next"></div>
</div>

<style lang="scss">
	.events {
		margin: 16px;
		display: grid;
		gap: 16px;

		@media (min-width: 1024px) {
			grid-template-columns: 7fr 5fr;
		}
	}

	.current {
		padding: 32px 80px 80px 24px;
		border-radius: 32px;
		color: #000;
		background-color: var(--cyber-blue-5);
		font-feature-settings:
			'dlig' on,
			'ss05' on;
		font-family: CommitMonoV142;
		font-size: 16px;
		font-weight: 400;
		line-height: 145%;

		h2 {
			margin: 24px 0 32px 0;
			font-family: TASA Explorer;
			font-size: 32px;
			font-style: normal;
			font-weight: 500;
			line-height: 130%;

			.title {
				color: var(--cyber-blue-2);
			}
		}

		.description {
			margin: 32px 0 40px 0;
		}

		.info {
			margin: 40px 0 0 0;

			> * {
				display: flex;
				align-items: center;
				gap: 12px;
				font-size: 14px;
				line-height: 145%;
				margin: 8px 0;

				.icon {
					width: 16px;
					height: 16px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.next {
		border-radius: 32px;
		background: #1c1c1c;
	}
</style>
