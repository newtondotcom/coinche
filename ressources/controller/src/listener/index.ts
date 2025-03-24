import type { EventInsert } from '@coinche/shared';

import translateAnnonce from '@/listener/annonce';
import { translateCoinche, translateSurcoinche } from '@/listener/coinche';
import { translateJoin } from '@/listener/join';
import translatePlay from '@/listener/play';

export async function translateEvent(event: EventInsert) {
    switch (event.type) {
        case 'annonce':
            return translateAnnonce(event);
        case 'coinche':
            return translateCoinche(event);
        case 'surcoinche':
            return translateSurcoinche(event);
        case 'play':
            return translatePlay(event);
        case 'join':
            return translateJoin(event);
        default:
            return '';
    }
}
