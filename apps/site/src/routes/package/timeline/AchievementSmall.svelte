<script lang="ts">
	interface Props {
		text: string;
		year: string;
	}

	let { text, year }: Props = $props();
</script>

<li
	class="flex items-center gap-4 border-2 border-blue-7 rounded-lg border-solid background-2 p-4 dark:border-bluedark-7"
>
	<span class="w-10 shrink-0 type-label text-blue-9 dark:text-bluedark-11">{year}</span>
	<span class="text-gray-11 type-body-1 dark:text-graydark-11">{text}</span>
</li>
