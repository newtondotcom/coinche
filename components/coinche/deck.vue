<template>
    <div class="flex flex-row absolute bottom-0 justify-center w-full">
        <Card
            v-for="card in hand"
            :key="card.value + card.suite"
            :suite="card.suite"
            :value="card.value"
            :pressed="pressed"
            :inDeck="true"
            :canBePlayed="computeCanBePlayed(card)"
        />
    </div>
</template>

<script setup lang="ts">
    import Card from '@/components/coinche/card.vue';

    interface Props {
        pressed: (suite: CardSuite, value: CardValue) => void;
        hand: ICard[];
        atout: CardSuite;
        turn: boolean;
        colorAsked: CardSuite | undefined;
        atoutIsAsked: boolean;
        highestAtoutInPli: number;
    }
    const props = defineProps<Props>();

    const computeCanBePlayed = (card: ICard) => {
        const { atout, colorAsked, atoutIsAsked, hand } = props;

        if (!colorAsked) {
            // First to play
            return true;
        }

        if (atoutIsAsked) {
            // Atout (trump) is asked
            if (card.suite === atout) {
                // Player must play a higher atout if they have one
                return (
                    !props.highestAtoutInPli ||
                    card.valueNum > props.highestAtoutInPli ||
                    hand.every((c) => c.suite !== atout || c.valueNum <= props.highestAtoutInPli)
                );
            } else {
                // Player has no atout or doesn't need to play an atout
                return !hand.some((c) => c.suite === atout);
            }
        }

        if (colorAsked && colorAsked !== atout) {
            // Specific color (non-atout) is asked
            return (
                card.suite === colorAsked ||
                (hand.every((c) => c.suite !== colorAsked) && card.suite === atout) ||
                hand.every((c) => c.suite !== colorAsked && c.suite !== atout)
            );
        }

        return false;
    };
</script>
