<template>
    <div class="absolute bottom-0 right-4 bg-red-500 font-semibold z-20">
        Pli number : {{ storeGame.pli_number }}
        <br />
        Current player id : {{ storeGame.current_player_id }}
        <br />
        Deck length : {{ storeGame.deck.length }}
        <br />

        Distributing : {{ storeAbout.timeDistrib }}
        <br />
        Announcing : {{ storeAbout.timeToAnnonce }}
        <br />
        Playing : {{ storeGame.current_player_id }}
    </div>
</template>

<script setup lang="ts">
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
</script>
