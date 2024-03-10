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

    let annonceOuverte = false;
    let getCoinched = true;
</script>

<div id="main">
  <Deck {hand} />
  <Turn side="down" />
  <!--
  <Fake side="left" qqty={4} />
  -->
  <Fake side="right" qqty={4} />
  <River {river} />
  <Filter bind:hand/>
  <Annonce bind:annonceOuverte/>
  <Coinched bind:getCoinched/>
</div>
