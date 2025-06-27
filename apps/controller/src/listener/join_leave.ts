import { emitGameStarting } from "@/emitter/start_game";
import logger from "@/logger";
import genIdCuid from "../../../game/shared/utils/gen_id";
import controller from "@/game";
import type { IPlayer } from '@coinche/shared';

/**
 * Handles player join/leave events for a game room.
 * - On join/leave: updates gamePlayers and broadcasts the full player list to the room
 * @param ws WebSocket connection
 */
export async function handlePlayerJoinLeave(event: any, publish: (payload: any) => void) {
  const gameId = event.gameId;
  const playerId = event.playerId;
  const gameController = controller.getInstance(gameId);
  const playersSetOld = gameController.getPlayers();
  if (event.type === 'join') {
    const player: IPlayer = { id: playerId, position: playersSetOld.size as any, hands: [], classement: 0 };
    gameController.addPlayer(player);
  } else if (event.type === 'leave') {
    gameController.removePlayer(playerId);
  }
  // Always broadcast the updated player list to all in the room
  const playersSet = gameController.getPlayers();
  const event2 = {
    gameId,
    id: await genIdCuid(),
    type: 'player_list',
    playerId: "controller",
    value: Array.from(playersSet),
    timestamp: new Date().toISOString(),
  }
  publish(event2);
  if (event.type === 'join') {
    // If there are now 4 players, emit start_game
    if (playersSet.size === 4) {
      // Get the first playerId from the Set
      const firstPlayer = Array.from(playersSet)[0];
      await emitGameStarting(firstPlayer.id, gameId, publish);
    } else {
      logger.info(playersSet.size)
    }
  }
} 