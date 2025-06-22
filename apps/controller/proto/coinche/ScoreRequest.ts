// Original file: ../shared/grpc/score.proto


export interface ScoreRequest {
  'scoreTeam1'?: (number);
  'scoreTeam2'?: (number);
  'gameId'?: (string);
}

export interface ScoreRequest__Output {
  'scoreTeam1': (number);
  'scoreTeam2': (number);
  'gameId': (string);
}
