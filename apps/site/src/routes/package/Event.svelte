<script lang="ts">
	interface Props {
		title: string;
		description: string;
		background: boolean;
	}

	let { title, description, background }: Props = $props();
</script>

<div class={background ? 'rounded background-2 p-8' : ''}>
	<h3 class="mb-3 type-heading-2">{title}</h3>
	<p class="type-body-1 text-gray-11 line-height-relaxed dark:text-graydark-11">
		{description}
	</p>
</div>
