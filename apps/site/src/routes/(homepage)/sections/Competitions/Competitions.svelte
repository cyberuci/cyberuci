<script lang="ts">
	import { Medal, Info } from 'lucide-svelte';

	interface Props {
		description: string;
	}

	let { description }: Props = $props();
</script>

<div class="mx-default-x my-24">
	<div class="grid items-start gap-y-15 lg:grid-cols-16">
		<div class="flex items-center gap-2 lg:col-start-1 lg:col-end-5">
			<Medal size={18} />
			<h2 class="type-label font-550">Competition</h2>
		</div>
		<div class="lg:col-start-5 lg:col-end-14">
			<p class="mb-6 mt-2 max-w-prose type-heading-1 line-height-relaxed">
				{description}
			</p>
			<a
				href="/competition"
				class="flex items-center gap-2 text-blue-12 decoration-none dark:text-bluedark-12"
			>
				<Info size={16} />
				<span class="pb-.5">Learn More</span>
			</a>
		</div>
		<div class="lg:col-start-4 lg:row-start-2 lg:col-end-15">
			<enhanced:img class="h-auto w-full rounded-sm" src="./hivestorm-2.jpeg" alt="" />
		</div>
	</div>
</div>
