// Original file: ../shared/grpc/common.proto

import type { Pli as _coinche_Pli, Pli__Output as _coinche_Pli__Output } from '../coinche/Pli';
import type { AnnonceMsg as _coinche_AnnonceMsg, AnnonceMsg__Output as _coinche_AnnonceMsg__Output } from '../coinche/AnnonceMsg';

export interface Round {
  'plis'?: (_coinche_Pli)[];
  'annonces'?: (_coinche_AnnonceMsg)[];
  'team1PointCurrentGame'?: (number);
  'team2PointCurrentGame'?: (number);
  'lastAnnonce'?: (_coinche_AnnonceMsg | null);
  'coinched'?: (boolean);
  'surcoinched'?: (boolean);
}

export interface Round__Output {
  'plis': (_coinche_Pli__Output)[];
  'annonces': (_coinche_AnnonceMsg__Output)[];
  'team1PointCurrentGame': (number);
  'team2PointCurrentGame': (number);
  'lastAnnonce': (_coinche_AnnonceMsg__Output | null);
  'coinched': (boolean);
  'surcoinched': (boolean);
}
