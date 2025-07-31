import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import type { EventInsert } from "@coinche/shared";
import { cardCanBePlayed } from "@/shared/utils/cardRules";
import { isDevEnv } from "@/shared/utils/miscs";
import { cardPressed } from "../emitter/play";

export async function translateCanPlay(event: EventInsert) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    if (event.value === storeAbout.myId) {
        console.log('can_play', event);
        storeAbout.setTurnToPlay(true);
        autoPlay();
    } else {
        console.log("not my time to play")
    }
    storeGame.setCurrentPlayerId(event.value as string);
}

export async function autoPlay() {
    const config = useRuntimeConfig();
    if (isDevEnv(config)) {
        await new Promise(resolve => setTimeout(resolve, 1000));
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
        }
    } else {
        console.log('not dev env');
    }
}

export async function translateCanBid(event: EventInsert) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    if (event.value === storeAbout.myId) {
        console.log('can_bid', event);
        storeAbout.setTurnTobidding(true);
    }
    storeGame.setCurrentPlayerId(event.value as string);
}
