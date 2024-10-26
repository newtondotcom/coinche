<template>
    <CoincheDeck :hand="hand" :pressed="cardPressed" :atout="atout" :turn="turn" />
    <CoincheRiver :pli="pli" />

    <div class="flex flex-row justify-between">
        <div class="flex flex-col">
            <CoincheInterfaceSavedAnnonce />
            <CoincheInterfacePoints />
        </div>

        <CoincheInterfaceTurn />
    </div>
</template>

<script setup lang="ts">
    import { generateRandomDeck } from '@/lib/utils/deck';

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
