<template>
    <div class="absolute left-[50%] top-[30%] -translate-x-[50%]">
        <h2
            class="bg-opacity-50 bg-linear-to-b from-neutral-200 to-neutral-400 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-neutral-50 dark:to-neutral-400 md:text-7xl cursor-pointer"
        >
            {{ storeState.biddingElected.bidding }}

            {{ storeState.atout == 'clubs' ? '♣' : '' }}
            {{ storeState.atout == 'diamonds' ? '♦' : '' }}
            {{ storeState.atout == 'hearts' ? '♥' : '' }}
            {{ storeState.atout == 'spades' ? '♠' : '' }}
            {{ storeState.atout == 'sans-atout' ? 'SA' : '' }}
            {{ storeState.atout == 'tout-atout' ? 'TA' : '' }}
        </h2>
        <h3
            class="bg-opacity-50 bg-linear-to-b from-neutral-200 to-neutral-400 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-neutral-50 dark:to-neutral-400 md:text-5xl cursor-pointer"
        >
            par
            {{ storeState.biddingElected.playerId }}
        </h3>
        <h4
            class="bg-opacity-50 bg-linear-to-b from-neutral-200 to-neutral-400 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-neutral-50 dark:to-neutral-400 md:text-4xl cursor-pointer"
        >
            <Badge v-if="storeState.coinched">Coinché</Badge>
            <Badge v-if="storeState.surcoinched">Coinché</Badge>
        </h4>
    </div>
</template>

<script setup lang="ts">
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();
</script>
