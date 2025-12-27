<template>
  <div class="flex flex-col items-center justify-center align-middle min-h-screen">
    <ClientOnly>
      <BlurReveal :delay="0.2" :duration="0.75" class="p-8">
        <span class="text-pretty text-xl tracking-tighter xl:text-4xl/none sm:text-3xl">
          Elu meilleur
        </span>
        <h2 class="text-3xl font-bold tracking-tighter xl:text-6xl/none sm:text-5xl">
          Jeu de coinche de l'n7 👋
        </h2>
      </BlurReveal>
    </ClientOnly>
    <Card class="w-[500px] shadow-2xl">
      <CardHeader>
        <CardTitle>créer / rejoindre</CardTitle>
        <CardDescription> Rentrer un code pour rejoindre ou créer une partie </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex w-full max-w-sm items-center gap-1.5">
          <Input id="gameId" v-model="gameId" placeholder="Code" />
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button> Rejoindre </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <template v-if="loading">
                  <Skeleton class="h-6 w-48" />
                </template>
                <template v-else>
                  {{ gameExists ? 'Partie trouvée' : 'Créer une nouvelle partie ?' }}
                </template>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <template v-if="loading">
                  <Skeleton class="h-12 w-64" />
                </template>
                <template v-else>
                  <span v-if="gameExists">
                    Il y a actuellement {{ playerCount }} joueur{{ playerCount > 1 ? 's' : '' }}
                    dans la partie.<br />
                    Voulez-vous rejoindre ?
                  </span>
                  <span v-else>
                    Ce code de partie n'existe pas. Voulez-vous créer une nouvelle partie ?
                  </span>
                </template>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <template v-if="loading">
                <Skeleton class="h-10 w-24" />
                <AlertDialogCancel>Annuler</AlertDialogCancel>
              </template>
              <template v-else>
                <AlertDialogAction @click="confirmJoin">
                  {{ gameExists ? 'Rejoindre' : 'Créer' }}
                </AlertDialogAction>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
              </template>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import { useStateStore } from '@/stores/state';
import { BlurReveal } from '@/components/ui/blur-reveal';

const { $authClient } = useNuxtApp();
const session = $authClient.useSession();
const gameId = ref<string>('');
const loading = ref(false);
const gameExists = ref(false);
const playerCount = ref(0);
const { $orpc } = useNuxtApp();
const stateStore = useStateStore();

async function confirmJoin() {
    if (!session.value) {
        navigateTo(`/404`);
        return;
    }
    loading.value = true;
    try {
        const res = await $orpc.checkGameExists.call({ gameId: gameId.value });
        gameExists.value = res.exists;
        playerCount.value = res.playerCount ?? 0;
        loading.value = false;
        navigateTo(`/partie?id=${stateStore.getMyId}&gameId=${gameId.value}`);
    } catch (e) {
        gameExists.value = false;
        playerCount.value = 0;
        loading.value = false;
    }
}
</script>
