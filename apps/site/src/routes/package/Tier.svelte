<script lang="ts">
	interface Props {
		name: string;
		price: string;
		perks: string[];
		color: string;
	}

	let { name, price, perks, color }: Props = $props();
</script>

<div class="flex flex-col overflow-hidden rounded background-2">
	<div style="height: 3px; background-color: {color};"></div>
	<div class="flex flex-col p-6">
		<p class="mb-1 type-label text-gray-11 dark:text-graydark-11">
			{name}
		</p>
		<p class="mb-6 type-heading-1">{price}</p>
		<ul class="flex flex-col list-none gap-2 pl-0">
			{#each perks as perk (perk)}
				<li
					class="flex items-start gap-2 type-body-1 text-gray-11 line-height-relaxed dark:text-graydark-11"
				>
					<span
						class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
						style="background-color: {color}; opacity: 0.7;"
					></span>
					{perk}
				</li>
			{/each}
		</ul>
	</div>
</div>
