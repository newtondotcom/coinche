import controller from '@/lib/game';


export async function emitPointsTrick(
  scoreTeam1: number,
  scoreTeam2: number,
  gameId: string
) {
  controller.getInstance(gameId).getCurrentPli().team1Score +=
    scoreTeam1;
  controller.getInstance(gameId).getCurrentPli().team1Score +=
    scoreTeam2;
  controller.getInstance(gameId).sendState();
}
