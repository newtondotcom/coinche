<template>
    <div class="absolute top-[50%] left-[50%] -translate-x-[50%] flex flex-row">
        <div
            v-for="(slot, index) in centerSlots"
            :key="index"
            class="mx-1"
            :style="{ width: `${maxCardWidth}px`, height: `${maxCardHeight}px` }"
        >
            <div
                class="border-t-4 border-dotted border-purple-500 flex items-center justify-center"
                :class="cn(`min-w-[${maxCardWidth}]`, `min-h-[${maxCardHeight}]`)"
            >
                <AnimatePresence>
                    <Motion
                        v-if="slot.card"
                        :key="slot.id"
                        tag="div"
                        :initial="riverCardMotion.initial"
                        :animate="riverCardMotion.animate"
                        :exit="riverCardMotion.exit"
                        :transition="riverCardMotion.transition"
                        :layout="true"
                        :layout-id="slot.card ? slot.card.value + slot.card.suite : undefined"
                    >
                        <CoincheCard
                            :card="slot.card"
                            class-str="my-1"
                            :in-deck="false"
                        />
                    </Motion>
                </AnimatePresence>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Motion, AnimatePresence } from 'motion-v';
import { maxCardHeight, maxCardWidth } from '@/shared/constants';
import { cn } from '@/lib/utils';
import { useStateStore } from '@/stores/state';
import type { ICard } from '@coinche/shared';

const storeState = useStateStore();

interface CenterSlot {
    id: string;
    card: ICard | null;
}

const riverCardMotion = {
    initial: { opacity: 0, scale: 0.8, y: -16 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 16 },
    transition: { type: 'spring', stiffness: 260, damping: 26, mass: 0.7 },
};

const centerSlots = computed<CenterSlot[]>(() => {
    const plays = Array.isArray(storeState.currentPli)
        ? []
        : storeState.currentPli?.plays ?? [];

    return Array.from({ length: 4 }, (_, index) => {
        const play = plays[index];
        if (!play) {
            return { id: `slot-${index}`, card: null };
        }

        const { card, playerId } = play;
        return {
            id: `${card.value}${card.suite}-${playerId ?? index}`,
            card,
        };
    });
});
</script>