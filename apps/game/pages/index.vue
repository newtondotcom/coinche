<template>
    <div class="flex flex-col items-center justify-center align-middle min-h-screen">
        <Card class="w-[500px] shadow-2xl">
            <CardHeader>
                <CardTitle>créer / rejoindre</CardTitle>
                <CardDescription>
                    Rentrer un code pour rejoindre ou créer une partie
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex w-full max-w-sm items-center gap-1.5">
                    <Input id="gameId" v-model="gameId" placeholder="Code" />
                </div>
            </CardContent>
            <CardFooter>
                <AlertDialog>
                    <AlertDialogTrigger as-child>
                        <Button>
                            Rejoindre
                        </Button>
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
                                        Il y a actuellement {{ playerCount }} joueur{{ playerCount > 1 ? 's' : '' }} dans la partie.<br>
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
        <div
            class="my-20 mx-20 inset-0 flex items-center px-4 pointer-events-none justify-center font-bold text-3xl text-neutral-800 dark:text-neutral-100 text-center md:text-4xl lg:text-7xl"
        >
            Élu meilleur jeu de coinche de l'
            <span
                class="bg-clip-text text-transparent drop-shadow-2xl bg-linear-to-b from-primary to-primary/40"
            >
                n7
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useAboutStore } from '@/stores/about';
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue';
import AlertDialogTrigger from '@/components/ui/alert-dialog/AlertDialogTrigger.vue';
import AlertDialogContent from '@/components/ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogHeader from '@/components/ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '@/components/ui/alert-dialog/AlertDialogTitle.vue';
import AlertDialogDescription from '@/components/ui/alert-dialog/AlertDialogDescription.vue';
import AlertDialogFooter from '@/components/ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogAction from '@/components/ui/alert-dialog/AlertDialogAction.vue';
import AlertDialogCancel from '@/components/ui/alert-dialog/AlertDialogCancel.vue';
import Skeleton from '@/components/ui/skeleton/Skeleton.vue';

const { loggedIn } = useAuth();
const storeAbout = useAboutStore();
const gameId = ref<string>('');

const loading = ref(false);
const gameExists = ref(false);
const playerCount = ref(0);

async function confirmJoin() {
    if (!loggedIn.value) {
        navigateTo(`/404`);
        return;
    }
    loading.value = true;
    try {
        const res = await $fetch('/api/game/players', { params: { gameId: gameId.value } }) as { exists: boolean, playerCount?: number };
        gameExists.value = res.exists;
        playerCount.value = res.playerCount ?? 0;
        // If not loading, then actually join/redirect
        if (res.exists || !res.exists) {
            loading.value = false;
            navigateTo(`/partie?id=${storeAbout.myId}&gameId=${gameId.value}`);
        }
    } catch (e) {
        gameExists.value = false;
        playerCount.value = 0;
        loading.value = false;
    }
}
</script>
