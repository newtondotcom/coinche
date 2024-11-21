import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import { formatTeam } from "@coinche/shared";

export async function emitEndGame(
  winnerPlayerId: string,
  teamMatePlayerId: string,
  gameId: string,
) {
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "end_game",
      playerId: "master",
      gameId: gameId,
      value: formatTeam(winnerPlayerId, teamMatePlayerId),
    },
  ]);
}
