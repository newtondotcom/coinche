// Original file: ../shared/grpc/end_game.proto


export interface EndGameRequest {
  'winnerPlayerId'?: (string);
  'teamMatePlayerId'?: (string);
  'gameId'?: (string);
}

export interface EndGameRequest__Output {
  'winnerPlayerId': (string);
  'teamMatePlayerId': (string);
  'gameId': (string);
}
