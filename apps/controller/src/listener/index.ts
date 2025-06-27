import translateAnnonce from '@/listener/annonce';
import { translateCoinche, translateSurcoinche } from '@/listener/coinche';
import translatePlay from '@/listener/play';
import type { EventInsert } from '@coinche/shared';
import { handlePlayerJoinLeave } from './join_leave';

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function translateEvent(event: EventInsert, publish: (payload: any) => void) {
    switch (event.type) {
        case 'annonce':
            return translateAnnonce(event,publish);
        case 'coinche':
            return translateCoinche(event,publish);
        case 'surcoinche':
            return translateSurcoinche(event,publish);
        case 'play':
            return translatePlay(event,publish);
        case 'join':
        case 'leave':
            return handlePlayerJoinLeave(event,publish);
        default:
            return '';
    }
}
