// Original file: ../shared/grpc/common.proto

export const CardValue = {
  SEVEN: 'SEVEN',
  EIGHT: 'EIGHT',
  NINE: 'NINE',
  JACK: 'JACK',
  QUEEN: 'QUEEN',
  KING: 'KING',
  TEN: 'TEN',
  ACE: 'ACE',
} as const;

export type CardValue =
  | 'SEVEN'
  | 0
  | 'EIGHT'
  | 1
  | 'NINE'
  | 2
  | 'JACK'
  | 3
  | 'QUEEN'
  | 4
  | 'KING'
  | 5
  | 'TEN'
  | 6
  | 'ACE'
  | 7

export type CardValue__Output = typeof CardValue[keyof typeof CardValue]
