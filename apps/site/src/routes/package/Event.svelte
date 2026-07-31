<script lang="ts">
	interface Props {
		title: string;
		description: string;
		titleColor?: string;
		backgroundColor?: string;
		border?: boolean;
		padding?: boolean;
	}

	let {
		title,
		description,
		titleColor = '',
		backgroundColor = '',
		border = false,
		padding = false
	}: Props = $props();
</script>

<div
	class="{backgroundColor} flex items-center rounded-md border-solid{padding ? 'p-8' : ''} {border
		? 'border-1 border-blue-10'
		: 'border-0'}"
>
	<div class="pb-[1rem] lg:pb-0">
		<p class="mb-3 type-body-1 {titleColor}"><b>{title}</b></p>
		<p class="type-body-1 text-gray-11 dark:text-graydark-11">
			{description}
		</p>
	</div>
</div>
