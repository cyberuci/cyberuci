<script lang="ts">
  import { onMount } from "svelte";
  import Discord from "./Discord.svelte";
  import Instagram from "./Instagram.svelte";
  import Mail from "./Mail.svelte";

  let element: HTMLDivElement;
  let expand = true;

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        expand = entry.isIntersecting;
      }
    });
    observer.observe(element);
  });
</script>

<div bind:this={element} />
<div class="socials">
  <a href="https://discord.gg/WjbSP2B9Ck">
    <div class="icon">
      <Discord />
    </div>
    {#if expand}
      Discord
    {/if}
  </a>
  <a href="https://instagram.com/cyberuci/">
    <div class="icon">
      <Instagram />
    </div>
    {#if expand}
      Instagram
    {/if}
  </a>
  <a
    href="https://uci.us18.list-manage.com/subscribe?u=0029dcacaf8ca6a3b88c61750&id=701d18798e"
  >
    <div class="icon">
      <Mail />
    </div>
    {#if expand}
      Mailing List
    {/if}
  </a>
</div>

<style>
  .socials {
    position: sticky;
    bottom: calc(16px + env(safe-area-inset-bottom));
    display: flex;
    gap: 8px;
    overflow-y: scroll;
    white-space: nowrap;
  }

  a {
    height: 25px;
    color: var(--gray12);
    background-color: var(--gray3);
    padding: 8px 16px;
    border-radius: 1000px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .icon {
    width: 16px;
    height: 16px;
  }
</style>
