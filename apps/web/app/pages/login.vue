<template>
    <div class="h-full w-full flex justify-center align-middle my-20 text-4xl font-semibold">
        Fracasses pas la table stpppp
    </div>
</template>

<script setup lang="ts">
import { useAboutStore } from '@/stores/about';

    const storeAbout = useAboutStore();
    const route = useRoute();
    const code = route.query.code;
    if (code) {
        const data = await $fetch('/api/churros/check', {
            params: {
                code: code,
            },
        });
        storeAbout.setMyId(data?.userId || '');
        console.log('Connected');
        storeAbout.setAuthentificated(true);
        navigateTo('/');
    }
</script>
