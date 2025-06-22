// Original file: ../shared/grpc/common.proto

import type { Round as _coinche_Round, Round__Output as _coinche_Round__Output } from '../coinche/Round';
import type { Player as _coinche_Player, Player__Output as _coinche_Player__Output } from '../coinche/Player';
import type { Card as _coinche_Card, Card__Output as _coinche_Card__Output } from '../coinche/Card';

export interface Game {
  'rounds'?: (_coinche_Round)[];
  'players'?: (_coinche_Player)[];
  'gameId'?: (string);
  'deck'?: (_coinche_Card)[];
  'team1Score'?: (number);
  'team2Score'?: (number);
}

export interface Game__Output {
  'rounds': (_coinche_Round__Output)[];
  'players': (_coinche_Player__Output)[];
  'gameId': (string);
  'deck': (_coinche_Card__Output)[];
  'team1Score': (number);
  'team2Score': (number);
}
