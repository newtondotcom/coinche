import { createClient } from '@supabase/supabase-js';

import genIdCuid from './gen';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export async function closePli() {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    // fetch all the pli events
    const { data: existingEvents, error: selectError } = await supabase
        .from('Events')
        .select('*')
        .eq('gameId', storeAbout.gameId)
        .eq('type', 'play');
    if (selectError) {
        console.error('Error fetching events', selectError);
        return;
    }
    // fetch the last pli event
    const lastPliId = storeGame.pli_number;
    const lastPliEvents = existingEvents.filter((event) => event.value.pli_number === lastPliId);

    return 'pli';
}

export async function startPli() {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    storeGame.setNewPli();
    storeGame.setCurrentPlayerId(storeGame.player_starting_id);
    // launch pli
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'start_pli',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: storeGame.player_starting_id, // value is the name of the player starting the pli
        },
    ]);
}

export function formatPoseCarte(card: ICard, pli_number: number): string {
    return `${card.value}|${card.suite}`;
}
