import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import logger from "../logger";

export async function emitCanPlay(playerId: string, gameId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "can_play",
      playerId: "master",
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
      playerId: "master",
      gameId: gameId,
      value: playerId,
    },
  ]);
  logger.info(`${playerId} can annonce`);
}
