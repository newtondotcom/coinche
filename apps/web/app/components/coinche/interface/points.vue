<template>
    <div class="flex flex-col">
        <Card class="w-[250px] mx-2 my-2">
            <CardHeader>
                <CardTitle>Points de la partie</CardTitle>
            </CardHeader>
            <CardContent class="grid gap-6">
                <div class="flex items-center justify-between space-x-4">
                    <div class="flex items-center space-x-4">
                        <Avatar>
                            <AvatarFallback>
                                {{ storeGame.team1_point_current_game }}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium leading-none">
                                {{ storePlayers.players[0].id }} X
                                {{ storePlayers.players[2].id }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                {{ storePlayers.players[0].classement }} ème /
                                {{ storePlayers.players[2].classement }} ème
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-4">
                    <div class="flex items-center space-x-4">
                        <Avatar>
                            <AvatarFallback>
                                {{ storeGame.team2_point_current_game }}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium leading-none">
                                {{ storePlayers.players[1].id }} X
                                {{ storePlayers.players[3].id }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                {{ storePlayers.players[1].classement }} ème /
                                {{ storePlayers.players[3].classement }} ème
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card class="w-[250px] mx-2 my-2">
            <CardHeader>
                <CardTitle>Points globaux</CardTitle>
            </CardHeader>
            <CardContent class="grid gap-6">
                <div class="flex items-center justify-between space-x-4">
                    <div class="flex items-center space-x-4">
                        <Avatar>
                            <AvatarFallback>{{ storeGame.team1_score }}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium leading-none">
                                {{ storePlayers.players[0].id }} X
                                {{ storePlayers.players[2].id }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                {{ storePlayers.players[0].classement }} ème /
                                {{ storePlayers.players[2].classement }} ème
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-4">
                    <div class="flex items-center space-x-4">
                        <Avatar>
                            <AvatarFallback>{{ storeGame.team2_score }}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium leading-none">
                                {{ storePlayers.players[1].id }} X
                                {{ storePlayers.players[3].id }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                {{ storePlayers.players[1].classement }} ème /
                                {{ storePlayers.players[3].classement }} ème
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
</script>
