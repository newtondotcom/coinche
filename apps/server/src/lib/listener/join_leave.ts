import controller from "@/lib/game";
import type { IPlayer } from '@coinche/shared';
import addPlayer from "@/lib/actions/add_player";
import removePlayer from "@/lib/actions/remove_player";

/**
 * Handles player join/leave events for a game room.
 * - On join/leave: updates gamePlayers and broadcasts the full player list to the room
 * @param event The event object containing gameId, playerId, and type (join/leave)
 */
export async function handlePlayerJoinLeave(event: any) {
  const gameId = event.gameId;
  const playerId = event.playerId;
  const gameController = controller.getInstance(gameId);
  const playersSetOld = gameController.getPlayers();
  if (event.type === 'join') {
    const player: IPlayer = { id: playerId, position: playersSetOld.length as any, hands: [], classement: 0 };
    addPlayer(player, gameId);
  } else if (event.type === 'leave') {
    removePlayer(playerId, gameId);
  }
} 