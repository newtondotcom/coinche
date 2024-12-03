<template>
    <div
        class="flex flex-row space-x-6 justify-center items-center border-2 px-4 py-2 rounded-lg my-2 w-[400px]"
    >
        <div class="text-3xl font-semibold w-[300px]">{{ row.surname }}</div>
        <div class="text-2xl font-semibold">{{ row.points }}</div>
    </div>
</template>

<script setup lang="ts">
    interface ClassementRowProps {
        row: ClassementRow;
    }
    defineProps<ClassementRowProps>();
</script>
