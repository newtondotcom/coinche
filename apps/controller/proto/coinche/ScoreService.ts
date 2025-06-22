// Original file: ../shared/grpc/score.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ScorePointsRequest as _coinche_ScorePointsRequest, ScorePointsRequest__Output as _coinche_ScorePointsRequest__Output } from '../coinche/ScorePointsRequest';
import type { ScorePointsResponse as _coinche_ScorePointsResponse, ScorePointsResponse__Output as _coinche_ScorePointsResponse__Output } from '../coinche/ScorePointsResponse';

export interface ScoreServiceClient extends grpc.Client {
  Score(argument: _coinche_ScorePointsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ScorePointsResponse__Output>): grpc.ClientUnaryCall;
  Score(argument: _coinche_ScorePointsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_ScorePointsResponse__Output>): grpc.ClientUnaryCall;
  Score(argument: _coinche_ScorePointsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ScorePointsResponse__Output>): grpc.ClientUnaryCall;
  Score(argument: _coinche_ScorePointsRequest, callback: grpc.requestCallback<_coinche_ScorePointsResponse__Output>): grpc.ClientUnaryCall;
  score(argument: _coinche_ScorePointsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ScorePointsResponse__Output>): grpc.ClientUnaryCall;
  score(argument: _coinche_ScorePointsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_ScorePointsResponse__Output>): grpc.ClientUnaryCall;
  score(argument: _coinche_ScorePointsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_ScorePointsResponse__Output>): grpc.ClientUnaryCall;
  score(argument: _coinche_ScorePointsRequest, callback: grpc.requestCallback<_coinche_ScorePointsResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ScoreServiceHandlers extends grpc.UntypedServiceImplementation {
  Score: grpc.handleUnaryCall<_coinche_ScorePointsRequest__Output, _coinche_ScorePointsResponse>;
  
}

export interface ScoreServiceDefinition extends grpc.ServiceDefinition {
  Score: MethodDefinition<_coinche_ScorePointsRequest, _coinche_ScorePointsResponse, _coinche_ScorePointsRequest__Output, _coinche_ScorePointsResponse__Output>
}
