<script setup lang="ts">
    import { maxCardWidth } from '@/lib/constants';
    import { cn } from '@/lib/utils';
    import { cardPressed } from '~/lib/supabase/plays';

    interface Props {
        card: ICard;
        classStr?: string;
        inDeck: boolean;
    }

    const props = defineProps<Props>();

    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    const canBePlayed = computed(() => {
        if (storeGame.current_player_id !== storeAbout.myId) {
            return false;
        }
        if (!storeAbout.colorAsked) {
            // First to play
            return true;
        }

        if (storeAbout.atoutIsAsked) {
            // Atout (trump) is asked
            if (props.card.suite === storeAbout.atout) {
                // Player must play a higher atout if they have one
                return (
                    !storeAbout.highestAtoutInPli ||
                    props.card.valueNum > storeAbout.highestAtoutInPli ||
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
                props.card.suite === storeAbout.colorAsked ||
                (storeAbout.hand.every((c: ICard) => c.suite !== storeAbout.colorAsked) &&
                    props.card.suite === storeAbout.atout) ||
                storeAbout.hand.every(
                    (c: ICard) => c.suite !== storeAbout.colorAsked && c.suite !== storeAbout.atout,
                )
            );
        }

        return false;
    });
    const classStr = ref(props.classStr || '');
    const svgFolder = '/cards';

    const cardSvgPath = `${svgFolder}/${props.card.value === '10' ? 'T' : props.card.value}${props.card.suite.charAt(0).toUpperCase()}.svg`;
</script>

<template>
    <div :class="cn(['card', classStr])">
        <img
            :src="cardSvgPath"
            :alt="`${props.card.value} of ${props.card.suite} card.`"
            :style="`max-width:${maxCardWidth}px; height: auto;`"
            :class="
                cn(
                    inDeck && canBePlayed
                        ? 'cursor-pointer hover:scale-125 transition-transform'
                        : '',
                    inDeck && !canBePlayed ? 'cursor-wait grayscale' : '',
                    inDeck ? '' : 'cursor-auto',
                )
            "
            @click="canBePlayed ? cardPressed(props.card.suite, props.card.value) : () => {}"
        />
    </div>
</template>
