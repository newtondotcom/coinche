<template>
    <Card class="w-[250px] mx-2 my-2">
        <CardHeader>
            <CardTitle>Points de la partie</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-6">
            <div class="flex items-center justify-between space-x-4">
                <div class="flex items-center space-x-4">
                    <Avatar>
                        <AvatarFallback>{{ storePlayers.team1[0].score }}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p class="text-sm font-medium leading-none">
                            {{ storePlayers.players[0].surname }} X
                            {{ storePlayers.players[2].surname }}
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
                        <AvatarFallback>{{ storePlayers.team2[1].score }}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p class="text-sm font-medium leading-none">
                            {{ storePlayers.players[1].surname }} X
                            {{ storePlayers.players[3].surname }}
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
                        <AvatarFallback>170</AvatarFallback>
                    </Avatar>
                    <div>
                        <p class="text-sm font-medium leading-none">Benzeze X Tidani</p>
                        <p class="text-sm text-muted-foreground">23 ème / 3 ème</p>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between space-x-4">
                <div class="flex items-center space-x-4">
                    <Avatar>
                        <AvatarFallback>722</AvatarFallback>
                    </Avatar>
                    <div>
                        <p class="text-sm font-medium leading-none">Fefe X Robebs</p>
                        <p class="text-sm text-muted-foreground">19 ème / 82 ème</p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
    const storePlayers = usePlayersStore();
</script>
