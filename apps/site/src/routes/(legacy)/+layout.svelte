<script lang="ts">
	import type { LayoutData } from './$types';
	import Header from './layout/header/Header.svelte';
	import Footer from './layout/footer/Footer.svelte';

	export let data: LayoutData;
</script>

<Header />
<main>
	<slot />
</main>
<Footer info={data.info} />
