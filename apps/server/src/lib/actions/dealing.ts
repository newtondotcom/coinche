import { emitCanBid } from "@/lib/actions/can";
import controller from "@/lib/game";
import logger from "@/lib/logger";
import type { ICard, PlayerId } from "@coinche/shared";


export default async function emitDealing(
  id_player_starting: PlayerId,
  gameId: string
) {
  cutDeck(gameId);
  
  // distribute cards 3 per person, then 2, then 3
  const playersMap = controller.getInstance(gameId).getPlayers();
  const players = Array.from(playersMap.values());
  const startIndex = players.findIndex(
    (player) => player.id === id_player_starting,
  );
  if (startIndex === -1) {
    logger.info(id_player_starting);
    logger.error("Player with the given id_player_starting not found");
  }
  const shiftedPlayers = [
    ...players.slice(startIndex),
    ...players.slice(0, startIndex),
  ];

  if (
    controller.getInstance(gameId).state.deck.length !== 32 ||
    shiftedPlayers.length !== 4
  ) {
    logger.error(`deck not cut or players not 4 ${controller.getInstance(gameId).state.deck.length},${shiftedPlayers.length}`);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < shiftedPlayers.length; j++) {
      await distributeCard(shiftedPlayers[j].id, gameId);
    }
  }
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < shiftedPlayers.length; j++) {
      await distributeCard(shiftedPlayers[j].id, gameId);
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < shiftedPlayers.length; j++) {
      await distributeCard(shiftedPlayers[j].id, gameId);
    }
  }

  // Emit the event to start the pli and display the cards
  await emitCanBid(id_player_starting, gameId);
}


async function distributeCard(player_id: string, gameId: string) {
  const card: ICard = controller.getInstance(gameId).state.deck.pop() as ICard;
  controller.getInstance(gameId).getPlayers().find((player) => player.id === player_id)!.hands.push(card);
  // we will update the state once all cards are distributed
  //controller.getInstance(gameId).sendState();
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
