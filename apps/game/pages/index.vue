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
                    <Input id="gameId" v-model="gameId" placeholder="Code" />
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
                class="bg-clip-text text-transparent drop-shadow-2xl bg-linear-to-b from-primary to-primary/40"
            >
                n7
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    const {loggedIn} = useAuth();
    const storeAbout = useAboutStore();
    const gameId = ref<string>('');

    async function joinGame() {
        if (!loggedIn.value) {
            navigateTo(`/404`);
            return;
        }
        // Check if game exists
        const res = await $fetch('/api/checkGameExists', { params: { gameId: gameId.value } }) as { exists: boolean };
        if (!res.exists) {
            const confirmed = window.confirm('Ce code de partie n\'existe pas. Voulez-vous créer une nouvelle partie ?');
            if (!confirmed) return;
        }
        navigateTo(`/partie?id=${storeAbout.myId}&gameId=${gameId.value}`);
    }
</script>
