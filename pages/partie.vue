<template>
<CoincheDeck v-model:hand="hand" />

</template>

<script setup lang="ts">
import {generateRandomDeck} from "@/lib/utils/deck";
let hand = generateRandomDeck();
</script>