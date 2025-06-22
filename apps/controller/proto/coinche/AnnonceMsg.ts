// Original file: ../shared/grpc/common.proto

import type { CardSuite as _coinche_CardSuite, CardSuite__Output as _coinche_CardSuite__Output } from '../coinche/CardSuite';
import type { AnnonceType as _coinche_AnnonceType, AnnonceType__Output as _coinche_AnnonceType__Output } from '../coinche/AnnonceType';

export interface AnnonceMsg {
  'suite'?: (_coinche_CardSuite);
  'annonce'?: (_coinche_AnnonceType);
  'playerId'?: (string);
}

export interface AnnonceMsg__Output {
  'suite': (_coinche_CardSuite__Output);
  'annonce': (_coinche_AnnonceType__Output);
  'playerId': (string);
}
