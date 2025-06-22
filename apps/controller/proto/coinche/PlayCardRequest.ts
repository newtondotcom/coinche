// Original file: ../shared/grpc/play.proto

import type { Play as _coinche_Play, Play__Output as _coinche_Play__Output } from '../coinche/Play';

export interface PlayCardRequest {
  'play'?: (_coinche_Play | null);
  'gameId'?: (string);
}

export interface PlayCardRequest__Output {
  'play': (_coinche_Play__Output | null);
  'gameId': (string);
}
