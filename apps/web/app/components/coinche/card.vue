<script setup lang="ts">
import { maxCardWidth } from "@/shared/constants";
import { cardPressed } from "@/shared/emitter/play";
import { cn } from "@/lib/utils";
import { cardCanBePlayed } from "@/shared/utils/cardRules";
import type { ICard } from "@coinche-reborn/api";
import { useStateStore } from "@/stores/state";
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
  const currentTrickObj = Array.isArray(storeState.currentTrick)
    ? undefined
    : storeState.currentTrick;
  return cardCanBePlayed(props.card, {
    currentPlayerId: storeState.currentPlayerId,
    myId: storeState.getMyId,
    currentTrick: currentTrickObj as any,
    colorAsked: storeState.colorAsked,
    trump: storeState.trump,
    hand: storeState.hand,
  });
});

const classStr = ref(props.classStr || "");
const svgFolder = "/cards";

const cardSvgPath = ref(
  `${svgFolder}/${props.card.value === "10" ? "T" : props.card.value}${props.card.suite.charAt(0).toUpperCase()}.svg`,
);

watch(storeState.currentTrick, () => {
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
