<div class="cyber">
	<p>Cyber @ UCI&#160Cyber @ UCI&#160</p>
</div>

<style lang="scss">
	.cyber {
		overflow: hidden;
		padding: 48px 0 0 0;

		p {
			@keyframes scroll {
				from {
					transform: translateX(0);
				}

				to {
					transform: translateX(-50%);
				}
			}

			animation: scroll 15s linear infinite;
			width: max-content;
			color: var(--cyber-blue-2);
			margin: 0;
			white-space: nowrap;
			text-align: center;
			font-family: 'TINY';
			font-style: normal;
			font-weight: 120;
			font-size: 20vw;
			font-feature-settings: 'ss03' on, 'ss05' on, 'ss02' on, 'ss01' on;
		}
	}
</style>
