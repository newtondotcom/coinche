import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import { formatPoints } from "@coinche/shared";

export async function emitPointsRound(
  scoreTeam1: number,
  scoreTeam2: number,
  gameId: string,
) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "score_round",
      playerId: "master",
      gameId: gameId,
      value: formatPoints(scoreTeam1, scoreTeam2),
    },
  ]);
}
