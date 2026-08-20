import { emitCanBid } from "./can";
import controller from "../game";
import logger from "../logger";
import type { ICard, PlayerId } from "@coinche-reborn/api";

export default async function emitDealing(idPlayerStarting: PlayerId, gameId: string) {
  cutDeck(gameId);

  // Clear all players' hands before distributing new cards
  const playersMap = controller.getInstance(gameId).getPlayers();
  const players = Array.from(playersMap.values());
  players.forEach((player) => {
    player.hands = [];
  });

  // distribute cards 3 per person, then 2, then 3
  const startIndex = players.findIndex((player) => player.id === idPlayerStarting);
  if (startIndex === -1) {
    logger.info(idPlayerStarting);
    logger.error("Player with the given idPlayerStarting not found");
  }
  const shiftedPlayers = [...players.slice(startIndex), ...players.slice(0, startIndex)];

  if (controller.getInstance(gameId).state.deck.length !== 32 || shiftedPlayers.length !== 4) {
    logger.error(
      `deck not cut or players not 4 ${controller.getInstance(gameId).state.deck.length},${shiftedPlayers.length}`,
    );
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < shiftedPlayers.length; j++) {
      await distributeCard(shiftedPlayers[j]!.id, gameId);
    }
  }
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < shiftedPlayers.length; j++) {
      await distributeCard(shiftedPlayers[j]!.id, gameId);
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < shiftedPlayers.length; j++) {
      await distributeCard(shiftedPlayers[j]!.id, gameId);
    }
  }

  // Send state to clients so they can see their cards before bidding starts
  controller.getInstance(gameId).sendState();

  // Emit the event to start bidding and display the cards
  await emitCanBid(idPlayerStarting, gameId);
}

async function distributeCard(playerId: string, gameId: string) {
  const card: ICard = controller.getInstance(gameId).state.deck.pop() as ICard;
  controller
    .getInstance(gameId)
    .getPlayers()
    .find((player) => player.id === playerId)!
    .hands.push(card);
}

export function cutDeck(gameId: string) {
  // cut the paquet at a certain index
  const indexCut = Math.floor(Math.random() * 32);
  const deck = controller.getInstance(gameId).state.deck;
  // const shuffledDeck = deck
  const deck1 = deck.slice(0, indexCut);
  const deck2 = deck.slice(indexCut);
  const newDeck = [...deck2, ...deck1];
  Object.assign(controller.getInstance(gameId).state, { deck: newDeck });
  logger.info("Deck cut at index", indexCut);
}
