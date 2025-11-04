<template>
    <div class="absolute top-[50%] left-[50%] flex -translate-x-[50%] flex-row">
        <div
            v-for="i in 4"
            :key="i"
            class="mx-1 flex items-center justify-center"
            :style="{ width: `${maxCardWidth}px`, height: `${maxCardHeight}px` }"
        >
            <div
                class="flex h-full w-full items-center justify-center border-4 border-dotted border-purple-500"
                :class="cn(`min-w-[${maxCardWidth}]`, `min-h-[${maxCardHeight}]`)"
            >
                <Transition name="river-card">
                    <CoincheCard
                        v-if="storeState.currentPli?.plays.length >= i"
                        :key="storeState.currentPli?.plays[i - 1].card.value + storeState.currentPli?.plays[i - 1].card.suite"
                        :card="storeState.currentPli?.plays[i - 1].card"
                        class-str="my-1"
                        :in-deck="false"
                    />
                </Transition>
                <div
                    v-if="!(storeState.currentPli?.plays.length >= i)"
                    :style="{ width: `${maxCardWidth}px`, height: `${maxCardHeight}px` }"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { maxCardHeight, maxCardWidth } from '@/shared/constants';
    import { cn } from '@/lib/utils';
    import { useStateStore } from '@/stores/state';
    const storeState = useStateStore();

</script>

<style scoped>
.river-card-enter-active,
.river-card-leave-active {
    transition: transform 0.35s ease, opacity 0.35s ease;
}

.river-card-enter-from {
    transform: translateY(80px) scale(0.8);
    opacity: 0;
}

.river-card-leave-to {
    transform: translateY(-80px) scale(0.8);
    opacity: 0;
}
</style>
