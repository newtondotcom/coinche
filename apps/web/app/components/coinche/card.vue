<script setup lang="ts">
    import { maxCardWidth } from '@/shared/constants';
    import { cardPressed } from '@/shared/emitter/play';
    import { cn } from '@/lib/utils';
    import { cardCanBePlayed } from '@/shared/utils/cardRules';
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
        return cardCanBePlayed(props.card, {
            current_player_id: storeGame.current_player_id,
            myId: storeAbout.myId,
            current_pli: storeGame.current_pli,
            colorAsked: storeAbout.colorAsked,
            atout: storeAbout.atout,
            hand: storeAbout.hand,
        });
    });

    const classStr = computed(() => props.classStr || '');
    const svgFolder = '/cards';

    const cardSvgPath = computed(() => 
        `${svgFolder}/${props.card.value === '10' ? 'T' : props.card.value}${props.card.suite.charAt(0).toUpperCase()}.svg`
    );
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
