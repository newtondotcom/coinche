<template>
    <div
        v-if="storeState.hand.length > 0"
        class="flex flex-row absolute bottom-0 justify-center w-full"
    >
        <AnimatePresence>
            <Motion
                v-for="card in storeState.hand"
                :key="card.value + card.suite"
                tag="div"
                class="px-1"
                :initial="deckCardMotion.initial"
                :animate="deckCardMotion.animate"
                :exit="deckCardMotion.exit"
                :transition="deckCardMotion.transition"
                :layout="true"
                :layout-id="card.value + card.suite"
            >
                <CoincheCard
                    :card="card"
                    :in-deck="true"
                />
            </Motion>
        </AnimatePresence>
    </div>
</template>

<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v';
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();

const deckCardMotion = {
    initial: { opacity: 0, y: 24, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -24, scale: 0.95 },
    transition: { type: 'spring', stiffness: 260, damping: 24, mass: 0.6 },
};
</script>