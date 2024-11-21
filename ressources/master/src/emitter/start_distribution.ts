import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import Master from "../game";
import { generateDeckCards } from "../utils";
import emitDistribution from "./distribution";

export async function emitStartDistribution(gameId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_distribution",
      playerId: "master",
      gameId: gameId,
      value: "idPlayerStarting",
    },
  ]);
  if (Master.getInstance(gameId).game.rounds.length === 1) {
    Master.getInstance(gameId).game.deck = generateDeckCards();
  }
  await emitDistribution(
    Master.getInstance(gameId).getLastRound().player_starting_id,
    gameId,
  );
}
