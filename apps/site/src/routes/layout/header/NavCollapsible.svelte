<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import Menu from "./Menu.svelte";
  import X from "./X.svelte";

  export let pathname: string;
  export let links: {
    href: string;
    label: string;
  }[];

  let open = false;
</script>

<button on:click={() => (open = !open)}>
  {#if open}
    <X />
  {:else}
    <Menu />
  {/if}
</button>
{#if open}
  <nav transition:slide>
    {#each links as { href, label }, i}
      <a
        in:fade={{ delay: 200 + 50 * i }}
        out:fade
        class:active={pathname.startsWith(href)}
        {href}
      >
        {label}
      </a>
    {/each}
  </nav>
{/if}

<style lang="scss">
  button {
    all: unset;
  }

  nav {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 64px 16px 16px 12px;
    background-color: var(--gray2);
    display: flex;
    align-items: baseline;
    flex-direction: column;
    gap: 8px;

    & a {
      font-size: 1rem;
      padding: 6px 8px;
      border-radius: 8px;
      color: var(--gray12);
      font-size: 0.875rem;
      font-weight: 400;
      text-decoration: none;

      &::before {
        content: "~ $ ";
        color: var(--gray11);
      }

      &:hover {
        background-color: var(--gray4);
      }

      &:active {
        background-color: var(--gray5);
      }

      &.active {
        color: var(--blue12);
        background-color: var(--blue3);

        &::before {
          color: var(--blue11);
        }

        &:hover {
          background-color: var(--blue4);
        }

        &:active {
          background-color: var(--blue5);
        }
      }
    }
  }
</style>
