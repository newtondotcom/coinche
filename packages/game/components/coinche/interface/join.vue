<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <Card>
            <CardHeader>
                <CardTitle>Joueurs</CardTitle>
                <CardDescription>
                    {{ storePlayers.players.length }} joueurs présents
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid grid-cols-3 gap-2">
                    <div></div>
                    <div>
                        {{
                            storePlayers.players.length > 0
                                ? storePlayers.players[0].surname
                                : 'en attente'
                        }}
                    </div>
                    <div></div>
                    <div>
                        {{
                            storePlayers.players.length > 3
                                ? storePlayers.players[3].surname
                                : 'en attente'
                        }}
                    </div>
                    <div></div>
                    <div>
                        {{
                            storePlayers.players.length > 1
                                ? storePlayers.players[1].surname
                                : 'en attente'
                        }}
                    </div>
                    <div></div>
                    <div>
                        {{
                            storePlayers.players.length > 2
                                ? storePlayers.players[2].surname
                                : 'en attente'
                        }}
                    </div>
                    <div></div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
</script>
