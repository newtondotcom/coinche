import { supabase } from '@/shared/utils/listener';
import { deformatCarteToPlay } from '~/shared/utils/format';
import type { IPlay } from '@coinche/shared';

export async function fetchLastTrickEvents(): Promise<IPlay[]> {
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
    const lastTrickId = storeGame.trick_number;
    const lastTrickEvents = existingEvents.filter(
        (event) => deformatCarteToPlay(event.value).trick_number === lastTrickId,
    );
    const pastTricks: IPlay[] = lastTrickEvents.map((event) => ({
        card: deformatCarteToPlay(event.value).card,
        playerId: event.playerId,
    }));
    return pastTricks;
}

export function sumPointsTrick(plays: IPlay[]) {
    return plays.reduce((acc, play) => acc + play.card.valueNum, 0);
}
