import { emitRoundStarting } from "@/emitter/start_round";
import supabase from "@/supabase";
import genIdCuid from "../../../game/shared/utils/gen_id";

export async function emitGameStarting(playerId: string, gameId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_game",
      playerId: "controller",
      gameId: gameId,
      value: playerId,
    },
  ]);
  await emitRoundStarting(gameId, playerId);
}
