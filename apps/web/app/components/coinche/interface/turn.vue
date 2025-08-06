<template>
    <Card class="w-[350px] h-[200px] mx-2">
        <CardHeader />
        <CardContent>
            <div class="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
                <div />
                <div class="flex justify-center items-center">
                    <Badge
                        :variant="
                            playerIdTurn ===
                            storePlayers.players[(indexPlayers + 2) % lengthPlayers].id
                                ? 'default'
                                : 'secondary'
                        "
                        class="mx-1"
                    >
                        {{ storePlayers.players[(indexPlayers + 2) % lengthPlayers].hands.length }}
                    </Badge>
                    <span class="font-semibold mx-1">
                        {{ storePlayers.players[(indexPlayers + 2) % lengthPlayers].id }}
                    </span>
                </div>
                <div />

                <div class="flex justify-center items-center">
                    <Badge
                        :variant="
                            playerIdTurn ===
                            storePlayers.players[(indexPlayers + 1) % lengthPlayers].id
                                ? 'default'
                                : 'secondary'
                        "
                        class="mx-1"
                    >
                        {{ storePlayers.players[(indexPlayers + 1) % lengthPlayers].hands.length }}
                    </Badge>
                    <span class="font-semibold mx-1">
                        {{ storePlayers.players[(indexPlayers + 1) % lengthPlayers].id }}
                    </span>
                </div>
                <div />
                <div class="flex justify-center items-center">
                    <Badge
                        :variant="
                            playerIdTurn ===
                            storePlayers.players[(indexPlayers + 3) % lengthPlayers].id
                                ? 'default'
                                : 'secondary'
                        "
                        class="mx-1"
                    >
                        {{ storePlayers.players[(indexPlayers + 3) % lengthPlayers].hands.length }}
                    </Badge>
                    <span class="font-semibold mx-1">
                        {{ storePlayers.players[(indexPlayers + 3) % lengthPlayers].id }}
                    </span>
                </div>

                <div />
                <div class="flex justify-center items-center relative">
                    <Badge
                        :variant="
                            playerIdTurn === storePlayers.players[indexPlayers].id
                                ? 'default'
                                : 'secondary'
                        "
                        class="mx-1"
                    >
                        {{ storePlayers.players[indexPlayers].hands.length }}
                    </Badge>
                    <span class="font-semibold mx-1">
                        {{ storePlayers.players[indexPlayers].id }}
                    </span>
                    <div
                        v-if="playerIdTurn === storePlayers.players[indexPlayers].id"
                        class="text-green-500 w-full font-bold"
                    > A TWA !
                    </div>
                </div>
                <div />
            </div>
        </CardContent>
        <CardFooter />
    </Card>
</template>

<script setup lang="ts">
    import { useStateStore } from '@/stores/state';
    const storeState = useStateStore();

    const playerIdTurn = computed<string>(() => storeState.currentPlayerId);
    const indexPlayers = computed<number>(() =>
        storeState.players.findIndex((p: any) => p.id == storeState.getMyId),
    );
    const lengthPlayers = computed<number>(() => storeState.players.length);
</script>
