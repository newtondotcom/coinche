import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import type { EventInsert } from "@coinche/shared";
import { cardCanBePlayed } from "@/shared/utils/cardRules";
import { isDevEnv } from "@/shared/utils/miscs";
import { cardPressed } from "@/shared/emitter/play";
import emitbidding from "@/shared/emitter/bidding";

export async function translateCanPlay(event: EventInsert) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    storeGame.setCurrentPlayerId(event.value as string);

    // Specific actions for my turn to play
    if (event.value === storeAbout.myId) {
        console.log('can_play', event);
        storeAbout.setTurnToPlay(true);
        autoPlay();
    } else {
        console.log("not my time to play")
    }
}

export async function autoPlay() {
    const config = useRuntimeConfig();
    if (isDevEnv(config)) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const storeAbout = useAboutStore();
        const storeGame = useGameStore();
        const hand = storeAbout.hand;
        const cardsCanBePlayed = hand.filter((card) => cardCanBePlayed(card, {
            current_player_id: storeGame.current_player_id, 
            myId: storeAbout.myId,
            current_pli: storeGame.current_pli,
            colorAsked: storeAbout.colorAsked,
            atout: storeAbout.atout,
            hand: hand,
        }));
        console.log('cardsCanBePlayed', cardsCanBePlayed);
        if (cardsCanBePlayed.length > 0 && cardsCanBePlayed[0]) {
            await cardPressed(cardsCanBePlayed[0].suite, cardsCanBePlayed[0].value);
        } else {
            console.warn('No cards can be played.');
            await new Promise(resolve => setTimeout(resolve, 50000000000000));
        }
        storeAbout.setTurnToPlay(false);

    }
}

export async function translateCanBid(event: EventInsert) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    if (event.value === storeAbout.myId) {
        console.log('can_bid', event);
        storeAbout.setTurnTobidding(true);
        autoBid();
    }
    storeGame.setCurrentPlayerId(event.value as string);
}

export async function autoBid() {
    const config = useRuntimeConfig();
    if (isDevEnv(config)) {
        const storeGame = useGameStore();
        const storeAbout = useAboutStore();
        await new Promise(resolve => setTimeout(resolve, 500));
        if (storeGame.last_bidding.bidding < 80) {
            await emitbidding({ bidding: 80, suite: 'clubs', playerId: storeAbout.myId });
        } else {
            await emitbidding({ bidding: 0, suite: 'NA', playerId: storeAbout.myId });
        }
        storeAbout.setTurnTobidding(false);
    }
}