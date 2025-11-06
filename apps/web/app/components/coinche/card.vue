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
            myId: storeState.getMyId,
            currentPli: currentPliObj as any,
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
    <div :class="cn(['', classStr])">
        <img
            :src="cardSvgPath"
            :alt="`${card.value} of ${card.suite} card.`"
            :style="`max-width:${maxCardWidth}px; height: auto;`"
            :class="
                cn(
                    `backdrop-blur-md bg-white/10`,
                    storeState.turnToPlay && inDeck && canBePlayed
                        ? 'cursor-pointer hover:scale-110 transition-transform playable'
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
    .playable {
        border-image-source: linear-gradient(135deg, #39ff14, #00ffa3);
        border-image-slice: 1;
        box-shadow: 0 0 12px rgba(57, 255, 20, 0.45);
    }
</style>
