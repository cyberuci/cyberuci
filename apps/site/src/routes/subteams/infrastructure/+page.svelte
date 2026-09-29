<script lang="ts">
	import type { PageData } from './$types';
	import SubteamPage from '../SubteamPage.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<SubteamPage {...data} />
