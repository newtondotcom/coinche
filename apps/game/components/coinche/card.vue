<script setup lang="ts">
    import { maxCardWidth } from '@/shared/constants';
    import { cardPressed } from '@/shared/emitter/play';
    import { cn } from '@/lib/utils';
    import type { ICard } from '@coinche/shared';

    interface Props {
        card: ICard;
        classStr?: string;
        inDeck: boolean;
    }

    const props = defineProps<Props>();

    const storeAbout = useAboutStore();
    const storeGame = useGameStore();

    async function onPress() {
        await cardPressed(props.card.suite, props.card.value);
    }

    const canBePlayed = computed(() => {
        if (storeGame.current_player_id !== storeAbout.myId) {
            return false;
        }
        if (storeGame.current_pli.length === 0) {
            // First to play
            return true;
        }

        if (storeAbout.atout == 'tout-atout' || storeAbout.atout === props.card.suite) {
            if (storeAbout.atoutIsAsked) {
                // Trump (atout) is asked
                const handHasAtout = storeAbout.hand.some(
                    (c: ICard) => c.suite === storeAbout.atout,
                );
                // Player is olbiged to play a trump above the highest trump in the pli if they have one
                // If they don't have a higher trump, they can play any trump
                if (handHasAtout) {
                    const hasHigherAtout = storeAbout.hand.some(
                        (c: ICard) =>
                            c.suite === storeAbout.atout &&
                            c.valueNum > storeAbout.highestAtoutInPli,
                    );
                    const isLower = props.card.valueNum <= storeAbout.highestAtoutInPli;
                    const isHigher = props.card.valueNum > storeAbout.highestAtoutInPli;
                    if (hasHigherAtout && isHigher) {
                        return true;
                    }
                    if (!hasHigherAtout && isLower) {
                        return true;
                    }
                    console.log('case not arrigning');
                }
            } else {
                // Player has no trump or doesn't need to play a trump
                return !storeAbout.hand.some((c: ICard) => c.suite === storeAbout.atout);
            }
        }

        if (storeAbout.colorAsked && storeAbout.colorAsked !== storeAbout.atout) {
            // Specific color (non-trump) is asked
            const handHasColorAsked = storeAbout.hand.some(
                (c: ICard) => c.suite === storeAbout.colorAsked,
            );
            if (handHasColorAsked) {
                // Player must play the color asked if they have it
                return props.card.suite === storeAbout.colorAsked;
            } else {
                // Player doesn't have the color asked
                const handHasAtout = storeAbout.hand.some(
                    (c: ICard) => c.suite === storeAbout.atout,
                );
                if (handHasAtout) {
                    // Player must play a trump if they have one
                    return props.card.suite === storeAbout.atout;
                }
                console.log(
                    'colorAsked is asked but the player has no colorAsked and has no atout',
                );
                return true;
            }
        }

        return false;
    });

    const classStr = ref(props.classStr || '');
    const svgFolder = '/cards';

    const cardSvgPath = ref(
        `${svgFolder}/${props.card.value === '10' ? 'T' : props.card.value}${props.card.suite.charAt(0).toUpperCase()}.svg`,
    );

    watch(storeGame.current_pli, () => {
        canBePlayed.value;
    });
</script>

<template>
    <div :class="cn(['card', classStr])">
        <img
            :src="cardSvgPath"
            :alt="`${card.value} of ${card.suite} card.`"
            :style="`max-width:${maxCardWidth}px; height: auto;`"
            :class="
                cn(
                    storeAbout.turnToPlay && inDeck && canBePlayed
                        ? 'cursor-pointer hover:scale-125 transition-transform'
                        : '',
                    inDeck && (!canBePlayed || !storeAbout.turnToPlay) ? 'cursor-default' : '',
                    inDeck ? '' : 'cursor-auto',
                )
            "
            @click="canBePlayed ? onPress() : () => {}"
        />
    </div>
</template>

<style scoped>
    .grayscale {
        filter: grayscale(100%);
        opacity: 0.6;
    }
</style>
