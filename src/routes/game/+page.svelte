<script lang="ts">
    import Deck from "$lib/cards/Deck.svelte";
    import Fake from "$lib/cards/Fake.svelte";
    import River from "$lib/cards/River.svelte";
    import Filter from "$lib/ui/Filter.svelte";
    import Turn from "$lib/ui/Turn.svelte";
    import Annonce from "$lib/ui/Annonce.svelte";
    import { generateRandomDeck, generateRiver} from "$lib/utils/deck";
    import Coinched from "$lib/ui/Coinched.svelte";

    let hand = generateRandomDeck();
    let river = generateRiver();

    let annonceOuverte = true;
    let getCoinched = false;
    let tourAnnonce = false;
    let turn = "down"
</script>

<div id="main">
  <Deck {hand} />
  <Turn side={turn} />
  <!--
  <Fake side="left" qqty={4} />
  -->
  <Fake side="right" qqty={4} />

  {#if !annonceOuverte}
  <Filter bind:hand/>
  {/if}
  <Coinched bind:getCoinched/>
  {#if annonceOuverte }
  {#if tourAnnonce}
  <Annonce bind:annonceOuverte/>
  {:else}
  <div class="flex flex-row justify-center items-center h-screen w-screen pb-[150px]">
  <button
  class="flex rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow text-center"
  on:click={() => {}}
  >
  Coincher
  </button>
</div>
  {/if}
  {:else}
  <River {river} />
  {/if}
</div>
