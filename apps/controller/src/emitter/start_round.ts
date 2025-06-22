import { emitStartDistribution } from "@/emitter/start_distribution";
import controller from "@/game";
import logger from "@/logger";
import supabase from "@/supabase";
import genIdCuid from "../../../game/shared/utils/gen_id";

export async function emitRoundStarting(gameId: string, playerId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_round",
      playerId: "controller",
      gameId: gameId,
      value: playerId,
    },
  ]);
  logger.info(`${playerId} starting the next round`);
  controller.getInstance(gameId).addRound(playerId);
  controller.getInstance(gameId).addPli(playerId);
  await emitStartDistribution(gameId);
}
