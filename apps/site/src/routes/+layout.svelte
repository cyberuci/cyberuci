<script lang="ts">
	import './global.scss';
	import Header from './layout/header/Header.svelte';
	import Socials from './layout/socials/Socials.svelte';
	import Footer from './layout/footer/Footer.svelte';
</script>

<Header />
<main>
	<slot />
</main>
<Socials />
<Footer />
