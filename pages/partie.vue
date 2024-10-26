<template>
    <CoincheDeck :hand="hand" :pressed="cardPressed" :atout="atout" :turn="turn" />
    <CoincheRiver :pli="pli" />
</template>

<script setup lang="ts">
    import { generateRandomDeck, generateRiver } from '@/lib/utils/deck';

    let hand = ref<IPlayCard[]>(generateRandomDeck());
    let pli = ref<IPlayCard[]>([]);

    let atout = ref<CardSuite>();
    let turn = ref<boolean>(true);

    async function cardPressed(suite: CardSuite, value: CardValue) {
        const selectedCardIndex = hand.value.findIndex(
            (card) => card.suite === suite && card.value === value,
        );
        if (selectedCardIndex !== -1) {
            const [selectedCard] = hand.value.splice(selectedCardIndex, 1);
            pli.value = [...pli.value, selectedCard]; // Add the selected card to `pli`
        }
        hand.value = hand.value.filter((card) => card.suite !== suite || card.value !== value);
    }
</script>
