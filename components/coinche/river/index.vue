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
                    v-if="pli.length >= i"
                    :suite="pli[i - 1].suite"
                    :value="pli[i - 1].value"
                    classStr="my-1"
                    :inDeck="false"
                    :canBePlayed="false"
                />
                <div
                    :style="{ width: `${maxCardWidth}px`, height: `${maxCardHeight}px` }"
                    v-else
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { maxCardHeight, maxCardWidth } from '@/lib/constants';
    import { cn } from '@/lib/utils';

    const storeGame = useGameStore();
    const pli: Ref<ICard[]> = computed(() => storeGame.game.current_pli);
</script>
