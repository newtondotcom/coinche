<template>
    <div class="flex flex-col justify-center items-center">
        <h1
            class="my-4 text-5xl font-bold bg-clip-text text-transparent drop-shadow-2xl bg-linear-to-b from-primary to-primary/40"
        >
            Historique
        </h1>
        <OthersHistoriqueRow v-for="row in historique" :key="row.gameId" :row="row" />
    </div>
</template>

<script setup lang="ts">
    import type { HistoriqueRow } from '@coinche/shared';

    import { supabase } from '../lib/utils/listener';

    const historique = ref<HistoriqueRow[]>([]);

    const storeAbout = useAboutStore();

    async function fetchHistorique() {
        console.log(storeAbout.myId);
        const { data, error } = await supabase
            .from('Game')
            .select()
            .or(
                `p1.eq.${storeAbout.myId},p2.eq.${storeAbout.myId},p3.eq.${storeAbout.myId},p4.eq.${storeAbout.myId}`,
            );

        if (error) throw error;
        historique.value = data;
    }

    onMounted(() => {
        fetchHistorique();
    });
</script>
