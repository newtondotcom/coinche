import { createClient } from '@supabase/supabase-js';

import genIdCuid from './gen';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export async function join() {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    const { data, error } = await supabase.from('Events').select('*').eq('gameId', gameId);
    if (data?.length == 0 && data?.length == storePlayers.players.length) {
        // if no other players are present, we are the creator
        storeAbout.setCreator(true);
        console.log('You are the creator');
        // we will be automatically added to the store by the listener
    } else {
        // if others players are present, we need to add them to the store
        const otherPlayers = data.filter((event) => event.type == 'join');
        otherPlayers.forEach((player, index) => {
            const local: IPlayer = {
                id: player.playerId,
                surname: player.value,
                position: index as PlayerPosition,
                hands: [],
                classement: 0,
            };
            storePlayers.addPlayer(local);
        });
        console.log(otherPlayers);
    }
    // we need to add ourselves to the db
    if (data?.some((event) => event.playerId == storeAbout.myId)) {
        console.log('You are in the game');
        return;
    }
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'join',
            playerId: storeAbout.myId,
            gameId: gameId,
            value: storeAbout.mySurname,
        },
    ]);

    // we need to set the game status to active
    storeGame.setStatus('new');
}

export async function leave() {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;

    // we need to add ourselves to the db
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'leave',
            playerId: storeAbout.myId,
            gameId: gameId,
            value: storeAbout.mySurname,
        },
    ]);

    //await supabase.from('Events').delete().not('id', 'is', null);
}
