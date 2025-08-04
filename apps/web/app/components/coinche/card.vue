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
        const currentPliObj = Array.isArray(storeGame.currentPli)
            ? undefined
            : storeGame.currentPli;
        return cardCanBePlayed(props.card, {
            currentPlayerId: storeGame.currentPlayerId,
            myId: storeAbout.myId.value,
            currentPli: currentPliObj?.plays ?? [],
            colorAsked: storeAbout.colorAsked,
            atout: storeAbout.atout,
            hand: storeAbout.hand,
        });
    });

    const classStr = ref(props.classStr || '');
    const svgFolder = '/cards';

    const cardSvgPath = ref(
        `${svgFolder}/${props.card.value === '10' ? 'T' : props.card.value}${props.card.suite.charAt(0).toUpperCase()}.svg`,
    );

    watch(storeGame.currentPli, () => {
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
