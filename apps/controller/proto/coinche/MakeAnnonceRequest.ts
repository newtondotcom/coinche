// Original file: ../shared/grpc/annonce.proto

import type { AnnonceMsg as _coinche_AnnonceMsg, AnnonceMsg__Output as _coinche_AnnonceMsg__Output } from '../coinche/AnnonceMsg';

export interface MakeAnnonceRequest {
  'annonce'?: (_coinche_AnnonceMsg | null);
  'gameId'?: (string);
}

export interface MakeAnnonceRequest__Output {
  'annonce': (_coinche_AnnonceMsg__Output | null);
  'gameId': (string);
}
