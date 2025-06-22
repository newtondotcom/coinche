// Original file: ../shared/grpc/start_round.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { StartRoundRequest as _coinche_StartRoundRequest, StartRoundRequest__Output as _coinche_StartRoundRequest__Output } from '../coinche/StartRoundRequest';
import type { StartRoundResponse as _coinche_StartRoundResponse, StartRoundResponse__Output as _coinche_StartRoundResponse__Output } from '../coinche/StartRoundResponse';

export interface StartRoundServiceClient extends grpc.Client {
  StartRound(argument: _coinche_StartRoundRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartRoundResponse__Output>): grpc.ClientUnaryCall;
  StartRound(argument: _coinche_StartRoundRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_StartRoundResponse__Output>): grpc.ClientUnaryCall;
  StartRound(argument: _coinche_StartRoundRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartRoundResponse__Output>): grpc.ClientUnaryCall;
  StartRound(argument: _coinche_StartRoundRequest, callback: grpc.requestCallback<_coinche_StartRoundResponse__Output>): grpc.ClientUnaryCall;
  startRound(argument: _coinche_StartRoundRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartRoundResponse__Output>): grpc.ClientUnaryCall;
  startRound(argument: _coinche_StartRoundRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_coinche_StartRoundResponse__Output>): grpc.ClientUnaryCall;
  startRound(argument: _coinche_StartRoundRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_coinche_StartRoundResponse__Output>): grpc.ClientUnaryCall;
  startRound(argument: _coinche_StartRoundRequest, callback: grpc.requestCallback<_coinche_StartRoundResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface StartRoundServiceHandlers extends grpc.UntypedServiceImplementation {
  StartRound: grpc.handleUnaryCall<_coinche_StartRoundRequest__Output, _coinche_StartRoundResponse>;
  
}

export interface StartRoundServiceDefinition extends grpc.ServiceDefinition {
  StartRound: MethodDefinition<_coinche_StartRoundRequest, _coinche_StartRoundResponse, _coinche_StartRoundRequest__Output, _coinche_StartRoundResponse__Output>
}
