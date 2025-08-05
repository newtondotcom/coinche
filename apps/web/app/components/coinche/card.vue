<script setup lang="ts">
    import { maxCardWidth } from '@/shared/constants';
    import { cardPressed } from '@/shared/emitter/play';
    import { cn } from '@/lib/utils';
    import { cardCanBePlayed } from '@/shared/utils/cardRules';
    import type { ICard } from '@coinche/shared';
    import { useStateStore } from '@/stores/state';
    const storeState = useStateStore();

    interface Props {
        card: ICard;
        classStr?: string;
        inDeck: boolean;
    }

    const props = defineProps<Props>();


    async function onPress() {
        await cardPressed(props.card.suite, props.card.value);
    }

    const canBePlayed = computed(() => {
        const currentPliObj = Array.isArray(storeState.currentPli)
            ? undefined
            : storeState.currentPli;
        return cardCanBePlayed(props.card, {
            currentPlayerId: storeState.currentPlayerId,
            myId: storeState.myId,
            currentPli: currentPliObj?.plays ?? [],
            colorAsked: storeState.colorAsked,
            atout: storeState.atout,
            hand: storeState.hand,
        });
    });

    const classStr = ref(props.classStr || '');
    const svgFolder = '/cards';

    const cardSvgPath = ref(
        `${svgFolder}/${props.card.value === '10' ? 'T' : props.card.value}${props.card.suite.charAt(0).toUpperCase()}.svg`,
    );

    watch(storeState.currentPli, () => {
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
                    storeState.turnToPlay && inDeck && canBePlayed
                        ? 'cursor-pointer hover:scale-125 transition-transform'
                        : '',
                    inDeck && (!canBePlayed || !storeState.turnToPlay) ? 'cursor-default' : '',
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
