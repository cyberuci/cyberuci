<script lang="ts">
  export let pathname: string;
  export let links: {
    href: string;
    label: string;
  }[];
</script>

<nav>
  {#each links as { href, label }}
    <a class:active={pathname.startsWith(href)} {href}>{label}</a>
  {/each}
</nav>

<style lang="scss">
  nav {
    display: flex;
    align-items: baseline;
    gap: 12px;

    & a {
      padding: 6px 8px;
      border-radius: 8px;
      color: var(--gray12);
      background-color: var(--gray3);
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
