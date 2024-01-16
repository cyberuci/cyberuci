<script lang="ts">
	import { Medal, Info } from 'lucide-svelte';
	import { siGooglecalendar } from 'simple-icons';
</script>

<div class="competitions">
	<enhanced:img class="image" src="./hivestorm-2.jpeg" alt="" />
	<div class="information">
		<Medal size={16} />
		<h2>
			Competitions<br />
			<span class="title">CCDC, CPTC, & NCL</span>
		</h2>
		<p class="description">
			Cyber @ UCI hosts a competitive side for members who want to dive deeper into cybersecurity in
			a competitive environment. The main competitions we compete in are the Collegiate Cyber
			Defense Competition (CCDC), Collegiate Penetration Testing Competition (CPTC), and NCL
			(National Cyber League).
		</p>
		<div class="info">
			<div class="learn-more">
				<Info size={16} />
				<span>Learn More</span>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.competitions {
		margin: 16px;
		display: grid;
		gap: 16px;

		@media (min-width: 1024px) {
			grid-template-columns: 5fr 7fr;
		}
	}

	.information {
		padding: 32px 80px 80px 24px;
		border-radius: 32px;
		color: #fff;
		background: #1c1c1c;
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
				color: var(--cyber-blue-4);
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
			}
		}
	}

	.image {
		border-radius: 32px;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
