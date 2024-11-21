import genIdCuid from "@coinche/shared/src/gen_id";
import Master from "../game";
import supabase from "../supabase";

export async function startPli() {
  // launch pli
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "start_pli",
      playerId: "master",
      gameId: Master.instance.game.gameId,
      value: Master.instance.getLastRound().player_starting_id,
    },
  ]);
}
