import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "@/supabase";
import { emitRoundStarting } from "@/emitter/start_round";

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
