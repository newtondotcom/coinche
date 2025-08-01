<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <Card class="shadow-2xl">
            <CardHeader>
                <CardTitle>Annonces</CardTitle>
                <CardDescription>
                    Annonce actuelle
                    <Badge variant="secondary">
                        {{ storeGame.biddingElected.bidding }}
                        {{ storeGame.biddingElected.suite == 'diamonds' ? '♦️' : '' }}
                        {{ storeGame.biddingElected.suite == 'hearts' ? '♥️' : '' }}
                        {{ storeGame.biddingElected.suite == 'clubs' ? '♣️' : '' }}
                        {{ storeGame.biddingElected.suite == 'spades' ? '♠️' : '' }}
                        {{ storeGame.biddingElected.suite == 'tout-atout' ? 'TA' : '' }}
                        {{ storeGame.biddingElected.suite == 'sans-atout' ? 'SA' : '' }}
                    </Badge>
                    par
                    {{ storeGame.biddingElected.playerId }}
                    <Badge v-if="storeGame.coinched">Coinché</Badge>
                    <Badge v-if="storeGame.surcoinched">Surcoinché</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex flex-col gap-4">
                    <!-- Regular bids -->
                    <div class="text-sm font-medium text-center">Enchères régulières</div>
                    <div class="grid grid-cols-9 gap-2 border-2 border-neutral-200 rounded-lg p-2">
                        <Button
                            v-for="bidding in regularBiddings"
                            :key="bidding.toLocaleString() + Math.random()"
                            :disabled="canbiddingNumber(bidding) || !canbiddingr"
                            :variant="biddingEnCours.bidding === bidding ? 'outline' : 'ghost'"
                            aria-label="Valeur de {{ bidding }}"
                            @click="biddingEnCours = { ...biddingEnCours, bidding }"
                        >
                            {{ bidding }}
                        </Button>
                    </div>

                    <!-- Special bids -->
                    <div class="text-sm font-medium text-center">Enchères spéciales</div>
                    <div class="grid grid-cols-6 gap-2 border-2 border-neutral-200 rounded-lg p-2">
                        <Button
                            v-for="bidding in specialBiddings"
                            :key="bidding.toLocaleString() + Math.random()"
                            :disabled="canbiddingNumber(bidding) || !canbiddingr"
                            :variant="biddingEnCours.bidding === bidding ? 'outline' : 'ghost'"
                            aria-label="Valeur de {{ bidding }}"
                            @click="biddingEnCours = { ...biddingEnCours, bidding }"
                            size="sm"
                        >
                            {{ bidding }}
                            <span v-if="bidding === 250" class="text-xs">(Capot)</span>
                            <span v-if="bidding === 251" class="text-xs">(Capot+)</span>
                            <span v-if="bidding === 252" class="text-xs">(Capot++)</span>
                            <span v-if="bidding === 500" class="text-xs">(Générale)</span>
                            <span v-if="bidding === 501" class="text-xs">(Générale+)</span>
                            <span v-if="bidding === 502" class="text-xs">(Générale++)</span>
                        </Button>
                    </div>

                    <!-- Suites -->
                    <div class="text-sm font-medium text-center">Couleurs</div>
                    <div class="grid grid-cols-6 gap-2 border-2 border-neutral-200 rounded-lg p-2">
                        <Button
                            v-for="suite in suites"
                            :key="suite + Math.random()"
                            :variant="biddingEnCours.suite === suite ? 'outline' : 'ghost'"
                            :disabled="!canbiddingr"
                            aria-label="Suite de {{ suite }}"
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

                    <!-- Actions -->
                    <div class="flex flex-row justify-center gap-2">
                        <Button :disabled="!canbiddingr && !canPasser" @click="passer">
                            Passer
                        </Button>
                        <Button :disabled="!canCoincher" @click="coincher">Coincher</Button>
                        <Button :disabled="!canSurcoincher" @click="surcoincher">Surcoincher</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
        cla
    </div>
</template>

