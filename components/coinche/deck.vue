<template>
    <div class="flex flex-row absolute bottom-0 justify-center w-full">
        <Card
            v-for="card in storeAbout.hand"
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

    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();

    interface Props {
        pressed: (suite: CardSuite, value: CardValue) => void;
    }
    const props = defineProps<Props>();

    const computeCanBePlayed = (card: ICard) => {
        if (!storeAbout.colorAsked) {
            // First to play
            return true;
        }

        if (storeAbout.atoutIsAsked) {
            // Atout (trump) is asked
            if (card.suite === storeAbout.atout) {
                // Player must play a higher atout if they have one
                return (
                    !storeAbout.highestAtoutInPli ||
                    card.valueNum > storeAbout.highestAtoutInPli ||
                    storeAbout.hand.every(
                        (c: ICard) =>
                            c.suite !== storeAbout.atout ||
                            c.valueNum <= storeAbout.highestAtoutInPli,
                    )
                );
            } else {
                // Player has no atout or doesn't need to play an atout
                return !storeAbout.hand.some((c: ICard) => c.suite === storeAbout.atout);
            }
        }

        if (storeAbout.colorAsked && storeAbout.colorAsked !== storeAbout.atout) {
            // Specific color (non-atout) is asked
            return (
                card.suite === storeAbout.colorAsked ||
                (storeAbout.hand.every((c: ICard) => c.suite !== storeAbout.colorAsked) &&
                    card.suite === storeAbout.atout) ||
                storeAbout.hand.every(
                    (c: ICard) => c.suite !== storeAbout.colorAsked && c.suite !== storeAbout.atout,
                )
            );
        }

        return false;
    };
</script>
