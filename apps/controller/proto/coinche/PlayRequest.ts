// Original file: ../shared/grpc/play.proto

import type { Play as _coinche_Play, Play__Output as _coinche_Play__Output } from '../coinche/Play';

export interface PlayRequest {
  'play'?: (_coinche_Play | null);
  'gameId'?: (string);
}

export interface PlayRequest__Output {
  'play': (_coinche_Play__Output | null);
  'gameId': (string);
}
