<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <Card>
            <CardHeader>
                <CardTitle>Joueurs</CardTitle>
                <CardDescription>
                    <Skeleton v-if="storeState.isLoadingPlayerList" class="h-4 w-32" />
                    <span v-else>{{ storeState.players.length }} joueurs présents</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid grid-cols-3 gap-2">
                    <div />
                    <div>
                        <Skeleton v-if="storeState.isLoadingPlayerList" class="h-6 w-20" />
                        <span v-else>
                            {{
                                storeState.players.length > 0
                                    ? storeState.players[0]?.id
                                    : 'en attente'
                            }}
                        </span>
                    </div>
                    <div />
                    <div>
                        <Skeleton v-if="storeState.isLoadingPlayerList" class="h-6 w-20" />
                        <span v-else>
                            {{
                                storeState.players.length > 3
                                    ? storeState.players[3]?.id
                                    : 'en attente'
                            }}
                        </span>
                    </div>
                    <div />
                    <div>
                        <Skeleton v-if="storeState.isLoadingPlayerList" class="h-6 w-20" />
                        <span v-else>
                            {{
                                storeState.players.length > 1
                                    ? storeState.players[1]?.id
                                    : 'en attente'
                            }}
                        </span>
                    </div>
                    <div />
                    <div>
                        <Skeleton v-if="storeState.isLoadingPlayerList" class="h-6 w-20" />
                        <span v-else>
                            {{
                                storeState.players.length > 2
                                    ? storeState.players[2]?.id
                                    : 'en attente'
                            }}
                        </span>
                    </div>
                    <div />
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();    
</script>
