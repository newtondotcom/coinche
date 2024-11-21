import {
  formatCarteToDistribute,
  type ICard,
  type PlayerId,
} from "@coinche/shared";
import Master from "../game";
import supabase from "../supabase";
import genIdCuid from "@coinche/shared/src/gen_id";
import logger from "../logger";
import { emitCanAnnonce } from "./can";

export default async function emitDistribution(
  id_player_starting: PlayerId,
  gameId: string,
) {
  cutDeck(gameId);
  // distribute cards 3 per person, then 2, then 3
  const players = Master.getInstance(gameId).game.players;
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
    Master.getInstance(gameId).game.deck.length !== 32 ||
    shiftedPlayers.length !== 4
  ) {
    logger.error("deck not cut or players not 4");
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
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_annonce",
      playerId: "master",
      gameId: Master.getInstance(gameId).game.gameId,
      value: id_player_starting,
    },
  ]);
  await emitCanAnnonce(id_player_starting, gameId);
}

async function distributeCard(player_id: string, gameId: string) {
  const card: ICard = Master.getInstance(gameId).game.deck.pop();
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "distribution",
      playerId: player_id,
      gameId: gameId,
      value: formatCarteToDistribute(
        card,
        Master.getInstance(gameId).game.rounds.length,
      ),
    },
  ]);
}
export function cutDeck(gameId: string) {
  // cut the paquet at a certain index
  const indexCut = Math.floor(Math.random() * 32);
  const deck = Master.getInstance(gameId).game.deck;
  const deck1 = deck.slice(0, indexCut);
  const deck2 = deck.slice(indexCut);
  const newDeck = [...deck2, ...deck1];
  Master.getInstance(gameId).game.deck = newDeck;
  logger.info("Deck cut at index", indexCut);
}
