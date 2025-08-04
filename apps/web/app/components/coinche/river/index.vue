<template>
    <div class="absolute top-[50%] left-[50%] -translate-x-[50%] flex flex-row">
        <div
            v-for="i in 4"
            :key="i"
            class="mx-1"
            :style="{ width: `${maxCardWidth}px`, height: `${maxCardHeight}px` }"
        >
            <div
                class="border-4 border-dotted border-purple-500"
                :class="cn(`min-w-[${maxCardWidth}]`, `min-h-[${maxCardHeight}]`)"
            >
                <CoincheCard
                    v-if="storeGame.currentPli.length >= i"
                    :card="storeGame.currentPli[i - 1].card"
                    class-str="my-1"
                    :in-deck="false"
                />
                <div v-else :style="{ width: `${maxCardWidth}px`, height: `${maxCardHeight}px` }" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { maxCardHeight, maxCardWidth } from '@/shared/constants';
    import { cn } from '@/lib/utils';

    const storeGame = useGameStore();
</script>
