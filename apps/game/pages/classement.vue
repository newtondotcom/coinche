<template>
    <div class="flex flex-col justify-center items-center">
        <h1
            class="my-4 text-5xl font-bold bg-clip-text text-transparent drop-shadow-2xl bg-linear-to-b from-primary to-primary/40"
        >
            Classement
        </h1>
        <div v-if="storeAbout.authentificated && userRow">
            <OthersClassementRow
                :row="userRow"
                :rank="
                    classement.findIndex((row: ClassementRow) => row.playerId === storeAbout.myId) +
                    1
                "
            />
        </div>
        <OthersClassementRow
            v-for="(row, index) in classement"
            :key="row.id"
            :row="row"
            :rank="index + 1"
        />
    </div>
</template>

<script setup lang="ts">
    import type { ClassementRow } from '@coinche/shared';

    import { supabase } from '../lib/utils/listener';

    const classement = ref();
    const userRow = computed<ClassementRow>(() => {
        if (!classement.value) return;
        return classement.value.find((row: ClassementRow) => row.playerId === storeAbout.myId);
    });

    const storeAbout = useAboutStore();

    async function fetchClassement() {
        const classementQuery = supabase
            .from('Points')
            .select()
            .order('points', { ascending: false })
            .limit(100);
        const { data, error } = await classementQuery;
        if (error) throw error;
        classement.value = data;
    }

    onMounted(() => {
        fetchClassement();
    });
</script>
