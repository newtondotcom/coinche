<template>
    <div class="bg-secondary min-h-screen">
        <header class="px-2 py-2 flex flex-row justify-between items-center">
            <NuxtLink to="/">
                <h1
                    class="text-primary text-center text-3xl font-bold mx-2 md:text-4xl cursor-pointer"
                >
                    coinche.n7
                </h1>
            </NuxtLink>
            <div class="flex flex-row space-x-10">
                <NuxtLink to="/classement">
                    <h2
                        class="text-2xl font-semibold text-neutral-500 dark:text-neutral-200 flex items-center"
                    >
                        classement
                    </h2>
                </NuxtLink>
                <NuxtLink to="/regles">
                    <h2
                        class="text-2xl font-semibold text-neutral-500 dark:text-neutral-200 flex items-center"
                    >
                        règles
                    </h2>
                </NuxtLink>
            </div>
            <div class="flex flex-row">
                <CoincheInterfaceColorMode />
                <OthersAuth />
            </div>
        </header>
        <Separator />
        <NuxtPage />
        <footer />
    </div>

    <Toaster />
</template>

<script setup lang="ts">
    import Toaster from '@/components/ui/toast/Toaster.vue';

    useSeoMeta({
        title: 'Coinche.n7',
        ogTitle: 'Le meilleur site de coinche en ligne',
        description: `Jouez au jeu de coinche de l'n7`,
        ogDescription: `Jouez au jeu de coinche de l'n7`,
        ogImage:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampus.etudiant.lefigaro.fr%2Fen%2Fwp-content%2Fuploads%2Fsites%2F2%2F2020%2F09%2F1239-12.jpg&f=1&nofb=1&ipt=fed11060e29882b869bd4b7f99e9295f26b4dc58609a0d4a4c5979515d187f9a&ipo=images',
        twitterCard: 'summary_large_image',
    });
</script>
