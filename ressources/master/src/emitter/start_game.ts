import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import Master from "../game";

export async function emitGameStarting(playerId: string, gameId: string) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_game",
      playerId: "master",
      gameId: gameId,
      value: playerId,
    },
  ]);
}
