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
                                {{ storeState.team1PointsCurrentGame }}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium leading-none">
                                {{ storeState.players[0]?.id }} X
                                {{ storeState.players[2]?.id }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                {{ storeState.players[0]?.classement }} ème /
                                {{ storeState.players[2]?.classement }} ème
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-4">
                    <div class="flex items-center space-x-4">
                        <Avatar>
                            <AvatarFallback>
                                {{ storeState.team2PointsCurrentGame }}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium leading-none">
                                {{ storeState.players[1]?.id }} X
                                {{ storeState.players[3]?.id }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                {{ storeState.players[1]?.classement }} ème /
                                {{ storeState.players[3]?.classement }} ème
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
                            <AvatarFallback>{{ storeState.team1Score }}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium leading-none">
                                {{ storeState.players[0]?.id }} X
                                {{ storeState.players[2]?.id }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                {{ storeState.players[0]?.classement }} ème /
                                {{ storeState.players[2]?.classement }} ème
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-4">
                    <div class="flex items-center space-x-4">
                        <Avatar>
                            <AvatarFallback>{{ storeState.team2Score }}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p class="text-sm font-medium leading-none">
                                {{ storeState.players[1]?.id }} X
                                {{ storeState.players[3]?.id }}
                            </p>
                            <p class="text-sm text-muted-foreground">
                                {{ storeState.players[1]?.classement }} ème /
                                {{ storeState.players[3]?.classement }} ème
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();
</script>
