<script lang="ts">
    import { page } from "$app/stores";
</script>

{#if $page.url.pathname == '/game' }
<div class="hidden md:block">
    <nav aria-label="Global">
      <ul class="flex items-center gap-6 text-sm">
        <li>
          <div
            class="transition hover:text-gray-500/75 w-24 bg-teal-400 rounded-xl px-4 py-2 text-white"
          >
            Atout : <span class="text-teal-600">♥</span>
        </div>
        </li>
        <li>
          <div
            class="text-gray-500 transition hover:text-gray-500/75"
          >
            Dernier pli : <span class="text-teal-600">9♥ J♥ 10♥ 7♥</span>
        </div>
        </li>
        <li>
          <div
            class="text-gray-500 transition hover:text-gray-500/75"
          >
            Annonce : <span class="text-teal-600">100♥</span>
        </div>
        </li>
        <li>
          <div
            class="text-gray-500 transition hover:text-gray-500/75"
          >
            Points de ta team : <span class="text-teal-600">9♥ J♥ 10♥ 7♥</span>
        </div>
        </li>
        <li>
          <div
            class="text-gray-500 transition hover:text-gray-500/75"
          >
          Points adverses : <span class="text-teal-600">9♥ J♥ 10♥ 7♥</span>
        </div>
        </li>
        <li>
          <div
            class="transition hover:text-gray-500/75 bg-teal-400 rounded-xl px-4 py-2 text-white mr-20 w-28 text-center"
          >
          <div class="flex items-center">
            Fait avec <span class="ml-2 text-teal-600 inline">♥</span>
          </div>              
        </div>
        </li>
      </ul>
    </nav>
  </div>
{/if}