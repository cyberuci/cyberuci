<script lang="ts">
	import { resolve } from '$app/paths';
	import { Medal, Info } from 'lucide-svelte';

	interface Props {
		description: string;
	}

	let { description }: Props = $props();
</script>

<div class="my-24 space-x">
	<div class="card flex flex-col overflow-hidden rounded-2xl md:flex-row">
		<div class="w-full flex-shrink-0 p-3 md:w-1/2">
			<enhanced:img
				class="h-full w-full rounded-xl object-cover"
				src="./hivestorm-2.jpeg"
				alt="Competition team"
			/>
		</div>
		<div class="flex flex-1 flex-col justify-between p-8">
			<div>
				<div class="mb-6">
					<Medal size={20} />
				</div>
				<p class="mb-2 type-heading-2">Competitions</p>
				<h2 class="mb-4 type-heading-2 text-blue-11 dark:text-bluedark-11">CCDC, CPTC, & NCL</h2>
				<p class="type-body-1 line-height-relaxed">{description}</p>
			</div>
			<a
				href={resolve('/competition')}
				class="mt-6 flex items-center gap-2 type-body-1 decoration-none"
				style="color: white;"
			>
				<Info size={16} />
				<span>Learn More</span>
			</a>
		</div>
	</div>
</div>

<style>
	.card {
		background-color: #e8e8e8; /* gray-4 */
		color: #202020; /* gray-12 */
	}

	@media (prefers-color-scheme: dark) {
		.card {
			background-color: #222222; /* graydark-3 */
			color: #eeeeee; /* graydark-12 */
		}
	}
</style>
