import genIdCuid from "@coinche/shared/src/gen_id";
import Master from "../game";
import supabase from "../supabase";

export async function startPli(gameId: string) {
  // launch pli
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_pli",
      playerId: "master",
      gameId: gameId,
      value: Master.getInstance(gameId).getLastRound().player_starting_id,
    },
  ]);
}
