<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <Card class="shadow-2xl">
            <CardHeader>
                <CardTitle>Annonces</CardTitle>
                <CardDescription>
                    Annonce actuelle
                    <Badge variant="secondary">
                        {{ storeGame.last_annonce.annonce }}
                        {{ storeGame.last_annonce.suite == 'diamonds' ? '♦️' : '' }}
                        {{ storeGame.last_annonce.suite == 'hearts' ? '♥️' : '' }}
                        {{ storeGame.last_annonce.suite == 'clubs' ? '♣️' : '' }}
                        {{ storeGame.last_annonce.suite == 'spades' ? '♠️' : '' }}
                        {{ storeGame.last_annonce.suite == 'tout-atout' ? 'TA' : '' }}
                        {{ storeGame.last_annonce.suite == 'sans-atout' ? 'SA' : '' }}
                    </Badge>
                    par
                    {{ storeGame.last_annonce.playerId }}
                    <Badge v-if="storeGame.coinched">Coinché</Badge>
                    <Badge v-if="storeGame.surcoinched">Coinché</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex flex-row align-middle justify-center">
                    <div
                        class="grid grid-cols-4 gap-2 border-2 border-neutral-200 rounded-lg px-1 mx-1"
                    >
                        <Button
                            v-for="annonce in annonces"
                            :key="annonce.toLocaleString() + Math.random()"
                            :disabled="canAnnonceNumber(annonce) || !canAnnoncer"
                            :variant="annonceEnCours.annonce === annonce ? 'outline' : 'ghost'"
                            aria-label="Valeur de {{ annonce }}"
                            @click="annonceEnCours = { ...annonceEnCours, annonce }"
                        >
                            {{ annonce }}
                        </Button>
                    </div>
                    <div
                        class="grid grid-cols-4 gap-2 border-2 border-neutral-200 rounded-lg px-1 mx-1"
                    >
                        <Button
                            v-for="suite in suites"
                            :key="suite + Math.random()"
                            :variant="annonceEnCours.suite === suite ? 'outline' : 'ghost'"
                            :disabled="!canAnnoncer"
                            aria-label="Suite de {{ annonce }}"
                            @click="annonceEnCours = { ...annonceEnCours, suite }"
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
                        <Button :disabled="!canAnnoncer && !canPasser" @click="passer">
                            Passer
                        </Button>
                        <Button :disabled="!canCoincher" @click="emitCoinche">Coincher</Button>
                        <Button :disabled="!canSurcoincher" @click="emitSurcoinche">Surcoincher</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
        cla
    </div>
</template>

<script setup lang="ts">
    import emitAnnonce from '@/shared/emitter/annonce';
    import {emitCoinche, emitSurcoinche} from "@/shared/emitter/coinche"
    import type { Annonce, CardSuite, IAnnonce, IPlayer } from '@coinche/shared';

    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const storePlayers = usePlayersStore();

    const annonces: Annonce[] = [80, 90, 100, 110, 120, 130, 140, 150, 160];
    const suites: CardSuite[] = [
        'diamonds',
        'clubs',
        'hearts',
        'spades',
        'tout-atout',
        'sans-atout',
    ];

    const canCoincher = computed<boolean>(() => canCoincherAnnonce(storeGame.annonces_pli));
    const canSurcoincher = computed<boolean>(() => canSurcoincherAnnonce(storeGame.annonces_pli));

    const canAnnoncer = computed<boolean>(
        () => storeAbout.turnToAnnonce && storeGame.current_player_id === storeAbout.myId,
    );
    const canPasser = computed<boolean>(
        () =>
            storeAbout.turnToAnnonce &&
            storeGame.annonces_pli.length > 3 &&
            storeGame.annonces_pli.slice(0, 3).every((annonce: IAnnonce) => annonce.annonce === 0),
    );

    const annonceEnCours = ref<IAnnonce>({ annonce: 0, suite: 'NA', playerId: storeAbout.myId });

    watch(annonceEnCours, async () => {
        if (annonceEnCours.value.annonce !== 0 && annonceEnCours.value.suite !== 'NA') {
            await emitAnnonce(annonceEnCours.value);
            annonceEnCours.value = { annonce: 0, suite: 'NA', playerId: 'NA' };
        }
        if (annonceEnCours.value.annonce == 160) {
            // Check if announce is not above 160
        }
    });

    function canCoincherAnnonce(annonces: IAnnonce[]) {
        // If no annonce has been made, we can't coinche
        if (annonces.length === 0) {
            return false;
        }
        // If no accounce have been made othern than pass, we can't coinche
        const announceDiffThanPass = annonces.filter((annonce: IAnnonce) => annonce.annonce !== 0);
        if (announceDiffThanPass.length === 0) {
            return false;
        }
        // Check if others announces have been made for opponents
        const annonce = annonces[annonces.length - 1];
        const myIndex = storePlayers.players.findIndex(
            (player: IPlayer) => player.id === storeAbout.myId,
        );
        const adversaries: IPlayer[] = [
            storePlayers.players[(myIndex + 1) % 4],
            storePlayers.players[(myIndex + 3) % 4],
        ];
        const adversaries_ids = adversaries.map((player: IPlayer) => player.id);
        return adversaries_ids.includes(annonce.playerId);
    }

    function canSurcoincherAnnonce(annonces: IAnnonce[]) {
        // If no annonce has been made, we can't coinche
        if (annonces.length === 0) {
            return false;
        }
        // Check if the announce have been coinched
        if (!storeGame.coinched) {
            return false;
        }
        // If no accounce have been made othern than pass, we can't coinche
        const announceDiffThanPass = annonces.filter((annonce: IAnnonce) => annonce.annonce !== 0);
        if (announceDiffThanPass.length === 0) {
            return false;
        }
        // Check if the announce coinched is from the partner
        const annonce = annonces[annonces.length - 1];
        const myIndex = storePlayers.players.findIndex(
            (player: IPlayer) => player.id === storeAbout.myId,
        );
        const partner = storePlayers.players[(myIndex + 2) % 4];
        const team_ids = [storeAbout.myId, partner.id];
        return team_ids.includes(annonce.playerId);
    }

    function canAnnonceNumber(annonce: Annonce) {
        return !(storeGame.last_annonce.annonce < annonce);
    }

    async function passer() {
        await emitAnnonce({ annonce: 0, suite: 'NA', playerId: storeAbout.myId });
    }
</script>
