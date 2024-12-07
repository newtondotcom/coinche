<template>
    <div
        class="flex flex-row space-x-6 justify-center items-center border-2 px-4 py-2 rounded-lg my-2 w-[400px]"
        :class="row.playerId === storeAbout.myId ? 'bg-primary/20' : ''"
    >
        <div class="text-3xl font-semibold w-[50px]">{{ rank }}.</div>
        <div class="text-3xl font-semibold w-[300px]">{{ row.playerId }}</div>
        <div class="text-2xl font-semibold">{{ row.points }}</div>
    </div>
</template>

<script setup lang="ts">
    import type { ClassementRow } from '@coinche/shared';

    interface ClassementRowProps {
        row: ClassementRow;
        rank: number;
    }
    defineProps<ClassementRowProps>();

    const storeAbout = useAboutStore();
</script>
