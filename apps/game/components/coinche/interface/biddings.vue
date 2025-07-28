<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <Card class="shadow-2xl">
            <CardHeader>
                <CardTitle>Annonces</CardTitle>
                <CardDescription>
                    Annonce actuelle
                    <Badge variant="secondary">
                        {{ storeGame.last_bidding.bidding }}
                        {{ storeGame.last_bidding.suite == 'diamonds' ? '♦️' : '' }}
                        {{ storeGame.last_bidding.suite == 'hearts' ? '♥️' : '' }}
                        {{ storeGame.last_bidding.suite == 'clubs' ? '♣️' : '' }}
                        {{ storeGame.last_bidding.suite == 'spades' ? '♠️' : '' }}
                        {{ storeGame.last_bidding.suite == 'tout-atout' ? 'TA' : '' }}
                        {{ storeGame.last_bidding.suite == 'sans-atout' ? 'SA' : '' }}
                    </Badge>
                    par
                    {{ storeGame.last_bidding.playerId }}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex flex-row align-middle justify-center">
                    <div
                        class="grid grid-cols-4 gap-2 border-2 border-neutral-200 rounded-lg px-1 mx-1"
                    >
                        <Button
                            v-for="bidding in biddings"
                            :key="bidding.toLocaleString() + Math.random()"
                            :disabled="canbiddingNumber(bidding) || !canbiddingr"
                            :variant="biddingEnCours.bidding === bidding ? 'outline' : 'ghost'"
                            aria-label="Valeur de {{ bidding }}"
                            @click="biddingEnCours = { ...biddingEnCours, bidding }"
                        >
                            {{ bidding }}
                        </Button>
                    </div>
                    <div
                        class="grid grid-cols-4 gap-2 border-2 border-neutral-200 rounded-lg px-1 mx-1"
                    >
                        <Button
                            v-for="suite in suites"
                            :key="suite + Math.random()"
                            :variant="biddingEnCours.suite === suite ? 'outline' : 'ghost'"
                            :disabled="!canbiddingr"
                            aria-label="Suite de {{ bidding }}"
                            @click="biddingEnCours = { ...biddingEnCours, suite }"
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
                        <Button :disabled="!canbiddingr && !canPasser" @click="passer">
                            Passer
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
        cla
    </div>
</template>

<script setup lang="ts">
    import emitbidding from '@/shared/emitter/bidding';
    import type { bidding, CardSuite, Ibidding, IPlayer } from '@coinche/shared';

    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const storePlayers = usePlayersStore();

    // Regular biddings: 80-160
    // Capot biddings: 250 (non coinché), 251 (coinché), 252 (surcoinché) 
    // Générale biddings: 500 (non coinchée), 501 (coinchée), 502 (surcoinchée)
    const biddings: bidding[] = [80, 90, 100, 110, 120, 130, 140, 150, 160, 250, 251, 252, 500, 501, 502];
    const suites: CardSuite[] = [
        'diamonds',
        'clubs',
        'hearts',
        'spades',
        'tout-atout',
        'sans-atout',
    ];

    const canbiddingr = computed<boolean>(
        () => storeAbout.turnTobidding && storeGame.current_player_id === storeAbout.myId,
    );
    const canPasser = computed<boolean>(
        () =>
            storeAbout.turnTobidding &&
            storeGame.biddings_pli.length > 3 &&
            storeGame.biddings_pli.slice(0, 3).every((bidding: Ibidding) => bidding.bidding === 0),
    );

    const biddingEnCours = ref<Ibidding>({ bidding: 0, suite: 'NA', playerId: storeAbout.myId });

    watch(biddingEnCours, async () => {
        if (biddingEnCours.value.bidding !== 0 && biddingEnCours.value.suite !== 'NA') {
            await emitbidding(biddingEnCours.value);
            biddingEnCours.value = { bidding: 0, suite: 'NA', playerId: 'NA' };
        }
        if (biddingEnCours.value.bidding == 160) {
            // Check if announce is not above 160
        }
    });

    function canbiddingNumber(bidding: bidding) {
        return !(storeGame.last_bidding.bidding < bidding);
    }

    async function passer() {
        await emitbidding({ bidding: 0, suite: 'NA', playerId: storeAbout.myId });
    }
</script>
