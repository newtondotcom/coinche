<script setup lang="ts">
    import Card from '@/components/coinche/card.vue';
    import { cn } from '@/lib/utils';

    interface Props {
        pressed: (suite: CardSuite, value: CardValue) => void;
        hand: IPlayCard[];
        atout: CardSuite;
        turn: boolean;
    }
    const props = defineProps<Props>();
</script>

<template>
    <div class="flex flex-row absolute bottom-0 justify-center w-full">
        <Card
            v-for="card in hand"
            :suite="card.suite"
            :value="card.value"
            :pressed="pressed"
            :inDeck="true"
            :canBePlayed="true"
        />
    </div>
</template>
