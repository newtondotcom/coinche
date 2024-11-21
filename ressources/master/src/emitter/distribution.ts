import {
  formatCarteToDistribute,
  type ICard,
  type PlayerId,
} from "@coinche/shared";
import Master from "../game";
import supabase from "../supabase";
import genIdCuid from "@coinche/shared/src/gen_id";

export default async function emitDistribution(id_player_starting: PlayerId) {
  cutDeck();
  // distribute cards 3 per person, then 2, then 3
  const players = Master.instance.game.players;
  const startIndex = players.findIndex(
    (player) => player.id === id_player_starting,
  );
  if (startIndex === -1) {
    console.error("Player with the given id_player_starting not found");
  }
  const shiftedPlayers = [
    ...players.slice(startIndex),
    ...players.slice(0, startIndex),
  ];

  if (Master.instance.game.deck.length !== 32 || shiftedPlayers.length !== 4) {
    console.error("deck not cut or players not 4");
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < shiftedPlayers.length; j++) {
      await distributeCard(shiftedPlayers[j].id);
    }
  }
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < shiftedPlayers.length; j++) {
      await distributeCard(shiftedPlayers[j].id);
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < shiftedPlayers.length; j++) {
      await distributeCard(shiftedPlayers[j].id);
    }
  }
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_annonce",
      playerId: "master",
      gameId: Master.instance.game.gameId,
      value: id_player_starting,
    },
  ]);
}

async function distributeCard(player_id: string) {
  const card: ICard = Master.instance.game.deck.pop();
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "distribution",
      playerId: player_id,
      gameId: Master.instance.game.gameId,
      value: formatCarteToDistribute(card, Master.instance.game.rounds.length),
    },
  ]);
}
export function cutDeck() {
  // cut the paquet at a certain index
  const indexCut = Math.floor(Math.random() * 32);
  const deck = Master.instance.game.deck;
  const deck1 = deck.slice(0, indexCut);
  const deck2 = deck.slice(indexCut);
  const newDeck = [...deck2, ...deck1];
  Master.instance.game.deck = newDeck;
  console.log("Deck cut at index", indexCut);
}
