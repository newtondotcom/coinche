import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import { formatPoints } from "@coinche/shared";
import Master from "../game";

export async function emitPoints(scoreTeam1: number, scoreTeam2: number) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "score",
      playerId: "master",
      gameId: Master.instance.game.gameId,
      value: formatPoints(scoreTeam1, scoreTeam2),
    },
  ]);
}
