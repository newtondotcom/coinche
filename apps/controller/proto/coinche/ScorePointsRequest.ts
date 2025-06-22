// Original file: ../shared/grpc/score.proto


export interface ScorePointsRequest {
  'scoreTeam1'?: (number);
  'scoreTeam2'?: (number);
  'gameId'?: (string);
}

export interface ScorePointsRequest__Output {
  'scoreTeam1': (number);
  'scoreTeam2': (number);
  'gameId': (string);
}
