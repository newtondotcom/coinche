import { supabase } from '@/lib/utils/listener';
import genIdCuid from '@coinche/shared/src/gen_id';
import type { IPlayer, PlayerPosition } from '@coinche/shared';

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
                value: storeAbout.myId,
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
                position: index as PlayerPosition,
                hands: [],
                classement: 0,
            };
            buildPlayers.push(local);
        }

        storePlayers.setPlayers(buildPlayers);
        console.log(`Game has ${storePlayers.players.length} players`);
    }
}

export async function leave() {
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
