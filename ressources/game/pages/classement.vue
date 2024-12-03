<template>
    <div class="flex flex-col justify-center items-center">
        <h1
            class="my-4 text-5xl font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-primary/100 to-primary/40"
        >
            Classement
        </h1>
        <div v-if="storeAbout.authentificated">
            <ClassementRow :row="userRow" />
        </div>
        <ClassementRow v-for="row in classement" :key="row.id" :row="row" />
    </div>
</template>

<script setup lang="ts">
    import type { ClassementRow } from '@coinche/shared';

    import { supabase } from '../lib/utils/listener';

    const classement = ref();
    const userRow = computed<ClassementRow>(() => {
        return classement.value.find((row: ClassementRow) => row.playerId === storeAbout.myId);
    });

    const storeAbout = useAboutStore();

    async function fetchClassement() {
        const classementQuery = supabase.from('Points').select();
        const { data, error } = await classementQuery;
        if (error) throw error;
        classement.value = data;
    }

    onMounted(() => {
        fetchClassement();
    });
</script>
