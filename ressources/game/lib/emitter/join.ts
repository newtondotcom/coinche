import { formatPoints } from '@/lib/emitter/points';
import { startGame } from '@/lib/listener/start';
import genIdCuid from '@/lib/utils/gen_id';
import { createClient } from '@supabase/supabase-js';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export async function join() {
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;

    // Check if there are any events for this gameId
    const { data: existingEvents, error: selectError } = await supabase
        .from('Events')
        .select('*')
        .eq('gameId', gameId)
        .eq('type', 'join');

    if (selectError) {
        console.error('Error fetching events:', selectError);
        return;
    }

    if (existingEvents?.length === 0) {
        // If no other players are present, we are the creator
        storeAbout.setCreator(true);
        console.log('You are the creator');

        // create or update the score record
        const { data: existingEvents, error: selectError } = await supabase
            .from('Events')
            .select('*')
            .eq('gameId', gameId)
            .eq('type', 'score');
        if (selectError) {
            console.error('Error fetching events:', selectError);
            return;
        }
        if (existingEvents?.length === 0) {
            await supabase.from('Events').insert([
                {
                    id: await genIdCuid(),
                    type: 'annonce',
                    playerId: storeAbout.myId,
                    gameId: gameId,
                    value: formatPoints(0, 0),
                },
            ]);
        }
        // Automatic addition by listener expected
    }

    // Check if the current player is already registered in the game
    const playerExists = existingEvents?.some((event) => event.playerId === storeAbout.myId);

    if (playerExists) {
        console.log('You are already registered in the database for this game');
    } else {
        // Insert new event to register this player
        const { error: insertError } = await supabase.from('Events').insert([
            {
                id: await genIdCuid(),
                type: 'join',
                playerId: storeAbout.myId,
                gameId: gameId,
                value: storeAbout.mySurname,
            },
        ]);

        if (insertError) {
            console.error('Error inserting join event:', insertError);
            return;
        }
    }

    // Fetch events again to update player list
    const { data: updatedEvents, error: updatedSelectError } = await supabase
        .from('Events')
        .select('*')
        .eq('gameId', gameId)
        .eq('type', 'join');

    if (updatedSelectError) {
        console.error('Error fetching updated events:', updatedSelectError);
        return;
    }

    if (updatedEvents && updatedEvents.length !== storePlayers.players.length) {
        const buildPlayers: IPlayer[] = [];
        const otherPlayers = updatedEvents.filter((event) => event.type === 'join');
        const otherPlayersOrdred = otherPlayers.sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        );

        for (let index = 0; index < otherPlayersOrdred.length; index++) {
            const player = otherPlayersOrdred[index];
            const local: IPlayer = {
                id: player.playerId,
                surname: player.value,
                position: index as PlayerPosition,
                hands: [],
                classement: 0,
            };
            buildPlayers.push(local);
        }

        storePlayers.setPlayers(buildPlayers);
        console.log(`Game has ${storePlayers.players.length} players`);
    }
    if (storePlayers.players.length === 4) {
        // same logic as in listener for game_start
        const { data, error } = await supabase
            .from('Events')
            .select('*')
            .eq('gameId', gameId)
            .eq('type', 'start_game');
        if (data?.length == 0) {
            console.error('Game has not started');
            return;
        }
        await startGame(storePlayers.players[0].id);

        /*
        // check if cards have been distributed for pli number 1
        const { data: distributions, error: distributionsError } = await supabase
            .from('Events')
            .select('*')
            .eq('gameId', gameId)
            .eq('type', 'distribution');
        if (distributionsError) {
            console.error('Error fetching distributions:', distributionsError);
            return;
        }
        const distributionsPli1 = distributions.filter(
            (distribution) => deformatCarteToDistribute(distribution.value).pli_number === 1,
        );
        if (distributionsPli1.length === 32) {
            storeGame.setNewPli();
            console.log('Starting pli because of 3 passes');
            distributionsPli1.forEach((distribution) => {
                const card = deformatCarteToDistribute(distribution.value).card;
                const player = storePlayers.players.find((p) => p.id === distribution.playerId);
                if (player) {
                    player.hands.push(card);
                } else {
                    console.error('Player not found');
                }
            });
        }

        // check if announces have been made
        const { data: annonces, error: annoncesError } = await supabase
            .from('Events')
            .select('*')
            .eq('gameId', gameId)
            .eq('type', 'annonce');
        if (annoncesError) {
            console.error('Error fetching annonces:', annoncesError);
            return;
        }
        if (annonces.length > 0) {
            // pli has started
            annonces.forEach((annonce) => {
                const annonceParsed: IAnnonce = deformatAnnonce(
                    annonce.value as string,
                    annonce.playerId,
                );
                if (!storeGame.annonces_pli.includes(annonceParsed)) {
                    storeGame.addAnnonceToPli(annonceParsed);
                    if (annonceParsed.annonce !== 0) {
                        storeGame.setLastAnnonce(annonceParsed);
                    }
                    console.log('Added annonce to pli', annonceParsed);
                }
            });
            const nextPlayerId = setNextPlayerTurn(annonces[annonces.length - 1].playerId);
            storeGame.setCurrentPlayerId(nextPlayerId);
            console.log('Setting current player id', nextPlayerId);
        }

        // check if pli has started
        // */
    }
}

export async function leave() {
    const storeAbout = useAboutStore();

    // we need to add ourselves to the db
    /*
    await supabase
        .from('Events')
        .delete()
        .eq('playerId', storeAbout.myId)
        .eq('gameId', gameId)
        .eq('type', 'join');
    */

    //await supabase.from('Events').delete().not('id', 'is', null);
}
