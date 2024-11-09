<template>
    <div class="absolute bottom-0 right-4 bg-red-500 font-semibold">
        Pli number : {{ storeGame.pli_number }}
        <br />
        Current player id : {{ storeGame.current_player_id }}
        <br />
        Deck length : {{ storeGame.deck.length }}
    </div>
</template>

<script setup lang="ts">
    const storeGame = useGameStore();
</script>
