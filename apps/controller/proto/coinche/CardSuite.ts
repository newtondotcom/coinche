// Original file: ../shared/grpc/common.proto

export const CardSuite = {
  DIAMONDS: 'DIAMONDS',
  CLUBS: 'CLUBS',
  HEARTS: 'HEARTS',
  SPADES: 'SPADES',
  TOUT_ATOUT: 'TOUT_ATOUT',
  SANS_ATOUT: 'SANS_ATOUT',
  NA: 'NA',
} as const;

export type CardSuite =
  | 'DIAMONDS'
  | 0
  | 'CLUBS'
  | 1
  | 'HEARTS'
  | 2
  | 'SPADES'
  | 3
  | 'TOUT_ATOUT'
  | 4
  | 'SANS_ATOUT'
  | 5
  | 'NA'
  | 6

export type CardSuite__Output = typeof CardSuite[keyof typeof CardSuite]
