<template>

<header v-if="route.path !== '/partie'" class="px-2 py-2 flex flex-row justify-between items-center">
      <NuxtLink to="/">
        <h1
          class="text-primary text-center text-3xl font-bold mx-2 md:text-4xl cursor-pointer"
        >
          coinche.n7
        </h1>
      </NuxtLink>
      <div class="flex flex-row space-x-10">
        <NuxtLink v-if="session.data?.user" to="/classement">
          <h2
            class="text-2xl font-semibold text-neutral-500 dark:text-neutral-200 flex items-center"
          >
            classement
          </h2>
        </NuxtLink>
        <NuxtLink v-if="session.data?.user" to="/historique">
          <h2
            class="text-2xl font-semibold text-neutral-500 dark:text-neutral-200 flex items-center"
          >
            historique
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
</template>


<script setup lang="ts">
const { $authClient } = useNuxtApp();
const session = $authClient.useSession();
import { useRoute } from 'vue-router'
const route = useRoute()
</script>