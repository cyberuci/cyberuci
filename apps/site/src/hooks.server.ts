import type { Handle } from '@sveltejs/kit';

/**
 * Temporary site-wide maintenance page.
 * Returns before any route or layout load, so Sanity is not queried.
 * Set MAINTENANCE to false (or delete this file) to bring the site back.
 */
const MAINTENANCE = true;

const PAGE = `<!doctype html>
<html lang="en" class="dark">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="theme-color" content="#111111" />
		<meta name="robots" content="noindex" />
		<title>Under maintenance — Cyber @ UCI</title>
		<link
			href="https://fonts.googleapis.com/css2?family=TASA+Explorer:wght@400..800&family=Pixelify+Sans:wght@400..700&family=Google+Sans+Code:wght@300..800&display=swap"
			rel="stylesheet"
		/>
		<style>
			:root {
				color-scheme: dark;
				--bg: #111111;
				--text: #eeeeee;
				--muted: #b4b4b4;
				--accent: #75bbff;
			}

			* {
				box-sizing: border-box;
			}

			body {
				margin: 0;
				min-height: 100vh;
				display: grid;
				place-items: center;
				background: var(--bg);
				color: var(--text);
				font-family: 'TASA Explorer', sans-serif;
				-webkit-font-smoothing: antialiased;
			}

			main {
				width: min(72rem, calc(100% - 2.5rem));
				padding: 4rem 0;
			}

			.logo {
				width: 4.5rem;
				height: auto;
				display: block;
				margin-bottom: 2rem;
			}

			.kicker {
				margin: 0;
				font-family: 'Google Sans Code', ui-monospace, monospace;
				font-size: 0.875rem;
				letter-spacing: 0.04em;
				color: var(--accent);
			}

			h1 {
				margin: 0.75rem 0 1rem;
				font-family: 'Pixelify Sans', sans-serif;
				font-size: clamp(1.65rem, 5.4vw, 4.5rem);
				font-weight: 400;
				line-height: 1.15;
				white-space: nowrap;
			}

			p {
				margin: 0;
				max-width: 36rem;
				color: var(--muted);
				font-size: 1.125rem;
				line-height: 1.7;
			}

			a {
				color: var(--accent);
			}
		</style>
	</head>
	<body>
		<main>
			<svg class="logo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 199 174" aria-hidden="true">
				<path
					fill="#1C75BC"
					d="M47.2931 4a8 8 0 0 1 6.9282-4h90.7627a7.9997 7.9997 0 0 1 6.928 4l45.381 78.6025a8.0003 8.0003 0 0 1 0 8l-45.381 78.6025c-1.429 2.475-4.07 4-6.928 4H54.2213a8.0004 8.0004 0 0 1-6.9282-4L1.9119 90.6025a8 8 0 0 1 0-8L47.293 4Z"
				/>
				<path
					fill="#fff"
					d="M77.1784 17.8546a8.0001 8.0001 0 0 1 7.7274-2.0706l63.5212 17.0206c2.761.7397 4.918 2.8961 5.657 5.6568l17.021 63.5216c.74 2.761-.05 5.706-2.071 7.727l-46.501 46.501c-2.021 2.021-4.966 2.811-7.727 2.071l-63.5218-17.021c-2.7607-.739-4.9171-2.896-5.6568-5.656L28.6068 72.083a8.0001 8.0001 0 0 1 2.0706-7.7274l46.501-46.501Z"
				/>
				<path
					fill="#00AEEF"
					d="M137.301 58.5359 104 39.3094a8 8 0 0 0-8.0001 0L60.6987 59.6906a8 8 0 0 0-4 6.9282v40.7622a7.9998 7.9998 0 0 0 4 6.928l35.3012 20.382a8.0005 8.0005 0 0 0 8.0001 0l33.301-19.227c2.667-1.54 2.667-5.388 0-6.928l-11.65-6.727a8.0003 8.0003 0 0 0-8 0L103 110.268a5.9992 5.9992 0 0 1-6.0001 0l-15.6506-9.036a6.0002 6.0002 0 0 1-3-5.1961V77.9641a5.9998 5.9998 0 0 1 3-5.1961l15.6506-9.0359a6.0002 6.0002 0 0 1 6.0001 0l14.651 8.4585a7.9998 7.9998 0 0 0 8 0l11.65-6.7265c2.667-1.5396 2.667-5.3886 0-6.9282Z"
				/>
			</svg>
			<p class="kicker">[MAINTENANCE]</p>
			<h1>Under maintenance</h1>
			<p>
				Cyber@UCI is temporarily unavailable. We’ll be back soon. Questions? Join our
				<a href="https://discord.cyberuci.com/" target="_blank" rel="noopener noreferrer">Discord</a>
				or email
				<a href="mailto:cyberclub@uci.edu">cyberclub@uci.edu</a>!
			</p>
		</main>
	</body>
</html>`;

export const handle: Handle = async ({ event, resolve }) => {
	if (!MAINTENANCE) return resolve(event);

	return new Response(PAGE, {
		status: 503,
		headers: {
			'content-type': 'text/html; charset=utf-8',
			'cache-control': 'no-store'
		}
	});
};
