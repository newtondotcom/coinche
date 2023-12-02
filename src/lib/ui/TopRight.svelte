<script lang="ts">
    import { page } from "$app/stores";
    
</script>

{#if $page.url.pathname == '/' }
<div class="sm:flex sm:gap-4">
    <a
      class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
      href="/"
    >
      Je veux coincher un petit peu
    </a>
</div>
{/if}

{#if $page.url.pathname == '/game' }

{/if}