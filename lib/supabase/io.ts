import { createClient } from '@supabase/supabase-js';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export async function join() {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    let position: PlayerPosition = 0;
    const { data, error } = await supabase.from('Events').select('*').eq('gameId', gameId);
    if (data?.length == 0) {
        storeAbout.setCreator(true);
        await supabase.from('Events').insert([
            {
                type: 'join',
                playerId: storeAbout.myId,
                gameId: gameId,
                value: storeAbout.mySurname,
            },
        ]);
        console.log('You are the creator');
    } else {
        const otherPlayers = data.filter((event) => event.type == 'join');
        console.log(otherPlayers);
    }

    const players = storePlayers.players;
    const me = {
        id: storeAbout.myId,
        surname: storeAbout.mySurname,
        position,
        score: 0,
        hands: [],
        classement: 0,
    };
    storeGame.setStatus('new');
}

export async function leave() {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
}
