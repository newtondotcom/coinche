// Original file: ../shared/grpc/common.proto

import type { Play as _coinche_Play, Play__Output as _coinche_Play__Output } from '../coinche/Play';

export interface Pli {
  'plays'?: (_coinche_Play)[];
  'currentPlayerId'?: (string);
  'playerStartingId'?: (string);
}

export interface Pli__Output {
  'plays': (_coinche_Play__Output)[];
  'currentPlayerId': (string);
  'playerStartingId': (string);
}
