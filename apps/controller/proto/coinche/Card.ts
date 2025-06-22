// Original file: ../shared/grpc/common.proto

import type { CardSuite as _coinche_CardSuite, CardSuite__Output as _coinche_CardSuite__Output } from '../coinche/CardSuite';
import type { CardValue as _coinche_CardValue, CardValue__Output as _coinche_CardValue__Output } from '../coinche/CardValue';

export interface Card {
  'suite'?: (_coinche_CardSuite);
  'value'?: (_coinche_CardValue);
  'valueNum'?: (number);
}

export interface Card__Output {
  'suite': (_coinche_CardSuite__Output);
  'value': (_coinche_CardValue__Output);
  'valueNum': (number);
}
