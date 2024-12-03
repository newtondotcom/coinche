<template>
    <div class="absolute bottom-0 right-4 bg-red-500 font-semibold z-20">
        Pli number : {{ storeGame.pli_number }}
        <br />
        Deck length : {{ storeGame.deck.length }}
        <br />

        Distributing : {{ storeAbout.timeDistrib }}
        <br />
        Announcing : {{ storeAbout.timeToAnnonce }}
        <br />
        Player starting : {{ storeGame.player_starting_id }}
        <br />
        Current player id : {{ storeGame.current_player_id }}
        <br />
        Atout : {{ storeAbout.atout }}
        <br />
        Cards in hands : {{ storeAbout.hand.length }}
    </div>
</template>

<script setup lang="ts">
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
</script>
