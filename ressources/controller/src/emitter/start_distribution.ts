import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "@/supabase";
import controller from "@/game";
import { generateDeckCards } from "@/utils";
import emitDistribution from "@/emitter/distribution";

export async function emitStartDistribution(gameId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_distribution",
      playerId: "controller",
      gameId: gameId,
      value: "idPlayerStarting",
    },
  ]);
  if (controller.getInstance(gameId).game.rounds.length === 1) {
    controller.getInstance(gameId).game.deck = generateDeckCards();
  }
  await emitDistribution(
    controller.getInstance(gameId).getLastPli().player_starting_id,
    gameId,
  );
}
