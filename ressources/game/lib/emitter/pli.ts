import { deformatCarteToPlay } from '@coinche/shared';
import { createClient } from '@supabase/supabase-js';
import type { IPlay, IPlayer } from '@coinche/shared';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export async function fetchLastPliEvents(): Promise<IPlay[]> {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    const { data: existingEvents, error: selectError } = await supabase
        .from('Events')
        .select('*')
        .eq('gameId', storeAbout.gameId)
        .eq('type', 'play');
    if (selectError) {
        console.error('Error fetching events', selectError);
        return [];
    }
    const lastPliId = storeGame.pli_number;
    const lastPliEvents = existingEvents.filter(
        (event) => deformatCarteToPlay(event.value).pli_number === lastPliId,
    );
    const pastPlis: IPlay[] = lastPliEvents.map((event) => ({
        card: deformatCarteToPlay(event.value).card,
        playerId: event.playerId,
    }));
    return pastPlis;
}

export function sumPointsPli(plays: IPlay[]) {
    return plays.reduce((acc, play) => acc + play.card.valueNum, 0);
}
