import { usePlayersStore } from "@/stores/players";
import type { EventInsert, IPlayer, PlayerPosition } from '@coinche/shared';

export async function translateJoin(event: EventInsert) {
    const storePlayers = usePlayersStore();
    if (storePlayers.players.find((player) => player.id === event.playerId)) {
        console.log('Player already in the game');
        return '';
    } else {
        const local: IPlayer = {
            id: event.playerId,
            position: storePlayers.players.length as PlayerPosition,
            hands: [],
            classement: 0,
        };
        storePlayers.addPlayer(local);
        console.log('Addded player', local);
    }
    return;
}
