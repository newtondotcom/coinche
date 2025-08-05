import controller from '@/lib/game';


export async function emitPoints(
  scoreTeam1: number,
  scoreTeam2: number,
  gameId: string
) {
  controller.getInstance(gameId).state.team1PointsCurrentGame +=
      scoreTeam1;
    controller.getInstance(gameId).state.team2PointsCurrentGame+=
      scoreTeam2;
  controller.getInstance(gameId).sendState();
}
