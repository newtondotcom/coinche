<template>
  <div class="h-96 flex justify-center items-center">
    <div class="grid grid-cols-2 gap-x-6 gap-y-2">
      <CoincheRiverCard
        v-for="i in 4"
        :key="i"
        v-show="storeGame.current_trick.length >= i"
        :card="storeGame.current_trick[i - 1].card"
        :player-id="storeGame.current_trick[i - 1]?.playerId || ''"
        :position="(i - 1) as CardPosition"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const storeGame = useGameStore();

type CardPosition = 0 | 1 | 2 | 3;
</script>
