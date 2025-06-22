// Original file: ../shared/grpc/distribution.proto

import type { Card as _coinche_Card, Card__Output as _coinche_Card__Output } from '../coinche/Card';

export interface DistributeCardRequest {
  'playerId'?: (string);
  'gameId'?: (string);
  'card'?: (_coinche_Card | null);
}

export interface DistributeCardRequest__Output {
  'playerId': (string);
  'gameId': (string);
  'card': (_coinche_Card__Output | null);
}
