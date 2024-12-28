<script lang="ts">
	import type { PageData } from './$types';
	import Title from '$lib/common/components/Title.svelte';
	import Contact from './Contacts.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Competition — Cyber @ UCI</title>
</svelte:head>

<Title title="Competition" />
<main>
	<p>
		Cyber @ UCI hosts a competitive side for members who want to dive deeper into cybersecurity in a
		competitive environment. The main competitions we compete in are the Collegiate Cyber Defense
		Competition (CCDC), Collegiate Penetration Testing Competition (CPTC), and NCL (National Cyber
		League). Scroll down for information on each one!
	</p>
	<p>
		Reach out to our Competition Leads and add the role for the respective competition on Discord!
	</p>
	<Contact contacts={data.leads} />
	<h2>CCDC</h2>
	<p>
		The Collegiate Cyber Defense Competition (CCDC) is the premier collegiate cybersecurity
		competition in the United States. Over 100 teams across different regionals and qualifiers
		compete every year. It is endorsed by Congress and sponsored by top defense companies, with
		winners receiving special attention as to recruitment. The scenario is that each college team,
		the Blue Team, inherits an identical corporate network and has to secure it against a live (not
		simulated!) team of penetration testers, the Red Team, otherwise known as “the hackers”, all
		while we are handed business tasks by the corporation who owns the network. It’s the best
		applied cybersecurity experience you can get in college.
	</p>
	<h3>Previous notable results:</h3>
	<h4>2019</h4>
	<ul>
		<li>Western Region: 3rd Place</li>
	</ul>
	<h4>2021</h4>
	<ul>
		<li>Western Region: 1st Place</li>
		<li>Nationals: 5th Place</li>
	</ul>
	<h4>2022</h4>
	<ul>
		<li>Western Region: 2nd Place</li>
	</ul>
	<h4>2023</h4>
	<ul>
		<li>Hivestorm: 1st Place</li>
	</ul>
	<h4>2024</h4>
	<ul>
		<li>CCDC Nationals: 4th Place</li>
		<li>Western Region: 2nd Place</li>
		<li>CCDC Wildcard: 1st Place</li>
	</ul>
	<a href="https://www.nationalccdc.org/">https://www.nationalccdc.org/</a>
	<a
		href="https://ics.uci.edu/2024/04/18/uci-advances-to-national-collegiate-cyber-defense-competition/"
		>UCI Advances to National Collegiate Cyber Defense Competition</a
	>
	<a
		href="https://news.uci.edu/2024/07/01/cyberuci-team-places-fourth-in-national-cybersecurity-competition/"
		>Cyber@UCI team places fourth in national cybersecurity competition</a
	>

	<h2>CPTC</h2>
	<p>
		Collegiate Penetration Testing Competition (CPTC) is a newer competition hosted out of Rochester
		Institute of Technology, which focuses on penetration testing AKA red teaming. We have a
		corporate network to attack and get as much access as possible within an allotted time.
		Recruitment and meetings will start in the Spring.
	</p>
	<a href="https://cp.tc/">https://cp.tc/</a>

	<h2>NCL</h2>
	<p>
		NCL is a national CTF hosted by Cyber Skyline and the National Cyber League Inc. non profit. It
		is a Jeopardy style capture the flag competition, meaning you get small cybersecurity challenges
		and have 72 hours to complete them. One you complete one, you get a small piece of text called a
		“flag”, indicating you got the required unauthorized access or solved the problem
	</p>
	<a href="https://nationalcyberleague.org/about">https://nationalcyberleague.org/about</a>
</main>

<style lang="scss">
	@use '$lib/common/styles/styles' as styles;
	@use '$lib/common/styles/typography' as typography;

	main {
		max-width: styles.$max-width;
		margin: 0 auto;
		padding: 72px styles.$padding-x;
		line-height: 135%;
	}

	h2 {
		margin: 30px 0 12px 0;
		@include typography.title;
		@include typography.xl;
		font-weight: 600;
	}

	a {
		display: block;
	}
</style>
