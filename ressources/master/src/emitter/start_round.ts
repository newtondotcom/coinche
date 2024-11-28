import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import Master from "../game";
import { emitStartDistribution } from "./start_distribution";
import logger from "../logger";

export async function emitRoundStarting(gameId: string, playerId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_round",
      playerId: "master",
      gameId: gameId,
      value: playerId,
    },
  ]);
  logger.info(`${playerId} starting the next round`);
  Master.getInstance(gameId).addRound(playerId);
  Master.getInstance(gameId).addPli(playerId);
  await emitStartDistribution(gameId);
}
