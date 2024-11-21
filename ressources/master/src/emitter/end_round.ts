import Master from "../game";
import logger from "../logger";
import { emitPointsRound } from "./points_round";

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
          scoreTeam1 =
            (lastRound.last_annonce.annonce as number) * pointMultiplier;
        } else {
          // annonce chutée
          scoreTeam2 =
            (lastRound.last_annonce.annonce as number) * pointMultiplier;
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
          scoreTeam2 =
            (lastRound.last_annonce.annonce as number) * pointMultiplier;
        } else {
          // annonce chutée
          scoreTeam1 =
            (lastRound.last_annonce.annonce as number) * pointMultiplier;
        }
    }
  }
  logger.info(`Score de ${scoreTeam1} à ${scoreTeam2}`);
  await emitPointsRound(scoreTeam1, scoreTeam2, gameId);
}
