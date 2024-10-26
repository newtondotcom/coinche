<template>
    <div class="bg-secondary min-h-screen">
        <header class="px-2 py-2 flex flex-row justify-between">
            <h1
                class="bg-opacity-50 bg-gradient-to-b from-neutral-400 to-primary bg-clip-text text-center text-3xl font-bold text-transparent dark:from-neutral-50 dark:to-neutral-400 md:text-4xl cursor-pointer"
            >
                Coinche.xyz
            </h1>
            <CoincheInterfaceColorMode />
        </header>
        <NuxtPage />
        <footer></footer>
    </div>

    <Toaster />
</template>

<script setup lang="ts">
    import Toaster from '@/components/ui/toast/Toaster.vue';
</script>
