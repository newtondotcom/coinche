<script lang="ts">
    import Deck from "$lib/cards/deck.svelte";
    import Fake from "$lib/cards/fake.svelte";
    import River from "$lib/cards/river.svelte";
    import Annonce from "$lib/ui/annonce.svelte";


    let showModal = false
    const handleToggleModal = () => {
        showModal = !showModal
    }

    function generateRandomDeck(): IPlayCard[] {
        const suites: CardSuite[] = ['diamonds', 'clubs', 'hearts', 'spades'];
        const values: CardValue[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const deck: IPlayCard[] = [];

        while (deck.length < 8) {
            const randomSuite: CardSuite = suites[Math.floor(Math.random() * suites.length)];
            const randomValue: CardValue = values[Math.floor(Math.random() * values.length)];
            const key: string = Math.random().toString();
            const valueNum: number = values.indexOf(randomValue) + 1;
            const isDuplicate = deck.some((card) => card.suite === randomSuite && card.value === randomValue);
            if (!isDuplicate) {
                deck.push({ suite: randomSuite, value: randomValue, key, valueNum });
            }
        }
        return deck;
    }
    let hand = generateRandomDeck();
</script>

<Deck {hand} />
<Fake side="top" qqty={8} />
<Fake side="left" qqty={8} />
<Fake side="right" qqty={8} />
<River {hand} />



<button on:click={() => handleToggleModal()}>Open modal</button>
<Annonce
  title="Edit your details"
  open={showModal}
  on:close={() => handleToggleModal()}
>
  <svelte:fragment slot="body">
    This is content inside my modal! 👋
  </svelte:fragment>
</Annonce>