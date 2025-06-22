// Original file: ../shared/grpc/common.proto

import type { PlayerPosition as _coinche_PlayerPosition, PlayerPosition__Output as _coinche_PlayerPosition__Output } from '../coinche/PlayerPosition';
import type { Card as _coinche_Card, Card__Output as _coinche_Card__Output } from '../coinche/Card';
import type { AnnonceMsg as _coinche_AnnonceMsg, AnnonceMsg__Output as _coinche_AnnonceMsg__Output } from '../coinche/AnnonceMsg';

export interface Player {
  'id'?: (string);
  'position'?: (_coinche_PlayerPosition);
  'hands'?: (_coinche_Card)[];
  'classement'?: (number);
  'lastAnnonce'?: (_coinche_AnnonceMsg | null);
}

export interface Player__Output {
  'id': (string);
  'position': (_coinche_PlayerPosition__Output);
  'hands': (_coinche_Card__Output)[];
  'classement': (number);
  'lastAnnonce': (_coinche_AnnonceMsg__Output | null);
}
