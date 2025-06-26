import { gamePlayers } from "../..";
import logger from "@/logger";

/**
 * Handles player join/leave events for a game room.
 * - On join/leave: updates gamePlayers and broadcasts the full player list to the room
 * @param ws WebSocket connection
 * @param event EventInsert (with type 'join' or 'leave')
 * @param server Bun WebSocket server
 * @param gamePlayers Map<string, Set<string>> (gameId -> Set<playerId>)
 */
export function handlePlayerJoinLeave(event: any, publish: (room: string, payload: any) => void) {
  if (event.type === 'join') {
    if (!gamePlayers.has(event.gameId)) gamePlayers.set(event.gameId, new Set());
    gamePlayers.get(event.gameId)!.add(event.playerId);
  } else if (event.type === 'leave') {
    if (gamePlayers.has(event.gameId)) {
      gamePlayers.get(event.gameId)!.delete(event.playerId);
    }
  }
  // Always broadcast the updated player list to all in the room
  publish(`game-${event.gameId}`, JSON.stringify({
    type: 'player_list',
    gameId: event.gameId,
    players: Array.from(gamePlayers.get(event.gameId) || [])
  }));
  if (event.type === 'join') {
        // If there are now 4 players, emit start_game
        if (gamePlayers.get(event.gameId)!.size === 4) {
          publish(`game-${event.gameId}`, JSON.stringify({
            type: 'start_game',
            gameId: event.gameId,
            timestamp: new Date().toISOString()
          }));
        } else {
          logger.info(gamePlayers.get(event.gameId)!.size)
        }
  }
} 