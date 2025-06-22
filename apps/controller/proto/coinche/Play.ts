// Original file: ../shared/grpc/common.proto

import type { Card as _coinche_Card, Card__Output as _coinche_Card__Output } from '../coinche/Card';

export interface Play {
  'card'?: (_coinche_Card | null);
  'playerId'?: (string);
}

export interface Play__Output {
  'card': (_coinche_Card__Output | null);
  'playerId': (string);
}
