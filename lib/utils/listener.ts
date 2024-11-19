import { useToast } from '@/components/ui/toast/use-toast';
import { createClient } from '@supabase/supabase-js';

import { unformatPoints } from '../supabase/points';
import translateAnnonce from './translations/annonce';
import { translateCoinche, translateSurcoinche } from './translations/coinche';
import { translateDistribution } from './translations/distribution';
import { translateEndDistribution } from './translations/end_distribution';
import { translateEnd } from './translations/end_game';
import { translateJoin } from './translations/join';
import translatePlay from './translations/play';
import { translatePoints } from './translations/points';
import { translateStart } from './translations/start';
import { translateStartDistribution } from './translations/start_distribution';
import { translateStartPli } from './translations/start_pli';
import { translateWinGame } from './translations/win_game';
import { translateWinPli } from './translations/win_pli';

export const { toast } = useToast();

const config = useRuntimeConfig();
export const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

function translateLeave(event: EventShared) {
    const storePlayers = usePlayersStore();
    storePlayers.players = storePlayers.players.filter((player) => player.id !== event.playerId);
    return;
}

function translateError(event: EventShared) {
    return;
}

async function translatePointsPli(event: EventShared) {}

export default async function translateEvent(event: EventShared) {
    switch (event.type) {
        case 'annonce':
            return translateAnnonce(event);
        case 'coinche':
            return translateCoinche(event);
        case 'surcoinche':
            return translateSurcoinche(event);
        case 'play':
            return translatePlay(event);
        case 'end_game':
            return translateEnd(event);
        case 'start_game':
            return translateStart(event);
        case 'start_pli':
            return translateStartPli(event);
        case 'leave':
            return translateLeave(event);
        case 'join':
            return translateJoin(event);
        case 'error':
            return translateError(event);
        case 'win_pli':
            return translateWinPli(event);
        case 'win_game':
            return translateWinGame(event);
        case 'distribution':
            return translateDistribution(event);
        case 'score':
            return translatePoints(event);
        case 'score_pli':
            return translatePointsPli(event);
        case 'start_distribution':
            return translateStartDistribution(event);
        case 'start_annonce':
            return translateEndDistribution(event);
        default:
            return '';
    }
}
