<template>
  <div class="border border-white bg-slate-800 rounded p-2 h-[50px] flex gap-2">
    <div>
      {{ storeGame.last_bid.bidding }}
    </div>
    <div>
      {{ storeGame.last_bid.suite == 'diamonds' ? '♦️' : '' }}
      {{ storeGame.last_bid.suite == 'hearts' ? '♥️' : '' }}
      {{ storeGame.last_bid.suite == 'clubs' ? '♣️' : '' }}
      {{ storeGame.last_bid.suite == 'spades' ? '♠️' : '' }}
      {{ storeGame.last_bid.suite == 'tout-atout' ? 'TA' : '' }}
      {{ storeGame.last_bid.suite == 'sans-atout' ? 'SA' : '' }}
    </div>
    Par
    {{ storeGame.last_bid.playerId }}
  </div>
</template>

<script setup lang="ts">
const storeGame = useGameStore();
</script>
