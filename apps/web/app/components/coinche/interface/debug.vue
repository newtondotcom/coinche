<template>
  <div class="absolute bottom-0 right-4 bg-red-500 font-semibold z-20">
    Trick number : {{ storeState.currentTrick?.number }}
    <br />
    Deck length : {{ storeState.deck.length }}
    <br />

    Distributing : {{ storeState.timeDistrib }}
    <br />
    Announcing : {{ storeState.timeToBidding }}
    <br />
    Current player id : {{ storeState.currentPlayerId }}
    <br />
    Trump : {{ storeState.trump }}
    <br />
    Cards in hands : {{ storeState.hand.length }}
    <br />
    Card playable :
    {{ storeState.hand.some(card => cardCanBePlayed(card, {
            currentPlayerId: storeState.currentPlayerId,
            myId: storeState.getMyId,
            currentTrick: storeState.currentTrick,
            colorAsked: storeState.colorAsked,
            trump: storeState.trump,
            hand: storeState.hand,
        })) }}
  </div>
</template>

<script setup lang="ts">
    import { cardCanBePlayed } from '@/shared/utils/cardRules';
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();
</script>
