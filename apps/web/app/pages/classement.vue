<template>
    <div class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-primary/5 to-background/80 py-8">
        <div class="bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-8 w-full max-w-xl">
            <h1
                class="mb-8 text-5xl font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-primary to-primary/40 text-center"
            >
                Power ranking
            </h1>
            <!-- Header Row -->
            <div class="flex flex-row space-x-6 justify-center items-center border-b-2 border-primary/30 pb-2 mb-2 bg-primary/10 rounded-t-lg">
                <div class="text-lg font-bold w-[50px] text-center">#</div>
                <div class="text-lg font-bold w-[300px] text-center">Joueur</div>
                <div class="text-lg font-bold w-[80px] text-center">Points</div>
            </div>
            <!-- Skeletons while loading -->
            <template v-if="!classement">
                <div v-for="i in 8" :key="i" class="flex flex-row space-x-6 justify-center items-center border px-4 py-3 rounded-lg my-2 w-full animate-pulse bg-primary/5">
                    <div class="h-7 w-[50px] rounded bg-primary/20" />
                    <div class="h-7 w-[300px] rounded bg-primary/20" />
                    <div class="h-6 w-[80px] rounded bg-primary/20" />
                </div>
            </template>
            <!-- Actual leaderboard -->
            <template v-else>
                <div v-for="(row, index) in classement" :key="row.id"
                    :class="[
                        'flex flex-row space-x-6 justify-center items-center border px-4 py-3 rounded-lg my-2 w-full transition',
                        row.playerId === user?.id ? 'ring-2 ring-primary/60 bg-primary/10 font-bold' : 'hover:bg-primary/5'
                    ]"
                >
                    <div class="text-2xl font-semibold w-[50px] text-center">{{ index + 1 }}.</div>
                    <div class="text-2xl font-semibold w-[300px] text-center truncate">{{ row.playerId }}</div>
                    <div class="text-xl font-semibold w-[80px] text-center">{{ row.points ?? row.totalPoints ?? row.score ?? 0 }}</div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { user } = useAuth();
    const classement = ref();

    async function fetchClassement() {
        const { data } = await $fetch('/api/classement');
        classement.value = data;
        console.log(data)
    }

    onMounted(() => {
        fetchClassement();
    });
</script>
