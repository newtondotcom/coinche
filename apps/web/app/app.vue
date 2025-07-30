<template>
    <div class="bg-secondary min-h-screen">
      <OthersHeader />
      <Separator />
      <NuxtPage />
      <OthersFooter v-if="!isGamePage" />
  
      <OthersDevEnv v-if="isDevEnv(config)" />
    </div>
  
    <NuxtLoadingIndicator />
    <ClientOnly>
      <Toaster />
    </ClientOnly>
  </template>
  
  <script setup lang="ts">
  import { Toaster } from "@/components/ui/sonner";
  import { isDevEnv } from "@/shared/utils/miscs";
  
  const config = useRuntimeConfig();
  const route = useRoute();
  
  const {loggedIn} = useAuth();
  
  // Check if current page is the game page
  const isGamePage = computed(() => route.path === '/partie');
  
  useSeoMeta({
    title: "Coinche.n7",
    ogTitle: "Le meilleur site de coinche en ligne",
    description: `Jouez au jeu de coinche de l'n7`,
    ogDescription: `Jouez au jeu de coinche de l'n7`,
    ogImage:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcampus.etudiant.lefigaro.fr%2Fen%2Fwp-content%2Fuploads%2Fsites%2F2%2F2020%2F09%2F1239-12.jpg&f=1&nofb=1&ipt=fed11060e29882b869bd4b7f99e9295f26b4dc58609a0d4a4c5979515d187f9a&ipo=images",
    twitterCard: "summary_large_image",
  });
  </script>