import controller from "../game";

export async function emitPointsRound(_scoreTeam1: number, _scoreTeam2: number, gameId: string) {
  // This function is called at the end of a round to add game points (from bids)
  // The round points (from cards) are already accumulated in each trick's team1Score/team2Score
  // We just need to send the state update
  controller.getInstance(gameId).sendState();
}
