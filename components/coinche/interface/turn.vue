<template>
    <Card class="w-[350px] h-[200px] mx-2">
        <CardHeader></CardHeader>
        <CardContent>
            <div class="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
                <div></div>
                <div class="flex justify-center items-center">
                    <Badge
                        :variant="
                            playerIdTurn === storePlayers.players[0].id ? 'default' : 'secondary'
                        "
                        class="mx-1"
                    >
                        {{ storePlayers.players[0].hands.length }}
                    </Badge>
                    <span class="font-semibold mx-1">{{ storePlayers.players[0].surname }}</span>
                </div>
                <div></div>

                <div class="flex justify-center items-center">
                    <Badge
                        :variant="
                            playerIdTurn === storePlayers.players[1].id ? 'default' : 'secondary'
                        "
                        class="mx-1"
                    >
                        {{ storePlayers.players[1].hands.length }}
                    </Badge>
                    <span class="font-semibold mx-1">{{ storePlayers.players[1].surname }}</span>
                </div>
                <div></div>
                <div class="flex justify-center items-center">
                    <Badge
                        :variant="
                            playerIdTurn === storePlayers.players[2].id ? 'default' : 'secondary'
                        "
                        class="mx-1"
                    >
                        {{ storePlayers.players[2].hands.length }}
                    </Badge>
                    <span class="font-semibold mx-1">{{ storePlayers.players[2].surname }}</span>
                </div>

                <div></div>
                <div class="flex justify-center items-center">
                    <Badge
                        :variant="
                            playerIdTurn === storePlayers.players[3].id ? 'default' : 'secondary'
                        "
                        class="mx-1"
                    >
                        {{ storePlayers.players[3].hands.length }}
                    </Badge>
                    <span class="font-semibold mx-1">{{ storePlayers.players[3].surname }}</span>
                </div>
                <div></div>
            </div>
        </CardContent>
        <CardFooter></CardFooter>
    </Card>
</template>

<script setup lang="ts">
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();

    const playerIdTurn = computed(() => storeGame.game.current_player_id);
</script>