<script setup lang="ts">
    import emitbidding from '@/shared/emitter/bidding';
    import type { IPlayer, bidding, CardSuite, Ibidding } from "@coinche/shared";

    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const storePlayers = usePlayersStore();

    // Regular biddings: 80-160
    const regularBiddings: bidding[] = [80, 90, 100, 110, 120, 130, 140, 150, 160];
    
    // Special biddings:
    // Capot: 250 (non coinché), 251 (coinché), 252 (surcoinché) 
    // Générale: 500 (non coinchée), 501 (coinchée), 502 (surcoinchée)
    const specialBiddings: bidding[] = [250, 251, 252, 500, 501, 502];
    
    // All biddings combined for compatibility
    const biddings: bidding[] = [...regularBiddings, ...specialBiddings];
    
    const suites: CardSuite[] = [
        'diamonds',
        'clubs',
        'hearts',
        'spades',
        'tout-atout',
        'sans-atout',
    ];

    const canCoincher = computed<boolean>(() => canCoincherbidding(storeGame.biddings_pli));
    const canSurcoincher = computed<boolean>(() => canSurcoincherbidding(storeGame.biddings_pli));

    const canbiddingr = computed<boolean>(
        () => storeAbout.turnTobidding && storeGame.currentPlayerId === storeAbout.myId,
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

    function canCoincherbidding(biddings: Ibidding[]) {
        // If no bidding has been made, we can't coinche
        if (biddings.length === 0) {
            return false;
        }
        // If no announce have been made other than pass, we can't coinche
        const announceDiffThanPass = biddings.filter((bidding: Ibidding) => bidding.bidding !== 0);
        if (announceDiffThanPass.length === 0) {
            return false;
        }
        
        // Get the last non-pass bidding
        const lastBidding = announceDiffThanPass[announceDiffThanPass.length - 1];
        
        // Can't coinche already coinché or surcoinché bids
        if (lastBidding.bidding === 251 || lastBidding.bidding === 252 || 
            lastBidding.bidding === 501 || lastBidding.bidding === 502) {
            return false;
        }
        
        // Check if the bidding is from opponents
        const myIndex = storePlayers.players.findIndex(
            (player: IPlayer) => player.id === storeAbout.myId,
        );
        const adversaries: IPlayer[] = [
            storePlayers.players[(myIndex + 1) % 4],
            storePlayers.players[(myIndex + 3) % 4],
        ];
        const adversaries_ids = adversaries.map((player: IPlayer) => player.id);
        return adversaries_ids.includes(lastBidding.playerId);
    }

    function canSurcoincherbidding(biddings: Ibidding[]) {
        // If no bidding has been made, we can't surcoinche
        if (biddings.length === 0) {
            return false;
        }
        
        // If no announce have been made other than pass, we can't surcoinche
        const announceDiffThanPass = biddings.filter((bidding: Ibidding) => bidding.bidding !== 0);
        if (announceDiffThanPass.length === 0) {
            return false;
        }
        
        // Get the last non-pass bidding
        const lastBidding = announceDiffThanPass[announceDiffThanPass.length - 1];
        
        // Can only surcoinche coinché bids (251, 501) or regular coinché bids
        const canSurcoinche = (lastBidding.bidding === 251 || lastBidding.bidding === 501) || 
                             (storeGame.coinched && typeof lastBidding.bidding === 'number' && 
                              lastBidding.bidding >= 80 && lastBidding.bidding <= 160);
        
        if (!canSurcoinche) {
            return false;
        }
        
        // Check if the coinché announce is from the partner
        const myIndex = storePlayers.players.findIndex(
            (player: IPlayer) => player.id === storeAbout.myId,
        );
        const partner = storePlayers.players[(myIndex + 2) % 4];
        const team_ids = [storeAbout.myId, partner.id];
        return team_ids.includes(lastBidding.playerId);
    }

    function canbiddingNumber(bidding: bidding) {
        return !(storeGame.biddingElected.bidding < bidding);
    }

    async function passer() {
        await emitbidding({ bidding: 0, suite: 'NA', playerId: storeAbout.myId });
    }

    async function coincher() {
        // For capot/générale bids, convert to coinché equivalent
        const lastBid = storeGame.biddingElected.bidding;
        let coinchedBid: bidding;
        
        if (lastBid === 250) {
            coinchedBid = 251; // Capot coinché
        } else if (lastBid === 500) {
            coinchedBid = 501; // Générale coinchée
        } else if (typeof lastBid === 'number' && lastBid >= 80 && lastBid <= 160) {
            // For regular bids, we can double the value to represent coinche
            // But since our type only allows specific values, we'll track coinche state
            // and let the scoring logic handle the multiplier
            storeGame.setCoinched(true);
            return; // Don't emit a new bid, just track the state
        } else {
            return;
        }

        await emitbidding({ 
            bidding: coinchedBid, 
            suite: storeGame.biddingElected.suite, 
            playerId: storeAbout.myId 
        });
        storeGame.setCoinched(true);
    }

    async function surcoincher() {
        // For capot/générale bids, convert to surcoinché equivalent
        const lastBid = storeGame.biddingElected.bidding;
        let surcoincheBid: bidding;
        
        if (lastBid === 251) {
            surcoincheBid = 252; // Capot surcoinché
        } else if (lastBid === 501) {
            surcoincheBid = 502; // Générale surcoinchée
        } else if (typeof lastBid === 'number' && lastBid >= 80 && lastBid <= 160) {
            // For regular bids, track surcoinche state and let scoring logic handle the multiplier
            storeGame.setSurcoinched(true);
            return; // Don't emit a new bid, just track the state
        } else {
            return;
        }

        await emitbidding({ 
            bidding: surcoincheBid, 
            suite: storeGame.biddingElected.suite, 
            playerId: storeAbout.myId 
        });
        storeGame.setSurcoinched(true);
    }
</script>
