import controller from "../game";
import logger from "../logger";
import type { IPlayer, PlayerPosition } from "@coinche-reborn/api";
import addPlayer from "../actions/addPlayer";
import { createBotPlayer, getBotId, isBotId, replacePlayerIdInState } from "../bot";
import { maybeScheduleBotTurn } from "../botScheduler";

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
  if (event.type === "join") {
    if (playersSetOld.some((player) => player.id === playerId)) {
      return;
    }

    const botIndex = playersSetOld.findIndex((player) => isBotId(player.id));
    if (botIndex >= 0) {
      const botId = playersSetOld[botIndex]?.id;
      if (botId) {
        replacePlayerIdInState(gameController.state, botId, playerId);
        gameController.sendState();
      }
    } else if (playersSetOld.length < 4) {
      const player: IPlayer = {
        id: playerId,
        position: playersSetOld.length as PlayerPosition,
        hands: [],
        classement: 0,
      };
      addPlayer(player, gameId);
    } else {
      logger.warn(`[join] Game ${gameId} is full, ignoring player ${playerId}`);
      return;
    }

    fillWithBots(gameId);
  } else if (event.type === "leave") {
    if (isBotId(playerId)) {
      return;
    }

    const leavingPlayer = playersSetOld.find((player) => player.id === playerId);
    if (!leavingPlayer) {
      return;
    }

    const position =
      typeof leavingPlayer.position === "number"
        ? (leavingPlayer.position as PlayerPosition)
        : ((playersSetOld.indexOf(leavingPlayer) || 0) as PlayerPosition);
    const botId = getBotId(gameId, position);
    replacePlayerIdInState(gameController.state, playerId, botId);
    gameController.sendState();
    maybeScheduleBotTurn(gameId);
    fillWithBots(gameId);
  }
}

function fillWithBots(gameId: string) {
  const gameController = controller.getInstance(gameId);
  if (gameController.state.status === "finished") {
    return;
  }
  while (gameController.state.players.length < 4) {
    const position = gameController.state.players.length as PlayerPosition;
    addPlayer(createBotPlayer(gameId, position), gameId);
  }
}
