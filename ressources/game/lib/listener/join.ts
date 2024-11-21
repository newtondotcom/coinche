import { supabase } from '@/lib/utils/listener';
import type { EventShared, IPlayer, PlayerPosition } from '@coinche/shared';

export async function translateJoin(event: EventShared) {
    const storePlayers = usePlayersStore();
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
    }
    return;
}
