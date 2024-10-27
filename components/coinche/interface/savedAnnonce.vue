<template>
    <div class="absolute left-[50%] top-[30%] -translate-x-[50%]">
        <h2
            class="bg-opacity-50 bg-gradient-to-b from-neutral-200 to-neutral-400 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-neutral-50 dark:to-neutral-400 md:text-7xl cursor-pointer"
        >
            {{ storeGame.game.last_annonce.annonce }}

            {{ storeGame.game.last_annonce.suite == 'clubs' ? '♣' : '' }}
            {{ storeGame.game.last_annonce.suite == 'diamonds' ? '♦' : '' }}
            {{ storeGame.game.last_annonce.suite == 'hearts' ? '♥' : '' }}
            {{ storeGame.game.last_annonce.suite == 'spades' ? '♠' : '' }}
            {{ storeGame.game.last_annonce.suite == 'sans-atout' ? 'SA' : '' }}
            {{ storeGame.game.last_annonce.suite == 'tout-atout' ? 'TA' : '' }}
        </h2>
        <h3
            class="bg-opacity-50 bg-gradient-to-b from-neutral-200 to-neutral-400 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-neutral-50 dark:to-neutral-400 md:text-5xl cursor-pointer"
        >
            par
            {{
                storePlayers.players.find((p) => p.id === storeGame.game.last_annonce.playerId)
                    ?.surname
            }}
        </h3>
    </div>
</template>

<script setup lang="ts">
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
</script>
