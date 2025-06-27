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
    import emitbidding from '@/shared/emitter/bidding';
    import {emitCoinche, emitSurcoinche} from "@/shared/emitter/coinche"
    import type { bidding, CardSuite, Ibidding, IPlayer } from '@coinche/shared';

    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const storePlayers = usePlayersStore();

    const biddings: bidding[] = [80, 90, 100, 110, 120, 130, 140, 150, 160];
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

    function canCoincherbidding(biddings: Ibidding[]) {
        // If no bidding has been made, we can't coinche
        if (biddings.length === 0) {
            return false;
        }
        // If no accounce have been made othern than pass, we can't coinche
        const announceDiffThanPass = biddings.filter((bidding: Ibidding) => bidding.bidding !== 0);
        if (announceDiffThanPass.length === 0) {
            return false;
        }
        // Check if others announces have been made for opponents
        const bidding = biddings[biddings.length - 1];
        const myIndex = storePlayers.players.findIndex(
            (player: IPlayer) => player.id === storeAbout.myId,
        );
        const adversaries: IPlayer[] = [
            storePlayers.players[(myIndex + 1) % 4],
            storePlayers.players[(myIndex + 3) % 4],
        ];
        const adversaries_ids = adversaries.map((player: IPlayer) => player.id);
        return adversaries_ids.includes(bidding.playerId);
    }

    function canSurcoincherbidding(biddings: Ibidding[]) {
        // If no bidding has been made, we can't coinche
        if (biddings.length === 0) {
            return false;
        }
        // Check if the announce have been coinched
        if (!storeGame.coinched) {
            return false;
        }
        // If no accounce have been made othern than pass, we can't coinche
        const announceDiffThanPass = biddings.filter((bidding: Ibidding) => bidding.bidding !== 0);
        if (announceDiffThanPass.length === 0) {
            return false;
        }
        // Check if the announce coinched is from the partner
        const bidding = biddings[biddings.length - 1];
        const myIndex = storePlayers.players.findIndex(
            (player: IPlayer) => player.id === storeAbout.myId,
        );
        const partner = storePlayers.players[(myIndex + 2) % 4];
        const team_ids = [storeAbout.myId, partner.id];
        return team_ids.includes(bidding.playerId);
    }

    function canbiddingNumber(bidding: bidding) {
        return !(storeGame.last_bidding.bidding < bidding);
    }

    async function passer() {
        await emitbidding({ bidding: 0, suite: 'NA', playerId: storeAbout.myId });
    }
</script>
