import genIdCuid from '@/lib/utils/gen_id';
import { supabase } from '@/lib/utils/listener';

export async function translateJoin(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    if (storePlayers.players.find((player) => player.id === event.playerId)) {
        console.log('Player already in the game');
        return '';
    } else {
        const local: IPlayer = {
            id: event.playerId,
            surname: event.value as string,
            position: storePlayers.players.length as PlayerPosition,
            hands: [],
            classement: 0,
        };
        storePlayers.addPlayer(local);
        console.log('Addded player', local);
        if (storePlayers.players.length === 4) {
            storeGame.setStatus('active');
            if (storeAbout.isCreator) {
                const idPlayerStarting = storePlayers.players[0].id;
                await emitGameStarting(idPlayerStarting);
            }
        }
    }
    return;
}

export async function emitGameStarting(playerId: string) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    storeGame.setPlayerStartingId(playerId);
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'start_game',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: playerId, // value is the name of the player starting
        },
    ]);
}