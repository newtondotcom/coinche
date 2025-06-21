import supabase from "@/supabase";
import { formatPoints } from "@/shared/utils/format";
import genIdCuid from "@/shared/utils/gen_id";

export async function emitPointsRound(
  scoreTeam1: number,
  scoreTeam2: number,
  gameId: string,
) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "score_round",
      playerId: "controller",
      gameId: gameId,
      value: formatPoints(scoreTeam1, scoreTeam2),
    },
  ]);
}
