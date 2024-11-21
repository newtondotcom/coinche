import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import Master from "../game";
import { generateDeckCards } from "../utils";

export async function emitStartDistribution() {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_distribution",
      playerId: "master",
      gameId: Master.instance.game.gameId,
      value: "idPlayerStarting",
    },
  ]);
  if (Master.instance.game.rounds.length === 1) {
    Master.instance.game.deck = generateDeckCards();
  }
  await emitDistribution(Master.instance.getLastRound().player_starting_id);
}
