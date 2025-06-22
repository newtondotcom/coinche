// Original file: ../shared/grpc/common.proto

export const PlayerPosition = {
  P0: 'P0',
  P1: 'P1',
  P2: 'P2',
  P3: 'P3',
} as const;

export type PlayerPosition =
  | 'P0'
  | 0
  | 'P1'
  | 1
  | 'P2'
  | 2
  | 'P3'
  | 3

export type PlayerPosition__Output = typeof PlayerPosition[keyof typeof PlayerPosition]
