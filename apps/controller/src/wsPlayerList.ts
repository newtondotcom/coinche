import winston from "winston";

/**
 * Handles player join/leave events for a game room.
 * - On join/leave: updates gamePlayers and broadcasts the full player list to the room
 * @param ws WebSocket connection
 * @param event EventInsert (with type 'join' or 'leave')
 * @param server Bun WebSocket server
 * @param gamePlayers Map<string, Set<string>> (gameId -> Set<playerId>)
 */
export function handlePlayerJoinLeave(ws: any, event: any, server: any, gamePlayers: Map<string, Set<string>>) {
  if (event.type === 'join') {
    if (!gamePlayers.has(event.gameId)) gamePlayers.set(event.gameId, new Set());
    gamePlayers.get(event.gameId)!.add(event.playerId);
  } else if (event.type === 'leave') {
    if (gamePlayers.has(event.gameId)) {
      gamePlayers.get(event.gameId)!.delete(event.playerId);
    }
  }
  // Always broadcast the updated player list to all in the room
  server.publish(`game-${event.gameId}`, JSON.stringify({
    type: 'player_list',
    gameId: event.gameId,
    players: Array.from(gamePlayers.get(event.gameId) || [])
  }));
  // Also send the player list to the joining client (for join)
  if (event.type === 'join') {
    ws.send(JSON.stringify({
      type: 'player_list',
      gameId: event.gameId,
      players: Array.from(gamePlayers.get(event.gameId)!)
    }));
        // If there are now 4 players, emit start_game
        if (gamePlayers.get(event.gameId)!.size === 4) {
          server.publish(`game-${event.gameId}`, JSON.stringify({
            type: 'start_game',
            gameId: event.gameId,
            timestamp: new Date().toISOString()
          }));
        } else {
          winston.info(gamePlayers.get(event.gameId)!.size)
        }
  }
} 