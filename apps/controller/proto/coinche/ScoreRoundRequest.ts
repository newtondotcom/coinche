// Original file: ../shared/grpc/score_round.proto


export interface ScoreRoundRequest {
  'scoreTeam1'?: (number);
  'scoreTeam2'?: (number);
  'gameId'?: (string);
}

export interface ScoreRoundRequest__Output {
  'scoreTeam1': (number);
  'scoreTeam2': (number);
  'gameId': (string);
}
