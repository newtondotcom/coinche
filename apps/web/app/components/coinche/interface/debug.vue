<template>
    <div class="absolute bottom-0 right-4 bg-red-500 font-semibold z-20">
        Pli number : {{ storeState.currentPli?.number }}
        <br />
        Deck length : {{ storeState.deck.length }}
        <br />

        Distributing : {{ storeState.timeDistrib }}
        <br />
        Announcing : {{ storeState.timeToBidding }}
        <br />
        Current player id : {{ storeState.currentPlayerId }}
        <br />
        Atout : {{ storeState.atout }}
        <br />
        Cards in hands : {{ storeState.hand.length }}
        <br />
        Card playable : {{ storeState.hand.some(card => cardCanBePlayed(card, {
            currentPlayerId: storeState.currentPlayerId,
            myId: storeState.getMyId,
            currentPli: storeState.currentPli,
            colorAsked: storeState.colorAsked,
            atout: storeState.atout,
            hand: storeState.hand,
        })) }}
    </div>
</template>

<script setup lang="ts">
    import { cardCanBePlayed } from '@/shared/utils/cardRules';
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();
</script>
