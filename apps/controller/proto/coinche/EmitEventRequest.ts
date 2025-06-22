// Original file: ../shared/grpc/coinche.proto

import type { GameEvent as _coinche_GameEvent, GameEvent__Output as _coinche_GameEvent__Output } from '../coinche/GameEvent';

export interface EmitEventRequest {
  'event'?: (_coinche_GameEvent | null);
}

export interface EmitEventRequest__Output {
  'event': (_coinche_GameEvent__Output | null);
}
