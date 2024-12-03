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
        <ClassementRow v-for="row in classement" :row="row" />
    </div>
</template>

<script setup lang="ts">
    import { supabase } from '../lib/utils/listener';

    const classement = ref();
    const userRow = ref();

    const storeAbout = useAboutStore();

    async function fetchClassement() {
        const classementQuery = supabase.from('Points').select();
        const { data, error } = await classementQuery;
        if (error) throw error;
        classement.value = data;
        console.log(data);
    }

    onMounted(() => {
        fetchClassement();
    });
</script>
