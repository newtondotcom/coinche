// Original file: ../shared/grpc/score_round.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ScoreRoundRequest as _coinche_ScoreRoundRequest, ScoreRoundRequest__Output as _coinche_ScoreRoundRequest__Output } from '../coinche/ScoreRoundRequest';
import type { ScoreRoundResponse as _coinche_ScoreRoundResponse, ScoreRoundResponse__Output as _coinche_ScoreRoundResponse__Output } from '../coinche/ScoreRoundResponse';

export interface ScoreRoundServiceClient extends grpc.Client {
  ScoreRound(argument: _coinche_ScoreRoundRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ScoreRoundResponse__Output>): grpc.ClientUnaryCall;
  ScoreRound(argument: _coinche_ScoreRoundRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_ScoreRoundResponse__Output>): grpc.ClientUnaryCall;
  ScoreRound(argument: _coinche_ScoreRoundRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ScoreRoundResponse__Output>): grpc.ClientUnaryCall;
  ScoreRound(argument: _coinche_ScoreRoundRequest, callback: grpc.requestCallback<_coinche_ScoreRoundResponse__Output>): grpc.ClientUnaryCall;
  scoreRound(argument: _coinche_ScoreRoundRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ScoreRoundResponse__Output>): grpc.ClientUnaryCall;
  scoreRound(argument: _coinche_ScoreRoundRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_ScoreRoundResponse__Output>): grpc.ClientUnaryCall;
  scoreRound(argument: _coinche_ScoreRoundRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ScoreRoundResponse__Output>): grpc.ClientUnaryCall;
  scoreRound(argument: _coinche_ScoreRoundRequest, callback: grpc.requestCallback<_coinche_ScoreRoundResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ScoreRoundServiceHandlers extends grpc.UntypedServiceImplementation {
  ScoreRound: grpc.handleUnaryCall<_coinche_ScoreRoundRequest__Output, _coinche_ScoreRoundResponse>;
  
}

export interface ScoreRoundServiceDefinition extends grpc.ServiceDefinition {
  ScoreRound: MethodDefinition<_coinche_ScoreRoundRequest, _coinche_ScoreRoundResponse, _coinche_ScoreRoundRequest__Output, _coinche_ScoreRoundResponse__Output>
}
