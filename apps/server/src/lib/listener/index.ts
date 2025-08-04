import translateBidding from '@/lib/listener/bidding';
import translatePlay from '@/lib/listener/play';
import type { EventInsert } from '@coinche/shared';
import { handlePlayerJoinLeave } from './join_leave';

/**
 */
export async function translateEvent(event: EventInsert) {
    switch (event.type) {
        case 'bidding':
            return translateBidding(event);
        case 'play':
            return translatePlay(event);
        case 'join':
        case 'leave':
            return handlePlayerJoinLeave(event);
        default:
            return '';
    }
}
