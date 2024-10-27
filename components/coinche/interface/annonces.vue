<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <Card>
            <CardHeader>
                <CardTitle>Annonces</CardTitle>
                <CardDescription>
                    Annonce actuelle
                    <Badge variant="secondary">
                        {{ storeGame.game.last_annonce.annonce }}
                        {{ storeGame.game.last_annonce.suite == 'diamonds' ? '♦️' : '' }}
                        {{ storeGame.game.last_annonce.suite == 'hearts' ? '♥️' : '' }}
                        {{ storeGame.game.last_annonce.suite == 'clubs' ? '♣️' : '' }}
                        {{ storeGame.game.last_annonce.suite == 'spades' ? '♠️' : '' }}
                        {{ storeGame.game.last_annonce.suite == 'tout-atout' ? 'TA' : '' }}
                        {{ storeGame.game.last_annonce.suite == 'sans-atout' ? 'SA' : '' }}
                    </Badge>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex flex-row align-middle justify-center">
                    <div
                        class="grid grid-cols-4 gap-2 border-2 border-neutral-200 rounded-lg px-1 mx-1"
                    >
                        <Button
                            v-for="annonce in annonces"
                            :disabled="canAnnonceNumber(annonce)"
                            @click="annonceEnCours = { ...annonceEnCours, annonce }"
                            :variant="annonceEnCours.annonce === annonce ? 'outline' : 'ghost'"
                            aria-label="Valeur de {{ annonce }}"
                        >
                            {{ annonce }}
                        </Button>
                    </div>
                    <div
                        class="grid grid-cols-4 gap-2 border-2 border-neutral-200 rounded-lg px-1 mx-1"
                    >
                        <Button
                            v-for="suite in suites"
                            @click="annonceEnCours = { ...annonceEnCours, suite }"
                            :variant="annonceEnCours.suite === suite ? 'outline' : 'ghost'"
                            aria-label="Suite de {{ annonce }}"
                        >
                            {{ suite == 'diamonds' ? '♦️' : '' }}
                            {{ suite == 'hearts' ? '♥️' : '' }}
                            {{ suite == 'clubs' ? '♣️' : '' }}
                            {{ suite == 'spades' ? '♠️' : '' }}
                            {{ suite == 'tout-atout' ? 'TA' : '' }}
                            {{ suite == 'sans-atout' ? 'SA' : '' }}
                        </Button>
                    </div>

                    <div class="flex flex-col space-y-2 justify-center px-1 mx-1">
                        <Button>Passer</Button>
                        <Button :disabled="canCoincher">Coincher</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
    const storeGame = useGameStore();

    let annonces: Annonce[] = [80, 90, 100, 110, 120, 130, 140, 150, 160];
    let suites: CardSuite[] = ['diamonds', 'clubs', 'hearts', 'spades', 'tout-atout', 'sans-atout'];

    let canCoincher = ref<boolean>(false);

    interface Props {
        emitAnnonce: (annonce: IAnnonce) => void;
    }
    const props = defineProps<Props>();

    let annonceEnCours = ref<IAnnonce>({ annonce: 0, suite: 'NA', playerId: 'NA' });

    watch(storeGame.game.last_annonce, () => {
        canCoincher.value = canCoincherAnnonce(storeGame.game.last_annonce.annonce);
    });

    watch(annonceEnCours, () => {
        if (annonceEnCours.value.annonce !== 0 && annonceEnCours.value.suite !== 'NA') {
            console.log('Annonce : ', annonceEnCours.value.annonce);
            console.log('Suite : ', annonceEnCours.value.suite);
            props.emitAnnonce(annonceEnCours.value);
            annonceEnCours.value = { annonce: 0, suite: 'NA', playerId: 'NA' };
        }
    });

    function canCoincherAnnonce(annonce: Annonce) {
        return storeGame.game.last_annonce.annonce > annonce;
    }

    function canAnnonceNumber(annonce: Annonce) {
        return !(storeGame.game.last_annonce.annonce < annonce);
    }
</script>
