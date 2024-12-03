import { useToast } from '@/components/ui/toast/use-toast';
import translateAnnonce from '@/lib/listener/annonce';
import { translateCoinche, translateSurcoinche } from '@/lib/listener/coinche';
import { translateDistribution } from '@/lib/listener/distribution';
import { translateEndDistribution } from '@/lib/listener/end_distribution';
import { translateEndGame } from '@/lib/listener/end_game';
import { translateJoin } from '@/lib/listener/join';
import translatePlay from '@/lib/listener/play';
import { translatePoints } from '@/lib/listener/points';
import { translateStartDistribution } from '@/lib/listener/start_distribution';
import { translateStartPli } from '@/lib/listener/start_pli';
import { translateWinPli } from '@/lib/listener/win_pli';
import { createClient } from '@supabase/supabase-js';
import { translateStart } from '~/lib/listener/start_game';
import type { Database, EventShared } from '@coinche/shared';

import { translateCanAnnonce, translateCanPlay } from '../listener/can';
import { translateEndRound } from '../listener/end_round';
import { translatePointsRound } from '../listener/points_round';
import { translateStartRound } from '../listener/start_round';

export const { toast } = useToast();

const config = useRuntimeConfig();
export const supabase = createClient<Database>(
    config.public.SUPABASE_URL,
    config.public.SUPABASE_ANON_KEY,
);

function translateLeave(event: EventShared) {
    const storePlayers = usePlayersStore();
    storePlayers.players = storePlayers.players.filter((player) => player.id !== event.playerId);
    return;
}

function translateError(event: EventShared) {
    return;
}

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
            return translateEndGame(event);
        case 'end_round':
            return translateEndRound(event);
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
        case 'distribution':
            return translateDistribution(event);
        case 'score':
            return translatePoints(event);
        case 'score_round':
            return translatePointsRound(event);
        case 'start_distribution':
            return translateStartDistribution(event);
        case 'start_annonce':
            return translateEndDistribution(event);
        case 'can_play':
            return translateCanPlay(event);
        case 'can_annonce':
            return translateCanAnnonce(event);
        case 'start_round':
            return translateStartRound(event);
        default:
            return '';
    }
}
