<template>
    <div class="absolute bottom-0 right-4 bg-red-500 font-semibold z-20">
        Pli number : {{ storeGame.pli_number }}
        <br />
        Deck length : {{ storeGame.deck.length }}
        <br />

        Distributing : {{ storeAbout.timeDistrib }}
        <br />
        Announcing : {{ storeAbout.timeTobidding }}
        <br />
        Player starting : {{ storeGame.playerStartingId }}
        <br />
        Current player id : {{ storeGame.currentPlayerId }}
        <br />
        Atout : {{ storeAbout.atout }}
        <br />
        Cards in hands : {{ storeAbout.hand.length }}
        <br />
        Card playable : {{ storeAbout.hand.some(card => cardCanBePlayed(card, {
            currentPlayerId: storeGame.currentPlayerId,
            myId: storeAbout.myId,
            currentPli: storeGame.currentPli,
            colorAsked: storeAbout.colorAsked,
            atout: storeAbout.atout,
            hand: storeAbout.hand,
        })) }}
    </div>
</template>

<script setup lang="ts">
    import { cardCanBePlayed } from '@/shared/utils/cardRules';
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
</script>
