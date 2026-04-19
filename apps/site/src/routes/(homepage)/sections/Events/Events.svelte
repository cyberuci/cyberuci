<script lang="ts">
	import { CalendarDays, MapPin, CalendarPlus, Download } from 'lucide-svelte';
</script>

<div class="my-24 space-x">
	<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
		<!-- Featured event card -->
		<div class="featured-card flex flex-col gap-4 rounded-2xl p-6">
			<CalendarDays size={20} />
			<div>
				<p class="type-body-2 font-medium">Tomorrow, 6 – 7PM,</p>
				<h2 class="title type-heading-1">Hands-on Intro to Ethical Hacking</h2>
			</div>
			<p class="type-body-1 line-height-relaxed">
				Learn about the crucial role of ethics in cybersecurity and gain practical skills to protect
				and strengthen digital defenses while adhering to the highest moral standards. Join us to
				become part of the solution in a world where responsible hacking is an essential line of
				defense against cyber threats.
			</p>
			<div class="mt-auto flex flex-col gap-2 pt-4">
				<button
					type="button"
					class="flex cursor-pointer appearance-none items-center gap-2 border-none bg-transparent p-0 text-left type-body-1"
					style="color: white;"
				>
					<MapPin size={16} />
					<span>CyberLab, ISEB</span>
				</button>
				<button
					type="button"
					class="flex cursor-pointer appearance-none items-center gap-2 border-none bg-transparent p-0 text-left type-body-1"
					style="color: white;"
				>
					<CalendarPlus size={16} />
					<span>Add to Google Calendar</span>
				</button>
				<button
					type="button"
					class="flex cursor-pointer appearance-none items-center gap-2 border-none bg-transparent p-0 text-left type-body-1"
					style="color: white;"
				>
					<Download size={16} />
					<span>Download ICS</span>
				</button>
			</div>
		</div>

		<!-- Secondary card -->
		<div class="secondary-card rounded-2xl"></div>
	</div>
</div>

<style>
	.featured-card {
		background-color: #e1f1ff; /* blue-3 */
		color: #1b3d5d; /* blue-12 */
	}

	.title {
		color: #2975ba; /* blue-9 */
	}

	@media (prefers-color-scheme: dark) {
		.featured-card {
			background-color: #0b2945; /* bluedark-3 */
			color: #cae6ff; /* bluedark-12 */
		}

		.title {
			color: #75bbff; /* bluedark-11 */
		}
	}

	.secondary-card {
		background-color: #222222; /* graydark-3 */
	}
</style>
