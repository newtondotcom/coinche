<template>
    <div
        v-if="storeState.hand.length > 0"
        class="flex flex-row absolute bottom-0 justify-center w-full"
    >
        <CoincheCard
            v-for="card in storeState.hand"
            :key="card.value + card.suite"
            :card="card"
            :in-deck="true"
        />
    </div>
</template>

<script setup lang="ts">
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();
</script>
