<script lang="ts">
	import { isNoticeActive, type NoticeKind, type SiteNotice } from '$lib/common/notices';
	import NoticeBanner from './NoticeBanner.svelte';
	import NoticePopup from './NoticePopup.svelte';

	interface Props {
		notices: SiteNotice[];
		kind: NoticeKind;
	}

	let { notices, kind }: Props = $props();

	const now = new Date();
	const active = $derived(notices.filter((n) => n.kind === kind && isNoticeActive(n, now)));
</script>

{#if kind === 'banner'}
	{#each active as notice (notice._key)}
		<NoticeBanner {notice} />
	{/each}
{:else if active[0]}
	<NoticePopup notice={active[0]} />
{/if}
