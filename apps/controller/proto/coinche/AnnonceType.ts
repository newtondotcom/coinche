// Original file: ../shared/grpc/common.proto

export const AnnonceType = {
  A80: 'A80',
  A90: 'A90',
  A100: 'A100',
  A110: 'A110',
  A120: 'A120',
  A130: 'A130',
  A140: 'A140',
  A150: 'A150',
  A160: 'A160',
  ZERO: 'ZERO',
  CAPOT: 'CAPOT',
  GENERALE: 'GENERALE',
} as const;

export type AnnonceType =
  | 'A80'
  | 0
  | 'A90'
  | 1
  | 'A100'
  | 2
  | 'A110'
  | 3
  | 'A120'
  | 4
  | 'A130'
  | 5
  | 'A140'
  | 6
  | 'A150'
  | 7
  | 'A160'
  | 8
  | 'ZERO'
  | 9
  | 'CAPOT'
  | 10
  | 'GENERALE'
  | 11

export type AnnonceType__Output = typeof AnnonceType[keyof typeof AnnonceType]
