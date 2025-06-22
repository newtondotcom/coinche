import logger from "@/logger";
import supabase from "@/supabase";
import genIdCuid from "../../../game/shared/utils/gen_id";

export async function emitCanPlay(playerId: string, gameId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "can_play",
      playerId: "controller",
      gameId: gameId,
      value: playerId,
    },
  ]);
  logger.info(`${playerId} can play`);
}

export async function emitCanAnnonce(playerId: string, gameId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "can_annonce",
      playerId: "controller",
      gameId: gameId,
      value: playerId,
    },
  ]);
  logger.info(`${playerId} can annonce`);
}
