<template>
    <div class="bg-secondary min-h-screen">
        <header class="px-2 py-2 flex flex-row justify-between">
            <h1 class="text-primary text-center text-3xl font-bold md:text-4xl cursor-pointer">
                coinche.n7
            </h1>
            <h2 class="text-center">Classement</h2>
            <CoincheInterfaceColorMode />
        </header>
        <NuxtPage />
        <footer></footer>
    </div>

    <Toaster />
</template>

<script setup lang="ts">
    import Toaster from '@/components/ui/toast/Toaster.vue';

    useSeoMeta({
        title: 'Coinche.xyz',
        ogTitle: 'Le meilleur site de coinche en ligne',
        description: `Jouez au jeu de coinche de l'n7`,
        ogDescription: `Jouez au jeu de coinche de l'n7`,
        ogImage:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampus.etudiant.lefigaro.fr%2Fen%2Fwp-content%2Fuploads%2Fsites%2F2%2F2020%2F09%2F1239-12.jpg&f=1&nofb=1&ipt=fed11060e29882b869bd4b7f99e9295f26b4dc58609a0d4a4c5979515d187f9a&ipo=images',
        twitterCard: 'summary_large_image',
    });
</script>
