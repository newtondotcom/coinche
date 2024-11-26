<template>
    <div class="flex flex-col items-center justify-center align-middle min-h-screen">
        <Card class="w-[500px] shadow-2xl">
            <CardHeader>
                <CardTitle>créer / rejoindre</CardTitle>
                <CardDescription>
                    Rentrer un code pour rejoindre ou créer une partie
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex w-full max-w-sm items-center gap-1.5">
                    <Input v-model="gameId" id="email" type="email" placeholder="Code" />
                </div>
            </CardContent>
            <CardFooter>
                <Button @click="joinGame">Rejoindre</Button>
            </CardFooter>
        </Card>
        <div
            class="my-20 mx-20 inset-0 flex items-center px-4 pointer-events-none justify-center font-bold text-3xl text-neutral-800 dark:text-neutral-100 text-center md:text-4xl lg:text-7xl"
        >
            Élu meilleur jeu de coinche de l'
            <span
                class="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-primary/100 to-primary/40"
            >
                n7
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    const gameId = ref<string>('');
    function joinGame() {
        const id = Math.random().toString(36).substring(7);
        const surname = Math.random().toString(36).substring(7);
        navigateTo(`/partie?id=${id}&surname=${surname}&gameId=${gameId.value}`);
    }
</script>
