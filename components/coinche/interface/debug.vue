<template>
    <div class="absolute bottom-0 right-4 bg-red-500">
        Pli number : {{ storeGame.pliNumber }}
        <br />
        Current player id : {{ storeGame.currentPlayerId }}
    </div>
</template>

<script setup lang="ts">
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
</script>
