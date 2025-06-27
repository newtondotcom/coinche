import { emitGameStarting } from "@/emitter/start_game";
import { gamePlayers } from "../..";
import logger from "@/logger";
import genIdCuid from "../../../game/shared/utils/gen_id";

/**
 * Handles player join/leave events for a game room.
 * - On join/leave: updates gamePlayers and broadcasts the full player list to the room
 * @param ws WebSocket connection
 */
export async function handlePlayerJoinLeave(event: any, publish: (payload: any) => void) {
  if (event.type === 'join') {
    if (!gamePlayers.has(event.gameId)) gamePlayers.set(event.gameId, new Set());
    gamePlayers.get(event.gameId)!.add(event.playerId);
  } else if (event.type === 'leave') {
    if (gamePlayers.has(event.gameId)) {
      gamePlayers.get(event.gameId)!.delete(event.playerId);
    }
  }
  // Always broadcast the updated player list to all in the room
  const event2 = {
    gameId: event.gameId,
    id: await genIdCuid(),
    type: 'player_list',
    playerId: "controller",
    value: Array.from(gamePlayers.get(event.gameId) || []),
    timestamp: new Date().toISOString(),
  }
  publish(event2);
  if (event.type === 'join') {
        // If there are now 4 players, emit start_game
        if (gamePlayers.get(event.gameId)!.size === 4) {
          // Get the first playerId from the Set
          const firstPlayerId = Array.from(gamePlayers.get(event.gameId)!)[0];
          await emitGameStarting(firstPlayerId, event.gameId, publish);
        } else {
          logger.info(gamePlayers.get(event.gameId)!.size)
        }
  }
} 