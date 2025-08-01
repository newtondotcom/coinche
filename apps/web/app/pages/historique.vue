<template>
    <div class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-primary/5 to-background/80 py-8">
        <div class="bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-8 w-full max-w-2xl">
            <h1
                class="mb-8 text-5xl font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-primary to-primary/40 text-center"
            >
                Historique
            </h1>
            <!-- Header Row -->
            <div class="flex flex-row space-x-6 justify-center items-center border-b-2 border-primary/30 pb-2 mb-2 bg-primary/10 rounded-t-lg">
                <div class="text-lg font-bold w-[120px] text-center">Partie</div>
                <div class="text-lg font-bold w-[120px] text-center">Date</div>
                <div class="text-lg font-bold w-[200px] text-center">Joueurs</div>
                <div class="text-lg font-bold w-[100px] text-center">Score</div>
            </div>
            <!-- Skeletons while loading -->
            <template v-if="!historique">
                <div v-for="i in 6" :key="i" class="flex flex-row space-x-6 justify-center items-center border px-4 py-3 rounded-lg my-2 w-full animate-pulse bg-primary/5">
                    <div class="h-7 w-[120px] rounded bg-primary/20" />
                    <div class="h-7 w-[120px] rounded bg-primary/20" />
                    <div class="h-7 w-[200px] rounded bg-primary/20" />
                    <div class="h-7 w-[100px] rounded bg-primary/20" />
                </div>
            </template>
            <!-- Actual history -->
            <template v-else>
                <div v-for="row in historique" :key="row.id"
                    class="flex flex-row space-x-6 justify-center items-center border px-4 py-3 rounded-lg my-2 w-full transition hover:bg-primary/5"
                >
                    <div class="text-xl font-semibold w-[120px] text-center truncate">{{ row.id || row.gameId }}</div>
                    <div class="text-lg w-[120px] text-center">
                        {{ row.createdAt || row.startedAt ? formatDistanceToNow(row.createdAt || row.startedAt, {locale: fr}) : '' }}
                    </div>
                    <div class="text-lg w-[200px] text-center truncate">
                        {{ [row.p1, row.p2, row.p3, row.p4].filter(Boolean).join(', ') }}
                    </div>
                    <div class="text-lg w-[100px] text-center">
                        {{ row.team1_score ?? row.team1Score ?? 0 }} - {{ row.team2_score ?? row.team2Score ?? 0 }}
                    </div>
                </div>
                <div v-if="historique.length === 0" class="text-center text-neutral-500 mt-8">Aucune partie trouvée.</div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">

import {formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale";
const historique = ref();
const storeAbout = useAboutStore();

async function fetchHistorique() {
    const { data } = await $fetch('/api/historique?playerId=' + encodeURIComponent(storeAbout.myId));
    historique.value = data;
}

onMounted(() => {
    fetchHistorique();
});
</script>
