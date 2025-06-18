import { emitGameStarting } from '@/emitter/start_game';
import controller from '@/game';
import logger from '@/logger';
import type { EventInsert, IPlayer, PlayerPosition } from '@coinche/shared';

export async function translateJoin(event: EventInsert) {
    if (
        controller
            .getInstance(event.gameId)
            .game.players.find((player) => player.id === event.playerId)
    ) {
        logger.info('Player already in the game');
        return '';
    } else {
        const local: IPlayer = {
            id: event.playerId,
            position: controller.getInstance(event.gameId).game.players.length as PlayerPosition,
            hands: [],
            classement: 0,
        };
        controller.getInstance(event.gameId).game.players.push(local);
        console.log('Addded player', local);
        if (controller.getInstance(event.gameId).game.players.length === 4) {
            const idPlayerStarting = controller.getInstance(event.gameId).game.players[0].id;
            await emitGameStarting(idPlayerStarting, event.gameId);
        }
    }
    return;
}
