<script lang="ts">
	import Title from '$lib/common/components/Title.svelte';
</script>

<svelte:head>
	<title>Events — Cyber @ UCI</title>
</svelte:head>
<div class="my-40 space-x">
	<Title title="Events" />
	<iframe
		src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&src=Y3liZXJjbHViQHVjaS5lZHU&src=Y19lbWpxa281OWhmMGFkMWxpM29tdWVrNDBsMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZWxpdTE1QHVjaS5lZHU&color=%23039be5&color=%23b39ddb&color=%230b8043&color=%23616161"
		style="border:solid 1px #777"
		frameborder="0"
		scrolling="no"
		class="h-[75vh] w-full"
		title="Google Calendar"
	></iframe>
</div>
