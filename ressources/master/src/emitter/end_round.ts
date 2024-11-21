import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import { formatPoints, formatTeam } from "@coinche/shared";
import Master from "../game";

export async function emitEndRound(gameId: string) {
  const lastRound = Master.getInstance(gameId).getLastRound();
  const pointMultiplier = lastRound.coinched
    ? 2
    : lastRound.surcoinched
      ? 4
      : 1;
  const seuilAnnonce = lastRound.last_annonce;
  const teamAnnounced = Master.getInstance(gameId).isTeam1(
    lastRound.last_annonce.playerId,
  )
    ? 1
    : 2;
  let scoreTeam1: number = 0;
  let scoreTeam2: number = 0;
  if (teamAnnounced === 1) {
    switch (seuilAnnonce.annonce) {
      case "capot":
        // TODO
        break;
      case "generale":
        // TODO
        break;
      default:
        if (lastRound.team1_point_current_game > seuilAnnonce.annonce) {
          // annonce validée
          scoreTeam1 = lastRound.team1_point_current_game * pointMultiplier;
        } else {
          // annonce chutée
          scoreTeam2 = lastRound.team1_point_current_game * pointMultiplier;
        }
    }
  } else {
    switch (seuilAnnonce.annonce) {
      case "capot":
        // TODO
        break;
      case "generale":
        // TODO
        break;
      default:
        if (lastRound.team2_point_current_game > seuilAnnonce.annonce) {
          // annonce validée
          scoreTeam2 = lastRound.team2_point_current_game * pointMultiplier;
        } else {
          // annonce chutée
          scoreTeam1 = lastRound.team2_point_current_game * pointMultiplier;
        }
    }
  }
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
