<template>
    <div
        v-if="storeState.hand.length > 0"
        class="absolute bottom-0 flex w-full justify-center"
    >
        <TransitionGroup
            name="deck-card"
            tag="div"
            class="flex max-w-full flex-row flex-wrap justify-center gap-2"
        >
            <CoincheCard
                v-for="card in storeState.hand"
                :key="card.value + card.suite"
                :card="card"
                :in-deck="true"
            />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();
</script>

<style scoped>
.deck-card-enter-active,
.deck-card-leave-active {
    transition: transform 0.35s ease, opacity 0.35s ease;
}

.deck-card-enter-from {
    transform: translateY(40px) scale(0.9);
    opacity: 0;
}

.deck-card-leave-to {
    transform: translateY(-140px) scale(1.05);
    opacity: 0;
}

.deck-card-move {
    transition: transform 0.3s ease;
}
</style>
